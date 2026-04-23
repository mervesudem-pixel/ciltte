type SearchPageProps = {
  searchParams: {
    q?: string;
  };
};

const sampleResults = [
  {
    id: "cerave-moisturizing-cream",
    name: "CeraVe Moisturizing Cream",
    lowestPrice: "579 TL"
  },
  {
    id: "sebamed-clear-face-gel",
    name: "Sebamed Clear Face Gel",
    lowestPrice: "349 TL"
  }
];

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q ?? "";

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Arama Sonuclari</h1>
      <p className="text-slate-700">
        Aranan ifade: <span className="font-semibold">{query || "tum urunler"}</span>
      </p>

      <div className="space-y-2">
        {sampleResults.map((item) => (
          <article key={item.id} className="rounded-lg border bg-white p-4">
            <h2 className="font-medium">{item.name}</h2>
            <p className="text-sm text-slate-600">En dusuk fiyat: {item.lowestPrice}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
