
import type { Metadata } from "next";
import "./globals.css";
import CartProviderWrapper from "./components/CartProviderWrapper";

export const metadata: Metadata = {
  title: "ÉLANÉ | Premium Perfumes",
  description:
    "Discover refined fragrances and premium perfumes crafted to express your individuality.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <CartProviderWrapper>{children}</CartProviderWrapper>
      </body>
    </html>
  );
}