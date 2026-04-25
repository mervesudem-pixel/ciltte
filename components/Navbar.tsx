"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/urunler", label: "Ürünler" },
  { href: "/cilt-analizi", label: "Cilt Analizi" },
  { href: "/markalar", label: "Markalar" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="flex flex-col gap-5 border-b border-[#D9D1C4] pb-6 md:flex-row md:items-center md:justify-between">
      <Link href="/" className="text-3xl font-bold tracking-tight text-[#3D5A47]">
        ciltte.
      </Link>
      <nav className="flex items-center gap-7 text-sm font-medium text-[#3D5A47]">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`transition-opacity hover:opacity-70 ${
              pathname === href ? "underline underline-offset-4" : ""
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
