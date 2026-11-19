import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchProducts } from '../services/api';
import { formatPrice } from '../services/config';
import ProductImage from './ProductImage';

export default function SearchBox({ onDone }) {
  const [text, setText] = useState('');
  const [results, setResults] = useState(null); // null = nothing searched yet
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const wrapRef = useRef(null);
  const navigate = useNavigate();

  // Live search against the backend (debounced)
  useEffect(() => {
    const keyword = text.trim();
    if (!keyword) {
      setResults(null);
      return undefined;
    }
    setBusy(true);
    let alive = true;
    const t = setTimeout(() => {
      searchProducts(keyword)
        .then((r) => alive && setResults(r))
        .catch(() => alive && setResults([]))
        .finally(() => alive && setBusy(false));
    }, 250);
    return () => {
      alive = false;
      clearTimeout(t);
    };
  }, [text]);

  useEffect(() => {
    const close = (e) => wrapRef.current && !wrapRef.current.contains(e.target) && setOpen(false);
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const submit = (e) => {
    e.preventDefault();
    const keyword = text.trim();
    if (!keyword) return;
    setOpen(false);
    navigate(`/products?q=${encodeURIComponent(keyword)}`);
    onDone?.();
  };

  const go = (p) => {
    setOpen(false);
    setText('');
    navigate(`/product/${p.id}`);
    onDone?.();
  };

  return (
    <div className="search-wrap" ref={wrapRef}>
      <form className="search-form" onSubmit={submit} role="search">
        <i className="bi bi-search" />
        <input
          type="search"
          value={text}
          placeholder="Search sarees, blouses, tops, kids wear..."
          aria-label="Search products"
          onChange={(e) => {
            setText(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
        />
        <button type="submit" className="btn btn-search">Search</button>
      </form>

      {open && text.trim() && (
        <div className="search-dropdown" role="listbox">
          {busy && results === null && <div className="p-3 text-muted small">Searching...</div>}
          {results && results.length === 0 && !busy && (
            <div className="p-3 text-center">
              <div className="fw-semibold">No products found for "{text.trim()}"</div>
              <div className="small text-muted">Try "saree", "blouse", "kids" or "pant".</div>
            </div>
          )}
          {results && results.slice(0, 6).map((p) => (
            <button type="button" key={p.id} className="search-item" onClick={() => go(p)} role="option">
              <ProductImage src={p.imagePath} alt={p.name} />
              <span className="flex-grow-1 text-start">
                <span className="d-block fw-semibold">{p.name}</span>
                <span className="d-block small text-muted">{p.category.name} &middot; {p.packInfo}</span>
              </span>
              <span className="price-now">{formatPrice(p.price)}</span>
            </button>
          ))}
          {results && results.length > 6 && (
            <button type="button" className="search-more" onClick={submit}>
              See all {results.length} results
            </button>
          )}
        </div>
      )}
    </div>
  );
}
