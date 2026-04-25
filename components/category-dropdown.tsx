"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type CategoryItem = {
  name: string;
  value: string;
};

const yuzBakim: CategoryItem[] = [
  { name: "Nemlendirici", value: "nemlendirici" },
  { name: "Serum", value: "serum" },
  { name: "Temizleyici", value: "temizleyici" },
  { name: "Güneş Koruyucu", value: "güneş koruyucu" },
  { name: "Tonik", value: "tonik" },
  { name: "Maske", value: "maske" },
  { name: "Göz Kremi", value: "göz kremi" },
  { name: "Peeling", value: "peeling" },
  { name: "Yüz Yağı", value: "yüz yağı" },
  { name: "Misel Su", value: "misel su" },
  { name: "Leke Karşıtı", value: "leke karşıtı" },
  { name: "Akne Karşıtı", value: "akne karşıtı" },
  { name: "Anti-Aging", value: "anti-aging" }
];

const vucutBakim: CategoryItem[] = [
  { name: "Vücut Losyonu", value: "vücut losyonu" },
  { name: "El Kremi", value: "el kremi" },
  { name: "Dudak Bakım", value: "dudak bakım" },
  { name: "Duş Jeli", value: "duş jeli" }
];

export default function CategoryDropdown() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocumentClick(event: MouseEvent) {
      if (!rootRef.current) return;
      if (rootRef.current.contains(event.target as Node)) return;
      setOpen(false);
    }
    document.addEventListener("mousedown", onDocumentClick);
    return () => document.removeEventListener("mousedown", onDocumentClick);
  }, []);

  return (
    <div ref={rootRef} className="relative mx-auto max-w-3xl">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex w-full items-center justify-center rounded-xl border border-[#B8C7BE] bg-[#EEF2EE] px-5 py-3 text-sm font-semibold text-[#3D5A47] transition hover:bg-[#E4ECE6]"
      >
        Kategoriye Göre Ara ▾
      </button>

      {open && (
        <div className="absolute left-0 right-0 z-20 mt-2 rounded-2xl border border-[#D8E0DB] bg-white p-4 shadow-lg">
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#6B7F73]">
                Yüz Bakım
              </p>
              <div className="grid gap-1">
                {yuzBakim.map((category) => (
                  <Link
                    key={category.name}
                    href={`/urunler?kategori=${encodeURIComponent(category.value)}`}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm text-[#3D5A47] transition hover:bg-[#EEF2EE]"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="h-px bg-[#E3E9E5]" />

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#6B7F73]">
                Vücut Bakım
              </p>
              <div className="grid gap-1">
                {vucutBakim.map((category) => (
                  <Link
                    key={category.name}
                    href={`/urunler?kategori=${encodeURIComponent(category.value)}`}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm text-[#3D5A47] transition hover:bg-[#EEF2EE]"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
