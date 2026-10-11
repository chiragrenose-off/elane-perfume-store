
"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useCart } from "../../lib/cart-context";

type PaymentMethod = "upi" | "card" | "cod";

export default function CheckoutPage() {
  const {
    items,
    subtotal,
    itemCount,
    isLoaded,
    clearCart,
  } = useCart();

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("upi");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shipping = subtotal >= 2999 || subtotal === 0 ? 0 : 99;
  const total = subtotal + shipping;

  function handlePlaceOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (isSubmitting) return;

    if (!isLoaded) {
      setMessage("Please wait while your shopping bag loads.");
      return;
    }

    if (items.length === 0) {
      setMessage("Your shopping bag is empty. Please add a perfume first.");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      setMessage("Enter a valid 10-digit mobile number.");
      return;
    }

    if (!/^[0-9]{6}$/.test(pincode)) {
      setMessage("Enter a valid 6-digit PIN code.");
      return;
    }

    const orderNumber = "EL" + Date.now().toString().slice(-8);

    const order = {
      orderNumber,
      customer: {
        fullName,
        email,
        phone,
        address,
        city,
        state,
        pincode,
      },
      paymentMethod,
      items: items.map((item) => ({
        perfumeId: item.perfume.id,
        name: item.perfume.name,
        price: item.perfume.price,
        quantity: item.quantity,
      })),
      subtotal,
      shipping,
      total,
      createdAt: new Date().toISOString(),
      paymentStatus:
        paymentMethod === "cod"
          ? "Pay on delivery (demo only)"
          : "Demo only — not paid",
    };

    try {
      localStorage.setItem("elane-last-order", JSON.stringify(order));
      clearCart();
      setIsSubmitting(true);

      window.location.href =
        "/order-confirmation?order=" +
        encodeURIComponent(orderNumber);
    } catch {
      setIsSubmitting(false);
      setMessage("We could not save your demo order. Please try again.");
    }
  }

  const inputClass =
    "mt-2 min-h-12 w-full min-w-0 border border-[#ded7ce] bg-[#faf8f4] px-3 py-3 text-base text-[#25231f] outline-none focus:border-[#a18454] sm:px-4 sm:text-sm";

  if (!isLoaded) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#faf8f4] px-4 text-center text-[#25231f]">
        Loading your shopping bag...
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#faf8f4] px-5 py-12 text-center text-[#25231f]">
        <p className="text-xs tracking-[0.25em] text-[#a18454]">
          ÉLANÉ
        </p>

        <h1 className="mt-5 font-serif text-3xl sm:text-4xl">
          Your bag is waiting.
        </h1>

        <p className="mt-4 max-w-sm text-sm leading-6 text-[#777168]">
          Add a fragrance to your bag before checking out.
        </p>

        <Link
          href="/shop"
          className="mt-8 inline-flex min-h-12 items-center justify-center bg-[#292720] px-6 py-3 text-center text-xs tracking-[0.15em] text-white transition hover:bg-[#a18454] sm:px-7"
        >
          EXPLORE PERFUMES
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-clip bg-[#faf8f4] text-[#25231f]">
      {/* Checkout header */}
      <header className="border-b border-[#e9e3d9]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-8 sm:py-5">
          <Link
            href="/"
            className="shrink-0 font-serif text-xl tracking-[0.12em] sm:text-2xl sm:tracking-[0.15em]"
          >
            ÉLANÉ<span className="text-[#b39158]">.</span>
          </Link>

          <Link
            href="/cart"
            className="flex min-h-10 items-center justify-end text-right text-[10px] tracking-wider text-[#777168] hover:text-[#a18454] sm:text-xs"
          >
            ← BACK TO BAG
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
        {/* Page heading */}
        <div className="mb-7 sm:mb-10">
          <p className="text-[10px] tracking-[0.3em] text-[#a18454]">
            ALMOST YOURS
          </p>

          <h1 className="mt-3 font-serif text-3xl font-light sm:text-5xl">
            Checkout
          </h1>

          <p className="mt-3 max-w-lg text-sm leading-6 text-[#777168] sm:mt-4">
            Complete your details to prepare your order.
          </p>
        </div>

        <form
          onSubmit={handlePlaceOrder}
          className="grid min-w-0 gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(300px,0.8fr)] lg:gap-10"
        >
          {/* Customer details */}
          <div className="min-w-0 space-y-6 sm:space-y-8">
            {/* Contact information */}
            <section className="min-w-0 border border-[#e5ddd3] bg-white p-4 sm:p-6 md:p-8">
              <h2 className="font-serif text-xl sm:text-2xl">
                01. Contact information
              </h2>

              <div className="mt-5 grid min-w-0 gap-4 sm:mt-6 sm:grid-cols-2 sm:gap-5">
                <label className="min-w-0 text-xs text-[#74685c] sm:col-span-2">
                  Full name
                  <input
                    required
                    autoComplete="name"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    className={inputClass}
                    placeholder="Enter your full name"
                  />
                </label>

                <label className="min-w-0 text-xs text-[#74685c]">
                  Email address
                  <input
                    required
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className={inputClass}
                    placeholder="you@example.com"
                  />
                </label>

                <label className="min-w-0 text-xs text-[#74685c]">
                  Mobile number
                  <input
                    required
                    type="tel"
                    autoComplete="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={phone}
                    onChange={(event) =>
                      setPhone(
                        event.target.value.replace(/\D/g, "").slice(0, 10)
                      )
                    }
                    className={inputClass}
                    placeholder="10-digit mobile number"
                  />
                </label>
              </div>
            </section>

            {/* Delivery address */}
            <section className="min-w-0 border border-[#e5ddd3] bg-white p-4 sm:p-6 md:p-8">
              <h2 className="font-serif text-xl sm:text-2xl">
                02. Delivery address
              </h2>

              <div className="mt-5 grid min-w-0 gap-4 sm:mt-6 sm:grid-cols-2 sm:gap-5">
                <label className="min-w-0 text-xs text-[#74685c] sm:col-span-2">
                  House number, street and area
                  <textarea
                    required
                    autoComplete="street-address"
                    rows={3}
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    className={`${inputClass} resize-y`}
                    placeholder="Enter your complete delivery address"
                  />
                </label>

                <label className="min-w-0 text-xs text-[#74685c]">
                  City
                  <input
                    required
                    autoComplete="address-level2"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    className={inputClass}
                    placeholder="Your city"
                  />
                </label>

                <label className="min-w-0 text-xs text-[#74685c]">
                  State
                  <input
                    required
                    autoComplete="address-level1"
                    value={state}
                    onChange={(event) => setState(event.target.value)}
                    className={inputClass}
                    placeholder="Your state"
                  />
                </label>

                <label className="min-w-0 text-xs text-[#74685c] sm:col-span-2">
                  PIN code
                  <input
                    required
                    autoComplete="postal-code"
                    inputMode="numeric"
                    maxLength={6}
                    value={pincode}
                    onChange={(event) =>
                      setPincode(
                        event.target.value.replace(/\D/g, "").slice(0, 6)
                      )
                    }
                    className={`${inputClass} sm:max-w-xs`}
                    placeholder="6-digit PIN code"
                  />
                </label>
              </div>
            </section>

            {/* Payment methods */}
            <section className="min-w-0 border border-[#e5ddd3] bg-white p-4 sm:p-6 md:p-8">
              <h2 className="font-serif text-xl sm:text-2xl">
                03. Payment method
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#777168]">
                Choose how you would prefer to pay in this demo checkout.
              </p>

              <div className="mt-5 space-y-3 sm:mt-6">
                {(
                  [
                    {
                      value: "upi",
                      title: "UPI",
                      description:
                        "Google Pay, PhonePe, Paytm or another UPI app.",
                    },
                    {
                      value: "card",
                      title: "Credit / Debit Card",
                      description:
                        "Visa, Mastercard and other supported cards.",
                    },
                    {
                      value: "cod",
                      title: "Cash on Delivery (COD)",
                      description: "Pay when your order is delivered.",
                    },
                  ] as const
                ).map((method) => (
                  <label
                    key={method.value}
                    className={`flex min-w-0 cursor-pointer items-start gap-3 border p-3 transition sm:p-4 ${
                      paymentMethod === method.value
                        ? "border-[#a18454] bg-[#faf8f4]"
                        : "border-[#ded7ce] hover:border-[#a18454]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.value}
                      checked={paymentMethod === method.value}
                      onChange={() => setPaymentMethod(method.value)}
                      className="mt-1 shrink-0 accent-[#a18454]"
                    />

                    <span className="min-w-0">
                      <span className="block text-sm font-medium">
                        {method.title}
                      </span>
                      <span className="mt-1 block break-words text-xs leading-5 text-[#777168]">
                        {method.description}
                      </span>
                    </span>
                  </label>
                ))}
              </div>

              <p className="mt-5 border-l-2 border-[#b39158] bg-[#faf8f4] p-3 text-xs leading-6 text-[#74685c] sm:p-4">
                Demo checkout only: no payment will be collected. UPI and
                card payments are not connected to a payment gateway.
              </p>
            </section>
          </div>

          {/* Order summary */}
          <aside className="h-fit min-w-0 border border-[#e5ddd3] bg-white p-4 sm:p-6 lg:sticky lg:top-6 lg:p-7">
            <h2 className="font-serif text-xl sm:text-2xl">
              Your order
            </h2>

            <p className="mt-2 text-xs text-[#777168]">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>

            <div className="mt-5 space-y-4 sm:mt-6 sm:space-y-5">
              {items.map((item) => (
                <div
                  key={item.perfume.id}
                  className="flex min-w-0 gap-3 sm:gap-4"
                >
                  <div className="flex h-20 w-16 shrink-0 items-center justify-center bg-[#eee8df] p-2 sm:h-24 sm:w-20">
                    <img
                      src={item.perfume.image}
                      alt={item.perfume.name}
                      loading="lazy"
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="break-words text-sm font-medium">
                      {item.perfume.name}
                    </p>

                    <p className="mt-1 text-xs text-[#777168]">
                      {item.perfume.sizeMl} ml · Qty {item.quantity}
                    </p>

                    <p className="mt-2 text-sm">
                      ₹
                      {(item.perfume.price * item.quantity).toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-4 border-t border-[#e5ddd3] pt-5 text-sm sm:mt-7">
              <div className="flex justify-between gap-3">
                <span className="text-[#777168]">Subtotal</span>
                <span className="shrink-0">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-[#777168]">Shipping</span>
                <span className="shrink-0">
                  {shipping === 0
                    ? "Complimentary"
                    : `₹${shipping.toLocaleString("en-IN")}`}
                </span>
              </div>

              {subtotal > 0 && subtotal < 2999 && (
                <p className="text-xs leading-5 text-[#8b7968]">
                  Add ₹{(2999 - subtotal).toLocaleString("en-IN")} more to
                  unlock complimentary shipping.
                </p>
              )}

              <div className="flex justify-between gap-3 border-t border-[#e5ddd3] pt-5 text-base font-medium">
                <span>Total</span>
                <span className="shrink-0">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>

              <p className="text-xs leading-5 text-[#777168]">
                Prices are shown in Indian rupees (INR).
              </p>
            </div>

            {message && (
              <p
                role="alert"
                className="mt-5 break-words border border-red-200 bg-red-50 p-3 text-sm leading-6 text-red-700"
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 flex min-h-12 w-full items-center justify-center bg-[#292720] px-3 py-4 text-center text-[10px] tracking-[0.12em] text-white transition hover:bg-[#a18454] disabled:cursor-not-allowed disabled:opacity-60 sm:mt-7 sm:text-xs sm:tracking-[0.15em]"
            >
              {isSubmitting ? "SAVING ORDER..." : "PLACE DEMO ORDER"}
            </button>

            <Link
              href="/cart"
              className="mt-4 flex min-h-10 items-center justify-center text-center text-xs text-[#777168] underline underline-offset-4 hover:text-[#a18454]"
            >
              Return to shopping bag
            </Link>

            <p className="mt-4 text-center text-[10px] leading-5 text-[#8b7968] sm:mt-5">
              Secure payment processing is not enabled in this portfolio demo.
            </p>
          </aside>
        </form>
      </div>
    </main>
  );
}