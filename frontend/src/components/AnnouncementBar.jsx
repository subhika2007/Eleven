import { useEffect, useState } from 'react';
import { activeOffers } from '../services/offers';
import { SHOP } from '../services/config';

export default function AnnouncementBar() {
  const messages = [
    ...activeOffers().map((o) => o.title),
    `Order directly on WhatsApp: ${SHOP.phoneDisplay}`,
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % messages.length), 4000);
    return () => clearInterval(t);
  }, [messages.length]);

  return (
    <div className="announcement-bar">
      <div className="container d-flex justify-content-center align-items-center gap-2">
        <i className="bi bi-stars" />
        <span key={i} className="announce-text">{messages[i]}</span>
        <i className="bi bi-stars" />
      </div>
    </div>
  );
}
