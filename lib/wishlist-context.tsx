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

type WishlistContextType = {
  items: Perfume[];
  itemCount: number;
  isLoaded: boolean;
  isWishlisted: (id: number) => boolean;
  toggleWishlist: (perfume: Perfume) => void;
  removeFromWishlist: (id: number) => void;
  clearWishlist: () => void;
};

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

const STORAGE_KEY = "elane-wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Perfume[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved wishlist items when the app starts.
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem(STORAGE_KEY);

      if (savedWishlist) {
        const parsed: unknown = JSON.parse(savedWishlist);

        if (Array.isArray(parsed)) {
          setItems(parsed as Perfume[]);
        }
      }
    } catch (error) {
      console.error("Could not load the wishlist:", error);

      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (storageError) {
        console.error("Could not clear invalid wishlist data:", storageError);
      }
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save wishlist changes to browser storage.
  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Could not save the wishlist:", error);
    }
  }, [items, isLoaded]);

  // Check whether a perfume is already wishlisted.
  const isWishlisted = useCallback(
    (id: number) => items.some((perfume) => perfume.id === id),
    [items]
  );

  // Add a perfume, or remove it if it is already saved.
  const toggleWishlist = useCallback((perfume: Perfume) => {
    setItems((currentItems) => {
      const alreadySaved = currentItems.some(
        (item) => item.id === perfume.id
      );

      if (alreadySaved) {
        return currentItems.filter((item) => item.id !== perfume.id);
      }

      return [...currentItems, perfume];
    });
  }, []);

  // Remove a specific perfume.
  const removeFromWishlist = useCallback((id: number) => {
    setItems((currentItems) =>
      currentItems.filter((perfume) => perfume.id !== id)
    );
  }, []);

  // Clear the entire wishlist.
  const clearWishlist = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    } catch (error) {
      console.error("Could not clear the wishlist:", error);
    }

    setItems([]);
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        items,
        itemCount: items.length,
        isLoaded,
        isWishlisted,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used inside a WishlistProvider");
  }

  return context;
}