import { createContext, useContext, useState, useCallback, useEffect } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [theme, setThemeState] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "red" || saved === "dark" || saved === "light" ? saved : "light";
  });

  // Apply theme attribute to html element and toggle menu-open / loaded helper classes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!loading) {
      document.documentElement.classList.add("loaded");
    }
  }, [loading]);

  useEffect(() => {
    if (menuOpen) {
      document.documentElement.classList.add("has-menu-open");
    } else {
      document.documentElement.classList.remove("has-menu-open");
    }
  }, [menuOpen]);

  const setTheme = useCallback((newTheme) => {
    const validTheme = newTheme === "red" || newTheme === "dark" || newTheme === "light" ? newTheme : "light";
    setThemeState(validTheme);
    localStorage.setItem("theme", validTheme);
  }, []);

  const addToCart = useCallback((product, size) => {
    setItems((prev) => {
      const key = `${product.id}-${size}`;
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...product, size, qty: 1, key }];
    });
    setBagOpen(true);
  }, []);

  const removeFromCart = useCallback((key) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const updateQty = useCallback((key, delta) => {
    setItems((prev) =>
      prev
        .map((i) => (i.key === key ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const [view, setView] = useState("shop");
  const [customProducts, setCustomProducts] = useState(() => {
    try {
      const saved = localStorage.getItem("custom_products");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const addCustomProduct = useCallback((newProduct) => {
    setCustomProducts((prev) => {
      const updated = [...prev, newProduct];
      localStorage.setItem("custom_products", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const deleteCustomProduct = useCallback((id) => {
    setCustomProducts((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      localStorage.setItem("custom_products", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        total,
        count,
        bagOpen,
        setBagOpen,
        menuOpen,
        setMenuOpen,
        loading,
        setLoading,
        theme,
        setTheme,
        view,
        setView,
        customProducts,
        addCustomProduct,
        deleteCustomProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
