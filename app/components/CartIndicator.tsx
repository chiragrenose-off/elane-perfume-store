
"use client";

import Link from "next/link";
import { useCart } from "../../lib/cart-context";

export default function CartIndicator() {
  const { itemCount, isLoaded } = useCart();

  return (
    <Link
      href="/cart"
      aria-label={`Shopping bag with ${itemCount} items`}
      className="border border-[#302c25] px-3 py-2 text-[9px] tracking-widest transition hover:bg-[#292720] hover:text-white sm:px-5 sm:py-3"
    >
      MY BAG
      {isLoaded && (
        <span className="ml-2 inline-flex min-w-5 items-center justify-center rounded-full bg-[#b39158] px-1.5 py-1 text-[9px] text-white">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
