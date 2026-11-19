import { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { SHOP } from '../services/config';
import { whatsappUrl } from '../services/whatsapp';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', message: '' });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;
    window.open(whatsappUrl(`Hello ${SHOP.name}!\n\n${form.message.trim()}\n\n- ${form.name.trim()}`), '_blank', 'noopener');
  };

  return (
    <div className="container py-5">
      <SectionTitle eyebrow="We'd love to hear from you" title="Contact Us" />
      <div className="row g-4">
        <div className="col-lg-5">
          <div className="summary-card h-100">
            <h5>Visit our store</h5>
            <p className="mb-1">{SHOP.addressLines.join(' ')}</p>
            <p className="small text-muted">{SHOP.addressTamil}</p>
            <a className="btn btn-outline-brand btn-sm mb-4" href={SHOP.mapUrl} target="_blank" rel="noreferrer"><i className="bi bi-geo-alt me-1" />Open in Google Maps</a>
            <h5>Call or WhatsApp</h5>
            <p className="mb-2"><i className="bi bi-telephone me-2" /><a href={`tel:${SHOP.phoneTel}`}>{SHOP.phoneDisplay}</a></p>
            <a className="btn btn-whatsapp" href={whatsappUrl(`Hello ${SHOP.name}!`)} target="_blank" rel="noreferrer"><i className="bi bi-whatsapp me-2" />Chat on WhatsApp</a>
          </div>
        </div>
        <div className="col-lg-7">
          <form className="summary-card" onSubmit={submit}>
            <h5>Send us a message</h5>
            <p className="small text-muted">Your message opens in WhatsApp, ready to send to the shop.</p>
            <div className="mb-3"><label className="form-label" htmlFor="ct-name">Your name</label><input id="ct-name" className="form-control" required value={form.name} onChange={set('name')} /></div>
            <div className="mb-3"><label className="form-label" htmlFor="ct-msg">Message</label><textarea id="ct-msg" rows="4" className="form-control" required value={form.message} onChange={set('message')} /></div>
            <button className="btn btn-brand" type="submit"><i className="bi bi-send me-2" />Send via WhatsApp</button>
          </form>
        </div>
      </div>
    </div>
  );
}
