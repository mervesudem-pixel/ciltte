import Link from "next/link";
import { supabase } from "@/lib/supabase";

const categories = [
  "Nemlendirici",
  "Serum",
  "Güneş Kremi",
  "Temizleyici",
  "Maske"
];

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
    .limit(6);

  const popularProducts: ProductRow[] = (data ?? []) as ProductRow[];

  return (
    <div className="rounded-3xl bg-[#F7F4EF] p-6 md:p-10">
      <header className="mb-14 flex flex-col gap-5 border-b border-[#D9D1C4] pb-6 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="text-3xl font-bold tracking-tight text-[#3D5A47]">
          ciltte.
        </Link>
        <nav className="flex items-center gap-7 text-sm font-medium text-[#3D5A47]">
          <Link href="/" className="transition-opacity hover:opacity-70">
            Ana Sayfa
          </Link>
          <Link href="/search" className="transition-opacity hover:opacity-70">
            Ürünler
          </Link>
          <Link href="/search" className="transition-opacity hover:opacity-70">
            Markalar
          </Link>
        </nav>
      </header>

      <section className="mb-12 text-center">
        <h1 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-[#1F3328] md:text-5xl">
          Türkiye&apos;nin Cilt Bakım Karşılaştırma Platformu
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-[#4F6657] md:text-lg">
          122 sitede en ucuz fiyatı bul, sahte ürünlerden korun
        </p>

        <div className="mx-auto mt-8 flex w-full max-w-3xl items-center rounded-2xl border border-[#CFD8D1] bg-white p-2 shadow-sm">
          <input
            type="text"
            placeholder="Ürün, marka veya içerik ara..."
            className="h-12 w-full rounded-xl px-4 text-base text-[#1F3328] outline-none placeholder:text-[#8A998F]"
          />
          <button
            type="button"
            className="h-12 rounded-xl bg-[#3D5A47] px-6 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Ara
          </button>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/search?q=${encodeURIComponent(category)}`}
              className="rounded-full border border-[#B8C7BE] bg-white px-5 py-2 text-sm font-medium text-[#3D5A47] transition hover:bg-[#EEF2EE]"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-2xl font-semibold text-[#1F3328]">Popüler Ürünler</h2>
          <Link href="/search" className="text-sm font-medium text-[#3D5A47] hover:underline">
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
                  {product.marka}
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
    </div>
  );
}
