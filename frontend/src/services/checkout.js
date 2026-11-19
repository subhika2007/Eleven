import { createOrder } from './api';
import { buildOrderMessage, whatsappUrl } from './whatsapp';

export const cleanPhone = (raw) => raw.replace(/[^\d+]/g, '').replace(/^\+?91(?=\d{10}$)/, '');
export const isValidPhone = (raw) => /^[6-9]\d{9}$/.test(cleanPhone(raw));

/**
 * Saves the order in the database (when the server is reachable) and prepares the product-specific WhatsApp link.
 * lines: [{ id, code, name, price, quantity, size, colours, imagePath }]
 */
export async function placeOrder(lines, customer) {
  const phone = cleanPhone(customer.phone);
  const payload = {
    customerName: customer.name.trim(),
    customerPhone: phone,
    deliveryAddress: customer.pickup ? 'Store pickup' : customer.address.trim(),
    items: lines.map((l) => ({
      productId: l.id,
      quantity: l.quantity,
      size: l.size ? l.size.trim() || null : null,
      colour: l.colours && l.colours.length ? l.colours.join(', ') : null,
    })),
  };
  const order = await createOrder(payload); // null when the API is down; WhatsApp ordering still proceeds
  const cust = { ...customer, name: payload.customerName, phone };
  const message = buildOrderMessage(lines, cust, order?.id);
  return { order, url: whatsappUrl(message), lines, customer: cust };
}

export function openWhatsApp(url) {
  // Note: do not pass 'noopener' here - it makes window.open return null even on success.
  const w = window.open(url, '_blank');
  if (w) {
    w.opener = null;
  } else {
    window.location.assign(url); // popup really blocked (some mobile browsers)
  }
}
