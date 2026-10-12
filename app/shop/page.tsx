
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { perfumes } from "../../lib/products";
import { useWishlist } from "../../lib/wishlist-context";

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [fragrance, setFragrance] = useState("All");
  const [gender, setGender] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [availability, setAvailability] = useState("All");

  const { isWishlisted, toggleWishlist, isLoaded } = useWishlist();

  const fragranceFamilies = [
    "All",
    ...Array.from(new Set(perfumes.map((p) => p.fragranceFamily))),
  ];

  const filteredPerfumes = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    const result = perfumes.filter((perfume) => {
      const matchesSearch =
        perfume.name.toLowerCase().includes(searchText) ||
        perfume.description.toLowerCase().includes(searchText) ||
        perfume.fragranceFamily.toLowerCase().includes(searchText) ||
        perfume.topNotes.some((note) =>
          note.toLowerCase().includes(searchText)
        );

      const matchesFragrance =
        fragrance === "All" || perfume.fragranceFamily === fragrance;

      const matchesGender = gender === "All" || perfume.gender === gender;

      const matchesAvailability =
        availability === "All" ||
        (availability === "In stock" && perfume.stock > 0) ||
        (availability === "Out of stock" && perfume.stock === 0);

      return (
        matchesSearch &&
        matchesFragrance &&
        matchesGender &&
        matchesAvailability
      );
    });

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );
        break;
      case "featured":
      default:
        result.sort((a, b) => Number(b.featured) - Number(a.featured));
        break;
    }

    return result;
  }, [search, fragrance, gender, sortBy, availability]);

  function resetFilters() {
    setSearch("");
    setFragrance("All");
    setGender("All");
    setSortBy("featured");
    setAvailability("All");
  }

  return (
    <main className="min-h-screen overflow-x-clip bg-[#faf8f5] text-[#211c18]">
      {/* Collection hero */}
      <section className="bg-[#211c18] px-4 py-10 text-center text-white sm:px-6 sm:py-14 lg:py-16">
        <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-[#d6b889] sm:text-xs sm:tracking-[0.4em]">
          The ÉLANÉ Collection
        </p>

        <h1 className="text-3xl font-light leading-tight tracking-wide sm:text-5xl lg:text-6xl">
          Discover Your Signature
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/70 sm:mt-5 sm:text-base sm:leading-7">
          Explore refined fragrances crafted to express your individuality.
          Find the scent that feels like you.
        </p>

        <Link
          href="/wishlist"
          className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 border border-white/30 px-4 py-3 text-[10px] tracking-[0.12em] transition hover:bg-white hover:text-[#211c18] sm:mt-7 sm:px-5 sm:text-xs sm:tracking-[0.15em]"
        >
          <span className="text-lg">♡</span>
          VIEW MY WISHLIST
        </Link>
      </section>

      {/* Search and filters */}
      <section className="mx-auto max-w-7xl px-4 py-7 sm:px-8 sm:py-10 lg:px-12">
        <div className="mb-7 flex flex-col gap-5 sm:mb-8">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_220px]">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search perfumes, notes, or families..."
              className="min-h-12 min-w-0 w-full rounded-md border border-[#ded7ce] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#9b7951]"
              aria-label="Search perfumes"
            />

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="min-h-12 min-w-0 w-full rounded-md border border-[#ded7ce] bg-white px-3 py-3 text-sm outline-none focus:border-[#9b7951]"
              aria-label="Sort perfumes"
            >
              <option value="featured">Featured first</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            <div className="min-w-0">
              <label
                htmlFor="fragrance-filter"
                className="mb-2 block text-[10px] font-medium uppercase tracking-wider text-[#74685c] sm:text-xs"
              >
                Fragrance Family
              </label>

              <select
                id="fragrance-filter"
                value={fragrance}
                onChange={(e) => setFragrance(e.target.value)}
                className="min-h-12 w-full rounded-md border border-[#ded7ce] bg-white px-3 py-3 text-sm outline-none focus:border-[#9b7951]"
              >
                {fragranceFamilies.map((family) => (
                  <option key={family} value={family}>
                    {family === "All" ? "All Fragrances" : family}
                  </option>
                ))}
              </select>
            </div>

            <div className="min-w-0">
              <label
                htmlFor="gender-filter"
                className="mb-2 block text-[10px] font-medium uppercase tracking-wider text-[#74685c] sm:text-xs"
              >
                Collection
              </label>

              <select
                id="gender-filter"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="min-h-12 w-full rounded-md border border-[#ded7ce] bg-white px-3 py-3 text-sm outline-none focus:border-[#9b7951]"
              >
                <option value="All">All Collections</option>
                <option value="Men">For Men</option>
                <option value="Women">For Women</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>

            <div className="min-w-0">
              <label
                htmlFor="stock-filter"
                className="mb-2 block text-[10px] font-medium uppercase tracking-wider text-[#74685c] sm:text-xs"
              >
                Availability
              </label>

              <select
                id="stock-filter"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="min-h-12 w-full rounded-md border border-[#ded7ce] bg-white px-3 py-3 text-sm outline-none focus:border-[#9b7951]"
              >
                <option value="All">All Products</option>
                <option value="In stock">In Stock</option>
                <option value="Out of stock">Out of Stock</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e7e0d8] pb-4">
            <p className="text-xs text-[#74685c] sm:text-sm">
              Showing{" "}
              <span className="font-semibold text-[#211c18]">
                {filteredPerfumes.length}
              </span>{" "}
              of {perfumes.length} perfumes
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="min-h-10 text-xs font-medium text-[#8a6742] underline underline-offset-4 hover:text-[#211c18] sm:text-sm"
            >
              Clear all filters
            </button>
          </div>
        </div>

        {/* Product grid */}
        {filteredPerfumes.length > 0 ? (
          <div className="grid grid-cols-1 items-stretch gap-x-5 gap-y-9 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-6 xl:grid-cols-4">
            {filteredPerfumes.map((perfume) => {
              const saved = isWishlisted(perfume.id);

              return (
                <article
                  key={perfume.id}
                  className="group flex min-w-0 flex-col"
                >
                  {/* Fixed image area */}
                  <div className="relative shrink-0 overflow-hidden bg-[#eee8df]">
                    <Link
                      href={`/product/${perfume.slug}`}
                      className="block"
                      aria-label={`View ${perfume.name}`}
                    >
                      <div className="flex aspect-[4/3] items-center justify-center p-5 sm:p-5 lg:p-6">
                        <img
                          src={perfume.image}
                          alt={`${perfume.name} perfume bottle`}
                          loading="lazy"
                          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                    </Link>

                    <button
                      type="button"
                      onClick={() => toggleWishlist(perfume)}
                      disabled={!isLoaded}
                      aria-label={
                        saved
                          ? `Remove ${perfume.name} from wishlist`
                          : `Add ${perfume.name} to wishlist`
                      }
                      aria-pressed={saved}
                      title={
                        saved ? "Remove from wishlist" : "Add to wishlist"
                      }
                      className="absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl shadow-sm transition hover:scale-110 disabled:cursor-wait sm:right-3 sm:top-3 sm:h-10 sm:w-10 sm:text-2xl"
                    >
                      <span
                        className={saved ? "text-red-600" : "text-[#514a40]"}
                      >
                        {saved ? "♥" : "♡"}
                      </span>
                    </button>

                    {perfume.bestseller && (
                      <span className="pointer-events-none absolute left-2 top-2 bg-[#211c18] px-2 py-1.5 text-[8px] uppercase tracking-[0.12em] text-white sm:left-3 sm:top-3 sm:px-3 sm:text-[10px] sm:tracking-[0.2em]">
                        Bestseller
                      </span>
                    )}

                    {perfume.stock === 0 && (
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40">
                        <span className="bg-white px-4 py-2 text-[10px] uppercase tracking-[0.15em] text-[#211c18] sm:text-xs sm:tracking-[0.2em]">
                          Sold Out
                        </span>
                      </div>
                    )}

                    {perfume.discountPercentage > 0 && (
                      <span className="pointer-events-none absolute bottom-2 right-2 bg-white px-2 py-1.5 text-[10px] font-medium text-[#7e3f31] sm:bottom-3 sm:right-3 sm:px-2.5 sm:text-xs">
                        {perfume.discountPercentage}% OFF
                      </span>
                    )}
                  </div>

                  {/* Equal-height product information */}
                  <div className="flex flex-1 flex-col pt-4">
                    <div className="mb-2 flex min-h-[48px] items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="mb-1 text-[9px] uppercase tracking-[0.12em] text-[#8b7968] sm:text-[10px] sm:tracking-[0.2em]">
                          {perfume.fragranceFamily} · {perfume.gender}
                        </p>

                        <Link
                          href={`/product/${perfume.slug}`}
                          className="break-words font-serif text-lg hover:text-[#9b7951] sm:text-xl"
                        >
                          {perfume.name}
                        </Link>
                      </div>

                      <p className="shrink-0 whitespace-nowrap text-xs text-[#8b7968] sm:text-sm">
                        ★ {perfume.rating.toFixed(1)}
                      </p>
                    </div>

                    <p className="mb-3 min-h-[40px] line-clamp-2 text-xs leading-5 text-[#74685c] sm:text-sm sm:leading-6">
                      {perfume.description}
                    </p>

                    <div className="flex min-h-7 flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold sm:text-base">
                        ₹{perfume.price.toLocaleString("en-IN")}
                      </span>

                      {perfume.originalPrice !== null &&
                        perfume.originalPrice > perfume.price && (
                          <span className="text-xs text-[#9b9187] line-through sm:text-sm">
                            ₹{perfume.originalPrice.toLocaleString("en-IN")}
                          </span>
                        )}

                      <span className="ml-auto whitespace-nowrap text-[10px] text-[#8b7968] sm:text-xs">
                        {perfume.sizeMl} ml
                      </span>
                    </div>

                    <p
                      className={`mt-3 min-h-[18px] text-xs ${
                        perfume.stock > 0
                          ? perfume.stock <= 5
                            ? "text-amber-700"
                            : "text-green-700"
                          : "text-red-700"
                      }`}
                    >
                      {perfume.stock === 0
                        ? "Currently unavailable"
                        : perfume.stock <= 5
                          ? `Only ${perfume.stock} left`
                          : "In stock"}
                    </p>

                    <Link
                      href={`/product/${perfume.slug}`}
                      className="mt-auto flex min-h-11 w-full items-center justify-center border border-[#211c18] px-3 py-3 text-center text-[10px] uppercase tracking-[0.12em] transition hover:bg-[#211c18] hover:text-white sm:text-xs sm:tracking-[0.2em]"
                    >
                      View Perfume
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="py-16 text-center sm:py-20">
            <h2 className="font-serif text-2xl font-light sm:text-3xl">
              No perfumes found
            </h2>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#74685c]">
              Try another search or change your filters.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 min-h-11 border border-[#211c18] px-6 py-3 text-xs uppercase tracking-[0.15em] transition hover:bg-[#211c18] hover:text-white"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}