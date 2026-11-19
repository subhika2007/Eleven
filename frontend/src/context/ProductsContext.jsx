import { createContext, useContext, useEffect, useState } from 'react';
import { apiStatus, fetchProducts } from '../services/api';

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    let alive = true;
    fetchProducts()
      .then((list) => {
        if (!alive) return;
        setProducts(list);
        setOffline(apiStatus.offline);
      })
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  const categories = [...new Map(products.map((p) => [p.category.slug, p.category])).values()];

  return (
    <ProductsContext.Provider value={{ products, categories, loading, offline }}>{children}</ProductsContext.Provider>
  );
}

export const useProducts = () => useContext(ProductsContext);
