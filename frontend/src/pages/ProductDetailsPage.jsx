import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BuyNowModal from '../components/BuyNowModal';
import ProductGrid from '../components/ProductGrid';
import ProductImage from '../components/ProductImage';
import QuantityStepper from '../components/QuantityStepper';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductsContext';
import { fetchProduct } from '../services/api';
import { formatPrice } from '../services/config';
import { enquiryUrl } from '../services/whatsapp';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { products } = useProducts();
  const { add } = useCart();
  const [product, setProduct] = useState(undefined); // undefined = loading, null = not found
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('');
  const [buying, setBuying] = useState(false);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  useEffect(() => {
    let alive = true;
    setProduct(undefined);
    setQuantity(1);
    setSize('');
    window.scrollTo(0, 0);
    fetchProduct(id).then((p) => alive && setProduct(p)).catch(() => alive && setProduct(null));
    return () => { alive = false; };
  }, [id]);

  if (product === undefined) return <div className="text-center py-5"><div className="spinner-border text-danger" /></div>;
  if (product === null) {
    return (
      <div className="container py-5 text-center">
        <h2>Product not found</h2>
        <p className="text-muted">We could not find that product.</p>
        <Link to="/products" className="btn btn-brand">Browse all products</Link>
      </div>
    );
  }

  const hasSizes = product.sizes?.length > 0;
  const hasDiscount = product.originalPrice && Number(product.originalPrice) > Number(product.price);
  const related = [
    ...products.filter((p) => p.id !== product.id && p.category.slug === product.category.slug),
    ...products.filter((p) => p.id !== product.id && p.category.slug !== product.category.slug && p.audience === product.audience),
  ].slice(0, 4);

  const addToCart = () => {
    if (hasSizes && !size) { setSizeError(true); return; }
    add(product, quantity, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };
  const buyNow = () => {
    if (hasSizes && !size) { setSizeError(true); return; }
    setBuying(true);
  };

  return (
    <div className="container py-4">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb small">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/category/${product.category.slug}`}>{product.category.name}</Link></li>
          <li className="breadcrumb-item active">{product.name}</li>
        </ol>
      </nav>

      <div className="row g-4 g-lg-5">
        <div className="col-md-6">
          <div className="detail-image">
            <ProductImage src={product.imagePath} alt={product.name} loading="eager" />
          </div>
        </div>

        <div className="col-md-6">
          <div className="product-cat">{product.category.name} &middot; {product.code}</div>
          <h1 className="page-title">{product.name}</h1>
          <div className="price-row my-2">
            <span className="price-now fs-2">{formatPrice(product.price)}</span>
            {hasDiscount && (
              <>
                <span className="price-old fs-5">{formatPrice(product.originalPrice)}</span>
                {product.discountPercent && <span className="price-off">{product.discountPercent}% off</span>}
              </>
            )}
            {product.packInfo && <span className="pack-pill">Pack of {product.packInfo}</span>}
          </div>
          <p className="lead-sm">{product.shortDescription}</p>
          <p className="text-muted">{product.fullDescription}</p>

          {product.colours?.length > 0 && (
            <div className="mb-3">
              <div className="label-sm">Colours in this pack</div>
              <div className="d-flex flex-wrap gap-2">
                {product.colours.map((c) => <span className="chip static" key={c}>{c}</span>)}
              </div>
            </div>
          )}

          <div className="mb-3">
            <label className="label-sm" htmlFor="pd-size">Size{hasSizes ? '' : ' (optional - we will confirm on chat)'}</label>
            {hasSizes ? (
              <div className="d-flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button key={s} type="button" className={`chip ${size === s ? 'active' : ''}`} onClick={() => { setSize(s); setSizeError(false); }}>{s}</button>
                ))}
              </div>
            ) : (
              <input id="pd-size" className="form-control" style={{ maxWidth: 260 }} placeholder="e.g. M, L, 2-3 yrs" maxLength={30} value={size} onChange={(e) => setSize(e.target.value)} />
            )}
            {sizeError && <div className="text-danger small mt-1">Please select a size.</div>}
          </div>

          <div className="d-flex align-items-center gap-3 mb-3 flex-wrap">
            <div>
              <div className="label-sm">Quantity</div>
              <QuantityStepper value={quantity} onChange={setQuantity} />
            </div>
            <div className={`stock-pill ${product.inStock ? 'in' : 'out'}`}>
              <i className={`bi ${product.inStock ? 'bi-check-circle' : 'bi-x-circle'} me-1`} />
              {product.inStock ? 'In stock' : 'Out of stock'}
            </div>
          </div>

          <div className="d-flex flex-wrap gap-2 mb-3">
            <button className="btn btn-brand btn-lg" onClick={addToCart} disabled={!product.inStock}>
              {added ? <><i className="bi bi-check2 me-2" />Added to bag</> : <><i className="bi bi-bag-plus me-2" />Add to Cart</>}
            </button>
            <button className="btn btn-whatsapp btn-lg" onClick={buyNow} disabled={!product.inStock}>
              <i className="bi bi-whatsapp me-2" />Buy Now
            </button>
          </div>
          <a className="btn btn-outline-success" href={enquiryUrl(product)} target="_blank" rel="noreferrer">
            <i className="bi bi-chat-dots me-2" />Enquire on WhatsApp
          </a>

          {product.confirmationNote && (
            <div className="confirm-note mt-4"><i className="bi bi-info-circle me-2" />Fabric, available sizes and stock are confirmed by the shop on WhatsApp before payment.</div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-5">
          <h3 className="mb-3 serif">You may also like</h3>
          <ProductGrid products={related} />
        </section>
      )}

      {buying && <BuyNowModal product={product} initialQuantity={quantity} initialSize={size} onClose={() => setBuying(false)} />}
    </div>
  );
}
