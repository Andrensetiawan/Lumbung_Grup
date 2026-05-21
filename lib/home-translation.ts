import type { HomePageContent } from "./data/home";

type HomeLocale = "id" | "en";

const exactTranslationMapIdToEn: Record<string, string> = {
  "Kualitas Tersertifikasi Sejak 2020": "Certified Quality Since 2020",
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

const exactTranslationMapEnToId: Record<string, string> = Object.fromEntries(
  Object.entries(exactTranslationMapIdToEn).map(([source, target]) => [target, source])
);

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
  for (const [source, target] of Object.entries(exactTranslationMapIdToEn)) {
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

function translateHomeTextToIndonesian(text: string): string {
  if (!text.trim()) {
    return text;
  }

  const normalizedInput = normalize(text);
  for (const [source, target] of Object.entries(exactTranslationMapEnToId)) {
    if (normalize(source) === normalizedInput) {
      return target;
    }
  }

  return text;
}

export function localizeHomeContent(content: HomePageContent, locale: HomeLocale): HomePageContent {
  const translate = locale === "id" ? translateHomeTextToIndonesian : translateHomeTextToEnglish;
  const whySource = locale === "id" ? (content.why as any)?.id : (content.why as any)?.en;

  return {
    ...content,
    hero: {
      ...content.hero,
      badge: translate(content.hero.badge),
      titleMain: translate(content.hero.titleMain),
      titleSub: translate(content.hero.titleSub),
      subheading: translate(content.hero.subheading),
      description: translate(content.hero.description),
    },
    stats: content.stats.map((stat) => ({
      ...stat,
      label: translate(stat.label),
    })),
    credentials: content.credentials.map((credential) => ({
      ...credential,
      label: translate(credential.label),
    })),
    quality: {
      ...content.quality,
      title: translate(content.quality.title),
      description: translate(content.quality.description),
    },
    why: content.why
      ? {
          ...(whySource || {}),
          badge: translate(whySource?.badge || "") || "",
          title: translate(whySource?.title || "") || "",
          description: translate(whySource?.description || "") || "",
          benefits: (whySource?.benefits || []).map((b: any) => ({
            title: translate(b.title || ""),
            description: translate(b.description || ""),
            stat: translate(b.stat || ""),
          })),
          qualityMedia: whySource?.qualityMedia || [],
          logisticsMedia: whySource?.logisticsMedia || [],
        }
      : undefined,
  };
}