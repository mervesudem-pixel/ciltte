"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { toTitleCase } from "@/lib/utils";

const PRODUCTS_PER_PAGE = 20;

const yuzBakim = [
  "Nemlendirici",
  "Serum",
  "Temizleyici",
  "Tonik",
  "Maske",
  "Göz Kremi",
  "Peeling",
  "Yüz Yağı",
  "Misel Su",
  "Köpük Temizleyici",
  "Leke Karşıtı",
  "Akne Karşıtı",
  "Anti-Aging",
  "Dudak Bakım",
  "Güneş Koruyucu"
];

const vucutBakim = [
  "Vücut Losyonu",
  "Vücut Yağı",
  "El Kremi",
  "Duş Jeli",
  "Deodorant",
  "Bronzlaştırıcı"
];

const ciltTipleri = ["Normal", "Kuru", "Yağlı", "Karma", "Hassas", "Atopik"];

const ciltSorunlari = [
  "Sivilce/Akne",
  "Siyah Nokta",
  "Beyaz Nokta",
  "Leke",
  "Kızarıklık",
  "Gözenek",
  "Kuruluk",
  "Anti-Aging",
  "Hassasiyet",
  "Bariyer Hasarı"
];

type Product = {
  id: string | number;
  ad: string;
  marka: string;
  kategori: string;
};

type Props = {
  products: Product[];
};

function estimatedPrice(id: string | number) {
  const raw = String(id);
  const base = raw.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return 150 + (base % 1850);
}

function CheckboxGroup({
  title,
  options,
  selected,
  onToggle
}: {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#6D8275]">{title}</p>
      <div className="space-y-1">
        {options.map((option) => {
          const checked = selected.includes(option);
          return (
            <label key={option} className="flex cursor-pointer items-center gap-2 rounded-md p-1 hover:bg-[#F6F9F7]">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(option)}
                className="h-4 w-4 accent-[#3D5A47]"
              />
              <span className="text-sm text-[#2E4838]">{option}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default function UrunlerCatalog({ products }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCiltTipleri, setSelectedCiltTipleri] = useState<string[]>([]);
  const [selectedSorunlar, setSelectedSorunlar] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(2000);

  function toggle(setter: Dispatch<SetStateAction<string[]>>, value: string) {
    setter((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  }

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const kategoriOk =
        selectedCategories.length === 0 || selectedCategories.includes(product.kategori);
      const fiyatOk = estimatedPrice(product.id) <= maxPrice;
      return kategoriOk && fiyatOk;
    });
  }, [products, selectedCategories, maxPrice]);

  useEffect(() => {
    setPage(1);
  }, [selectedCategories, selectedCiltTipleri, selectedSorunlar, maxPrice]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PRODUCTS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (safePage - 1) * PRODUCTS_PER_PAGE,
    safePage * PRODUCTS_PER_PAGE
  );

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <h1 className="text-3xl font-bold text-[#1F3328]">Tüm Ürünler</h1>
        <p className="text-[#5D7264]">Filtreye uygun {filtered.length} ürün listeleniyor.</p>
      </section>

      <button
        type="button"
        onClick={() => setMobileOpen((prev) => !prev)}
        className="w-full rounded-xl border border-[#B8C7BE] bg-white px-4 py-3 text-left text-sm font-semibold text-[#3D5A47] md:hidden"
      >
        Filtreler {mobileOpen ? "▲" : "▼"}
      </button>

      <div className="grid gap-6 md:grid-cols-[290px_1fr]">
        <aside className={`${mobileOpen ? "block" : "hidden"} space-y-5 rounded-2xl border border-[#D8E0DB] bg-white p-4 md:block`}>
          <CheckboxGroup
            title="Kategori - Yüz Bakım"
            options={yuzBakim}
            selected={selectedCategories}
            onToggle={(value) => toggle(setSelectedCategories, value)}
          />
          <CheckboxGroup
            title="Kategori - Vücut Bakım"
            options={vucutBakim}
            selected={selectedCategories}
            onToggle={(value) => toggle(setSelectedCategories, value)}
          />
          <CheckboxGroup
            title="Cilt Tipi"
            options={ciltTipleri}
            selected={selectedCiltTipleri}
            onToggle={(value) => toggle(setSelectedCiltTipleri, value)}
          />
          <CheckboxGroup
            title="Cilt Sorunu"
            options={ciltSorunlari}
            selected={selectedSorunlar}
            onToggle={(value) => toggle(setSelectedSorunlar, value)}
          />

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#6D8275]">
              Fiyat Aralığı
            </p>
            <input
              type="range"
              min={0}
              max={2000}
              step={50}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#3D5A47]"
            />
            <p className="text-sm text-[#3D5A47]">0 TL - {maxPrice} TL</p>
          </div>
        </aside>

        <section className="space-y-4">
          {pageItems.length === 0 ? (
            <p className="rounded-2xl border border-[#D8E0DB] bg-white p-4 text-sm text-[#5D7264]">
              Bu filtre kombinasyonu için ürün bulunamadı.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {pageItems.map((product) => (
                <article
                  key={product.id}
                  className="rounded-2xl border border-[#D8E0DB] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#708375]">
                    {toTitleCase(product.marka)}
                  </p>
                  <h2 className="mt-2 min-h-[52px] text-base font-semibold text-[#1F3328]">
                    {product.ad}
                  </h2>
                  <p className="mt-4 inline-block rounded-full bg-[#EEF2EE] px-3 py-1 text-xs font-medium text-[#3D5A47]">
                    {product.kategori}
                  </p>
                  <p className="mt-2 text-sm text-[#5D7264]">Tahmini fiyat: {estimatedPrice(product.id)} TL</p>
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

          {totalPages > 1 && (
            <nav className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className={`rounded-lg border px-3 py-2 text-sm ${
                  safePage === 1
                    ? "cursor-not-allowed border-[#D8E0DB] bg-white text-[#9AA9A0]"
                    : "border-[#B8C7BE] bg-white text-[#3D5A47] hover:bg-[#EEF2EE]"
                }`}
              >
                Önceki
              </button>
              <span className="px-2 text-sm font-medium text-[#4F6657]">
                Sayfa {safePage} / {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                className={`rounded-lg border px-3 py-2 text-sm ${
                  safePage === totalPages
                    ? "cursor-not-allowed border-[#D8E0DB] bg-white text-[#9AA9A0]"
                    : "border-[#B8C7BE] bg-white text-[#3D5A47] hover:bg-[#EEF2EE]"
                }`}
              >
                Sonraki
              </button>
            </nav>
          )}
        </section>
      </div>
    </div>
  );
}
