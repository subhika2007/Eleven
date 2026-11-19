import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import CustomerForm from '../components/CustomerForm';
import ProductImage from '../components/ProductImage';
import { useCart } from '../context/CartContext';
import { openWhatsApp, placeOrder } from '../services/checkout';
import { formatPrice } from '../services/config';

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  if (items.length === 0) return <Navigate to="/cart" replace />;

  const submit = async (customer) => {
    setBusy(true);
    setError('');
    try {
      const result = await placeOrder(items, customer);
      openWhatsApp(result.url);
      clear();
      navigate(`/order-confirmation/${result.order?.id ?? 'local'}`, { state: result });
    } catch (err) {
      setError(err.response?.data?.message || 'Could not place the order. Please check your details.');
      setBusy(false);
    }
  };

  return (
    <div className="container py-4">
      <h1 className="page-title mb-3">Checkout</h1>
      <div className="row g-4">
        <div className="col-lg-7">
          <div className="summary-card">
            <h5>Your details</h5>
            <CustomerForm onSubmit={submit} busy={busy} error={error} submitLabel="Place order on WhatsApp" />
          </div>
        </div>
        <div className="col-lg-5">
          <div className="summary-card">
            <div className="d-flex justify-content-between"><h5>Order Summary</h5><Link to="/cart" className="small">Edit bag</Link></div>
            {items.map((i) => (
              <div className="mini-row" key={`${i.id}|${i.size}`}>
                <ProductImage src={i.imagePath} alt={i.name} />
                <div className="flex-grow-1">
                  <div className="fw-semibold small">{i.name}</div>
                  <div className="small text-muted">Qty {i.quantity}{i.size ? ` · ${i.size}` : ''}</div>
                </div>
                <div>{formatPrice(i.price * i.quantity)}</div>
              </div>
            ))}
            <hr />
            <div className="total-line fs-5"><strong>Total</strong><strong>{formatPrice(subtotal)}</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}
