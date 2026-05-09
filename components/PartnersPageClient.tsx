"use client";

import Image from "next/image";
import { useSiteLocale } from "./useSiteLocale";
import type { Partner } from "../lib/data/partners";
import type { PartnersPageContent } from "../lib/data/partners-page";
import { resolveLocalizedText } from "../lib/localized";

type Props = {
  partners: Partner[];
  content: PartnersPageContent;
};

export default function PartnersPageClient({ partners, content }: Props) {
  const { locale } = useSiteLocale();

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 py-24 text-white sm:py-32">
        <div className="mx-auto max-w-7xl px-6 text-center sm:px-12">
          <div className="mb-6 inline-flex items-center justify-center rounded-full border border-white/40 px-5 py-2 text-[9px] font-extrabold uppercase tracking-[0.25em] backdrop-blur sm:text-[10px] sm:tracking-[0.35em]">
            {resolveLocalizedText(content.heroBadge, locale)}
          </div>
          <h1 className="serif mb-6 text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
            {resolveLocalizedText(content.heroTitle, locale)}
          </h1>
          <p className="mx-auto max-w-2xl text-base text-emerald-100/90 sm:text-lg">
            {resolveLocalizedText(content.heroDesc, locale)}
          </p>
        </div>
      </section>

      <section className="relative bg-[url('/BG/1.jpg')] bg-cover bg-center py-16 sm:py-20">
        <div className="absolute inset-0 bg-white/50" aria-hidden />
        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-12">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:gap-8">
            <div className="rounded-2xl border border-emerald-200 bg-white p-6 text-center sm:p-8"><p className="text-3xl font-black text-emerald-950 sm:text-4xl">19+</p><p className="mt-2 text-xs font-semibold uppercase tracking-widest text-emerald-700">{resolveLocalizedText(content.statPartners, locale)}</p></div>
            <div className="rounded-2xl border border-emerald-200 bg-white p-6 text-center sm:p-8"><p className="text-3xl font-black text-emerald-950 sm:text-4xl">38+</p><p className="mt-2 text-xs font-semibold uppercase tracking-widest text-emerald-700">{resolveLocalizedText(content.statProvince, locale)}</p></div>
            <div className="rounded-2xl border border-emerald-200 bg-white p-6 text-center sm:p-8"><p className="text-3xl font-black text-emerald-950 sm:text-4xl">98%</p><p className="mt-2 text-xs font-semibold uppercase tracking-widest text-emerald-700">{resolveLocalizedText(content.statSatisfaction, locale)}</p></div>
            <div className="rounded-2xl border border-emerald-200 bg-white p-6 text-center sm:p-8"><p className="text-3xl font-black text-emerald-950 sm:text-4xl">24/7</p><p className="mt-2 text-xs font-semibold uppercase tracking-widest text-emerald-700">{resolveLocalizedText(content.statSupport, locale)}</p></div>
          </div>
        </div>
      </section>

      <section className="relative bg-[url('/BG/1.jpg')] bg-cover bg-center py-20 sm:py-28">
        <div className="absolute inset-0 bg-white/60" aria-hidden />
        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-12">
          <div className="mb-16 text-center">
            <h2 className="serif mb-4 text-3xl font-bold text-emerald-950 sm:text-4xl">
              {resolveLocalizedText(content.sectionTitle, locale)}
            </h2>
            <p className="mx-auto max-w-2xl text-stone-600">
              {resolveLocalizedText(content.sectionDesc, locale)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
            {partners.map((partner) => (
              <div key={partner.name} className="group rounded-2xl border border-stone-200 bg-white p-4 transition-all duration-300 hover:border-emerald-300 hover:shadow-lg sm:p-6">
                <div className="relative mb-4 aspect-square overflow-hidden rounded-xl bg-stone-100">
                  <Image src={partner.logo} alt={partner.name} fill className="object-cover transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="font-bold text-stone-900 line-clamp-2">{partner.name}</h3>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-emerald-600">{partner.sector}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[url('/BG/1.jpg')] bg-cover bg-center py-20 sm:py-28">
        <div className="absolute inset-0 bg-white/50" aria-hidden />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center sm:px-12">
          <h2 className="serif mb-6 text-3xl font-bold text-emerald-950 sm:text-4xl">
            {resolveLocalizedText(content.ctaTitle, locale)}
          </h2>
          <p className="mb-8 text-lg text-stone-600">
            {resolveLocalizedText(content.ctaDesc, locale)}
          </p>
          <a
            href={
              locale === "id"
                ? "https://wa.me/6285811848112?text=Halo%20NMP%2C%20saya%20ingin%20diskusi%20kemitraan"
                : "https://wa.me/6285811848112?text=Hello%20NMP%2C%20I%20would%20like%20to%20discuss%20partnership"
            }
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-emerald-950 px-10 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-lg transition-all duration-300 hover:bg-emerald-900 active:scale-95"
          >
            {resolveLocalizedText(content.ctaButton, locale)}
          </a>
        </div>
      </section>
    </div>
  );
}
