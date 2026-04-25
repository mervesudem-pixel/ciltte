"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Option = {
  value: string;
  label: string;
  score?: number;
};

type Question = {
  id: string;
  text: string;
  options: Option[];
};

type Zone = {
  id: "alin" | "burun" | "yanaklar" | "cene" | "gozAlti";
  label: string;
  questions: Question[];
};

const generalQuestions: Question[] = [
  {
    id: "mevsim",
    text: "Mevsim değişimlerinde cildin nasıl tepki veriyor?",
    options: [
      { value: "kuruyor", label: "Çok kuruyup pullanıyor", score: 2 },
      { value: "yaglanma", label: "Yağlanıp parlıyor", score: 2 },
      { value: "stabil", label: "Çok fazla değişmiyor", score: 0 },
      { value: "karma", label: "Hem kuruyor hem yağlanıyor", score: 1 }
    ]
  },
  {
    id: "adet",
    text: "Adet döneminde cildinde ne oluyor?",
    options: [
      { value: "ceneSivilce", label: "Çene/boyunda sivilce çıkıyor", score: 2 },
      { value: "yag", label: "Cildim çok yağlanıyor", score: 1 },
      { value: "degismiyor", label: "Pek bir şey olmuyor", score: 0 },
      { value: "gecersiz", label: "Bu beni etkilemiyor", score: 0 }
    ]
  },
  {
    id: "su",
    text: "Günde kaç bardak su içiyorsun?",
    options: [
      { value: "1-2", label: "1-2 bardak", score: 2 },
      { value: "3-4", label: "3-4 bardak", score: 1 },
      { value: "5-6", label: "5-6 bardak", score: 0 },
      { value: "7+", label: "7+ bardak", score: 0 }
    ]
  },
  {
    id: "stres",
    text: "Stresli dönemlerde cildin nasıl?",
    options: [
      { value: "akne", label: "Sivilce/akne çıkıyor", score: 2 },
      { value: "kuruluk", label: "Kuruyor ve çekiyor", score: 2 },
      { value: "kizariklik", label: "Kızarıyor ve hassaslaşıyor", score: 2 },
      { value: "degismiyor", label: "Pek değişmiyor", score: 0 }
    ]
  },
  {
    id: "nemlendirici",
    text: "Nemlendirici sürdüğünde ne hissediyorsun?",
    options: [
      { value: "ustte", label: "Emmiyor, üstte kalıyor", score: 1 },
      { value: "hemenCekiyor", label: "Hemen çekiyor, daha fazla istiyor", score: 2 },
      { value: "normal", label: "Normal hissettiriyor", score: 0 },
      { value: "parlama", label: "Parlıyor ama kuruyunca geçiyor", score: 1 }
    ]
  }
];

const zones: Zone[] = [
  {
    id: "alin",
    label: "Alın",
    questions: [
      {
        id: "alinYag",
        text: "Yağlanıyor mu?",
        options: [
          { value: "evet", label: "Evet", score: 2 },
          { value: "hayir", label: "Hayır", score: 0 },
          { value: "bazen", label: "Bazen", score: 1 }
        ]
      },
      {
        id: "alinSiyah",
        text: "Siyah nokta var mı?",
        options: [
          { value: "cok", label: "Çok var", score: 2 },
          { value: "az", label: "Az var", score: 1 },
          { value: "yok", label: "Yok", score: 0 }
        ]
      },
      {
        id: "alinSivilce",
        text: "Sivilce çıkıyor mu?",
        options: [
          { value: "sik", label: "Sık", score: 2 },
          { value: "nadiren", label: "Nadiren", score: 1 },
          { value: "hic", label: "Hiç", score: 0 }
        ]
      },
      {
        id: "alinSac",
        text: "Saç ürünü (krem/maske) kullanıyor musun?",
        options: [
          { value: "evet", label: "Evet", score: 1 },
          { value: "hayir", label: "Hayır", score: 0 }
        ]
      },
      {
        id: "alinCizgi",
        text: "Alnında ince çizgi veya kırışık fark ediyor musun?",
        options: [
          { value: "belirgin", label: "Evet belirgin", score: 2 },
          { value: "hafif", label: "Hafif başlıyor", score: 1 },
          { value: "yok", label: "Henüz yok", score: 0 },
          { value: "fark_etmedim", label: "Hiç dikkat etmedim", score: 0 }
        ]
      }
    ]
  },
  {
    id: "burun",
    label: "Burun",
    questions: [
      {
        id: "burunSiyah",
        text: "Siyah nokta var mı?",
        options: [
          { value: "cok", label: "Çok var", score: 2 },
          { value: "az", label: "Az var", score: 1 },
          { value: "yok", label: "Yok", score: 0 }
        ]
      },
      {
        id: "burunGozenek",
        text: "Gözenekler belirgin mi?",
        options: [
          { value: "cok", label: "Çok belirgin", score: 2 },
          { value: "biraz", label: "Biraz", score: 1 },
          { value: "hayir", label: "Hayır", score: 0 }
        ]
      },
      {
        id: "burunYag",
        text: "Gün içinde yağlanıyor mu?",
        options: [
          { value: "evet", label: "Evet", score: 2 },
          { value: "hayir", label: "Hayır", score: 0 },
          { value: "bazen", label: "Bazen", score: 1 }
        ]
      },
      {
        id: "burunGozenekBuyume",
        text: "Burun üzerindeki gözenekler gün içinde büyüyor mu?",
        options: [
          { value: "cok_belirgin", label: "Evet çok belirgin", score: 2 },
          { value: "biraz", label: "Biraz", score: 1 },
          { value: "degismiyor", label: "Hayır değişmiyor", score: 0 },
          { value: "fark_etmedim", label: "Fark etmedim", score: 0 }
        ]
      }
    ]
  },
  {
    id: "yanaklar",
    label: "Yanaklar",
    questions: [
      {
        id: "yanakKuruluk",
        text: "Kuruluk/gerginlik hissediyor musun?",
        options: [
          { value: "evet", label: "Evet", score: 2 },
          { value: "bazen", label: "Bazen", score: 1 },
          { value: "hayir", label: "Hayır", score: 0 }
        ]
      },
      {
        id: "yanakKizariklik",
        text: "Kızarıklık var mı?",
        options: [
          { value: "sik", label: "Sık", score: 2 },
          { value: "bazen", label: "Bazen", score: 1 },
          { value: "hayir", label: "Hayır", score: 0 }
        ]
      },
      {
        id: "yanakNokta",
        text: "Siyah/beyaz nokta var mı?",
        options: [
          { value: "evet", label: "Evet", score: 2 },
          { value: "hayir", label: "Hayır", score: 0 }
        ]
      },
      {
        id: "yanakTelefon",
        text: "Telefonu yanağına dayayarak konuşuyor musun?",
        options: [
          { value: "evet", label: "Evet", score: 1 },
          { value: "hayir", label: "Hayır", score: 0 }
        ]
      },
      {
        id: "yanakAgrili",
        text: "Ağrılı sivilce çıkıyor mu?",
        options: [
          { value: "sik", label: "Sık", score: 2 },
          { value: "bazen", label: "Bazen", score: 1 },
          { value: "hic", label: "Hiç", score: 0 }
        ]
      },
      {
        id: "yanakGunes",
        text: "Yanakların güneşe çıkınca nasıl tepki veriyor?",
        options: [
          { value: "hemen_kizariyor", label: "Hemen kızarıyor", score: 2 },
          { value: "hafif_kizariyor", label: "Hafif kızarıyor", score: 1 },
          { value: "bronzlasiyor", label: "Normal bronzlaşıyor", score: 0 },
          { value: "pek_cikmiyorum", label: "Pek çıkmıyorum", score: 0 }
        ]
      }
    ]
  },
  {
    id: "cene",
    label: "Çene / Çene Altı",
    questions: [
      {
        id: "ceneAdet",
        text: "Adet döneminde bu bölgede sivilce çıkıyor mu?",
        options: [
          { value: "hep", label: "Evet hep", score: 2 },
          { value: "bazen", label: "Bazen", score: 1 },
          { value: "hayir", label: "Hayır", score: 0 },
          { value: "gecersiz", label: "Bu beni etkilemiyor", score: 0 }
        ]
      },
      {
        id: "ceneDerin",
        text: "Ağrılı, derin sivilce var mı?",
        options: [
          { value: "sik", label: "Sık", score: 2 },
          { value: "bazen", label: "Bazen", score: 1 },
          { value: "hic", label: "Hiç", score: 0 }
        ]
      },
      {
        id: "ceneBeyaz",
        text: "Beyaz nokta var mı?",
        options: [
          { value: "evet", label: "Evet", score: 1 },
          { value: "hayir", label: "Hayır", score: 0 }
        ]
      },
      {
        id: "ceneSiyah",
        text: "Siyah nokta var mı?",
        options: [
          { value: "cok", label: "Çok var", score: 2 },
          { value: "az", label: "Az var", score: 1 },
          { value: "yok", label: "Yok", score: 0 }
        ]
      },
      {
        id: "ceneLeke",
        text: "Çenende uzun süre geçmeyen leke var mı?",
        options: [
          { value: "cok", label: "Evet çok var", score: 2 },
          { value: "az", label: "Az var", score: 1 },
          { value: "yok", label: "Hayır yok", score: 0 },
          { value: "fark_etmedim", label: "Fark etmedim", score: 0 }
        ]
      }
    ]
  },
  {
    id: "gozAlti",
    label: "Göz Altı",
    questions: [
      {
        id: "gozMorluk",
        text: "Morluk var mı?",
        options: [
          { value: "belirgin", label: "Belirgin", score: 2 },
          { value: "hafif", label: "Hafif", score: 1 },
          { value: "yok", label: "Yok", score: 0 }
        ]
      },
      {
        id: "gozCizgi",
        text: "İnce çizgi var mı?",
        options: [
          { value: "belirgin", label: "Belirgin", score: 2 },
          { value: "hafif", label: "Hafif", score: 1 },
          { value: "yok", label: "Yok", score: 0 }
        ]
      },
      {
        id: "gozKuruluk",
        text: "Kuruluk hissediyor musun?",
        options: [
          { value: "evet", label: "Evet", score: 2 },
          { value: "bazen", label: "Bazen", score: 1 },
          { value: "hayir", label: "Hayır", score: 0 }
        ]
      },
      {
        id: "gozSisme",
        text: "Göz altın sabahları şişiyor mu?",
        options: [
          { value: "her_sabah", label: "Evet her sabah", score: 2 },
          { value: "bazen", label: "Bazen", score: 1 },
          { value: "sismiyor", label: "Hayır şişmiyor", score: 0 },
          { value: "fark_etmedim", label: "Fark etmedim", score: 0 }
        ]
      }
    ]
  }
];

const sectionTitles = [
  "Adım 1: Genel Faktörler",
  "Adım 2: Alın Analizi",
  "Adım 2: Burun Analizi",
  "Adım 2: Yanak Analizi",
  "Adım 2: Çene Analizi",
  "Adım 2: Göz Altı Analizi",
  "Adım 3: Sonuç"
];

const ingredientGuide = [
  {
    name: "Niacinamide",
    description: "Sebum dengesini destekler, gözenek görünümünü sakinleştirir."
  },
  {
    name: "Ceramide",
    description: "Bariyeri güçlendirir, su kaybını azaltmaya yardımcı olur."
  },
  {
    name: "BHA (Salisilik Asit)",
    description: "Gözenek içini temizler, siyah nokta ve pütürlerde etkilidir."
  },
  {
    name: "AHA",
    description: "Yüzeydeki ölü hücreleri uzaklaştırarak daha canlı görünüm sağlar."
  },
  {
    name: "Peptid",
    description: "İnce çizgi ve elastikiyet desteği için anti-age rutinde kullanılır."
  }
];

type BudgetTier = {
  range: string;
  brands: string[];
  products: string[];
};

function scoreToLevel(score: number) {
  if (score >= 6) return "Yüksek hassasiyet/risk";
  if (score >= 3) return "Orta düzey dikkat";
  return "Dengeli bölge";
}

function getBudgetTiers(totalScore: number): BudgetTier[] {
  if (totalScore >= 24) {
    // Hassas-Karma: bariyer onarımı öncelikli
    return [
      {
        range: "Ekonomik (0–300 TL)",
        brands: ["Sebamed", "Neutrogena", "Garnier Micellar"],
        products: [
          "Ceramide içerikli bariyer nemlendirici",
          "Parfümsüz misel su temizleyici",
          "Mineral filtreli güneş koruyucu SPF50+"
        ]
      },
      {
        range: "Orta Segment (300–700 TL)",
        brands: ["CeraVe", "La Roche-Posay", "Vichy"],
        products: [
          "Ceramide + Hyalüronik Asit Nemlendirici (CeraVe Moisturizing Cream)",
          "Cicaplast Baume B5 — bariyer onarım kremi",
          "Toleriane serisi hassas cilt temizleyicisi"
        ]
      },
      {
        range: "Premium (700 TL ve üzeri)",
        brands: ["Bioderma", "Avène", "Eucerin"],
        products: [
          "Avène Tolerance Extreme serisi — aşırı hassas cilt",
          "Bioderma Sensibio AR Krem — kızarıklık karşıtı",
          "Eucerin Aquaporin Active — yoğun bariyer nemlendirici"
        ]
      }
    ];
  }
  if (totalScore >= 15) {
    // Karma/Dönemsel Reaktif: sebum dengesi + noktasal aktifler
    return [
      {
        range: "Ekonomik (0–300 TL)",
        brands: ["Neutrogena", "Garnier", "Sebamed"],
        products: [
          "Salisilik asit içerikli temizleyici",
          "Yağsız, hafif jel nemlendirici",
          "Niacinamide tonik veya serum"
        ]
      },
      {
        range: "Orta Segment (300–700 TL)",
        brands: ["La Roche-Posay", "CeraVe", "Vichy"],
        products: [
          "Effaclar Duo+ — gözenek ve akne karşıtı",
          "CeraVe Foaming Facial Cleanser — yağlı/karma cilt",
          "Vichy Normaderm Phytosolution serisi"
        ]
      },
      {
        range: "Premium (700 TL ve üzeri)",
        brands: ["The Ordinary", "Avène", "Eucerin"],
        products: [
          "The Ordinary Niacinamide 10% + Zinc 1%",
          "The Ordinary AHA 30% + BHA 2% Peeling Solution",
          "Eucerin Pro Acne serisi — dönemsel akne bakımı"
        ]
      }
    ];
  }
  // Dengeli: koruyucu rutin + temel aktifler
  return [
    {
      range: "Ekonomik (0–300 TL)",
      brands: ["Garnier", "Neutrogena", "Sebamed"],
      products: [
        "Günlük hafif nemlendirici (jel veya losyon formülü)",
        "Nazik köpük veya jel temizleyici",
        "SPF50 güneş koruyucu — günlük kullanım"
      ]
    },
    {
      range: "Orta Segment (300–700 TL)",
      brands: ["CeraVe", "Vichy", "La Roche-Posay"],
      products: [
        "Hyalüronik asit serumu — nemlendirme desteği",
        "Niacinamide serumu — denge ve ton eşitleme",
        "La Roche-Posay Anthelios — SPF50+ günlük güneş koruma"
      ]
    },
    {
      range: "Premium (700 TL ve üzeri)",
      brands: ["The Ordinary", "Bioderma", "Eucerin"],
      products: [
        "The Ordinary Buffet — çoklu peptid serumu",
        "Bioderma Hydrabio serisi — uzun süreli nem",
        "Eucerin Hyaluron-Filler — ince çizgi önleyici bakım"
      ]
    }
  ];
}

export default function CiltAnaliziPage() {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const totalSections = 7;
  const progress = ((sectionIndex + 1) / totalSections) * 100;

  const currentQuestions = useMemo(() => {
    if (sectionIndex === 0) return generalQuestions;
    if (sectionIndex >= 1 && sectionIndex <= 5) return zones[sectionIndex - 1].questions;
    return [];
  }, [sectionIndex]);

  const canContinue = useMemo(() => {
    if (sectionIndex === 6) return true;
    return currentQuestions.every((q) => Boolean(answers[q.id]));
  }, [answers, currentQuestions, sectionIndex]);

  const analysis = useMemo(() => {
    const zoneScores = zones.map((zone) => {
      const score = zone.questions.reduce((sum, q) => {
        const selected = q.options.find((o) => o.value === answers[q.id]);
        return sum + (selected?.score ?? 0);
      }, 0);
      return { zoneId: zone.id, label: zone.label, score, level: scoreToLevel(score) };
    });

    const generalScore = generalQuestions.reduce((sum, q) => {
      const selected = q.options.find((o) => o.value === answers[q.id]);
      return sum + (selected?.score ?? 0);
    }, 0);

    const totalScore = generalScore + zoneScores.reduce((sum, z) => sum + z.score, 0);
    const profileName =
      totalScore >= 24
        ? "Hassas-Karma ve Bariyer Desteği Gereken Cilt"
        : totalScore >= 15
          ? "Karma ve Dönemsel Reaktif Cilt"
          : "Dengeli ama Koruyucu Bakım Gereken Cilt";

    const keyInsight =
      (zoneScores.find((z) => z.zoneId === "yanaklar")?.score ?? 0) >= 5
        ? "Cildin kuru değil, bariyerin ince olabilir; yüzeyde kızarıklık ve gerginlik bu nedenle artıyor."
        : (zoneScores.find((z) => z.zoneId === "burun")?.score ?? 0) >= 5
          ? "Gözeneklerin sadece yağdan değil, düzensiz arındırmadan da doluyor olabilir."
          : "Cilt dengen fena değil; asıl ihtiyaç düzenli bariyer koruması ve noktasal aktif seçimi.";

    const avoidList = [
      "Yüksek oranlı asitleri aynı rutinde üst üste kullanmak",
      "Alkol bazlı tonikler ve sert fiziksel peelingler",
      "Koruyucu bariyer zayıfken her gün yeni aktif denemek"
    ];

    const budgetTiers = getBudgetTiers(totalScore);

    return { zoneScores, profileName, keyInsight, avoidList, budgetTiers };
  }, [answers]);

  function setAnswer(questionId: string, value: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  function nextSection() {
    if (sectionIndex < 6) setSectionIndex((prev) => prev + 1);
  }

  function prevSection() {
    if (sectionIndex > 0) setSectionIndex((prev) => prev - 1);
  }

  function zoneColor(zoneId: Zone["id"]) {
    const score = analysis.zoneScores.find((z) => z.zoneId === zoneId)?.score ?? 0;
    if (score >= 6) return "#B45309";
    if (score >= 3) return "#D97706";
    return "#A7B8AE";
  }

  const currentZone = sectionIndex >= 1 && sectionIndex <= 5 ? zones[sectionIndex - 1] : null;

  return (
    <div>
      <header className="mb-8 border-b border-[#D9D1C4] pb-6">
        <h1 className="text-3xl font-bold text-[#1F3328] md:text-4xl">Cilt Analizi</h1>
        <p className="mt-2 text-[#4F6657]">
          Dermatolog görüşmesi hissiyle hazırlanmış, adım adım cilt profili analizi.
        </p>
      </header>

      <section className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm text-[#4F6657]">
          <span>{sectionTitles[sectionIndex]}</span>
          <span>
            {sectionIndex + 1}/{totalSections}
          </span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-[#DDE6DF]">
          <div
            className="h-full rounded-full bg-[#3D5A47] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </section>

      {sectionIndex < 6 ? (
        <section className="space-y-5">
          {currentZone && (
            <div className="flex items-center gap-3 rounded-2xl border-2 border-[#3D5A47] bg-[#3D5A47] px-5 py-4">
              <span className="text-2xl">📍</span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#A8C4B0]">
                  Şu an analiz edilen bölge
                </p>
                <p className="text-xl font-bold tracking-wide text-white">
                  {currentZone.label.toUpperCase()}
                </p>
              </div>
            </div>
          )}

          {currentQuestions.map((question) => (
            <article key={question.id} className="rounded-2xl border border-[#D8E0DB] bg-white p-5">
              <p className="mb-3 font-semibold text-[#1F3328]">{question.text}</p>
              <div className="grid grid-cols-2 gap-2">
                {question.options.map((option) => {
                  const selected = answers[question.id] === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setAnswer(question.id, option.value)}
                      className={`rounded-xl border px-3 py-2 text-left text-sm transition ${
                        selected
                          ? "border-[#3D5A47] bg-[#EEF2EE] text-[#1F3328]"
                          : "border-[#D8E0DB] bg-white text-[#4F6657] hover:bg-[#FAFCFB]"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
                {Array.from({ length: Math.max(0, 4 - question.options.length) }).map((_, i) => (
                  <div key={`ph-${i}`} aria-hidden="true" className="invisible rounded-xl border border-[#D8E0DB] px-3 py-2" />
                ))}
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="space-y-6">
          <article className="rounded-2xl border border-[#D8E0DB] bg-white p-6">
            <h2 className="text-2xl font-bold text-[#1F3328]">{analysis.profileName}</h2>
            <p className="mt-3 text-[#4F6657]">{analysis.keyInsight}</p>
          </article>

          <article className="rounded-2xl border border-[#D8E0DB] bg-white p-6">
            <h3 className="mb-4 text-xl font-semibold text-[#1F3328]">Bölge Bölge Analiz</h3>
            <div className="grid gap-3 md:grid-cols-2">
              {analysis.zoneScores.map((zone) => (
                <div key={zone.zoneId} className="rounded-xl bg-[#FAFCFB] p-4">
                  <p className="font-semibold text-[#1F3328]">{zone.label}</p>
                  <p className="mt-1 text-sm text-[#4F6657]">{zone.level}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-[#D8E0DB] bg-white p-6">
            <h3 className="mb-4 text-xl font-semibold text-[#1F3328]">Yüz Haritası</h3>
            <div className="flex justify-center">
              <svg viewBox="0 0 260 320" className="h-[320px] w-[260px]">
                <ellipse cx="130" cy="160" rx="90" ry="120" fill="#F8F8F6" stroke="#CAD7CF" strokeWidth="2" />
                <rect x="85" y="70" width="90" height="38" rx="16" fill={zoneColor("alin")} />
                <ellipse cx="130" cy="145" rx="24" ry="34" fill={zoneColor("burun")} />
                <ellipse cx="78" cy="165" rx="28" ry="32" fill={zoneColor("yanaklar")} />
                <ellipse cx="182" cy="165" rx="28" ry="32" fill={zoneColor("yanaklar")} />
                <ellipse cx="130" cy="235" rx="38" ry="28" fill={zoneColor("cene")} />
                <ellipse cx="95" cy="126" rx="22" ry="10" fill={zoneColor("gozAlti")} />
                <ellipse cx="165" cy="126" rx="22" ry="10" fill={zoneColor("gozAlti")} />
              </svg>
            </div>
            <p className="mt-2 text-center text-xs text-[#5D7264]">
              Koyu tonlar daha fazla dikkat gerektiren bölgeleri temsil eder.
            </p>
          </article>

          <article className="rounded-2xl border border-[#D8E0DB] bg-white p-6">
            <h3 className="mb-4 text-xl font-semibold text-[#1F3328]">Önerilen İçerikler</h3>
            <div className="space-y-3">
              {ingredientGuide.map((ingredient) => (
                <div key={ingredient.name} className="rounded-xl bg-[#FAFCFB] p-4">
                  <p className="font-semibold text-[#1F3328]">{ingredient.name}</p>
                  <p className="text-sm text-[#4F6657]">{ingredient.description}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-[#D8E0DB] bg-white p-6">
            <h3 className="mb-1 text-xl font-semibold text-[#1F3328]">💰 Bütçene Göre Öneriler</h3>
            <p className="mb-5 text-sm text-[#5D7264]">
              Cilt profiline göre her bütçe için önerilen ürün türleri.
            </p>
            <div className="space-y-4">
              {analysis.budgetTiers.map((tier) => (
                <div key={tier.range} className="rounded-xl border border-[#D8E0DB] p-4">
                  <p className="mb-2 text-sm font-bold text-[#3D5A47]">{tier.range}</p>
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {tier.brands.map((brand) => (
                      <span
                        key={brand}
                        className="rounded-full bg-[#EEF2EE] px-2.5 py-0.5 text-xs font-medium text-[#3D5A47]"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                  <ul className="space-y-1">
                    {tier.products.map((product) => (
                      <li key={product} className="flex items-start gap-2 text-sm text-[#4F6657]">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3D5A47]" />
                        {product}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-5">
              <Link
                href="/urunler"
                className="inline-flex items-center gap-2 rounded-xl border border-[#3D5A47] px-5 py-2.5 text-sm font-semibold text-[#3D5A47] transition hover:bg-[#EEF2EE]"
              >
                Ürünleri Filtrele
              </Link>
            </div>
          </article>

          <article className="rounded-2xl border border-[#D8E0DB] bg-white p-6">
            <h3 className="mb-4 text-xl font-semibold text-[#1F3328]">Kaçınılması Gerekenler</h3>
            <ul className="space-y-2 text-sm text-[#4F6657]">
              {analysis.avoidList.map((item) => (
                <li key={item} className="rounded-lg bg-[#FAFCFB] p-3">
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <div className="pt-2">
            <Link
              href="/urunler"
              className="inline-flex items-center rounded-xl bg-[#3D5A47] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Ürünleri Gör
            </Link>
          </div>
        </section>
      )}

      <footer className="mt-10 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={prevSection}
          disabled={sectionIndex === 0}
          className={`rounded-xl border px-5 py-2 text-sm font-semibold ${
            sectionIndex === 0
              ? "cursor-not-allowed border-[#D8E0DB] bg-white text-[#9AA9A0]"
              : "border-[#B8C7BE] bg-white text-[#3D5A47] hover:bg-[#EEF2EE]"
          }`}
        >
          Geri
        </button>
        {sectionIndex < 6 && (
          <button
            type="button"
            onClick={nextSection}
            disabled={!canContinue}
            className={`rounded-xl px-5 py-2 text-sm font-semibold ${
              canContinue
                ? "bg-[#3D5A47] text-white hover:opacity-90"
                : "cursor-not-allowed bg-[#BCCABF] text-white"
            }`}
          >
            Devam Et
          </button>
        )}
      </footer>
    </div>
  );
}
