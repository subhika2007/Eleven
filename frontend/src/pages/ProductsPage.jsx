import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import FilterSidebar, { EMPTY_FILTERS, applyFilters, countActive } from '../components/FilterSidebar';
import ProductGrid from '../components/ProductGrid';
import { useProducts } from '../context/ProductsContext';
import { fetchByCategory, searchProducts } from '../services/api';

const SORTS = {
  featured: 'Featured',
  newest: 'Newest',
  'price-asc': 'Price: Low to High',
  'price-desc': 'Price: High to Low',
  'name-asc': 'Name: A to Z',
};

const AUDIENCES = {
  women: { title: 'Women', match: ['WOMEN', 'UNISEX'] },
  men: { title: 'Men', match: ['MEN', 'UNISEX'] },
  kids: { title: 'Kids', match: ['KIDS'] },
};

function sortList(list, sort) {
  const l = [...list];
  switch (sort) {
    case 'newest': return l.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt) || b.id - a.id);
    case 'price-asc': return l.sort((a, b) => a.price - b.price || a.id - b.id);
    case 'price-desc': return l.sort((a, b) => b.price - a.price || a.id - b.id);
    case 'name-asc': return l.sort((a, b) => a.name.localeCompare(b.name));
    default: return l.sort((a, b) => Number(b.featured) - Number(a.featured) || a.id - b.id);
  }
}

export default function ProductsPage() {
  const { slug, audience } = useParams();
  const [params, setParams] = useSearchParams();
  const q = (params.get('q') || '').trim();
  const sort = params.get('sort') || 'featured';
  const { products, categories, loading } = useProducts();

  const [filters, setFilters] = useState({ ...EMPTY_FILTERS, inStockOnly: params.get('availability') === 'in' });
  const [base, setBase] = useState([]);
  const [busy, setBusy] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Reset filters when moving between collections
  useEffect(() => {
    setFilters({ ...EMPTY_FILTERS, inStockOnly: params.get('availability') === 'in' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, audience]);

  // Base list always comes from the backend (search / category endpoints), then filters + sorting are layered on top.
  useEffect(() => {
    if (loading) return undefined;
    let alive = true;
    setBusy(true);
    const load = q ? searchProducts(q) : slug ? fetchByCategory(slug) : Promise.resolve(products);
    load.then((list) => {
      if (!alive) return;
      const aud = audience && AUDIENCES[audience];
      setBase(aud ? list.filter((p) => aud.match.includes(p.audience)) : list);
    }).finally(() => alive && setBusy(false));
    return () => { alive = false; };
  }, [q, slug, audience, products, loading]);

  const visible = useMemo(() => sortList(applyFilters(base, filters), sort), [base, filters, sort]);
  const cat = slug && categories.find((c) => c.slug === slug);
  const title = q ? `Search results for "${q}"` : slug ? (cat?.name || 'Category') : audience ? (AUDIENCES[audience]?.title || 'Collection') : 'All Products';

  const setSort = (v) => {
    const next = new URLSearchParams(params);
    next.set('sort', v);
    setParams(next, { replace: true });
  };

  return (
    <div className="container py-4">
      <nav aria-label="breadcrumb" className="mb-2">
        <ol className="breadcrumb small">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active">{title}</li>
        </ol>
      </nav>
      <div className="d-flex flex-wrap justify-content-between align-items-end gap-2 mb-3">
        <div>
          <h1 className="page-title">{title}</h1>
          <div className="text-muted small" data-testid="result-count">{busy ? 'Loading...' : `${visible.length} product${visible.length === 1 ? '' : 's'}`}</div>
        </div>
        <div className="d-flex gap-2 align-items-center">
          <button className="btn btn-outline-brand d-lg-none" onClick={() => setShowFilters(true)}>
            <i className="bi bi-funnel me-1" />Filters{countActive(filters) ? ` (${countActive(filters)})` : ''}
          </button>
          <label className="visually-hidden" htmlFor="sort">Sort by</label>
          <select id="sort" className="form-select sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
            {Object.entries(SORTS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
      </div>

      <div className="row g-4">
        <aside className="col-lg-3 d-none d-lg-block">
          <FilterSidebar allProducts={base} filters={filters} onChange={setFilters} showCategories={!slug} />
        </aside>

        <div className="col-lg-9">
          {busy ? (
            <div className="text-center py-5"><div className="spinner-border text-danger" /></div>
          ) : visible.length === 0 ? (
            <div className="empty-state">
              <i className="bi bi-search" />
              <h4>{q ? `No products match "${q}"` : 'No products match these filters'}</h4>
              <p className="text-muted">Try a different word such as "saree", "blouse" or "kids", or clear your filters.</p>
              <div className="d-flex gap-2 justify-content-center">
                {countActive(filters) > 0 && <button className="btn btn-outline-brand" onClick={() => setFilters(EMPTY_FILTERS)}>Clear filters</button>}
                <Link to="/products" className="btn btn-brand">View all products</Link>
              </div>
            </div>
          ) : (
            <ProductGrid products={visible} />
          )}
        </div>
      </div>

      {showFilters && (
        <>
          <div className="offcanvas offcanvas-start show" tabIndex="-1" style={{ visibility: 'visible' }}>
            <div className="offcanvas-header">
              <h5 className="offcanvas-title">Filter products</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowFilters(false)} />
            </div>
            <div className="offcanvas-body">
              <FilterSidebar allProducts={base} filters={filters} onChange={setFilters} showCategories={!slug} />
              <button className="btn btn-brand w-100 mt-3" onClick={() => setShowFilters(false)}>Show {visible.length} products</button>
            </div>
          </div>
          <div className="offcanvas-backdrop fade show" onClick={() => setShowFilters(false)} />
        </>
      )}
    </div>
  );
}
