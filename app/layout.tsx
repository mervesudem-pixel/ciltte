import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ciltte - Skincare Price Comparison",
  description: "Compare skincare product prices across stores in Turkey."
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>
        <main className="mx-auto min-h-screen max-w-5xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
