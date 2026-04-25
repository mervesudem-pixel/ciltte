import { supabase } from "@/lib/supabase";
import { toTitleCase } from "@/lib/utils";
import MarkalargGrid from "@/components/markalar-grid";

export default async function MarkalargPage() {
  const { data, error } = await supabase
    .from("urunler")
    .select("marka");

  if (error) {
    return (
      <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        Markalar yüklenirken bir hata oluştu.
      </p>
    );
  }

  const countMap = new Map<string, number>();
  for (const row of data ?? []) {
    if (!row.marka) continue;
    const name = toTitleCase(row.marka);
    countMap.set(name, (countMap.get(name) ?? 0) + 1);
  }

  const brands = Array.from(countMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name, "tr"));

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-[#1F3328] md:text-4xl">Markalar</h1>
        <p className="mt-2 text-[#5D7264]">
          Tüm markaları keşfet — {brands.length} marka, binlerce ürün
        </p>
      </header>

      <MarkalargGrid brands={brands} />
    </div>
  );
}
