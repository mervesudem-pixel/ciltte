import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

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
        <main className="mx-auto min-h-screen max-w-5xl px-4 py-8">
          <div className="rounded-3xl bg-[#F7F4EF] p-6 md:p-10 space-y-8">
            <Navbar />
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
