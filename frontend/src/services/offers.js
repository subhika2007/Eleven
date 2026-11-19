// Offers copied from the shop flyer. Each offer disappears from the site automatically after "endsOn".
// To extend an offer, change its date. (The flyer does not print a year; 2026 is assumed - please confirm.)
export const OFFERS = [
  {
    id: 'festival-10',
    badge: '10% OFF',
    title: 'Festival Special - 10% off on all items',
    text: 'Applicable on all products. Not applicable on combo offers.',
    startsOn: '2026-10-16',
    endsOn: '2026-11-08',
  },
  {
    id: 'combo',
    badge: '20-25% OFF',
    title: 'Combo Offers',
    text: 'Valuable combo offers with roughly 20% to 25% savings. Ask us on WhatsApp for the current combos.',
    startsOn: '2026-10-16',
    endsOn: '2026-11-08',
  },
  {
    id: 'coupon-20',
    badge: '20% COUPON',
    title: 'Season Special - 20% Purchase Coupon',
    text: 'Get a 20% coupon with your purchase from 11 November to 13 December. Ask on WhatsApp for how to redeem it.',
    startsOn: '2026-11-11',
    endsOn: '2026-12-13',
  },
];

export const activeOffers = (now = new Date()) =>
  OFFERS.filter((o) => {
    const start = new Date(`${o.startsOn}T00:00:00`);
    const end = new Date(`${o.endsOn}T23:59:59`);
    return now >= start && now <= end;
  });
