import Link from "next/link";
import { supabase } from "@/lib/supabase";
import UrunlerCatalog from "@/components/urunler-catalog";

type ProductRow = {
  id: string | number;
  ad: string;
  marka: string;
  kategori: string;
};

export default async function UrunlerPage() {
  const { data, error } = await supabase
    .from("urunler")
    .select("id, ad, marka, kategori")
    .order("id", { ascending: false });

  const allProducts: ProductRow[] = (data ?? []) as ProductRow[];

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
          <Link href="/cilt-analizi" className="transition-opacity hover:opacity-70">
            Cilt Analizi
          </Link>
          <Link href="/urunler" className="transition-opacity hover:opacity-70">
            Markalar
          </Link>
        </nav>
      </header>

      {error ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Ürünler yüklenirken bir hata oluştu.
        </p>
      ) : (
        <UrunlerCatalog products={allProducts} />
      )}
    </div>
  );
}
