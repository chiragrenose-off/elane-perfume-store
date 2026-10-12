
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Perfume } from "../../lib/products";
import { useCart } from "../../lib/cart-context";

type ProductPurchaseProps = {
  perfume: Perfume;
};

const DIRECT_CHECKOUT_KEY = "elane-direct-checkout";

export default function ProductPurchase({
  perfume,
}: ProductPurchaseProps) {
  const { addToCart } = useCart();
  const router = useRouter();

  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  function handleAddToCart() {
    if (perfume.stock <= 0) return;

    addToCart(perfume, quantity);
    setMessage(`${perfume.name} added to your cart.`);
  }

  function handleBuyNow() {
    if (perfume.stock <= 0) return;

    try {
      const directCheckout = [
        {
          perfume,
          quantity: Math.min(quantity, perfume.stock),
        },
      ];

      localStorage.setItem(
        DIRECT_CHECKOUT_KEY,
        JSON.stringify(directCheckout)
      );

      setMessage("");
      router.push("/checkout?mode=direct");
    } catch (error) {
      console.error("Could not prepare direct checkout:", error);
      setMessage("Could not start checkout. Please try again.");
    }
  }

  return (
    <div className="mt-8">
      <div className="mb-5 flex flex-wrap items-center gap-5">
        <label
          htmlFor={`product-quantity-${perfume.id}`}
          className="text-xs uppercase tracking-[0.2em] text-[#8b7968]"
        >
          Quantity
        </label>

        <div className="flex items-center border border-[#ded7ce] bg-white">
          <button
            type="button"
            onClick={() => {
              setQuantity((current) => Math.max(1, current - 1));
              setMessage("");
            }}
            disabled={quantity <= 1 || perfume.stock === 0}
            className="px-4 py-3 text-lg disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Decrease quantity"
          >
            −
          </button>

          <input
            id={`product-quantity-${perfume.id}`}
            type="number"
            min={1}
            max={perfume.stock}
            value={quantity}
            onChange={(event) => {
              const value = Number(event.target.value);

              if (event.target.value === "") {
                setQuantity(1);
              } else if (Number.isFinite(value)) {
                setQuantity(
                  Math.min(perfume.stock, Math.max(1, Math.floor(value)))
                );
              }

              setMessage("");
            }}
            className="w-12 bg-transparent text-center text-sm outline-none"
            disabled={perfume.stock === 0}
          />

          <button
            type="button"
            onClick={() => {
              setQuantity((current) =>
                Math.min(perfume.stock, current + 1)
              );
              setMessage("");
            }}
            disabled={quantity >= perfume.stock || perfume.stock === 0}
            className="px-4 py-3 text-lg disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <span className="text-xs text-[#8b7968]">
          {perfume.stock} available
        </span>
      </div>

      <div className="space-y-3">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={perfume.stock === 0}
          className="w-full bg-[#211c18] px-6 py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-[#44372b] disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {perfume.stock > 0 ? "Add to Cart" : "Sold Out"}
        </button>

        <button
          type="button"
          onClick={handleBuyNow}
          disabled={perfume.stock === 0}
          className="w-full border border-[#211c18] bg-transparent px-6 py-4 text-xs uppercase tracking-[0.2em] text-[#211c18] transition hover:bg-[#eee8df] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {perfume.stock > 0 ? "Buy Now — Checkout" : "Sold Out"}
        </button>
      </div>

      {message && (
        <p role="status" className="mt-3 text-sm text-green-700">
          {message}
        </p>
      )}

      <p className="mt-3 text-sm text-[#74685c]">
        Item total: ₹{(perfume.price * quantity).toLocaleString("en-IN")}
      </p>
    </div>
  );
}
