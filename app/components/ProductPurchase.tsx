
"use client";

import { useState } from "react";
import type { Perfume } from "../../lib/products";
import { useCart } from "../../lib/cart-context";

type ProductPurchaseProps = {
  perfume: Perfume;
};

export default function ProductPurchase({
  perfume,
}: ProductPurchaseProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  function handleAddToCart() {
    if (perfume.stock <= 0) return;

    addToCart(perfume, quantity);
    setMessage(`${perfume.name} added to your cart.`);
  }

  return (
    <div className="mt-8">
      <div className="mb-5 flex items-center gap-5">
        <label
          htmlFor="product-quantity"
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
            id="product-quantity"
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
            className="w-12 appearance-none bg-transparent text-center text-sm outline-none"
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

      <button
        type="button"
        onClick={handleAddToCart}
        disabled={perfume.stock === 0}
        className="w-full bg-[#211c18] px-6 py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-[#44372b] disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {perfume.stock > 0 ? "Add to Cart" : "Sold Out"}
      </button>

      {message && (
        <p
          role="status"
          className="mt-3 text-sm text-green-700"
        >
          {message}
        </p>
      )}

      <p className="mt-3 text-sm text-[#74685c]">
        Item total: ₹{(perfume.price * quantity).toLocaleString("en-IN")}
      </p>
    </div>
  );
}
