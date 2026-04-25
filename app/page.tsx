import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { toTitleCase } from "@/lib/utils";
import { trendingProducts } from "@/lib/trending";

type ProductRow = {
  id: string | number;
  ad: string;
  marka: string;
  kategori: string;
};

export default async function HomePage() {
  const { data, error } = await supabase
    .from("urunler")
    .select("id, ad, marka, kategori")
    .order("id", { ascending: false })
    .limit(6);

  const popularProducts: ProductRow[] = (data ?? []) as ProductRow[];

  return (
    <>
      <section className="mb-14 text-center">
        <h1 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-[#1F3328] md:text-5xl">
          Türkiye&apos;nin Cilt Bakım Karşılaştırma Platformu
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-[#4F6657] md:text-lg">
          122 sitede en ucuz fiyatı bul, sahte ürünlerden korun
        </p>

        <div className="mx-auto mt-9 flex w-full max-w-4xl items-center rounded-2xl border border-[#C5D2CA] bg-white p-2.5 shadow-md">
          <input
            type="text"
            placeholder="Ürün, marka, içerik veya sorun ara... (örn: CeraVe, niacinamide, gözenek)"
            className="h-14 w-full rounded-xl px-5 text-base text-[#1F3328] outline-none placeholder:text-[#7E9186] md:text-lg"
          />
          <button
            type="button"
            className="h-14 rounded-xl bg-[#3D5A47] px-7 text-base font-semibold text-white transition hover:opacity-90"
          >
            Ara
          </button>
        </div>
      </section>

      {/* TikTok Trending Section */}
      <section className="mb-14 overflow-hidden rounded-3xl bg-gradient-to-br from-[#2D1B69] via-[#7C3AED] to-[#DB2777] p-6 md:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              🎵 TikTok&apos;ta Şu An Trend
            </h2>
            <p className="mt-1 text-sm text-purple-200">
              Sosyal medyada viral olan ürünler
            </p>
          </div>
          <Link
            href="/trend"
            className="shrink-0 rounded-xl border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            Tümünü Gör
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {trendingProducts.map((product) => (
            <article
              key={product.id}
              className="flex w-52 shrink-0 flex-col rounded-2xl bg-white/10 p-4 backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/15"
            >
              <span className="mb-3 inline-flex w-fit items-center gap-1 rounded-full bg-pink-500 px-2.5 py-0.5 text-xs font-bold text-white">
                🔥 TikTok&apos;ta Viral
              </span>

              <p className="text-xs font-semibold uppercase tracking-wide text-purple-200">
                {product.marka}
              </p>
              <h3 className="mt-1 flex-1 text-sm font-bold leading-snug text-white">
                {product.ad}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-purple-100">
                {product.aciklama}
              </p>

              <Link
                href="/urunler"
                className="mt-4 rounded-xl bg-white px-4 py-2 text-center text-xs font-bold text-purple-700 transition hover:bg-purple-50"
              >
                İncele
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-2xl font-semibold text-[#1F3328]">Popüler Ürünler</h2>
          <Link href="/urunler" className="text-sm font-medium text-[#3D5A47] hover:underline">
            Tümünü Gör
          </Link>
        </div>

        {error ? (
          <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            Ürünler yüklenirken bir hata oluştu.
          </p>
        ) : popularProducts.length === 0 ? (
          <p className="rounded-2xl border border-[#D8E0DB] bg-white p-4 text-sm text-[#5D7264]">
            Henüz görüntülenecek ürün bulunmuyor.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popularProducts.map((product) => (
              <article
                key={product.id}
                className="rounded-2xl border border-[#D8E0DB] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-[#708375]">
                  {toTitleCase(product.marka)}
                </p>
                <h3 className="mt-2 min-h-[52px] text-base font-semibold text-[#1F3328]">
                  {product.ad}
                </h3>
                <p className="mt-4 inline-block rounded-full bg-[#EEF2EE] px-3 py-1 text-xs font-medium text-[#3D5A47]">
                  {product.kategori}
                </p>

                <Link
                  href={`/product/${product.id}`}
                  className="mt-5 inline-block text-sm font-semibold text-[#3D5A47] hover:underline"
                >
                  Ürünü İncele
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
