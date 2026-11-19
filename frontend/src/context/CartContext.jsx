import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

const CartContext = createContext(null);
const KEY = 'es_cart_v1';
const MAX_QTY = 50;

const keyOf = (i) => `${i.id}|${i.size || ''}`;

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const item = action.item;
      const exists = state.find((i) => keyOf(i) === keyOf(item));
      if (exists) {
        return state.map((i) =>
          keyOf(i) === keyOf(item) ? { ...i, quantity: Math.min(MAX_QTY, i.quantity + item.quantity) } : i
        );
      }
      return [...state, item];
    }
    case 'SET_QTY':
      return state.map((i) =>
        keyOf(i) === action.key ? { ...i, quantity: Math.max(1, Math.min(MAX_QTY, action.quantity)) } : i
      );
    case 'REMOVE':
      return state.filter((i) => keyOf(i) !== action.key);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

const load = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
};

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, [], load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable - cart still works for this visit */
    }
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      count: items.reduce((s, i) => s + i.quantity, 0),
      subtotal: items.reduce((s, i) => s + i.price * i.quantity, 0),
      keyOf,
      add: (product, quantity = 1, size = '') =>
        dispatch({
          type: 'ADD',
          item: {
            id: product.id,
            code: product.code,
            name: product.name,
            price: Number(product.price),
            imagePath: product.imagePath,
            packInfo: product.packInfo,
            colours: product.colours || [],
            size: size.trim(),
            quantity,
          },
        }),
      setQuantity: (key, quantity) => dispatch({ type: 'SET_QTY', key, quantity }),
      remove: (key) => dispatch({ type: 'REMOVE', key }),
      clear: () => dispatch({ type: 'CLEAR' }),
    }),
    [items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
