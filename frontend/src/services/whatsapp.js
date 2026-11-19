import { SHOP, publicSiteUrl } from './config';

/**
 * lines: [{ id, code, name, price, quantity, size, colours: [], imagePath }]
 * customer: { name, phone, address, pickup }
 * One line produces exactly the message format requested by the shop.
 */
const absoluteImage = (path) => (/^https?:\/\//i.test(path) ? path : `${publicSiteUrl()}${path}`);

export function buildOrderMessage(lines, customer, orderId) {
  const site = publicSiteUrl();
  const productBlock = (l, n) =>
    [
      lines.length > 1 ? `*Item ${n}*` : null,
      `Product Name: ${l.name}`,
      `Product ID: ${l.code || l.id}`,
      `Price: ₹${l.price}`,
      `Quantity: ${l.quantity}`,
      `Size: ${l.size && l.size.trim() ? l.size.trim() : 'To be confirmed on chat'}`,
      `Colour: ${l.colours && l.colours.length ? `As shown in pack (${l.colours.join(', ')})` : 'As shown'}`,
      `Product Link: ${site}/product/${l.id}`,
      `Product Image: ${absoluteImage(l.imagePath)}`,
    ]
      .filter(Boolean)
      .join('\n');

  const total = lines.reduce((s, l) => s + l.price * l.quantity, 0);
  const parts = [
    `Hello ${SHOP.name}!`,
    '',
    lines.length > 1 ? 'I would like to purchase the following products.' : 'I would like to purchase the following product.',
    '',
    lines.map((l, i) => productBlock(l, i + 1)).join('\n\n'),
    '',
  ];
  if (lines.length > 1) parts.push(`Order Total: ₹${total}`, '');
  parts.push(
    `Customer Name: ${customer.name}`,
    `Customer Phone: ${customer.phone}`,
    `Delivery Address: ${customer.pickup ? 'Store pickup (no delivery needed)' : customer.address}`
  );
  if (orderId) parts.push(`Order Reference: #${orderId}`);
  parts.push('', 'Please confirm product availability and payment details.', '', 'Thank you!');
  return parts.join('\n');
}

export const whatsappUrl = (message) =>
  `https://wa.me/${SHOP.whatsappNumber}?text=${encodeURIComponent(message)}`;

/** General enquiry link for a product (no customer details). */
export const enquiryUrl = (product) =>
  whatsappUrl(
    `Hello ${SHOP.name}!\n\nI would like to enquire about this product:\n` +
      `Product Name: ${product.name}\nProduct ID: ${product.code || product.id}\nPrice: ₹${product.price}\n` +
      `Product Link: ${publicSiteUrl()}/product/${product.id}\nProduct Image: ${absoluteImage(product.imagePath)}\n\nPlease share availability and sizes.`
  );

export const generalChatUrl = (text = `Hello ${SHOP.name}! I need help with shopping.`) => whatsappUrl(text);
