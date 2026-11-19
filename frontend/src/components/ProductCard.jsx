import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../services/config';
import BuyNowModal from './BuyNowModal';
import ProductImage from './ProductImage';

export default function ProductCard({ product }) {
  const { add } = useCart();
  const [buying, setBuying] = useState(false);
  const [added, setAdded] = useState(false);
  const hasDiscount = product.originalPrice && Number(product.originalPrice) > Number(product.price);
  const needsSize = product.sizes && product.sizes.length > 0;

  const addToCart = () => {
    add(product, 1, '');
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article className="product-card" data-testid="product-card">
      <Link to={`/product/${product.id}`} className="product-media" aria-label={`View ${product.name}`}>
        <ProductImage src={product.imagePath} alt={product.name} />
        {product.packInfo && <span className="pack-badge">{product.packInfo}</span>}
        {product.newArrival && <span className="new-badge">New</span>}
        {!product.inStock && <span className="sold-out">Sold out</span>}
      </Link>
      <div className="product-body">
        <div className="product-cat">{product.category.name}</div>
        <h3 className="product-name"><Link to={`/product/${product.id}`}>{product.name}</Link></h3>
        <p className="product-desc">{product.shortDescription}</p>
        <div className="price-row">
          <span className="price-now">{formatPrice(product.price)}</span>
          {hasDiscount && (
            <>
              <span className="price-old">{formatPrice(product.originalPrice)}</span>
              {product.discountPercent && <span className="price-off">{product.discountPercent}% off</span>}
            </>
          )}
        </div>
        <div className="card-actions">
          <Link to={`/product/${product.id}`} className="btn btn-outline-brand w-100">View Details</Link>
          <div className="d-flex gap-2">
            <button type="button" className="btn btn-brand flex-fill" onClick={needsSize ? () => setBuying(true) : addToCart} disabled={!product.inStock}>
              {added ? <><i className="bi bi-check2 me-1" />Added</> : <><i className="bi bi-bag-plus me-1" />Add to Cart</>}
            </button>
            <button type="button" className="btn btn-whatsapp flex-fill" onClick={() => setBuying(true)} disabled={!product.inStock}>
              <i className="bi bi-whatsapp me-1" />Buy Now
            </button>
          </div>
        </div>
      </div>
      {buying && <BuyNowModal product={product} onClose={() => setBuying(false)} />}
    </article>
  );
}
