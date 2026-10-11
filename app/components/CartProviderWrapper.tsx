"use client";

import type { ReactNode } from "react";
import { CartProvider } from "../../lib/cart-context";
import { WishlistProvider } from "../../lib/wishlist-context";

export default function CartProviderWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <CartProvider>
      <WishlistProvider>{children}</WishlistProvider>
    </CartProvider>
  );
}