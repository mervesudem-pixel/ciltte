import Link from "next/link";
import { supabase } from "@/lib/supabase";

const PRODUCTS_PER_PAGE = 20;

type ProductRow = {
  id: string | number;
  ad: string;
  marka: string;
  kategori: string;
};

type UrunlerPageProps = {
  searchParams?: {
    kategori?: string;
    page?: string;
  };
};

function buildPageHref(page: number, kategori?: string) {
  const params = new URLSearchParams();
  params.set("page", String(page));
  if (kategori) params.set("kategori", kategori);
  return `/urunler?${params.toString()}`;
}

export default async function UrunlerPage({ searchParams }: UrunlerPageProps) {
  const currentCategory = searchParams?.kategori?.trim() || "";
  const currentPage = Math.max(Number(searchParams?.page || "1") || 1, 1);

  const { data, error } = await supabase
    .from("urunler")
    .select("id, ad, marka, kategori")
    .order("id", { ascending: false });

  const allProducts: ProductRow[] = (data ?? []) as ProductRow[];

  const categories = Array.from(
    new Set(allProducts.map((p) => p.kategori).filter((value) => value && value.trim().length > 0))
  ).sort((a, b) => a.localeCompare(b, "tr"));

  const filteredProducts = currentCategory
    ? allProducts.filter((product) => product.kategori === currentCategory)
    : allProducts;

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  return (
    <div className="space-y-8 rounded-3xl bg-[#F7F4EF] p-6 md:p-10">
      <header className="flex flex-col gap-5 border-b border-[#D9D1C4] pb-6 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="text-3xl font-bold tracking-tight text-[#3D5A47]">
          ciltte.
        </Link>
        <nav className="flex items-center gap-7 text-sm font-medium text-[#3D5A47]">
          <Link href="/" className="transition-opacity hover:opacity-70">
            Ana Sayfa
          </Link>
          <Link href="/urunler" className="transition-opacity hover:opacity-70">
            Ürünler
          </Link>
          <Link href="/urunler" className="transition-opacity hover:opacity-70">
            Markalar
          </Link>
        </nav>
      </header>

      <section className="space-y-4">
        <h1 className="text-3xl font-bold text-[#1F3328]">Tüm Ürünler</h1>
        <p className="text-[#5D7264]">
          Toplam {filteredProducts.length} ürün görüntüleniyor.
        </p>
      </section>

      <section className="rounded-2xl border border-[#D8E0DB] bg-white p-5">
        <form action="/urunler" method="get" className="flex flex-col gap-3 md:flex-row md:items-end">
          <div className="w-full md:max-w-sm">
            <label htmlFor="kategori" className="mb-2 block text-sm font-medium text-[#3D5A47]">
              Kategoriye göre filtrele
            </label>
            <select
              id="kategori"
              name="kategori"
              defaultValue={currentCategory}
              className="h-11 w-full rounded-xl border border-[#CCD8D1] bg-white px-3 text-sm text-[#1F3328] outline-none focus:border-[#3D5A47]"
            >
              <option value="">Tüm kategoriler</option>
              {categories.map((kategori) => (
                <option key={kategori} value={kategori}>
                  {kategori}
                </option>
              ))}
            </select>
          </div>
          <input type="hidden" name="page" value="1" />
          <button
            type="submit"
            className="h-11 rounded-xl bg-[#3D5A47] px-5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Filtrele
          </button>
        </form>
      </section>

      {error ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Ürünler yüklenirken bir hata oluştu.
        </p>
      ) : paginatedProducts.length === 0 ? (
        <p className="rounded-2xl border border-[#D8E0DB] bg-white p-4 text-sm text-[#5D7264]">
          Bu filtre için ürün bulunamadı.
        </p>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {paginatedProducts.map((product) => (
            <article
              key={product.id}
              className="rounded-2xl border border-[#D8E0DB] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-[#708375]">
                {product.marka}
              </p>
              <h2 className="mt-2 min-h-[52px] text-base font-semibold text-[#1F3328]">
                {product.ad}
              </h2>
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
        </section>
      )}

      {!error && totalPages > 1 && (
        <nav className="flex items-center justify-center gap-2">
          <Link
            href={buildPageHref(Math.max(1, safePage - 1), currentCategory || undefined)}
            className={`rounded-lg border px-3 py-2 text-sm ${
              safePage === 1
                ? "pointer-events-none border-[#D8E0DB] bg-white text-[#9AA9A0]"
                : "border-[#B8C7BE] bg-white text-[#3D5A47] hover:bg-[#EEF2EE]"
            }`}
          >
            Önceki
          </Link>
          <span className="px-2 text-sm font-medium text-[#4F6657]">
            Sayfa {safePage} / {totalPages}
          </span>
          <Link
            href={buildPageHref(Math.min(totalPages, safePage + 1), currentCategory || undefined)}
            className={`rounded-lg border px-3 py-2 text-sm ${
              safePage === totalPages
                ? "pointer-events-none border-[#D8E0DB] bg-white text-[#9AA9A0]"
                : "border-[#B8C7BE] bg-white text-[#3D5A47] hover:bg-[#EEF2EE]"
            }`}
          >
            Sonraki
          </Link>
        </nav>
      )}
    </div>
  );
}
