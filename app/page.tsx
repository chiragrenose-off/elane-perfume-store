import Link from "next/link";
import { perfumes } from "../lib/products";
import HomeProductCard from "./components/HomeProductCard";
import CartIndicator from "./components/CartIndicator";

export default function Home() {
  const featuredPerfumes = perfumes
    .filter((perfume) => perfume.featured)
    .slice(0, 3);

  const displayedPerfumes =
    featuredPerfumes.length > 0 ? featuredPerfumes : perfumes.slice(0, 3);

  const fragranceFamilies = [
    "Woody",
    "Floral",
    "Fresh",
    "Citrus",
    "Oud",
    "Amber",
    "Vanilla",
    "Musky",
  ];

  return (
    <main className="min-h-screen overflow-x-clip bg-[#faf8f4] text-[#25231f]">
      {/* Announcement bar */}
      <div className="bg-[#211f1a] px-3 py-2.5 text-center text-[9px] leading-relaxed tracking-[0.16em] text-[#f8f4ec] sm:px-4 sm:py-3 sm:text-[10px] sm:tracking-[0.22em]">
        COMPLIMENTARY SHIPPING ON ORDERS ABOVE ₹2,999
      </div>

      {/* Responsive navigation */}
      <header className="sticky top-0 z-40 border-b border-[#e9e3d9] bg-[#faf8f4]/95 backdrop-blur">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex min-h-[68px] max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:min-h-[80px] sm:gap-5 sm:px-8 lg:px-12"
        >
          <Link
            href="/"
            className="shrink-0 font-serif text-xl tracking-[0.1em] sm:text-3xl sm:tracking-[0.15em]"
          >
            ÉLANÉ<span className="text-[#b39158]">.</span>
          </Link>

          <div className="flex min-w-0 items-center justify-center gap-2.5 text-[9px] tracking-[0.04em] sm:gap-6 sm:text-xs sm:tracking-[0.12em]">
            <Link
              href="/"
              className="whitespace-nowrap transition hover:text-[#a18454]"
            >
              HOME
            </Link>

            <Link
              href="/shop"
              className="whitespace-nowrap transition hover:text-[#a18454]"
            >
              SHOP
            </Link>

            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="px-1 text-base transition hover:text-[#a18454] sm:text-xs"
            >
              <span className="sm:hidden">♡</span>
              <span className="hidden sm:inline">WISHLIST ♡</span>
            </Link>

            <a
              href="#our-story"
              className="hidden whitespace-nowrap transition hover:text-[#a18454] md:block"
            >
              OUR STORY
            </a>

            <Link
              href="/contact"
              className="hidden whitespace-nowrap transition hover:text-[#a18454] md:block"
            >
              CONTACT
            </Link>
          </div>

          <div className="shrink-0">
            <CartIndicator />
          </div>
        </nav>
      </header>

      {/* Hero section */}
      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-4 py-8 sm:gap-10 sm:px-8 sm:py-12 md:py-14 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-20">
        <div className="min-w-0 py-1 sm:py-4">
          <p className="text-[9px] leading-5 tracking-[0.2em] text-[#a18454] sm:text-xs sm:tracking-[0.3em]">
            THE ART OF PERSONAL FRAGRANCE
          </p>

          <h1 className="mt-4 max-w-xl font-serif text-[clamp(2.6rem,9vw,3.5rem)] leading-[1.04] sm:mt-6 sm:text-6xl lg:mt-7 lg:text-7xl">
            Scent that
            <br />
            <span className="italic text-[#b39158]">defines you.</span>
          </h1>

          <p className="mt-4 max-w-md text-sm leading-6 text-[#777168] sm:mt-6 sm:text-base sm:leading-7">
            Discover distinctive fragrances designed to leave a lasting
            impression. Find the scent that feels unmistakably yours.
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5 sm:mt-8 sm:gap-3">
            <Link
              href="/shop"
              className="inline-flex min-h-12 items-center justify-center bg-[#292720] px-4 py-3 text-center text-[9px] tracking-[0.1em] text-white transition hover:bg-[#a18454] sm:px-8 sm:text-[10px] sm:tracking-[0.15em]"
            >
              EXPLORE COLLECTION
            </Link>

            <a
              href="#our-story"
              className="inline-flex min-h-12 items-center justify-center border border-[#d8d0c4] px-4 py-3 text-center text-[9px] tracking-[0.1em] transition hover:bg-[#eee8df] sm:px-8 sm:text-[10px] sm:tracking-[0.15em]"
            >
              OUR PHILOSOPHY
            </a>
          </div>

          <div className="mt-8 grid max-w-md grid-cols-3 gap-2 border-t border-[#e3dbcf] pt-5 sm:mt-12 sm:gap-4 sm:pt-6">
            <div>
              <p className="font-serif text-xl sm:text-2xl">25+</p>
              <p className="mt-1 text-[8px] leading-4 tracking-[0.06em] text-[#827b70] sm:text-[9px] sm:tracking-wider">
                DISTINCT SCENTS
              </p>
            </div>

            <div>
              <p className="font-serif text-xl sm:text-2xl">50 ml</p>
              <p className="mt-1 text-[8px] leading-4 tracking-[0.06em] text-[#827b70] sm:text-[9px] sm:tracking-wider">
                SIGNATURE SIZE
              </p>
            </div>

            <div>
              <p className="font-serif text-xl text-[#b39158] sm:text-2xl">
                É
              </p>
              <p className="mt-1 text-[8px] leading-4 tracking-[0.06em] text-[#827b70] sm:text-[9px] sm:tracking-wider">
                MADE TO EXPRESS
              </p>
            </div>
          </div>
        </div>

        {/* Responsive hero image */}
        <div className="relative mx-auto w-full min-w-0 max-w-[480px] lg:max-w-none">
          <div className="absolute inset-0 translate-x-2 translate-y-2 bg-[#e9e0d4] sm:translate-x-3 sm:translate-y-3" />

          <div className="relative overflow-hidden bg-[#eee8df]">
            <img
              src="/images/perfumes/elan-noir.jpg"
              alt="Élan Noir perfume bottle"
              fetchPriority="high"
              className="block aspect-[4/5] w-full object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
            />

            <span className="absolute left-2 top-2 max-w-[calc(100%-1rem)] border border-white/70 bg-white/85 px-2 py-2 text-[8px] tracking-[0.1em] text-[#292720] sm:left-4 sm:top-4 sm:px-3 sm:py-3 sm:text-[9px] sm:tracking-[0.16em]">
              THE SIGNATURE COLLECTION
            </span>
          </div>

          <div className="absolute bottom-3 right-2 max-w-[75%] bg-[#faf8f4] px-4 py-3 shadow-sm sm:bottom-6 sm:right-0 sm:px-5 sm:py-4">
            <p className="font-serif text-lg sm:text-xl">Élan Noir</p>
            <p className="mt-1 text-[8px] tracking-[0.12em] text-[#827b70] sm:text-[9px] sm:tracking-[0.17em]">
              WOODY · AMBER
            </p>
            <Link
              href="/product/elan-noir"
              className="mt-2 inline-block text-[9px] underline underline-offset-4 sm:mt-3 sm:text-[10px]"
            >
              DISCOVER
            </Link>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-20 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[9px] tracking-[0.2em] text-[#a18454] sm:text-[10px] sm:tracking-[0.28em]">
              DISCOVER YOUR SIGNATURE
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:mt-4 sm:text-4xl">
              The fragrance edit
            </h2>
            <p className="mt-3 text-sm text-[#777168]">
              A few of our most-loved creations.
            </p>
          </div>

          <Link
            href="/shop"
            className="shrink-0 border-b border-[#b39158] pb-1 text-[10px] tracking-wider transition hover:text-[#a18454] sm:text-xs"
          >
            EXPLORE ALL
          </Link>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-x-5 gap-y-8 sm:mt-9 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3">
          {displayedPerfumes.map((perfume) => (
            <HomeProductCard key={perfume.id} perfume={perfume} />
          ))}
        </div>
      </section>

      {/* Fragrance families */}
      <section className="bg-[#eee8df] px-4 py-12 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-[9px] tracking-[0.2em] text-[#a18454] sm:text-[10px] sm:tracking-[0.28em]">
            FIND YOUR FRAGRANCE FAMILY
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:mt-4 sm:text-4xl">
            A scent for every side of you
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#777168]">
            From fresh and uplifting notes to deep, warm and mysterious
            fragrances, discover the character that speaks to you.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-2 sm:mt-8 sm:gap-3">
            {fragranceFamilies.map((family) => (
              <Link
                key={family}
                href={"/shop?family=" + encodeURIComponent(family)}
                className="border border-[#cfc4b5] bg-[#faf8f4] px-4 py-3 text-xs transition hover:border-[#292720] hover:bg-[#292720] hover:text-white sm:px-5"
              >
                {family}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brand story */}
      <section
        id="our-story"
        className="mx-auto max-w-7xl scroll-mt-24 px-4 py-12 sm:px-8 sm:py-24 lg:px-12"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[9px] tracking-[0.2em] text-[#a18454] sm:text-[10px] sm:tracking-[0.28em]">
            THE ÉLANÉ PHILOSOPHY
          </p>
          <h2 className="mt-4 font-serif text-3xl leading-tight sm:mt-5 sm:text-5xl">
            More than a fragrance.
            <br />
            <span className="italic text-[#b39158]">
              A personal signature.
            </span>
          </h2>
          <p className="mt-5 text-sm leading-7 text-[#777168] sm:mt-6 sm:leading-8 sm:text-base">
            ÉLANÉ is a fictional contemporary fragrance house built around the
            idea that scent is a personal expression of identity. Our imagined
            collection combines considered bottle design with distinctive
            fragrance profiles for everyday moments and special occasions.
          </p>
          <Link
            href="/shop"
            className="mt-7 inline-block border-b border-[#b39158] pb-2 text-[10px] tracking-[0.12em] hover:text-[#a18454] sm:mt-8 sm:text-xs sm:tracking-[0.15em]"
          >
            EXPLORE OUR COLLECTION
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#211f1a] px-4 py-10 text-[#f8f4ec] sm:px-8 sm:py-12 lg:px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
          <div>
            <Link href="/" className="font-serif text-3xl tracking-[0.15em]">
              ÉLANÉ<span className="text-[#b39158]">.</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-7 text-[#c5bfb4]">
              Distinctive fictional fragrances for people who express
              themselves through scent.
            </p>
          </div>

          <div>
            <h2 className="text-xs tracking-[0.18em]">EXPLORE</h2>
            <div className="mt-4 flex flex-col items-start gap-3 text-sm text-[#c5bfb4]">
              <Link href="/shop" className="hover:text-white">
                All Perfumes
              </Link>
              <a href="#our-story" className="hover:text-white">
                Our Story
              </a>
              <Link href="/wishlist" className="hover:text-white">
                My Wishlist ♡
              </Link>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
              <Link href="/cart" className="hover:text-white">
                Shopping Bag
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-xs tracking-[0.18em]">A NOTE ABOUT ÉLANÉ</h2>
            <p className="mt-4 text-sm leading-7 text-[#c5bfb4]">
              A portfolio demonstration project. All product names,
              fragrances, prices and brand details are fictional.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-7xl border-t border-white/15 pt-6 text-xs text-[#c5bfb4] sm:mt-10">
          © 2026 ÉLANÉ. Portfolio demonstration project.
        </div>
      </footer>
    </main>
  );
}