// Single place for shop details. Edit here to update the whole site.
export const SHOP = {
  name: 'Elegant Silks & Sarees',
  tamilName: 'எலகண்ட் சில்க்ஸ் அண்ட் சாரீஸ்',
  whatsappNumber: '919600826926', // country code + number, no "+"
  phoneDisplay: '+91 96008 26926',
  phoneTel: '+919600826926',
  town: 'Ilampillai',
  addressLines: ['70, Chithar Kovil Road,', 'Near Canara Bank,', 'Ilampillai.'],
  addressTamil: '70, சித்தர் கோவில் ரோடு, கனரா வங்கி அருகில், இளம்பிள்ளை.',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=70+Chithar+Kovil+Road+Ilampillai',
  tagline: 'Stylish looks for every you',
};

export const publicSiteUrl = () =>
  (import.meta.env.VITE_PUBLIC_SITE_URL || window.location.origin).replace(/\/$/, '');

export const formatPrice = (n) => `₹${Number(n).toLocaleString('en-IN')}`;
