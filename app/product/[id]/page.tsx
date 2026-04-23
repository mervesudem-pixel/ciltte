import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

type ProductDetailPageProps = {
  params: {
    id: string;
  };
};

type ProductRow = {
  id: string | number;
  ad: string;
  marka: string;
  kategori: string;
};

const mockPrices = [
  {
    satici: "Trendyol",
    fiyat: "485 TL",
    guvenSkoru: "Doğrulanmış",
    link: "https://www.trendyol.com"
  },
  {
    satici: "Watsons",
    fiyat: "510 TL",
    guvenSkoru: "Doğrulanmış",
    link: "https://www.watsons.com.tr"
  },
  {
    satici: "XYZ Kozmetik",
    fiyat: "320 TL",
    guvenSkoru: "Doğrulanmamış - riskli",
    link: "#"
  }
];

const sampleIngredients = ["Niacinamide", "Hyaluronic Acid", "Ceramide NP"];

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { data, error } = await supabase
    .from("urunler")
    .select("id, ad, marka, kategori")
    .eq("id", params.id)
    .maybeSingle();

  if (error) {
    return (
      <section className="rounded-3xl bg-[#F7F4EF] p-6 md:p-10">
        <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Ürün bilgisi alınırken bir hata oluştu.
        </p>
      </section>
    );
  }

  if (!data) {
    notFound();
  }

  const product = data as ProductRow;

  return (
    <section className="space-y-8 rounded-3xl bg-[#F7F4EF] p-6 md:p-10">
      <header className="rounded-2xl border border-[#D8E0DB] bg-white p-6">
        <p className="text-sm font-medium text-[#708375]">{product.kategori}</p>
        <h1 className="mt-2 text-3xl font-bold text-[#1F3328]">{product.ad}</h1>
        <p className="mt-2 text-base text-[#4F6657]">Marka: {product.marka}</p>
      </header>

      <section className="rounded-2xl border border-[#D8E0DB] bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold text-[#1F3328]">Fiyat Karşılaştırması</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#E5ECE8] text-sm">
            <thead>
              <tr className="text-left text-[#5D7264]">
                <th className="px-3 py-3 font-semibold">Satıcı</th>
                <th className="px-3 py-3 font-semibold">Fiyat</th>
                <th className="px-3 py-3 font-semibold">Güven Skoru</th>
                <th className="px-3 py-3 font-semibold">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF2EE]">
              {mockPrices.map((item) => (
                <tr key={item.satici}>
                  <td className="px-3 py-3 font-medium text-[#1F3328]">{item.satici}</td>
                  <td className="px-3 py-3 font-semibold text-[#3D5A47]">{item.fiyat}</td>
                  <td
                    className={`px-3 py-3 ${
                      item.guvenSkoru.includes("riskli") ? "text-red-700" : "text-emerald-700"
                    }`}
                  >
                    {item.guvenSkoru}
                  </td>
                  <td className="px-3 py-3">
                    <Link
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-[#3D5A47] hover:underline"
                    >
                      Satıcıya Git
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-[#D8E0DB] bg-white p-6">
        <h2 className="text-xl font-semibold text-[#1F3328]">İçerik Analizi</h2>
        <p className="mt-3 inline-block rounded-full bg-[#EEF2EE] px-4 py-2 text-sm font-semibold text-[#3D5A47]">
          Güvenlik Skoru: 92/100
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {sampleIngredients.map((ingredient) => (
            <span
              key={ingredient}
              className="rounded-full border border-[#CCD8D1] bg-[#FAFCFB] px-3 py-1 text-sm text-[#3D5A47]"
            >
              {ingredient}
            </span>
          ))}
        </div>
      </section>

      <div>
        <button
          type="button"
          className="w-full rounded-xl bg-[#3D5A47] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 md:w-auto"
        >
          Sahte Ürün Bildir
        </button>
      </div>
    </section>
  );
}
