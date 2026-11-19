import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import { SHOP } from '../services/config';
import { generalChatUrl } from '../services/whatsapp';

export default function Footer() {
  const { categories } = useProducts();
  return (
    <footer className="site-footer">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="d-flex align-items-center gap-3 mb-3">
              <img src="/logo/logo-white.png" alt="Elegant Silks & Sarees logo" className="footer-logo" />
              <div>
                <div className="brand-name text-white">{SHOP.name}</div>
                <div className="small footer-gold">{SHOP.tagline}</div>
              </div>
            </div>
            <p className="footer-text">
              A friendly family clothing store in {SHOP.town} for sarees, blouses, everyday wear and kids wear at
              honest prices. Order from home - just send us your choice on WhatsApp.
            </p>
          </div>

          <div className="col-6 col-lg-2">
            <h6 className="footer-title">Shop</h6>
            <ul className="footer-links">
              <li><Link to="/products">All Products</Link></li>
              {categories.map((c) => (
                <li key={c.slug}><Link to={`/category/${c.slug}`}>{c.name}</Link></li>
              ))}
            </ul>
          </div>

          <div className="col-6 col-lg-2">
            <h6 className="footer-title">Help</h6>
            <ul className="footer-links">
              <li><Link to="/cart">Shopping Bag</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="col-lg-4">
            <h6 className="footer-title">Visit &amp; Contact</h6>
            <ul className="footer-contact">
              <li>
                <i className="bi bi-geo-alt" />
                <span>
                  {SHOP.addressLines.join(' ')}
                  <br />
                  <span className="small opacity-75">{SHOP.addressTamil}</span>
                  <br />
                  <a href={SHOP.mapUrl} target="_blank" rel="noreferrer">View on Google Maps</a>
                </span>
              </li>
              <li><i className="bi bi-telephone" /><a href={`tel:${SHOP.phoneTel}`}>{SHOP.phoneDisplay}</a></li>
              <li>
                <i className="bi bi-whatsapp" />
                <a href={generalChatUrl()} target="_blank" rel="noreferrer">Chat on WhatsApp</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container d-flex flex-column flex-md-row justify-content-between gap-1">
          <span>&copy; {new Date().getFullYear()} {SHOP.name}. All rights reserved.</span>
          <span>{SHOP.town}, Tamil Nadu</span>
        </div>
      </div>
    </footer>
  );
}
