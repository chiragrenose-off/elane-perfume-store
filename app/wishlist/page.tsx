
"use client";

import Link from "next/link";
import { useWishlist } from "../../lib/wishlist-context";
import { useCart } from "../../lib/cart-context";

function formatPrice(price: number) {
  return `₹${price.toLocaleString("en-IN")}`;
}

export default function WishlistPage() {
  const {
    items,
    isLoaded,
    removeFromWishlist,
    clearWishlist,
  } = useWishlist();

  const { addToCart } = useCart();

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-[#faf8f4] px-4 py-16 text-center text-[#25231f] sm:px-5 sm:py-20">
        <p className="text-sm text-[#827b70]">
          Loading your wishlist...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-clip bg-[#faf8f4] text-[#25231f]">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
        {/* Wishlist heading */}
        <div className="border-b border-[#e3dbcf] pb-6 sm:pb-8">
          <p className="text-[9px] tracking-[0.2em] text-[#a18454] sm:text-[10px] sm:tracking-[0.28em]">
            YOUR PERSONAL COLLECTION
          </p>

          <div className="mt-3 flex flex-wrap items-end justify-between gap-4 sm:mt-4">
            <div className="min-w-0">
              <h1 className="font-serif text-3xl sm:text-5xl">
                My Wishlist <span className="text-[#b39158]">♡</span>
              </h1>

              <p className="mt-2 text-xs text-[#777168] sm:mt-3 sm:text-sm">
                {items.length === 1
                  ? "1 fragrance saved for later."
                  : `${items.length} fragrances saved for later.`}
              </p>
            </div>

            {items.length > 0 && (
              <button
                type="button"
                onClick={clearWishlist}
                className="min-h-10 border-b border-[#b39158] pb-1 text-[10px] tracking-wider transition hover:text-[#a18454] sm:text-xs"
              >
                CLEAR WISHLIST
              </button>
            )}
          </div>
        </div>

        {/* Empty wishlist */}
        {items.length === 0 ? (
          <div className="px-2 py-16 text-center sm:py-20">
            <span className="text-5xl text-[#b39158]">♡</span>

            <h2 className="mt-5 font-serif text-2xl sm:mt-6">
              Your wishlist is waiting
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#777168]">
              Save the fragrances you love and keep your favourites together
              in one place.
            </p>

            <Link
              href="/shop"
              className="mt-7 inline-flex min-h-12 items-center justify-center bg-[#292720] px-6 py-3 text-center text-[10px] tracking-[0.15em] text-white transition hover:bg-[#a18454] sm:mt-8 sm:px-8 sm:text-xs"
            >
              EXPLORE PERFUMES
            </Link>
          </div>
        ) : (
          /* Saved perfume cards */
          <div className="grid grid-cols-1 gap-x-5 gap-y-8 py-7 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-10 sm:py-9 lg:grid-cols-3 lg:gap-x-6">
            {items.map((perfume) => (
              <article key={perfume.id} className="group min-w-0">
                {/* Image with breathing room */}
                <div className="relative overflow-hidden bg-[#eee8df]">
                  <Link
                    href={`/product/${perfume.slug}`}
                    aria-label={`View ${perfume.name}`}
                    className="block"
                  >
                    <div className="flex aspect-[5/4] items-center justify-center p-5 sm:aspect-[4/3] sm:p-5 lg:p-6">
                      <img
                        src={perfume.image}
                        alt={`${perfume.name} perfume bottle`}
                        loading="lazy"
                        className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
                  </Link>

                  <button
                    type="button"
                    onClick={() => removeFromWishlist(perfume.id)}
                    aria-label={`Remove ${perfume.name} from wishlist`}
                    title="Remove from wishlist"
                    className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#faf8f4] text-xl text-red-600 shadow-sm transition hover:scale-110 sm:right-3 sm:top-3 sm:h-10 sm:w-10"
                  >
                    ♥
                  </button>

                  {perfume.stock <= 0 && (
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 text-[10px] tracking-widest text-white sm:text-xs">
                      SOLD OUT
                    </span>
                  )}
                </div>

                {/* Product details */}
                <div className="flex items-start justify-between gap-3 pt-4">
                  <div className="min-w-0">
                    <Link
                      href={`/product/${perfume.slug}`}
                      className="break-words font-serif text-lg hover:text-[#a18454] sm:text-xl"
                    >
                      {perfume.name}
                    </Link>

                    <p className="mt-1 text-xs text-[#827b70]">
                      {perfume.fragranceFamily} · {perfume.gender}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="text-sm">
                        {formatPrice(perfume.price)}
                      </span>

                      {perfume.originalPrice !== null &&
                        perfume.originalPrice > perfume.price && (
                          <span className="text-xs text-[#827b70] line-through">
                            {formatPrice(perfume.originalPrice)}
                          </span>
                        )}
                    </div>
                  </div>

                  <span className="shrink-0 pt-1 text-[9px] text-[#a18454] sm:text-[10px]">
                    {perfume.sizeMl} ML
                  </span>
                </div>

                {/* Add to cart */}
                <button
                  type="button"
                  disabled={perfume.stock <= 0}
                  onClick={() => addToCart(perfume, 1)}
                  className="mt-4 flex min-h-11 w-full items-center justify-center bg-[#292720] px-3 py-3 text-center text-[9px] tracking-[0.12em] text-white transition hover:bg-[#a18454] disabled:cursor-not-allowed disabled:bg-gray-400 sm:text-[10px] sm:tracking-widest"
                >
                  {perfume.stock > 0 ? "ADD TO BAG" : "SOLD OUT"}
                </button>

                <Link
                  href={`/product/${perfume.slug}`}
                  className="mt-2 flex min-h-11 w-full items-center justify-center border border-[#d8d0c4] px-3 py-3 text-center text-[9px] tracking-[0.12em] transition hover:bg-[#eee8df] sm:text-[10px] sm:tracking-widest"
                >
                  VIEW FRAGRANCE
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}