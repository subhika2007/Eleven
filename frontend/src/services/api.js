import axios from 'axios';
import fallbackProducts from '../data/products';

const http = axios.create({ baseURL: import.meta.env.VITE_API_URL || '/api', timeout: 8000 });

// Set to true when the Spring Boot API could not be reached and the bundled copy is being used.
export const apiStatus = { offline: false };

const isNetworkFailure = (err) => !err.response; // no HTTP response at all = server unreachable

async function withFallback(call, fallback) {
  try {
    const data = await call();
    apiStatus.offline = false;
    return data;
  } catch (err) {
    if (isNetworkFailure(err) || err.response?.status >= 500) {
      apiStatus.offline = true;
      return fallback();
    }
    throw err;
  }
}

const localSearch = (keyword) => {
  const k = keyword.trim().toLowerCase();
  if (!k) return fallbackProducts;
  return fallbackProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(k) ||
      p.category.name.toLowerCase().includes(k) ||
      p.shortDescription.toLowerCase().includes(k)
  );
};

export const fetchProducts = () =>
  withFallback(() => http.get('/products').then((r) => r.data), () => fallbackProducts);

export const fetchProduct = (id) =>
  withFallback(
    () => http.get(`/products/${id}`).then((r) => r.data),
    () => fallbackProducts.find((p) => String(p.id) === String(id)) || null
  ).catch((err) => {
    if (err.response?.status === 404) return null;
    throw err;
  });

export const searchProducts = (keyword) =>
  withFallback(
    () => http.get('/products/search', { params: { keyword } }).then((r) => r.data),
    () => localSearch(keyword)
  );

export const fetchByCategory = (slug) =>
  withFallback(
    () => http.get(`/products/category/${encodeURIComponent(slug)}`).then((r) => r.data),
    () => fallbackProducts.filter((p) => p.category.slug === slug)
  );

/** Saves the order in MySQL. Returns null when the server is unreachable so WhatsApp ordering still works. */
export async function createOrder(payload) {
  try {
    const { data } = await http.post('/orders', payload);
    return data;
  } catch (err) {
    if (err.response && err.response.status < 500) {
      throw err; // validation problem - tell the customer
    }
    return null;
  }
}

export const fetchOrder = (id) => http.get(`/orders/${id}`).then((r) => r.data);
