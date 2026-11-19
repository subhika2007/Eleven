import { Link } from 'react-router-dom';
import ProductImage from '../components/ProductImage';
import QuantityStepper from '../components/QuantityStepper';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../services/config';

export default function CartPage() {
  const { items, subtotal, count, keyOf, setQuantity, remove, clear } = useCart();

  if (items.length === 0) {
    return (
      <div className="container py-5 text-center empty-state">
        <i className="bi bi-bag" />
        <h2>Your shopping bag is empty</h2>
        <p className="text-muted">Add something lovely and order it on WhatsApp.</p>
        <Link to="/products" className="btn btn-brand btn-lg">Start shopping</Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className="page-title mb-3">Shopping Bag <small className="text-muted fs-6">({count} item{count === 1 ? '' : 's'})</small></h1>
      <div className="row g-4">
        <div className="col-lg-8">
          {items.map((i) => {
            const k = keyOf(i);
            return (
              <div className="cart-row" key={k} data-testid="cart-row">
                <Link to={`/product/${i.id}`}><ProductImage src={i.imagePath} alt={i.name} /></Link>
                <div className="flex-grow-1">
                  <Link to={`/product/${i.id}`} className="fw-semibold text-decoration-none">{i.name}</Link>
                  <div className="small text-muted">{i.code}{i.packInfo ? ` · ${i.packInfo}` : ''}{i.size ? ` · Size ${i.size}` : ''}</div>
                  <div className="price-now">{formatPrice(i.price)}</div>
                  <div className="d-flex align-items-center gap-3 mt-2 flex-wrap">
                    <QuantityStepper value={i.quantity} onChange={(q) => setQuantity(k, q)} />
                    <button className="btn btn-link text-danger p-0" onClick={() => remove(k)}><i className="bi bi-trash me-1" />Remove</button>
                  </div>
                </div>
                <div className="cart-line-total">{formatPrice(i.price * i.quantity)}</div>
              </div>
            );
          })}
          <div className="d-flex justify-content-between mt-3">
            <Link to="/products" className="btn btn-outline-brand"><i className="bi bi-arrow-left me-2" />Continue shopping</Link>
            <button className="btn btn-link text-muted" onClick={clear}>Clear bag</button>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="summary-card">
            <h5>Order Summary</h5>
            <div className="total-line"><span>Subtotal</span><span data-testid="subtotal">{formatPrice(subtotal)}</span></div>
            <div className="total-line text-muted small"><span>Delivery</span><span>Confirmed on WhatsApp</span></div>
            <hr />
            <div className="total-line fs-5"><strong>Total</strong><strong data-testid="total">{formatPrice(subtotal)}</strong></div>
            <Link to="/checkout" className="btn btn-whatsapp w-100 mt-3"><i className="bi bi-whatsapp me-2" />Proceed to WhatsApp Checkout</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
