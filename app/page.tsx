import Link from "next/link";

const featuredProducts = [
  { id: "cerave-foaming-cleanser", name: "CeraVe Foaming Cleanser" },
  { id: "la-roche-posay-cicaplast", name: "La Roche-Posay Cicaplast Baume B5+" },
  { id: "bioderma-sensibio-h2o", name: "Bioderma Sensibio H2O" }
];

export default function HomePage() {
  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Ciltte</h1>
        <p className="text-slate-600">
          Turkiye genelindeki eczane ve online magazalarda cilt bakim urunu
          fiyatlarini karsilastirin.
        </p>
      </header>

      <div className="rounded-lg border bg-white p-4">
        <p className="mb-3 text-sm font-medium text-slate-700">Hizli erisim</p>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/search?q=temizleyici"
            className="rounded-md bg-slate-900 px-3 py-2 text-sm text-white"
          >
            Temizleyici ara
          </Link>
          <Link
            href="/search?q=nemlendirici"
            className="rounded-md bg-slate-900 px-3 py-2 text-sm text-white"
          >
            Nemlendirici ara
          </Link>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">One cikan urunler</h2>
        <ul className="space-y-2">
          {featuredProducts.map((product) => (
            <li key={product.id} className="rounded-lg border bg-white p-4">
              <Link className="font-medium text-slate-900" href={`/product/${product.id}`}>
                {product.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
