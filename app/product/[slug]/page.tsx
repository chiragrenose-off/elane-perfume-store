
"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import { useState } from "react";
import { perfumes, type Perfume } from "../../../lib/products";
import { useWishlist } from "../../../lib/wishlist-context";
import ProductPurchase from "../../components/ProductPurchase";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = use(params);
  const perfume = perfumes.find((item) => item.slug === slug);

  if (!perfume) {
    notFound();
  }

  return <ProductDetails perfume={perfume} />;
}

function ProductDetails({ perfume }: { perfume: Perfume }) {
  const { isWishlisted, toggleWishlist, isLoaded } = useWishlist();
  const [message, setMessage] = useState("");

  const saved = isWishlisted(perfume.id);

  function handleToggleWishlist() {
    const wasSaved = isWishlisted(perfume.id);

    toggleWishlist(perfume);

    setMessage(
      wasSaved
        ? `${perfume.name} removed from your wishlist.`
        : `${perfume.name} added to your wishlist!`
    );
  }

  return (
    <main className="min-h-screen overflow-x-clip bg-[#faf8f5] text-[#211c18]">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-8 sm:py-8 lg:px-12">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex flex-wrap items-center gap-y-1 text-xs text-[#8b7968] sm:mb-8 sm:text-sm"
        >
          <Link href="/" className="hover:text-[#211c18]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-[#211c18]">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="min-w-0 break-words text-[#211c18]">
            {perfume.name}
          </span>
        </nav>

        <div className="grid min-w-0 grid-cols-1 items-start gap-7 sm:gap-10 md:grid-cols-2 md:gap-8 lg:gap-14">
          {/* Product image */}
          <div className="relative mx-auto w-full min-w-0 max-w-[540px] md:mx-0 md:max-w-none">
            <div className="relative overflow-hidden bg-[#eee8df]">
              <div className="flex aspect-[5/4] items-center justify-center p-6 sm:aspect-[4/5] sm:p-8 md:aspect-[4/5] md:p-6 lg:p-10">
                <img
                  src={perfume.image}
                  alt={`${perfume.name} perfume bottle`}
                  fetchPriority="high"
                  className="h-full w-full object-contain"
                />
              </div>

              {perfume.bestseller && (
                <span className="absolute left-3 top-3 bg-[#211c18] px-3 py-2 text-[9px] uppercase tracking-[0.15em] text-white sm:left-4 sm:top-4 sm:text-xs sm:tracking-[0.2em]">
                  Bestseller
                </span>
              )}

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
                className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#faf8f5] text-2xl shadow-md transition hover:scale-110 disabled:cursor-wait sm:right-4 sm:top-4 sm:h-12 sm:w-12"
              >
                <span className={saved ? "text-red-600" : "text-[#514a40]"}>
                  {saved ? "♥" : "♡"}
                </span>
              </button>
            </div>

            <p className="mt-3 text-center text-[10px] tracking-[0.12em] text-[#8b7968] sm:text-xs sm:tracking-[0.18em]">
              ÉLANÉ · A SIGNATURE FRAGRANCE
            </p>
          </div>

          {/* Product information */}
          <div className="flex min-w-0 flex-col py-1 sm:py-3 md:py-2">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#9b7951] sm:text-xs sm:tracking-[0.35em]">
              ÉLANÉ — {perfume.category}
            </p>

            <h1 className="mt-3 break-words font-serif text-3xl font-light leading-tight sm:mt-4 sm:text-5xl">
              {perfume.name}
            </h1>

            <p className="mt-3 text-xs text-[#8b7968] sm:mt-4 sm:text-sm">
              <span className="text-[#b39158]">★</span>{" "}
              {perfume.rating.toFixed(1)} out of 5 · {perfume.reviewCount} reviews
            </p>

            <p className="mt-4 text-sm leading-7 text-[#74685c] sm:mt-6 sm:text-base sm:leading-8">
              {perfume.description}
            </p>

            {/* Price */}
            <div className="mt-5 flex flex-wrap items-center gap-2 sm:mt-7 sm:gap-3">
              <span className="text-2xl font-medium sm:text-3xl">
                ₹{perfume.price.toLocaleString("en-IN")}
              </span>

              {perfume.originalPrice !== null &&
                perfume.originalPrice > perfume.price && (
                  <>
                    <span className="text-base text-[#9b9187] line-through sm:text-lg">
                      ₹{perfume.originalPrice.toLocaleString("en-IN")}
                    </span>

                    <span className="bg-[#e8dfd2] px-2 py-1 text-[10px] text-[#76583b] sm:px-3 sm:text-xs">
                      Save {perfume.discountPercentage}%
                    </span>
                  </>
                )}
            </div>

            <p className="mt-3 text-xs leading-6 text-[#74685c] sm:text-sm">
              {perfume.sizeMl} ml · {perfume.gender} · {perfume.fragranceFamily}
            </p>

            {/* Stock status */}
            <div className="mt-5 border-y border-[#e5ddd3] py-4 sm:mt-7 sm:py-5">
              <p
                className={`text-sm font-medium ${
                  perfume.stock > 0 ? "text-green-700" : "text-red-700"
                }`}
              >
                {perfume.stock > 0
                  ? perfume.stock <= 5
                    ? `Only ${perfume.stock} bottles left`
                    : "In stock — ready to be yours"
                  : "Currently out of stock"}
              </p>
            </div>

            {/* Fragrance notes */}
            <section className="mt-5 sm:mt-7">
              <h2 className="text-[10px] uppercase tracking-[0.2em] text-[#8b7968] sm:text-xs sm:tracking-[0.25em]">
                Fragrance Notes
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                <div className="border-l-2 border-[#d6b889] pl-3 sm:border-l-0 sm:pl-0">
                  <p className="text-xs font-medium text-[#9b7951]">
                    Top Notes
                  </p>
                  <p className="mt-1 text-sm leading-6">
                    {perfume.topNotes.join(", ")}
                  </p>
                </div>

                <div className="border-l-2 border-[#d6b889] pl-3 sm:border-l-0 sm:pl-0">
                  <p className="text-xs font-medium text-[#9b7951]">
                    Heart Notes
                  </p>
                  <p className="mt-1 text-sm leading-6">
                    {perfume.middleNotes.join(", ")}
                  </p>
                </div>

                <div className="border-l-2 border-[#d6b889] pl-3 sm:border-l-0 sm:pl-0">
                  <p className="text-xs font-medium text-[#9b7951]">
                    Base Notes
                  </p>
                  <p className="mt-1 text-sm leading-6">
                    {perfume.baseNotes.join(", ")}
                  </p>
                </div>
              </div>
            </section>

            {/* Purchase and wishlist actions */}
            <div className="mt-6 sm:mt-8">
              <ProductPurchase perfume={perfume} />

              <button
                type="button"
                onClick={handleToggleWishlist}
                disabled={!isLoaded}
                aria-pressed={saved}
                className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 border border-[#d8d0c4] px-4 py-3 text-center text-[10px] tracking-[0.12em] transition hover:bg-[#eee8df] disabled:cursor-wait sm:text-xs sm:tracking-[0.15em]"
              >
                <span className={saved ? "text-red-600" : ""}>
                  {saved ? "♥" : "♡"}
                </span>
                {saved ? "REMOVE FROM WISHLIST" : "ADD TO WISHLIST"}
              </button>

              {message && (
                <p
                  role="status"
                  className="mt-3 text-center text-xs text-green-700"
                >
                  {message}
                </p>
              )}

              <Link
                href="/shop"
                className="mt-3 flex min-h-12 w-full items-center justify-center border border-[#211c18] px-4 py-3 text-center text-[10px] tracking-[0.15em] transition hover:bg-[#211c18] hover:text-white sm:text-xs sm:tracking-[0.2em]"
              >
                CONTINUE SHOPPING
              </Link>
            </div>

            <p className="mt-4 text-xs leading-6 text-[#8b7968] sm:mt-5">
              A refined fragrance experience, thoughtfully selected for your
              personal collection.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}