import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { openWhatsApp, placeOrder } from '../services/checkout';
import { formatPrice } from '../services/config';
import CustomerForm from './CustomerForm';
import ProductImage from './ProductImage';
import QuantityStepper from './QuantityStepper';

export default function BuyNowModal({ product, initialQuantity = 1, initialSize = '', onClose }) {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(initialQuantity);
  const [size, setSize] = useState(initialSize);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const hasSizes = product.sizes && product.sizes.length > 0;

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.classList.add('modal-open');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('modal-open');
    };
  }, [onClose]);

  const submit = async (customer) => {
    if (hasSizes && !size) {
      setError('Please choose a size.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      const line = {
        id: product.id, code: product.code, name: product.name, price: Number(product.price),
        quantity, size, colours: product.colours, imagePath: product.imagePath, packInfo: product.packInfo,
      };
      const result = await placeOrder([line], customer);
      openWhatsApp(result.url);
      onClose();
      navigate(`/order-confirmation/${result.order?.id ?? 'local'}`, { state: result });
    } catch (err) {
      setError(err.response?.data?.message || 'Could not place the order. Please check your details.');
      setBusy(false);
    }
  };

  return createPortal(
    <>
      <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true" aria-label={`Buy ${product.name}`} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content buy-modal">
            <div className="modal-header">
              <h5 className="modal-title">Buy on WhatsApp</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={onClose} />
            </div>
            <div className="modal-body">
              <div className="buy-summary">
                <ProductImage src={product.imagePath} alt={product.name} />
                <div className="flex-grow-1">
                  <div className="fw-semibold">{product.name}</div>
                  <div className="small text-muted">{product.code} &middot; {product.packInfo}</div>
                  <div className="price-now">{formatPrice(product.price)}</div>
                </div>
              </div>

              <div className="row g-3 align-items-end my-1">
                <div className="col-6">
                  <label className="form-label">Quantity</label>
                  <QuantityStepper value={quantity} onChange={setQuantity} />
                </div>
                <div className="col-6">
                  <label className="form-label" htmlFor="bn-size">Size{hasSizes ? '' : ' (optional)'}</label>
                  {hasSizes ? (
                    <select id="bn-size" className="form-select" value={size} onChange={(e) => setSize(e.target.value)}>
                      <option value="">Select size</option>
                      {product.sizes.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  ) : (
                    <input id="bn-size" className="form-control" value={size} onChange={(e) => setSize(e.target.value)} placeholder="e.g. M, L, 2-3 yrs" maxLength={30} />
                  )}
                </div>
              </div>
              {product.colours?.length > 0 && (
                <p className="small text-muted mb-3">Pack colours: {product.colours.join(', ')}</p>
              )}
              <div className="total-line">
                <span>Total</span>
                <strong>{formatPrice(Number(product.price) * quantity)}</strong>
              </div>
              <hr />
              <CustomerForm onSubmit={submit} busy={busy} error={error} />
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </>,
    document.body
  );
}
