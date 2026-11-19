import { useState } from 'react';
import { isValidPhone } from '../services/checkout';

export default function CustomerForm({ onSubmit, busy, error, submitLabel = 'Order on WhatsApp' }) {
  const [form, setForm] = useState({ name: '', phone: '', pickup: false, address: '' });
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (form.name.trim().length < 2) er.name = 'Please enter your name';
    if (!isValidPhone(form.phone)) er.phone = 'Enter a valid 10-digit mobile number';
    if (!form.pickup && form.address.trim().length < 10) er.address = 'Please enter your full delivery address';
    setErrors(er);
    if (Object.keys(er).length === 0) onSubmit(form);
  };

  return (
    <form onSubmit={submit} noValidate>
      <div className="mb-3">
        <label className="form-label" htmlFor="cf-name">Your name</label>
        <input id="cf-name" className={`form-control ${errors.name ? 'is-invalid' : ''}`} value={form.name} onChange={set('name')} autoComplete="name" />
        <div className="invalid-feedback">{errors.name}</div>
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="cf-phone">Mobile number</label>
        <input id="cf-phone" type="tel" inputMode="numeric" className={`form-control ${errors.phone ? 'is-invalid' : ''}`} value={form.phone} onChange={set('phone')} placeholder="98765 43210" autoComplete="tel" />
        <div className="invalid-feedback">{errors.phone}</div>
      </div>
      <div className="form-check mb-3">
        <input id="cf-pickup" type="checkbox" className="form-check-input" checked={form.pickup} onChange={set('pickup')} />
        <label className="form-check-label" htmlFor="cf-pickup">I will pick up from the store (no delivery address needed)</label>
      </div>
      {!form.pickup && (
        <div className="mb-3">
          <label className="form-label" htmlFor="cf-address">Delivery address</label>
          <textarea id="cf-address" rows="3" className={`form-control ${errors.address ? 'is-invalid' : ''}`} value={form.address} onChange={set('address')} autoComplete="street-address" />
          <div className="invalid-feedback">{errors.address}</div>
        </div>
      )}
      {error && <div className="alert alert-danger py-2">{error}</div>}
      <button type="submit" className="btn btn-whatsapp w-100" disabled={busy}>
        <i className="bi bi-whatsapp me-2" />
        {busy ? 'Please wait...' : submitLabel}
      </button>
      <p className="small text-muted mt-2 mb-0">
        WhatsApp will open with your order ready to send. We will confirm availability and payment details on chat.
      </p>
    </form>
  );
}
