
"use client";

import Link from "next/link";
import { useState } from "react";
import type { Perfume } from "../../lib/products";
import { useCart } from "../../lib/cart-context";
import { useWishlist } from "../../lib/wishlist-context";

function formatPrice(price: number) {
  return `₹${price.toLocaleString("en-IN")}`;
}

export default function HomeProductCard({
  perfume,
}: {
  perfume: Perfume;
}) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist, isLoaded } = useWishlist();
  const [message, setMessage] = useState("");

  const saved = isWishlisted(perfume.id);

  function handleAddToCart() {
    if (perfume.stock <= 0) return;

    addToCart(perfume, 1);
    setMessage(`${perfume.name} added to cart!`);
  }

  function handleToggleWishlist() {
    const wasSaved = isWishlisted(perfume.id);

    toggleWishlist(perfume);

    setMessage(
      wasSaved
        ? `${perfume.name} removed from wishlist.`
        : `${perfume.name} added to wishlist!`
    );
  }

  return (
    <article className="group min-w-0">
      {/* Product image */}
      <div className="relative">
        <Link
          href={`/product/${perfume.slug}`}
          aria-label={`View ${perfume.name}`}
          className="relative block overflow-hidden bg-[#eee8df]"
        >
          <span className="absolute left-2 top-2 z-10 bg-[#faf8f4] px-2 py-2 text-[8px] tracking-wider sm:left-3 sm:top-3 sm:px-3 sm:text-[9px]">
            {perfume.bestseller ? "BESTSELLER" : "SIGNATURE"}
          </span>

          <div className="flex aspect-[5/4] items-center justify-center p-5 sm:aspect-[4/3] sm:p-6 lg:p-8">
            <img
              src={perfume.image}
              alt={`${perfume.name} perfume bottle`}
              loading="lazy"
              className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>

          {perfume.stock === 0 && (
            <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-xs tracking-widest text-white">
              SOLD OUT
            </span>
          )}
        </Link>

        {/* Wishlist button */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          disabled={!isLoaded}
          aria-label={
            saved
              ? `Remove ${perfume.name} from wishlist`
              : `Add ${perfume.name} to wishlist`
          }
          aria-pressed={saved}
          title={saved ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute right-2 top-2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-[#faf8f4] text-xl shadow-sm transition hover:scale-110 disabled:cursor-wait sm:right-3 sm:top-3 sm:h-10 sm:w-10"
        >
          <span className={saved ? "text-red-600" : "text-[#514a40]"}>
            {saved ? "♥" : "♡"}
          </span>
        </button>
      </div>

      {/* Product details */}
      <div className="flex items-start justify-between gap-3 pt-4">
        <div className="min-w-0">
          <h3 className="font-serif text-lg sm:text-xl">
            {perfume.name}
          </h3>

          <p className="mt-1 text-xs text-[#827b70]">
            {perfume.fragranceFamily} · {perfume.gender}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-sm">{formatPrice(perfume.price)}</span>

            {perfume.originalPrice !== null &&
              perfume.originalPrice > perfume.price && (
                <span className="text-xs text-[#827b70] line-through">
                  {formatPrice(perfume.originalPrice)}
                </span>
              )}
          </div>

          <p className="mt-2 text-xs text-[#827b70]">
            <span className="text-[#b39158]">★</span> {perfume.rating} (
            {perfume.reviewCount} reviews)
          </p>
        </div>

        <span className="shrink-0 pt-1 text-[9px] text-[#a18454] sm:text-[10px]">
          {perfume.sizeMl} ML
        </span>
      </div>

      {/* Add to cart */}
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={perfume.stock <= 0}
        className="mt-4 block min-h-11 w-full bg-[#292720] px-3 py-3 text-center text-[9px] tracking-widest text-white transition hover:bg-[#a18454] disabled:cursor-not-allowed disabled:bg-gray-400 sm:text-[10px]"
      >
        {perfume.stock > 0 ? "ADD TO CART" : "SOLD OUT"}
      </button>

      {message && (
        <p role="status" className="mt-2 text-xs text-green-700">
          {message}
        </p>
      )}

      <Link
        href={`/product/${perfume.slug}`}
        className="mt-2 flex min-h-11 items-center justify-center border border-[#d8d0c4] px-3 py-3 text-center text-[9px] tracking-widest transition hover:bg-[#eee8df] sm:text-[10px]"
      >
        DISCOVER FRAGRANCE
      </Link>
    </article>
  );
}