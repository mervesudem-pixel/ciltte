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

  if (error) {
    return (
      <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        Ürünler yüklenirken bir hata oluştu.
      </p>
    );
  }

  return <UrunlerCatalog products={allProducts} />;
}
