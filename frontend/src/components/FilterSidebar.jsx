import { ALL_FAMILIES, FAMILY_HEX, coloursFamiliesOf } from '../services/colours';

export const EMPTY_FILTERS = { categories: [], min: '', max: '', colours: [], sizes: [], inStockOnly: false };

export const countActive = (f) =>
  f.categories.length + f.colours.length + f.sizes.length + (f.min !== '' ? 1 : 0) + (f.max !== '' ? 1 : 0) + (f.inStockOnly ? 1 : 0);

export function applyFilters(list, f) {
  return list.filter((p) => {
    if (f.categories.length && !f.categories.includes(p.category.slug)) return false;
    if (f.min !== '' && Number(p.price) < Number(f.min)) return false;
    if (f.max !== '' && Number(p.price) > Number(f.max)) return false;
    if (f.colours.length && !coloursFamiliesOf(p).some((c) => f.colours.includes(c))) return false;
    if (f.sizes.length && !(p.sizes || []).some((s) => f.sizes.includes(s))) return false;
    if (f.inStockOnly && !p.inStock) return false;
    return true;
  });
}

const toggle = (arr, v) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

export default function FilterSidebar({ allProducts, filters, onChange, showCategories = true }) {
  const categories = [...new Map(allProducts.map((p) => [p.category.slug, p.category])).values()];
  const colourOptions = ALL_FAMILIES.filter((f) => allProducts.some((p) => coloursFamiliesOf(p).includes(f)));
  const sizeOptions = [...new Set(allProducts.flatMap((p) => p.sizes || []))];
  const set = (patch) => onChange({ ...filters, ...patch });

  return (
    <div className="filter-panel">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0">Filters</h5>
        {countActive(filters) > 0 && (
          <button type="button" className="btn btn-link btn-sm p-0" onClick={() => onChange(EMPTY_FILTERS)}>Clear all</button>
        )}
      </div>

      <div className="filter-group">
        <h6>Availability</h6>
        <div className="form-check form-switch">
          <input id="f-stock" className="form-check-input" type="checkbox" checked={filters.inStockOnly} onChange={(e) => set({ inStockOnly: e.target.checked })} />
          <label htmlFor="f-stock" className="form-check-label">In stock only</label>
        </div>
      </div>

      {showCategories && (
        <div className="filter-group">
          <h6>Category</h6>
          {categories.map((c) => (
            <div className="form-check" key={c.slug}>
              <input id={`f-cat-${c.slug}`} className="form-check-input" type="checkbox" checked={filters.categories.includes(c.slug)} onChange={() => set({ categories: toggle(filters.categories, c.slug) })} />
              <label htmlFor={`f-cat-${c.slug}`} className="form-check-label">{c.name}</label>
            </div>
          ))}
        </div>
      )}

      <div className="filter-group">
        <h6>Price (&#8377;)</h6>
        <div className="d-flex align-items-center gap-2">
          <input type="number" min="0" className="form-control form-control-sm" placeholder="Min" aria-label="Minimum price" value={filters.min} onChange={(e) => set({ min: e.target.value })} />
          <span>-</span>
          <input type="number" min="0" className="form-control form-control-sm" placeholder="Max" aria-label="Maximum price" value={filters.max} onChange={(e) => set({ max: e.target.value })} />
        </div>
        <div className="d-flex flex-wrap gap-2 mt-2">
          {[['Under 200', '', 200], ['200 - 400', 200, 400], ['Above 400', 400, '']].map(([label, min, max]) => (
            <button key={label} type="button" className="chip" onClick={() => set({ min, max })}>{label}</button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h6>Colour</h6>
        <div className="d-flex flex-wrap gap-2">
          {colourOptions.map((c) => (
            <button key={c} type="button" className={`swatch ${filters.colours.includes(c) ? 'active' : ''}`} style={{ background: FAMILY_HEX[c] }} title={c} aria-label={c} aria-pressed={filters.colours.includes(c)} onClick={() => set({ colours: toggle(filters.colours, c) })} />
          ))}
        </div>
      </div>

      {sizeOptions.length > 0 && (
        <div className="filter-group">
          <h6>Size</h6>
          <div className="d-flex flex-wrap gap-2">
            {sizeOptions.map((s) => (
              <button key={s} type="button" className={`chip ${filters.sizes.includes(s) ? 'active' : ''}`} onClick={() => set({ sizes: toggle(filters.sizes, s) })}>{s}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
