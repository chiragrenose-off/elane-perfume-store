
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Perfume } from "./products";

export type CartItem = {
  perfume: Perfume;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isLoaded: boolean;
  addToCart: (perfume: Perfume, quantity?: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "elane-shopping-cart";
const DIRECT_CHECKOUT_KEY = "elane-direct-checkout";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load the saved shopping bag when the app starts.
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEY);

      if (savedCart) {
        const parsed: unknown = JSON.parse(savedCart);

        if (Array.isArray(parsed)) {
          setItems(parsed as CartItem[]);
        }
      }
    } catch (error) {
      console.error("Could not load the shopping cart:", error);
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Keep browser storage synchronized with cart state.
  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Could not save the shopping cart:", error);
    }
  }, [items, isLoaded]);

  const addToCart = useCallback(
    (perfume: Perfume, quantity = 1) => {
      if (perfume.stock <= 0 || quantity <= 0) return;

      setItems((currentItems) => {
        const existing = currentItems.find(
          (item) => item.perfume.id === perfume.id
        );

        if (existing) {
          return currentItems.map((item) =>
            item.perfume.id === perfume.id
              ? {
                  ...item,
                  quantity: Math.min(
                    item.quantity + quantity,
                    perfume.stock
                  ),
                }
              : item
          );
        }

        return [
          ...currentItems,
          {
            perfume,
            quantity: Math.min(quantity, perfume.stock),
          },
        ];
      });
    },
    []
  );

  const updateQuantity = useCallback((id: number, quantity: number) => {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.perfume.id === id
            ? {
                ...item,
                quantity: Math.min(
                  Math.max(1, quantity),
                  item.perfume.stock
                ),
              }
            : item
        )
        .filter((item) => item.perfume.stock > 0)
    );
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.perfume.id !== id)
    );
  }, []);

  // Empty the shopping bag.
  const clearCart = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    } catch (error) {
      console.error("Could not clear saved cart:", error);
    }

    setItems([]);
  }, []);

  const itemCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = items.reduce(
    (total, item) => total + item.perfume.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        isLoaded,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside a CartProvider");
  }

  return context;
}
