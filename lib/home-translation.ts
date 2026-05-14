import type { HomePageContent } from "./data/home";

type HomeLocale = "id" | "en";

const exactTranslationMap: Record<string, string> = {
  "Mitra Utama": "Key Partners",
  Provinsi: "Provinces",
  Kepuasan: "Satisfaction",
  Dukungan: "Support",
  "Kontrol Kualitas 24/7": "24/7 Quality Control",
  "Kontrol Kualitas": "Quality Control",
  "Proses Tersertifikasi": "Certified Process",
  "Sortir Warna": "Color Sorted",
  "Proses Kami Menjaga Kualitas": "How We Maintain Quality",
  "Lihat langsung bagaimana setiap butir beras Kyohikari diproses dengan standar internasional - dari pemilihan padi hingga pengemasan final.":
    "See how every Kyohikari grain is processed to international standards - from paddy selection to final packaging.",
  "Lihat langsung bagaimana setiap butir beras Kyohikari diproses dengan standar internasional - dari pemilihan padi hingga pengemasan akhir.":
    "See how every Kyohikari grain is processed to international standards - from paddy selection to final packaging.",
  "Partner terpercaya untuk procurement beras Japonica premium":
    "Trusted partner for premium Japonica rice procurement",
  "Melayani hotel chains, restaurant groups, dan modern retail dengan standar QC internasional, logistik nasional, dan konsultasi gratis.":
    "Serving hotel chains, restaurant groups, and modern retail with international QC standards, nationwide logistics, and free consultation.",
};

const replacementRules: Array<[RegExp, string]> = [
  [/\bdan\b/gi, "and"],
  [/\bterpercaya\b/gi, "trusted"],
  [/\bmitra\b/gi, "partner"],
  [/\bberas\b/gi, "rice"],
  [/\bkualitas\b/gi, "quality"],
  [/\bnasional\b/gi, "nationwide"],
  [/\bkonsultasi gratis\b/gi, "free consultation"],
  [/\bproses\b/gi, "process"],
  [/\bpengemasan akhir\b/gi, "final packaging"],
  [/\bpengemasan final\b/gi, "final packaging"],
  [/\bpemilihan padi\b/gi, "paddy selection"],
];

function normalize(input: string): string {
  return input.trim().replace(/\s+/g, " ").toLowerCase();
}

function translateHomeTextToEnglish(text: string): string {
  if (!text.trim()) {
    return text;
  }

  const normalizedInput = normalize(text);
  for (const [source, target] of Object.entries(exactTranslationMap)) {
    if (normalize(source) === normalizedInput) {
      return target;
    }
  }

  let output = text;
  for (const [pattern, replacement] of replacementRules) {
    output = output.replace(pattern, replacement);
  }

  return output;
}

export function localizeHomeContent(content: HomePageContent, locale: HomeLocale): HomePageContent {
  if (locale === "id") {
    return content;
  }

  return {
    ...content,
    hero: {
      ...content.hero,
      badge: translateHomeTextToEnglish(content.hero.badge),
      titleMain: translateHomeTextToEnglish(content.hero.titleMain),
      titleSub: translateHomeTextToEnglish(content.hero.titleSub),
      subheading: translateHomeTextToEnglish(content.hero.subheading),
      description: translateHomeTextToEnglish(content.hero.description),
    },
    stats: content.stats.map((stat) => ({
      ...stat,
      label: translateHomeTextToEnglish(stat.label),
    })),
    credentials: content.credentials.map((credential) => ({
      ...credential,
      label: translateHomeTextToEnglish(credential.label),
    })),
    quality: {
      ...content.quality,
      title: translateHomeTextToEnglish(content.quality.title),
      description: translateHomeTextToEnglish(content.quality.description),
    },
    why: content.why
      ? {
          ...(content.why.en || {}),
          badge: translateHomeTextToEnglish((content.why as any).id?.badge || "") || "",
          title: translateHomeTextToEnglish((content.why as any).id?.title || "") || "",
          description: translateHomeTextToEnglish((content.why as any).id?.description || "") || "",
          benefits: ((content.why as any).id?.benefits || []).map((b: any) => ({
            title: translateHomeTextToEnglish(b.title || ""),
            description: translateHomeTextToEnglish(b.description || ""),
            stat: translateHomeTextToEnglish(b.stat || ""),
          })),
          qualityMedia: (content.why as any).id?.qualityMedia || [],
          logisticsMedia: (content.why as any).id?.logisticsMedia || [],
        }
      : undefined,
  };
}