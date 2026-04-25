"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Brand = {
  name: string;
  count: number;
};

export default function MarkalargGrid({ brands }: { brands: Brand[] }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLocaleLowerCase("tr");
    if (!q) return brands;
    return brands.filter((b) => b.name.toLocaleLowerCase("tr").includes(q));
  }, [brands, search]);

  return (
    <div className="space-y-6">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Marka ara..."
        className="h-12 w-full rounded-2xl border border-[#CCD8D1] bg-white px-5 text-sm text-[#1F3328] outline-none transition focus:border-[#3D5A47] focus:ring-2 focus:ring-[#3D5A47]/10 placeholder:text-[#7E9186]"
      />

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-[#D8E0DB] bg-white p-4 text-sm text-[#5D7264]">
          &quot;{search}&quot; ile eşleşen marka bulunamadı.
        </p>
      ) : (
        <>
          <p className="text-sm text-[#5D7264]">{filtered.length} marka listeleniyor</p>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {filtered.map((brand) => (
              <Link
                key={brand.name}
                href={`/urunler?marka=${encodeURIComponent(brand.name)}`}
                className="group rounded-2xl border border-[#D8E0DB] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#3D5A47] hover:shadow-md"
              >
                <h3 className="font-semibold text-[#1F3328] transition group-hover:text-[#3D5A47]">
                  {brand.name}
                </h3>
                <p className="mt-1.5 text-sm text-[#708375]">{brand.count} ürün</p>
                <span className="mt-3 inline-block text-xs font-medium text-[#3D5A47] opacity-0 transition group-hover:opacity-100">
                  Ürünleri gör →
                </span>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
