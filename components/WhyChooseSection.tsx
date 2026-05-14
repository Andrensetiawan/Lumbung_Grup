"use client";

import Image from "next/image";
import { Shield, Truck, Award } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSiteLocale } from "./useSiteLocale";
import type { HomePageContent } from "../lib/data/home";
import { DEFAULT_HOME_CONTENT } from "../lib/data/home";

const DEFAULT_BENEFITS = {
  id: [
    {
      icon: Shield,
      title: "Pengendalian Mutu 5 Lapis",
      description:
        "Setiap batch Kyohikari dan Hikaru melalui 5 lapisan inspeksi QC sesuai standar BPOM dan keamanan pangan internasional, mulai dari incoming raw check hingga final release.",
      stat: "Tingkat Lolos 98%",
    },
    {
      icon: Truck,
      title: "Jaringan Logistik Nasional",
      description:
        "Armada distribusi menjangkau 38 provinsi di Indonesia dengan garansi kesegaran produk sampai lokasi Anda.",
      stat: "38 Provinsi",
    },
    {
      icon: Award,
      title: "Dipercaya Sejak 2020",
      description:
        "Dipercaya oleh jaringan hotel, grup restoran, dan retail modern untuk menjaga konsistensi pasokan.",
      stat: "19+ Klien Utama",
    },
  ],
  en: [],
} as const;

export default function WhyChooseSection({ content }: { content?: HomePageContent }) {
  const { locale } = useSiteLocale();

  const copy = {
    id: {
      badge: "Mengapa Bermitra dengan Kami",
      title: "Mengapa Memilih Niaga Multi Pangan?",
      description:
        "Lebih dari sekadar distributor, kami adalah partner strategis yang memahami tantangan procurement di industri hospitality dan retail modern.",
      successStory: "Pesan Direksi",
      ctaTitle: "Siap untuk Kemitraan?",
      ctaDescription:
        "Diskusikan kebutuhan procurement Anda langsung dengan tim sales kami. Kami siap support mulai dari sample testing, trial order, hingga kontrak tahunan.",
      scheduleConsultation: "Jadwalkan Konsultasi",
      whatsappNow: "WhatsApp Sekarang",
    },
    en: {
      badge: "Why Partner With Us",
      title: "Why Choose Niaga Multi Pangan?",
      description:
        "More than a distributor, we are a strategic partner that understands procurement challenges in hospitality and modern retail.",
      successStory: "Directors' Message",
      ctaTitle: "Ready for a Partnership?",
      ctaDescription:
        "Discuss your procurement needs directly with our sales team. We are ready to support sample testing, trial orders, and annual contracts.",
      scheduleConsultation: "Schedule Consultation",
      whatsappNow: "WhatsApp Now",
    },
  } as const;

  const t = copy[locale as keyof typeof copy];

  // prefer CMS-provided `why` if available
  const cmsWhy = (content && (content as any).why) || null;
  const benefits = cmsWhy?.benefits || DEFAULT_BENEFITS[locale as "id" | "en"];
  const fallbackWhy = DEFAULT_HOME_CONTENT.why?.id;
  const qualityMedia = cmsWhy?.qualityMedia || fallbackWhy?.qualityMedia || [];
  const logisticsMedia = cmsWhy?.logisticsMedia || fallbackWhy?.logisticsMedia || [];
  const successSlides = (content && (content as any).success && (content as any).success.slides) || null;
  const successStats = (content && (content as any).success && (content as any).success.stats) || null;

  const [activeSuccessIndex, setActiveSuccessIndex] = useState(0);

  useEffect(() => setActiveSuccessIndex(0), [locale]);

  useEffect(() => {
    if (!successSlides || successSlides.length < 2) return;
    const id = window.setInterval(() => setActiveSuccessIndex((p) => (p + 1) % successSlides.length), 5000);
    return () => window.clearInterval(id);
  }, [successSlides]);

  const activeSuccess = successSlides ? successSlides[activeSuccessIndex] : null;

  return (
    <section className="relative bg-[url('/BG/1.jpg')] bg-cover bg-center py-16 sm:py-20">
      <div className="absolute inset-0 bg-white/50" aria-hidden />
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mb-10 text-center sm:mb-12">
          <span className="mb-4 inline-block rounded-full bg-emerald-50 px-5 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-emerald-700">
            {t.badge}
          </span>
          <h2 className="serif mb-4 text-3xl font-bold text-emerald-950 sm:text-4xl lg:text-5xl">
            {cmsWhy?.title || t.title}
          </h2>
          <p className="mx-auto max-w-2xl text-base text-stone-600 sm:text-lg">{cmsWhy?.description || t.description}</p>
        </div>
        {/* Kualitas & Proses and Logistik & Armada galleries removed per request. */}

        <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
          {benefits.map((b: any, i: number) => (
            <div key={i} className="group rounded-3xl border border-stone-200 bg-gradient-to-br from-white to-emerald-50/30 p-6 shadow-sm">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-900 text-white shadow-lg">
                  <b.icon size={28} strokeWidth={2} />
                </div>
                <div className="rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-bold text-emerald-900">{b.stat}</div>
              </div>
              <h3 className="mb-3 text-xl font-bold text-emerald-950">{b.title}</h3>
              <p className="text-sm leading-relaxed text-stone-600">{b.description}</p>

              {/* Media gallery placed under specific benefit cards (QC -> index 0, Logistics -> index 1) */}
              {i === 0 && qualityMedia && qualityMedia.length > 0 && (
                <div className="mt-4 grid auto-cols-fr grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3">
                  {qualityMedia.map((m: any, idx: number) => (
                    m?.src ? (
                      <div key={idx} className="flex flex-col items-center gap-2">
                        <div className="overflow-hidden rounded-lg border bg-white">
                          {m.type === "video" ? (
                            m.label === "Optical sorting" ? (
                              <video
                                src={m.src}
                                width={240}
                                height={160}
                                className="object-cover block"
                                preload="metadata"
                                autoPlay
                                loop
                                muted
                                playsInline
                              />
                            ) : (
                              <video
                                src={m.src}
                                width={240}
                                height={160}
                                className="object-cover block"
                                preload="metadata"
                                controls
                                playsInline
                              />
                            )
                          ) : (
                            <Image src={m.src} alt={m.alt || m.label || `quality-${idx}`} width={240} height={160} className="object-cover block" loading="eager" />
                          )}
                        </div>
                        <p className="text-center text-sm font-semibold text-stone-700">{m.label || m.alt || `Foto ${idx + 1}`}</p>
                      </div>
                    ) : null
                  ))}
                </div>
              )}

              {i === 1 && logisticsMedia && logisticsMedia.length > 0 && (
                <div className="mt-4 grid auto-cols-fr grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3">
                  {logisticsMedia.map((m: any, idx: number) => (
                    m?.src ? (
                      <div key={idx} className="flex flex-col items-center gap-2">
                        <div className="overflow-hidden rounded-lg border bg-white">
                          <Image src={m.src} alt={m.alt || m.label || `logistics-${idx}`} width={240} height={160} className="object-cover block" loading="eager" />
                        </div>
                        <p className="text-center text-sm font-semibold text-stone-700">{m.label || m.alt || `Foto ${idx + 1}`}</p>
                      </div>
                    ) : null
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {successSlides && (
          <div className="mt-12 rounded-3xl bg-gradient-to-br from-emerald-900 to-emerald-800 p-8 text-white shadow-2xl sm:p-10">
            <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.3em] text-emerald-300">{t.successStory}</span>
                <h3 className="serif mb-3 text-2xl font-bold sm:text-3xl">{activeSuccess?.title}</h3>
                <p className="mb-5 text-emerald-100">{activeSuccess?.description}</p>

                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/20 bg-white/10">
                    <Image src={activeSuccess?.avatar || "/fake/ibu-endah-avatar.svg"} alt={activeSuccess?.avatarAlt || activeSuccess?.name || ""} fill sizes="48px" className="object-cover" />
                  </div>
                  <div>
                    <p className="font-bold">{activeSuccess?.name}</p>
                    <p className="text-sm text-emerald-200">{activeSuccess?.role}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  {successSlides.map((s: any, idx: number) => (
                    <button key={idx} type="button" onClick={() => setActiveSuccessIndex(idx)} aria-label={`Slide ${idx + 1}`} className={`h-2.5 rounded-full transition-all ${idx === activeSuccessIndex ? "w-7 bg-white" : "w-2.5 bg-white/40"}`} />
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {(successStats || []).map((s: any, idx: number) => (
                  <div key={idx} className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                    <p className="text-2xl font-black sm:text-3xl">{s.value}</p>
                    <p className="text-sm text-emerald-200">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 rounded-3xl border-2 border-dashed border-emerald-200 bg-emerald-50 p-6 text-center sm:p-8">
          <h3 className="serif mb-3 text-2xl font-bold text-emerald-950 sm:text-3xl">{t.ctaTitle}</h3>
          <p className="mx-auto mb-5 max-w-2xl text-stone-600">{t.ctaDescription}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/contact" className="inline-block rounded-full bg-emerald-950 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.28em] text-white transition hover:bg-emerald-900">
              {t.scheduleConsultation}
            </Link>
            <a href={locale === "id" ? "https://wa.me/6285811848112?text=Halo%20NMP%2C%20saya%20ingin%20diskusi%20procurement" : "https://wa.me/6285811848112?text=Hello%20NMP%2C%20I%20would%20like%20to%20discuss%20procurement"} target="_blank" className="inline-block rounded-full border-2 border-emerald-950 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-950 transition hover:bg-emerald-100">
              {t.whatsappNow}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
