"use client";

import GalleryWithPreview from "./GalleryWithPreview";
import { useSiteLocale } from "./useSiteLocale";

type GalleryCategory = {
  id: string;
  title: string;
  description: string;
  images: Array<{ src: string; alt: string }>;
};

type Props = {
  categories: GalleryCategory[];
};

const copy = {
  id: {
    heroBadge: "Perjalanan Visual",
    heroTitle: "Galeri NMP",
    heroDesc:
      "Jelajahi fasilitas, proses quality control, dan momen kemitraan yang membentuk standar kualitas kami.",
    ctaTitle: "Ingin Melihat Langsung?",
    ctaDesc:
      "Kunjungi fasilitas kami dan lihat sendiri proses quality control yang membuat produk kami berbeda. Hubungi tim kami untuk jadwalkan kunjungan pabrik.",
    ctaButton: "Jadwalkan Kunjungan",
  },
  en: {
    heroBadge: "Visual Journey",
    heroTitle: "NMP Gallery",
    heroDesc:
      "Explore our facilities, quality-control process, and partnership moments that shape our quality standards.",
    ctaTitle: "Want to See It in Person?",
    ctaDesc:
      "Visit our facility and experience the quality-control process that makes our products different. Contact our team to schedule a factory visit.",
    ctaButton: "Schedule a Visit",
  },
} as const;

export default function GalleryPageClient({ categories }: Props) {
  const { locale } = useSiteLocale();
  const t = copy[locale];

  return (
    <div className="relative bg-white pb-20">
      <section className="bg-gradient-to-br from-emerald-900 to-emerald-700 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center sm:px-12">
          <span className="mb-4 inline-flex items-center justify-center rounded-full border border-white/40 px-5 py-2 text-[10px] font-black uppercase tracking-[0.35em] backdrop-blur">{t.heroBadge}</span>
          <h1 className="serif mb-6 text-4xl font-bold sm:text-5xl md:text-6xl">{t.heroTitle}</h1>
          <p className="mx-auto max-w-2xl text-lg text-emerald-50">{t.heroDesc}</p>
        </div>
      </section>

      <section className="relative bg-[url('/BG/1.jpg')] bg-cover bg-center py-16 sm:py-20">
        <div className="absolute inset-0 bg-white/50" aria-hidden />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:px-12">
          <GalleryWithPreview categories={categories} />
        </div>
      </section>

      <section className="relative bg-[url('/BG/1.jpg')] bg-cover bg-center py-16 sm:py-20">
        <div className="absolute inset-0 bg-white/60" aria-hidden />
        <div className="relative z-10 mx-auto max-w-5xl px-6 py-16 text-center">
          <div className="rounded-3xl bg-emerald-50 p-12">
            <h2 className="serif mb-4 text-3xl font-bold text-emerald-950">{t.ctaTitle}</h2>
            <p className="mx-auto mb-8 max-w-2xl text-stone-600">{t.ctaDesc}</p>
            <a href="/contact" className="inline-block rounded-full bg-emerald-900 px-10 py-4 text-sm font-bold uppercase tracking-[0.3em] text-white shadow-lg transition-all duration-300 hover:bg-emerald-800 hover:shadow-xl active:scale-95">{t.ctaButton}</a>
          </div>
        </div>
      </section>
    </div>
  );
}
