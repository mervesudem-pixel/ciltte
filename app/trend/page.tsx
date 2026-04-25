import Link from "next/link";
import { trendingProducts } from "@/lib/trending";

export default function TrendPage() {
  return (
    <div>
      <div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-[#2D1B69] via-[#7C3AED] to-[#DB2777] p-6 md:p-10">
        <h1 className="text-3xl font-bold text-white md:text-4xl">
          🎵 TikTok&apos;ta Trend Ürünler
        </h1>
        <p className="mt-2 text-purple-200">Sosyal medyada viral olan ürünler</p>
        <p className="mt-1 text-xs text-purple-300">Bu liste haftalık güncellenir.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {trendingProducts.map((product, index) => (
          <article
            key={product.id}
            className="flex flex-col overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="bg-gradient-to-br from-[#2D1B69] via-[#7C3AED] to-[#DB2777] p-4">
              <span className="inline-flex items-center gap-1 rounded-full bg-pink-500 px-2.5 py-0.5 text-xs font-bold text-white">
                🔥 TikTok&apos;ta Viral
              </span>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-purple-200">
                {product.marka}
              </p>
              <h2 className="mt-1 text-base font-bold leading-snug text-white">
                {product.ad}
              </h2>
            </div>

            <div className="flex flex-1 flex-col p-4">
              <p className="flex-1 text-sm text-[#5D7264]">{product.aciklama}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-medium text-purple-400">
                  #{index + 1} bu hafta
                </span>
                <Link
                  href="/urunler"
                  className="rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#DB2777] px-4 py-2 text-xs font-bold text-white transition hover:opacity-90"
                >
                  İncele
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
