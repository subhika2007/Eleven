import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import { SHOP } from '../services/config';

export default function AboutPage() {
  return (
    <div className="container py-5" style={{ maxWidth: 900 }}>
      <SectionTitle eyebrow="Our story" title="About Elegant Silks & Sarees" />
      <div className="text-center mb-4"><img src="/logo/logo-burgundy.png" alt="Elegant Silks & Sarees logo" style={{ height: 150 }} /></div>
      <p className="lead-sm">
        {SHOP.name} is a family clothing store in {SHOP.town}, Tamil Nadu. We bring together festive sarees, ready blouses,
        comfortable everyday wear and big value packs for kids - all at prices that suit every family.
      </p>
      <p className="text-muted">
        Every festival season we run special offers and gift coupons for our customers. You can walk in to the store, or
        simply choose your favourites here and send us your order on WhatsApp - we will confirm availability, sizes and
        payment with you personally.
      </p>
      <div className="row g-3 my-3">
        {[['bi-heart', 'Made for families', 'Sarees, blouses, tops, bottom wear and kids wear under one roof.'],
          ['bi-tag', 'Honest pack prices', 'Clear prices on every pack, with seasonal offers and coupons.'],
          ['bi-whatsapp', 'Order on WhatsApp', 'No complicated checkout - just send your order and we take care of the rest.']].map(([i, t, d]) => (
          <div className="col-md-4" key={t}><div className="about-card"><i className={`bi ${i}`} /><h5>{t}</h5><p className="mb-0 text-muted small">{d}</p></div></div>
        ))}
      </div>
      <div className="text-center"><Link to="/products" className="btn btn-brand btn-lg">Shop now</Link></div>
    </div>
  );
}
