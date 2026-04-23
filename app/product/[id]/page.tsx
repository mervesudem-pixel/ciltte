type ProductDetailPageProps = {
  params: {
    id: string;
  };
};

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Urun Detayi</h1>
      <p className="text-slate-700">
        Urun kodu: <span className="font-mono">{params.id}</span>
      </p>
      <div className="rounded-lg border bg-white p-4">
        <p className="text-slate-600">
          Burada urunun ozellikleri, fiyat gecmisi ve magaza bazli fiyat
          karsilastirmasi listelenecek.
        </p>
      </div>
    </section>
  );
}
