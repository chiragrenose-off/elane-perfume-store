
"use client";

import Link from "next/link";
import { useCart } from "../../lib/cart-context";

export default function CartPage() {
  const {
    items,
    itemCount,
    subtotal,
    isLoaded,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  if (!isLoaded) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#faf8f5] px-4">
        <p className="text-sm text-[#74685c]">
          Loading your shopping bag...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-clip bg-[#faf8f5] text-[#211c18]">
      {/* Page heading */}
      <section className="bg-[#211c18] px-4 py-9 text-center text-white sm:px-5 sm:py-12 lg:py-16">
        <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-[#d6b889] sm:mb-3 sm:text-xs sm:tracking-[0.4em]">
          ÉLANÉ
        </p>

        <h1 className="font-serif text-3xl font-light sm:text-5xl">
          Your Shopping Bag
        </h1>

        <p className="mt-3 text-xs text-white/70 sm:mt-4 sm:text-sm">
          {itemCount} {itemCount === 1 ? "item" : "items"} in your bag
        </p>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-8 sm:py-10 lg:px-12">
        {items.length === 0 ? (
          /* Empty cart */
          <div className="px-2 py-12 text-center sm:py-16">
            <div className="mb-5 flex justify-center sm:mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#eee8df] sm:h-20 sm:w-20">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  className="h-8 w-8 sm:h-9 sm:w-9"
                  aria-hidden="true"
                >
                  <path d="M5 8h14l1 12H4L5 8Z" />
                  <path d="M9 8V6a3 3 0 0 1 6 0v2" />
                </svg>
              </div>
            </div>

            <h2 className="font-serif text-2xl font-light">
              Your bag is waiting
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#74685c]">
              Discover a fragrance that reflects your personality and add it
              to your collection.
            </p>

            <Link
              href="/shop"
              className="mt-7 inline-flex min-h-12 items-center justify-center bg-[#211c18] px-6 py-3 text-center text-[10px] uppercase tracking-[0.15em] text-white transition hover:bg-[#44372b] sm:px-8 sm:text-xs sm:tracking-[0.2em]"
            >
              Explore Perfumes
            </Link>
          </div>
        ) : (
          <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_360px]">
            {/* Cart items */}
            <section className="min-w-0">
              <div className="mb-5 flex items-center justify-between gap-3 border-b border-[#e5ddd3] pb-4">
                <h2 className="text-base font-medium sm:text-lg">
                  Your Items
                </h2>

                <button
                  type="button"
                  onClick={clearCart}
                  className="min-h-10 shrink-0 text-[10px] text-[#8b7968] underline underline-offset-4 hover:text-red-700 sm:text-xs"
                >
                  Clear Cart
                </button>
              </div>

              <div className="space-y-5 sm:space-y-6">
                {items.map(({ perfume, quantity }) => (
                  <article
                    key={perfume.id}
                    className="flex min-w-0 gap-3 border-b border-[#e5ddd3] pb-5 sm:gap-5 sm:pb-6"
                  >
                    {/* Smaller, centered product image */}
                    <Link
                      href={`/product/${perfume.slug}`}
                      aria-label={`View ${perfume.name}`}
                      className="flex h-28 w-24 shrink-0 items-center justify-center overflow-hidden bg-[#eee8df] p-2 sm:h-36 sm:w-28 sm:p-3 md:h-40 md:w-32"
                    >
                      <img
                        src={perfume.image}
                        alt={`${perfume.name} perfume bottle`}
                        loading="lazy"
                        className="h-full w-full object-contain transition duration-300 hover:scale-[1.03]"
                      />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex min-w-0 items-start justify-between gap-2 sm:gap-3">
                        <div className="min-w-0">
                          <p className="text-[9px] uppercase tracking-[0.12em] text-[#9b7951] sm:text-[10px] sm:tracking-[0.2em]">
                            {perfume.fragranceFamily}
                          </p>

                          <Link
                            href={`/product/${perfume.slug}`}
                            className="mt-1 block break-words font-serif text-base hover:text-[#9b7951] sm:text-lg"
                          >
                            {perfume.name}
                          </Link>

                          <p className="mt-1 text-[10px] text-[#8b7968] sm:text-xs">
                            {perfume.sizeMl} ml · {perfume.gender}
                          </p>
                        </div>

                        <p className="shrink-0 text-xs font-medium sm:text-sm">
                          ₹
                          {(perfume.price * quantity).toLocaleString("en-IN")}
                        </p>
                      </div>

                      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-4">
                        {/* Quantity selector */}
                        <div
                          className="flex min-h-10 items-center border border-[#ded7ce] bg-white"
                          aria-label={`Quantity for ${perfume.name}`}
                        >
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(perfume.id, quantity - 1)
                            }
                            disabled={quantity <= 1}
                            className="flex h-10 w-9 items-center justify-center text-lg transition hover:bg-[#eee8df] disabled:cursor-not-allowed disabled:opacity-40 sm:w-10"
                            aria-label={`Decrease ${perfume.name} quantity`}
                          >
                            −
                          </button>

                          <span
                            className="min-w-7 text-center text-sm"
                            aria-live="polite"
                          >
                            {quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(perfume.id, quantity + 1)
                            }
                            disabled={quantity >= perfume.stock}
                            className="flex h-10 w-9 items-center justify-center text-lg transition hover:bg-[#eee8df] disabled:cursor-not-allowed disabled:opacity-40 sm:w-10"
                            aria-label={`Increase ${perfume.name} quantity`}
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(perfume.id)}
                          className="min-h-10 px-1 text-[10px] text-[#8b7968] underline underline-offset-4 hover:text-red-700 sm:text-xs"
                        >
                          Remove
                        </button>
                      </div>

                      <p className="mt-2 text-[10px] text-[#8b7968] sm:text-xs">
                        ₹{perfume.price.toLocaleString("en-IN")} per bottle
                      </p>
                    </div>
                  </article>
                ))}
              </div>

              <Link
                href="/shop"
                className="mt-6 inline-flex min-h-10 items-center text-[10px] uppercase tracking-[0.15em] text-[#8b7968] underline underline-offset-4 hover:text-[#211c18] sm:mt-7 sm:text-xs sm:tracking-[0.2em]"
              >
                ← Continue Shopping
              </Link>
            </section>

            {/* Order summary */}
            <aside className="h-fit min-w-0 border border-[#e5ddd3] bg-white p-4 sm:p-6 lg:sticky lg:top-24 lg:p-7">
              <h2 className="font-serif text-xl font-light sm:text-2xl">
                Order Summary
              </h2>

              <div className="mt-5 space-y-4 border-b border-[#e5ddd3] pb-5 sm:mt-6">
                <div className="flex items-start justify-between gap-3 text-xs sm:text-sm">
                  <span className="text-[#74685c]">
                    Subtotal ({itemCount}{" "}
                    {itemCount === 1 ? "item" : "items"})
                  </span>
                  <span className="shrink-0">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3 text-xs sm:text-sm">
                  <span className="text-[#74685c]">Shipping</span>
                  <span className="max-w-[60%] text-right text-green-700">
                    Calculated at checkout
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 py-5">
                <span className="text-sm font-medium sm:text-base">Total</span>
                <span className="shrink-0 text-xl font-medium">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              <p className="mb-5 text-xs leading-5 text-[#8b7968]">
                Shipping charges, if applicable, will be shown during checkout.
              </p>

              <Link
                href="/checkout"
                className="flex min-h-12 w-full items-center justify-center bg-[#211c18] px-3 py-4 text-center text-[10px] uppercase tracking-[0.12em] text-white transition hover:bg-[#44372b] sm:text-xs sm:tracking-[0.2em]"
              >
                Proceed to Checkout
              </Link>

              <p className="mt-4 text-center text-[10px] text-[#8b7968] sm:text-xs">
                Secure checkout experience
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}