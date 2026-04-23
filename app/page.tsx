import Link from "next/link";

const categories = [
  "Nemlendirici",
  "Serum",
  "Güneş Kremi",
  "Temizleyici",
  "Maske"
];

const popularProducts = [
  {
    id: "la-roche-posay-anthelios",
    name: "Anthelios UVMune 400 SPF50+",
    brand: "La Roche-Posay",
    lowestPrice: "879 TL",
    stores: 34
  },
  {
    id: "cerave-moisturizing-cream",
    name: "Moisturizing Cream 340g",
    brand: "CeraVe",
    lowestPrice: "529 TL",
    stores: 41
  },
  {
    id: "bioderma-sensibio-gel",
    name: "Sensibio Gel Moussant",
    brand: "Bioderma",
    lowestPrice: "619 TL",
    stores: 29
  },
  {
    id: "vichy-mineral-89",
    name: "Minéral 89 Hyaluronik Serum",
    brand: "Vichy",
    lowestPrice: "749 TL",
    stores: 26
  },
  {
    id: "the-ordinary-niacinamide",
    name: "Niacinamide 10% + Zinc 1%",
    brand: "The Ordinary",
    lowestPrice: "399 TL",
    stores: 38
  },
  {
    id: "cosrx-snail-mucin",
    name: "Advanced Snail 96 Mucin Essence",
    brand: "COSRX",
    lowestPrice: "689 TL",
    stores: 22
  }
];

export default function HomePage() {
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

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popularProducts.map((product) => (
            <article
              key={product.id}
              className="rounded-2xl border border-[#D8E0DB] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-[#708375]">
                {product.brand}
              </p>
              <h3 className="mt-2 min-h-[52px] text-base font-semibold text-[#1F3328]">
                {product.name}
              </h3>

              <div className="mt-5 flex items-end justify-between">
                <div>
                  <p className="text-xs text-[#7C8C82]">En düşük fiyat</p>
                  <p className="text-xl font-bold text-[#3D5A47]">{product.lowestPrice}</p>
                </div>
                <p className="text-sm text-[#5D7264]">{product.stores} mağaza</p>
              </div>

              <Link
                href={`/product/${product.id}`}
                className="mt-5 inline-block text-sm font-semibold text-[#3D5A47] hover:underline"
              >
                Fiyatları Karşılaştır
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
