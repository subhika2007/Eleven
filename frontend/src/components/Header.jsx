import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductsContext';
import { SHOP } from '../services/config';
import AnnouncementBar from './AnnouncementBar';
import SearchBox from './SearchBox';

export default function Header() {
  const { count } = useCart();
  const { categories, offline } = useProducts();
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const close = () => {
    setMenuOpen(false);
    setMegaOpen(false);
  };

  return (
    <header className="site-header">
      <AnnouncementBar />
      {offline && (
        <div className="offline-note">
          Showing saved catalogue - the shop server is not reachable right now. Ordering on WhatsApp still works.
        </div>
      )}
      <div className="header-main">
        <div className="container d-flex align-items-center gap-3">
          <button className="btn nav-toggle d-lg-none" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu" aria-expanded={menuOpen}>
            <i className={`bi ${menuOpen ? 'bi-x-lg' : 'bi-list'}`} />
          </button>

          <Link to="/" className="brand" onClick={close} aria-label={`${SHOP.name} home`}>
            <img src="/logo/logo-burgundy.png" alt="Elegant Silks & Sarees logo" className="brand-logo" />
            <span className="brand-text">
              <span className="brand-name">Elegant Silks</span>
              <span className="brand-sub">&amp; Sarees</span>
            </span>
          </Link>

          <div className="search-desktop d-none d-lg-block flex-grow-1">
            <SearchBox onDone={close} />
          </div>

          <div className="header-actions ms-auto">
            <a className="icon-link d-none d-md-flex" href={`tel:${SHOP.phoneTel}`} aria-label="Call the shop">
              <i className="bi bi-telephone" />
            </a>
            <Link className="icon-link" to="/contact" aria-label="Account and contact" title="Contact us" onClick={close}>
              <i className="bi bi-person" />
            </Link>
            <Link className="icon-link position-relative" to="/cart" aria-label={`Shopping bag, ${count} items`} onClick={close}>
              <i className="bi bi-bag" />
              <span className="cart-badge" data-testid="cart-count">{count}</span>
            </Link>
          </div>
        </div>

        <div className="container d-lg-none pb-2">
          <SearchBox onDone={close} />
        </div>
      </div>

      <nav className={`main-nav ${menuOpen ? 'open' : ''}`} aria-label="Main">
        <div className="container">
          <ul className="nav-list">
            <li><NavLink to="/" end onClick={close}>Home</NavLink></li>
            <li><NavLink to="/collections/women" onClick={close}>Women</NavLink></li>
            <li><NavLink to="/collections/men" onClick={close}>Men</NavLink></li>
            <li><NavLink to="/collections/kids" onClick={close}>Kids</NavLink></li>
            <li><NavLink to="/category/sarees" onClick={close}>Sarees</NavLink></li>
            <li><NavLink to="/category/blouses" onClick={close}>Blouses</NavLink></li>
            <li><NavLink to="/category/dresses" onClick={close}>Dresses</NavLink></li>
            <li><NavLink to="/category/tops" onClick={close}>Tops</NavLink></li>
            <li><NavLink to="/category/bottom-wear" onClick={close}>Bottom Wear</NavLink></li>
            <li
              className={`has-mega ${megaOpen ? 'open' : ''}`}
              onMouseEnter={() => window.innerWidth >= 992 && setMegaOpen(true)}
              onMouseLeave={() => window.innerWidth >= 992 && setMegaOpen(false)}
            >
              <button type="button" className="mega-trigger" onClick={() => setMegaOpen((v) => !v)} aria-expanded={megaOpen}>
                Shop All <i className="bi bi-chevron-down" />
              </button>
              <div className="mega-panel">
                <div className="row g-4">
                  <div className="col-lg-3">
                    <h6>Shop For</h6>
                    <Link to="/collections/women" onClick={close}>Women</Link>
                    <Link to="/collections/men" onClick={close}>Men</Link>
                    <Link to="/collections/kids" onClick={close}>Kids</Link>
                  </div>
                  <div className="col-lg-5">
                    <h6>Categories</h6>
                    <div className="mega-cols">
                      {categories.map((c) => (
                        <Link key={c.slug} to={`/category/${c.slug}`} onClick={close}>{c.name}</Link>
                      ))}
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <h6>Offers</h6>
                    <Link to="/products?availability=in" onClick={close}>All products in stock</Link>
                    <Link to="/products?sort=price-asc" onClick={close}>Budget picks - low to high</Link>
                    <Link to="/products" onClick={close}>View all products</Link>
                  </div>
                </div>
              </div>
            </li>
            <li><NavLink to="/about" onClick={close}>About</NavLink></li>
            <li><NavLink to="/contact" onClick={close}>Contact</NavLink></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
