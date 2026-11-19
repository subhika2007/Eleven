import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import ProductImage from '../components/ProductImage';
import { fetchOrder } from '../services/api';
import { formatPrice } from '../services/config';
import { buildOrderMessage, whatsappUrl } from '../services/whatsapp';

export default function OrderConfirmationPage() {
  const { id } = useParams();
  const { state } = useLocation();
  const [order, setOrder] = useState(state?.order || null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!order && id !== 'local') fetchOrder(id).then(setOrder).catch(() => setError(true));
  }, [id, order]);

  // Prefer what the customer just saw; otherwise rebuild the WhatsApp message from the saved order.
  let waLink = state?.url;
  if (!waLink && order) {
    const lines = order.items.map((i) => ({
      id: i.productId, code: i.productCode, name: i.productName, price: Number(i.unitPrice), quantity: i.quantity,
      size: i.size, colours: i.colour ? i.colour.split(',').map((s) => s.trim()) : [], imagePath: i.imagePath,
    }));
    const pickup = order.deliveryAddress === 'Store pickup';
    waLink = whatsappUrl(buildOrderMessage(lines, { name: order.customerName, phone: order.customerPhone, address: order.deliveryAddress, pickup }, order.id));
  }

  const lines = order
    ? order.items.map((i) => ({ key: i.productId, name: i.productName, qty: i.quantity, size: i.size, img: i.imagePath, total: i.lineTotal }))
    : (state?.lines || []).map((l) => ({ key: l.id, name: l.name, qty: l.quantity, size: l.size, img: l.imagePath, total: l.price * l.quantity }));
  const total = order ? order.totalAmount : lines.reduce((s, l) => s + l.total, 0);

  if (error || (!order && !state)) {
    return (
      <div className="container py-5 text-center">
        <h2>Order not found</h2>
        <Link to="/products" className="btn btn-brand mt-2">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ maxWidth: 760 }}>
      <div className="summary-card text-center">
        <div className="success-icon"><i className="bi bi-check-lg" /></div>
        <h1 className="page-title">Thank you{state?.customer?.name ? `, ${state.customer.name}` : ''}!</h1>
        {order ? <p className="mb-1">Your order reference is <strong>#{order.id}</strong>.</p> : <p className="mb-1">Your order details are ready to send.</p>}
        <p className="text-muted">
          WhatsApp should have opened with your order. Please press <strong>Send</strong> there so the shop receives it.
          If it did not open, use the button below.
        </p>
        <a className="btn btn-whatsapp btn-lg" href={waLink} target="_blank" rel="noreferrer"><i className="bi bi-whatsapp me-2" />Open WhatsApp &amp; send order</a>

        <div className="text-start mt-4">
          {lines.map((l, idx) => (
            <div className="mini-row" key={`${l.key}-${idx}`}>
              <ProductImage src={l.img} alt={l.name} />
              <div className="flex-grow-1">
                <div className="fw-semibold">{l.name}</div>
                <div className="small text-muted">Qty {l.qty}{l.size ? ` · ${l.size}` : ''}</div>
              </div>
              <div>{formatPrice(l.total)}</div>
            </div>
          ))}
          <hr />
          <div className="total-line fs-5"><strong>Total</strong><strong>{formatPrice(total)}</strong></div>
        </div>
        {!order && <p className="small text-muted mt-3">Note: the order could not be saved on our server this time, but your WhatsApp message contains everything we need.</p>}
        <Link to="/products" className="btn btn-outline-brand mt-3">Continue shopping</Link>
      </div>
    </div>
  );
}
