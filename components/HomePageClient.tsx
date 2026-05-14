"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useMemo } from "react";
import StructuredData from "./StructuredData";
import type { HomePageContent } from "../lib/data/home";
import { useSiteLocale } from "./useSiteLocale";
import { localizeHomeContent } from "../lib/home-translation";

const VideoPlayer = dynamic(() => import("./VideoPlayer"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full animate-pulse bg-gradient-to-br from-emerald-100 to-stone-100" />
  ),
});

const WhyChooseSection = dynamic(
  () => import("./WhyChooseSection"),
  {
    ssr: false,
    loading: () => <div className="h-[820px] w-full bg-white" aria-hidden />,
  }
) as React.ComponentType<{ content?: HomePageContent }>;

const TestimonialsCarousel = dynamic(() => import("./TestimonialsCarousel"), {
  ssr: false,
  loading: () => <div className="h-[420px] w-full rounded-3xl bg-white/80" aria-hidden />,
});

type Props = {
  content: HomePageContent;
  organizationSchema: Record<string, unknown>;
  localBusinessSchema: Record<string, unknown>;
};

const copy = {
  id: {
    hero: {
      titleMain: "Kyohikari & Hikaru",
      titleSub: "Kualitas Tersertifikasi Sejak 2020",
      subheading: "Mitra terpercaya untuk pengadaan beras Japonica premium",
      description:
        "Melayani jaringan hotel, grup restoran, dan retail modern dengan standar QC internasional, logistik nasional, dan konsultasi gratis.",
    },
    stats: {
      partners: "Mitra Utama",
      provinces: "Provinsi",
      satisfaction: "Kepuasan",
      support: "Dukungan",
    },
    quality: {
      title: "Proses Kami Menjaga Kualitas",
      description:
        "Lihat langsung bagaimana setiap butir beras Kyohikari diproses dengan standar internasional - dari pemilihan padi hingga pengemasan akhir.",
    },
    requestQuotation: "Minta Penawaran",
    bpomCertified: "Tersertifikasi BPOM",
    qualityControl247: "Kontrol Kualitas 24/7",
    nationwideDistribution: "Distribusi Nasional",
    behindTheQuality: "Di Balik Kualitas",
    qualityControl: "Kontrol Kualitas",
    colorSorted: "Sortir Warna",
    certifiedProcess: "Proses Tersertifikasi",
    socialProof: "Bukti Sosial",
    socialProofTitle: "Dipercaya jaringan Horeca dan retail nasional",
    socialProofDescription:
      "98% pengiriman tepat waktu, dokumentasi QC lengkap, dan dukungan edukasi etalase untuk meningkatkan repeat order mitra.",
    heritageBadge: "Warisan Kualitas",
    heritageTitle: "Menyempurnakan Setiap Butir",
    heritageDescription:
      "NMP adalah kurator kualitas. Melalui brand unggulan Kyohikari untuk segmen premium dan Hikaru untuk kebutuhan profesional, kami memastikan ketahanan pangan dengan cita rasa tak tertandingi.",
  },
  en: {
    hero: {
      titleMain: "Kyohikari & Hikaru",
      titleSub: "Certified Quality Since 2020",
      subheading: "Trusted partner for premium Japonica rice procurement",
      description:
        "Serving hotel chains, restaurant groups, and modern retail with international QC standards, nationwide logistics, and free consultation.",
    },
    stats: {
      partners: "Key Partners",
      provinces: "Provinces",
      satisfaction: "Satisfaction",
      support: "Support",
    },
    quality: {
      title: "How We Maintain Quality",
      description:
        "See how every Kyohikari grain is processed to international standards - from paddy selection to final packaging.",
    },
    requestQuotation: "Request Quotation",
    bpomCertified: "BPOM Certified",
    qualityControl247: "24/7 Quality Control",
    nationwideDistribution: "Nationwide Distribution",
    behindTheQuality: "Behind the Quality",
    qualityControl: "Quality Control",
    colorSorted: "Color Sorted",
    certifiedProcess: "Certified Process",
    socialProof: "Social Proof",
    socialProofTitle: "Trusted by Horeca and national retail networks",
    socialProofDescription:
      "98% on-time delivery, complete QC documentation, and shelf-education support to increase partner repeat orders.",
    heritageBadge: "Quality Heritage",
    heritageTitle: "Perfecting Every Grain",
    heritageDescription:
      "NMP is a quality curator. Through the flagship Kyohikari brand for the premium segment and Hikaru for professional needs, we deliver food security with unmatched taste.",
  },
} as const;

export default function HomePageClient({ content, organizationSchema, localBusinessSchema }: Props) {
  const { locale } = useSiteLocale();
  const t = copy[locale];

  const localizedContent = useMemo(() => localizeHomeContent(content, locale), [content, locale]);

  const statsValues = localizedContent.stats?.length ? localizedContent.stats : [
    { label: "", value: "19+" },
    { label: "", value: "20+" },
    { label: "", value: "98%" },
    { label: "", value: "24/7" },
  ];
  const localizedStats = [
    { label: statsValues[0]?.label || t.stats.partners, value: statsValues[0]?.value ?? "19+" },
    { label: statsValues[1]?.label || t.stats.provinces, value: statsValues[1]?.value ?? "20+" },
    { label: statsValues[2]?.label || t.stats.satisfaction, value: statsValues[2]?.value ?? "98%" },
    { label: statsValues[3]?.label || t.stats.support, value: statsValues[3]?.value ?? "24/7" },
  ];

  return (
    <div className="relative">
      <section className="hero-gradient relative -mt-20 flex min-h-screen items-center pt-10 text-white sm:-mt-22 lg:-mt-28">
        <picture className="absolute inset-0 z-0 block">
          <source media="(max-width: 640px)" srcSet="/padi-mobile.avif" type="image/avif" />
          <source media="(max-width: 640px)" srcSet="/padi-mobile.webp" type="image/webp" />
          <source srcSet="/padi1.webp" type="image/webp" />
          <img
            src="/padi1.webp"
            alt=""
            fetchPriority="high"
            loading="eager"
            decoding="async"
            aria-hidden="true"
            className="h-full w-full object-cover object-top sm:object-center"
          />
        </picture>
        <div className="hero-rice-field absolute inset-0" aria-hidden />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.28),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(185,154,100,0.18),transparent_26%),linear-gradient(to_bottom,rgba(20,35,31,0.58),rgba(20,35,31,0.35)_30%,rgba(20,35,31,0.68))]" aria-hidden />
        <div className="absolute left-[6%] top-28 hidden h-40 w-40 rounded-full border border-white/20 bg-white/5 blur-[1px] lg:block" aria-hidden />
        <div className="absolute right-[8%] top-[22%] hidden h-28 w-28 rounded-full border border-amber-200/25 bg-amber-100/10 blur-[1px] lg:block" aria-hidden />
        <div className="relative z-10 mx-auto w-full max-w-4xl px-4 py-32 text-center sm:px-6">
          {localizedContent.hero.badge ? (
            <div className="mb-6 inline-flex items-center justify-center rounded-full border-2 border-white/50 px-6 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.3em] backdrop-blur sm:text-[11px] sm:tracking-[0.4em]">
              {localizedContent.hero.badge}
            </div>
          ) : null}

          <h1 className="serif mb-6 text-4xl font-black leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block">
              <span className="kyohikari-wordmark text-[1.35em] sm:text-[1.45em] md:text-[1.55em]">KYOHIKARI</span>
              <span
                className="mx-3 text-white/80 text-[1.05em] sm:text-[1.1em]"
                style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700 }}
              >
                &
              </span>
              <span className="hikaru-wordmark text-[1.55em] sm:text-[1.7em] md:text-[1.85em]">Hikaru</span>
            </span>
          </h1>

          <div className="mx-auto -mt-4 mb-4 flex max-w-3xl flex-row items-center justify-center gap-2 text-emerald-950 sm:-mt-6 sm:gap-4 lg:-mt-8 lg:gap-6">
            <div className="flex flex-col items-center justify-center sm:translate-x-[-35px] lg:translate-x-[-35px] bg-white px-2 sm:px-3 md:px-4 rounded-2xl">
              <Image
                src="/logo/logo-kyohikari.png"
                alt="Logo Kyohikari"
                width={560}
                height={374}
                className="h-32 w-auto object-contain sm:h-48 md:h-56 lg:h-64 rounded-2xl"
                priority
              />
            </div>
            <div className="flex flex-col items-center justify-center sm:translate-x-[35px] lg:translate-x-[35px]">
              <Image
                src="/logo/logo-hikaru.png"
                alt="Logo Hikaru"
                width={560}
                height={374}
                className="h-32 w-auto object-contain drop-shadow-[0_10px_28px_rgba(0,0,0,0.2)] sm:h-48 md:h-56 lg:h-64 rounded-2xl"
              />
            </div>
          </div>

          <p className="mx-auto mb-6 mt-2 text-xl font-semibold tracking-normal text-white sm:text-2xl md:text-3xl font-sans">
            {localizedContent.hero.titleSub || t.hero.titleSub}
          </p>

          <p className="mx-auto mb-4 max-w-2xl text-lg text-stone-100 sm:text-xl font-semibold">{localizedContent.hero.subheading || t.hero.subheading}</p>
          <p className="mx-auto mb-12 max-w-2xl text-base text-stone-200/80">{localizedContent.hero.description || t.hero.description}</p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
            <Link
              href="/contact"
              className="w-full rounded-full bg-white px-10 py-4 text-center text-xs font-bold uppercase tracking-[0.35em] text-emerald-950 shadow-2xl transition hover:bg-emerald-50 sm:w-auto sm:text-sm"
            >
              {t.requestQuotation}
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-white/90">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>{t.bpomCertified}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>{t.qualityControl247}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>{t.nationwideDistribution}</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-bounce text-white/70 sm:bottom-10">
          <ChevronDown className="h-8 w-8" />
        </div>
      </section>

      <section className="relative bg-[url('/BG/1.jpg')] bg-cover bg-center py-16 sm:py-20">
        <div className="absolute inset-0 bg-white/60" aria-hidden />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 sm:px-12">
          <div className="mb-10 text-center sm:mb-12">
            <span className="mb-4 inline-flex items-center justify-center rounded-full bg-emerald-50 px-5 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-emerald-700">
              {t.behindTheQuality}
            </span>
            <h2 className="serif mb-4 text-3xl font-bold text-emerald-950 sm:text-4xl">{localizedContent.quality.title || t.quality.title}</h2>
            <p className="mx-auto max-w-2xl text-stone-600">{localizedContent.quality.description || t.quality.description}</p>
          </div>

          <div className="mx-auto max-w-5xl">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-stone-200">
              <div className="aspect-video bg-gradient-to-br from-emerald-100 to-stone-100">
                <VideoPlayer videos={[localizedContent.quality.videoUrls[0]]} layoutMode="alternate" />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4 text-center sm:mt-8 sm:gap-6">
              <div>
                <p className="text-2xl font-black text-emerald-950 sm:text-3xl">5-Stage</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-stone-600">{t.qualityControl}</p>
              </div>
              <div>
                <p className="text-2xl font-black text-emerald-950 sm:text-3xl">100%</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-stone-600">{t.colorSorted}</p>
              </div>
              <div>
                <p className="text-2xl font-black text-emerald-950 sm:text-3xl">ISO</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-stone-600">{t.certifiedProcess}</p>
              </div>
            </div>

            <p className="serif mt-8 text-center text-3xl font-bold text-emerald-950 sm:text-4xl">Five Stage</p>

            <div className="relative mt-8 overflow-hidden rounded-3xl shadow-2xl ring-1 ring-stone-200 sm:mt-10">
              <div className="aspect-video bg-gradient-to-br from-emerald-100 to-stone-100">
                <VideoPlayer videos={[localizedContent.quality.videoUrls[1]]} layoutMode="alternate" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="[content-visibility:auto] [contain-intrinsic-size:1px_1200px]">
        <WhyChooseSection content={localizedContent} />
      </div>

      <section className="relative bg-[url('/BG/1.jpg')] bg-cover bg-center py-16 sm:py-20 [content-visibility:auto] [contain-intrinsic-size:1px_900px]">
        <div className="absolute inset-0 bg-white/40" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-8 text-center sm:mb-10">
            <span className="mb-3 inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-emerald-700">
              {t.socialProof}
            </span>
            <h2 className="serif text-4xl font-bold text-emerald-950">{t.socialProofTitle}</h2>
            <p className="mt-4 text-stone-500">{t.socialProofDescription}</p>
          </div>
          <TestimonialsCarousel />
        </div>
      </section>

      <section className="relative bg-[url('/BG/1.jpg')] bg-cover bg-center py-16 sm:py-20 [content-visibility:auto] [contain-intrinsic-size:1px_900px]">
        <div className="absolute inset-0 bg-white/60" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2 md:items-center">
          <div>
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.4em] text-emerald-700">{t.heritageBadge}</span>
            <h2 className="serif mb-6 text-4xl font-bold text-emerald-950">{t.heritageTitle}</h2>
            <p className="text-lg text-stone-500">{t.heritageDescription}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {localizedStats.map((stat) => (
              <div key={stat.label} className="rounded-[2rem] bg-emerald-900/5 p-6 sm:p-8 text-center shadow-sm">
                <p className="text-3xl font-black text-emerald-900">{stat.value}</p>
                <p className="text-xs font-extrabold uppercase tracking-[0.4em] text-stone-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StructuredData data={[organizationSchema, localBusinessSchema]} id="home-schema" />
    </div>
  );
}