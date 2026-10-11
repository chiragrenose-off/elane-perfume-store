
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type OrderItem = {
  perfumeId: number;
  name: string;
  price: number;
  quantity: number;
};

type DemoOrder = {
  orderNumber: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: "upi" | "card" | "cod";
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  createdAt: string;
  paymentStatus: string;
};

const currency = (amount: number) =>
  "₹" + amount.toLocaleString("en-IN");

const paymentLabels: Record<DemoOrder["paymentMethod"], string> = {
  upi: "UPI",
  card: "Credit / Debit Card",
  cod: "Cash on Delivery",
};

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState<DemoOrder | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedOrder = localStorage.getItem("elane-last-order");

      if (savedOrder) {
        const parsedOrder = JSON.parse(savedOrder) as DemoOrder;

        if (
          parsedOrder.orderNumber &&
          Array.isArray(parsedOrder.items) &&
          typeof parsedOrder.total === "number"
        ) {
          setOrder(parsedOrder);
        }
      }
    } catch {
      setOrder(null);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  if (!isLoaded) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#faf8f4] px-4 text-center text-sm text-[#25231f]">
        Loading your order...
      </main>
    );
  }

  if (!order) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#faf8f4] px-5 py-12 text-center text-[#25231f]">
        <p className="text-xs tracking-[0.3em] text-[#a18454]">
          ÉLANÉ
        </p>

        <h1 className="mt-5 font-serif text-3xl sm:text-4xl">
          No order to display
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#777168] sm:leading-7">
          We couldn&apos;t find a saved demo order in this browser. Visit your
          shopping bag to begin checkout.
        </p>

        <Link
          href="/cart"
          className="mt-7 inline-flex min-h-12 items-center justify-center bg-[#292720] px-6 py-3 text-center text-xs tracking-[0.15em] text-white transition hover:bg-[#a18454] sm:mt-8 sm:px-7"
        >
          RETURN TO MY BAG
        </Link>
      </main>
    );
  }

  const orderDate = new Date(order.createdAt);
  const firstName = order.customer.fullName.trim().split(/\s+/)[0];

  return (
    <main className="min-h-screen overflow-x-clip bg-[#faf8f4] text-[#25231f]">
      {/* Header */}
      <header className="border-b border-[#e9e3d9]">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-4 sm:px-8 sm:py-5">
          <Link
            href="/"
            className="shrink-0 font-serif text-xl tracking-[0.12em] sm:text-2xl sm:tracking-[0.15em]"
          >
            ÉLANÉ<span className="text-[#b39158]">.</span>
          </Link>

          <span className="text-right text-[9px] tracking-[0.1em] text-[#777168] sm:text-[10px] sm:tracking-[0.15em]">
            ORDER CONFIRMATION
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-7 sm:px-8 sm:py-10 lg:py-14">
        {/* Confirmation message */}
        <section className="border border-[#e5ddd3] bg-white px-4 py-8 text-center sm:px-8 sm:py-12 md:px-10 md:py-14">
          <div
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#b39158] text-2xl text-[#a18454] sm:h-16 sm:w-16 sm:text-3xl"
            aria-hidden="true"
          >
            ✓
          </div>

          <p className="mt-6 break-words text-[9px] tracking-[0.2em] text-[#a18454] sm:mt-7 sm:text-[10px] sm:tracking-[0.3em]">
            THANK YOU, {firstName.toUpperCase()}
          </p>

          <h1 className="mt-4 font-serif text-3xl font-light leading-tight sm:text-4xl md:text-5xl">
            Your order is recorded.
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-[#777168] sm:mt-5 sm:leading-7">
            Your ÉLANÉ demo order has been saved in this browser. This is a
            portfolio demonstration, not a real purchase or delivery booking.
          </p>

          <div className="mx-auto mt-7 max-w-md border-y border-[#e5ddd3] py-5 sm:mt-8">
            <p className="text-[9px] tracking-[0.15em] text-[#8b7968] sm:text-[10px] sm:tracking-[0.2em]">
              DEMO ORDER NUMBER
            </p>

            <p className="mt-3 break-all font-serif text-xl sm:text-2xl">
              {order.orderNumber}
            </p>

            <p className="mt-3 text-xs leading-5 text-[#777168]">
              {Number.isNaN(orderDate.getTime())
                ? ""
                : orderDate.toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
            </p>
          </div>
        </section>

        {/* Order summary */}
        <section className="mt-5 min-w-0 border border-[#e5ddd3] bg-white p-4 sm:mt-7 sm:p-6 md:p-8">
          <h2 className="font-serif text-xl sm:text-2xl">
            Order summary
          </h2>

          <div className="mt-5 space-y-4 sm:mt-6 sm:space-y-5">
            {order.items.map((item, index) => (
              <div
                key={`${item.perfumeId}-${index}`}
                className="flex min-w-0 items-start justify-between gap-3 border-b border-[#eee8df] pb-4 sm:gap-4 sm:pb-5"
              >
                <div className="min-w-0">
                  <p className="break-words text-sm font-medium">
                    {item.name}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#777168]">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <p className="shrink-0 text-xs sm:text-sm">
                  {currency(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-4 text-sm sm:mt-6">
            <div className="flex justify-between gap-3">
              <span className="text-[#777168]">Subtotal</span>
              <span className="shrink-0">{currency(order.subtotal)}</span>
            </div>

            <div className="flex justify-between gap-3">
              <span className="text-[#777168]">Shipping</span>
              <span className="shrink-0">
                {order.shipping === 0
                  ? "Complimentary"
                  : currency(order.shipping)}
              </span>
            </div>

            <div className="flex justify-between gap-3 border-t border-[#e5ddd3] pt-5 text-base font-medium">
              <span>Total</span>
              <span className="shrink-0">{currency(order.total)}</span>
            </div>
          </div>
        </section>

        {/* Delivery and payment information */}
        <section className="mt-5 grid min-w-0 gap-5 sm:mt-7 sm:gap-7 md:grid-cols-2">
          <div className="min-w-0 border border-[#e5ddd3] bg-white p-4 sm:p-6 md:p-7">
            <h2 className="font-serif text-xl">Delivery details</h2>

            <div className="mt-4 space-y-2 break-words text-sm leading-6 text-[#777168]">
              <p className="font-medium text-[#25231f]">
                {order.customer.fullName}
              </p>

              <p>{order.customer.address}</p>

              <p>
                {order.customer.city}, {order.customer.state} -{" "}
                {order.customer.pincode}
              </p>

              <p>{order.customer.phone}</p>

              <p>{order.customer.email}</p>
            </div>
          </div>

          <div className="min-w-0 border border-[#e5ddd3] bg-white p-4 sm:p-6 md:p-7">
            <h2 className="font-serif text-xl">Payment details</h2>

            <p className="mt-4 break-words text-sm">
              {paymentLabels[order.paymentMethod]}
            </p>

            <p className="mt-3 break-words text-sm font-medium leading-6 text-[#a18454]">
              {order.paymentStatus}
            </p>

            <p className="mt-4 text-xs leading-6 text-[#777168]">
              No payment was processed. This page does not send an order to a
              store or delivery service.
            </p>
          </div>
        </section>

        {/* Navigation buttons */}
        <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:justify-center">
          <Link
            href="/shop"
            className="flex min-h-12 items-center justify-center bg-[#292720] px-5 py-4 text-center text-[10px] tracking-[0.12em] text-white transition hover:bg-[#a18454] sm:px-7 sm:text-xs sm:tracking-[0.15em]"
          >
            CONTINUE SHOPPING
          </Link>

          <Link
            href="/"
            className="flex min-h-12 items-center justify-center border border-[#d8d0c4] px-5 py-4 text-center text-[10px] tracking-[0.12em] transition hover:bg-[#eee8df] sm:px-7 sm:text-xs sm:tracking-[0.15em]"
          >
            BACK TO HOME
          </Link>
        </div>

        <p className="mt-7 text-center text-xs leading-6 text-[#8b7968] sm:mt-8">
          ÉLANÉ — A premium fragrance portfolio demonstration.
        </p>
      </div>
    </main>
  );
}