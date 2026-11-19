import { Link } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import ProductImage from '../components/ProductImage';
import SectionTitle from '../components/SectionTitle';
import { useProducts } from '../context/ProductsContext';
import { SHOP } from '../services/config';
import { activeOffers } from '../services/offers';
import { generalChatUrl } from '../services/whatsapp';

export default function HomePage() {
  const { products, categories, loading } = useProducts();
  const offers = activeOffers();
  const byId = (id) => products.find((p) => p.id === id);
  const featured = products.filter((p) => p.featured).slice(0, 8);
  const arrivals = [...products].filter((p) => p.newArrival).sort((a, b) => b.id - a.id).slice(0, 8);
  const cheapBlouse = products.filter((p) => p.category.slug === 'blouses').sort((a, b) => a.price - b.price)[0];
  const heroPics = [byId(1), byId(3), byId(15)].filter(Boolean);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-6 hero-copy">
              <img src="/logo/logo-gold.png" alt="" className="hero-logo" aria-hidden="true" />
              <div className="eyebrow light">Ilampillai's family fashion store</div>
              <h1>Silks, sarees &amp; everyday style for the whole family</h1>
              <p className="lead">
                Festive sarees, ready blouses, comfy tops and bottom wear, plus value packs for kids - ordered in
                minutes on WhatsApp.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <Link to="/products" className="btn btn-gold btn-lg">Shop the collection</Link>
                <a className="btn btn-outline-light btn-lg" href={generalChatUrl()} target="_blank" rel="noreferrer">
                  <i className="bi bi-whatsapp me-2" />Chat with us
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-collage">
                {heroPics.map((p, i) => (
                  <Link key={p.id} to={`/product/${p.id}`} className={`collage-card c${i}`}>
                    <ProductImage src={p.imagePath} alt={p.name} />
                    <span>{p.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="trust-strip">
        <div className="container">
          <div className="row g-3 text-center">
            <div className="col-6 col-md-3"><i className="bi bi-whatsapp" /><strong>Order on WhatsApp</strong><span>Quick &amp; personal</span></div>
            <div className="col-6 col-md-3"><i className="bi bi-box2-heart" /><strong>Value packs</strong><span>2, 3, 4, 5 &amp; 10 pc sets</span></div>
            <div className="col-6 col-md-3"><i className="bi bi-shop" /><strong>Visit our store</strong><span>{SHOP.town}</span></div>
            <div className="col-6 col-md-3"><i className="bi bi-telephone" /><strong>Call us</strong><span>{SHOP.phoneDisplay}</span></div>
          </div>
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Browse" title="Shop by Category">Find exactly what you are looking for.</SectionTitle>
          <div className="row g-3 row-cols-2 row-cols-md-4 row-cols-lg-7 justify-content-center">
            {categories.map((c) => {
              const rep = products.find((p) => p.category.slug === c.slug);
              return (
                <div className="col" key={c.slug}>
                  <Link to={`/category/${c.slug}`} className="category-tile">
                    {rep && <ProductImage src={rep.imagePath} alt={c.name} />}
                    <span>{c.name}</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="section section-cream">
        <div className="container">
          <SectionTitle eyebrow="Handpicked" title="Featured Products" />
          {loading ? <div className="text-center py-5"><div className="spinner-border text-danger" /></div> : <ProductGrid products={featured} />}
          <div className="text-center mt-4"><Link to="/products" className="btn btn-outline-brand px-4">View all products</Link></div>
        </div>
      </section>

      {/* PROMO BANNERS */}
      <section className="section pb-0">
        <div className="container">
          <div className="row g-3">
            <div className="col-md-6">
              <Link to="/category/blouses" className="promo-banner promo-a">
                <span className="eyebrow light">Blouses</span>
                <h3>Ready blouses from {cheapBlouse ? `₹${cheapBlouse.price}` : '₹99'}</h3>
                <span className="btn btn-gold btn-sm">Shop blouses</span>
              </Link>
            </div>
            <div className="col-md-6">
              <Link to="/collections/kids" className="promo-banner promo-b">
                <span className="eyebrow light">Kids Wear</span>
                <h3>Big value packs for kids</h3>
                <span className="btn btn-gold btn-sm">Shop kids</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Just in" title="New Arrivals" />
          {!loading && <ProductGrid products={arrivals} />}
        </div>
      </section>

      {/* SPECIAL OFFERS */}
      <section className="section offers-section">
        <div className="container">
          <SectionTitle eyebrow="Limited time" title="Special Offers" />
          <div className="row g-3 justify-content-center">
            {offers.map((o) => (
              <div className="col-md-6 col-lg-4" key={o.id}>
                <div className="offer-card">
                  <div className="offer-badge">{o.badge}</div>
                  <h4>{o.title}</h4>
                  <p>{o.text}</p>
                  <small>Valid {new Date(o.startsOn).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} - {new Date(o.endsOn).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</small>
                </div>
              </div>
            ))}
            {offers.length === 0 && <p className="text-center text-muted">New offers coming soon - chat with us to know more.</p>}
          </div>
        </div>
      </section>

      {/* WHATSAPP ASSIST */}
      <section className="section">
        <div className="container">
          <div className="wa-assist">
            <div>
              <h2>Need help choosing?</h2>
              <p className="mb-0">Send us a message on WhatsApp - we will help with sizes, colours and offers, and confirm your order personally.</p>
            </div>
            <a className="btn btn-whatsapp btn-lg" href={generalChatUrl()} target="_blank" rel="noreferrer">
              <i className="bi bi-whatsapp me-2" />Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
