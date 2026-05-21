"use client";

import Image from "next/image";
import { Award } from "lucide-react";
import { useSiteLocale } from "./useSiteLocale";
import type { AboutPageContent } from "../lib/data/about";
import { resolveLocalizedText } from "../lib/localized";

const primaryImage = "/gallery/facilities-warehouse/Foto gudang terbaru.jpeg";
const secondaryImage = "/gallery/quality-control/machine-color-sorter.png";

type Props = {
  content: AboutPageContent;
};

export default function AboutPageClient({ content }: Props) {
  const { locale } = useSiteLocale();

  const qcStages = [
    {
      title: "Incoming Raw Check",
      metric: "< 14% moisture",
      detail: resolveLocalizedText(content.qc1, locale),
    },
    {
      title: "Optical Sorting",
      metric: "98% head rice",
      detail: resolveLocalizedText(content.qc2, locale),
    },
    {
      title: "Metal & Foreign Control",
      metric: "0 ppm metal",
      detail: resolveLocalizedText(content.qc3, locale),
    },
    {
      title: locale === "id" ? "Laporan Lab Final" : "Final Lab Report",
      metric: locale === "id" ? "COA 24 jam" : "COA 24 hours",
      detail: resolveLocalizedText(content.qc4, locale),
    },
  ];

  return (
    <>
      <section className="relative bg-[url('/BG/1.jpg')] bg-cover bg-center py-24">
        <div className="absolute inset-0 bg-white/60" aria-hidden />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-20 px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.4em] text-emerald-700">
              {resolveLocalizedText(content.aboutBadge, locale)}
            </span>
            <h1 className="serif mb-8 text-4xl font-bold text-emerald-950">
              {resolveLocalizedText(content.companyName, locale)}
            </h1>
            <p className="mb-6 text-base leading-relaxed text-stone-500">
              {resolveLocalizedText(content.paragraphs[0], locale)}
            </p>
            <p className="mb-6 text-base leading-relaxed text-stone-500">
              {resolveLocalizedText(content.paragraphs[1], locale)}
            </p>
            <p className="mb-8 text-base leading-relaxed text-stone-500">
              {resolveLocalizedText(content.paragraphs[2], locale)}
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-2xl font-black text-emerald-900">2020</p>
                <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-stone-400">
                  {resolveLocalizedText(content.highlight1, locale)}
                </p>
              </div>
              <div>
                <p className="text-2xl font-black text-emerald-900">24/7</p>
                <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-stone-400">
                  {resolveLocalizedText(content.highlight2, locale)}
                </p>
              </div>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="relative h-80 overflow-hidden rounded-[2rem] shadow-2xl">
                <Image
                  src={primaryImage}
                  alt="Gerbang kantor dan gudang NMP"
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="rounded-[2rem] bg-emerald-900 p-8 text-white">
                <Award className="mb-4 h-10 w-10 text-gold-soft" />
                <p className="text-base font-bold leading-tight">
                  {resolveLocalizedText(content.award, locale)}
                </p>
              </div>
            </div>
            <div className="relative hidden overflow-hidden rounded-[2rem] shadow-2xl lg:block" style={{ aspectRatio: "21/9" }}>
              <video
                src="/Optical sorting.mp4"
                className="h-full w-full object-cover animate-fade-in"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[url('/BG/1.jpg')] bg-cover bg-center py-20 overflow-hidden">
        <div className="absolute inset-0 bg-white/50" aria-hidden />
        <div
          className="absolute inset-y-6 left-1/2 w-[min(1120px,calc(100%-3rem))] -translate-x-1/2 overflow-hidden rounded-[2.5rem] shadow-2xl"
          style={{
            backgroundImage: "url('/Visi misi - background tulisan visi misi.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-stone-200 bg-white p-10 shadow-xl">
              <div className="relative mb-6 inline-flex items-center justify-center overflow-hidden rounded-xl border border-emerald-200 px-4 py-2">
                <Image src="/Visi misi - background tulisan visi misi.jpg" alt="Background badge visi" fill sizes="160px" className="object-cover opacity-45" />
                <span className="relative text-sm font-black uppercase tracking-[0.4em] text-emerald-950">
                  {resolveLocalizedText(content.vision, locale)}
                </span>
              </div>
              <h3 className="serif text-3xl font-bold leading-tight text-emerald-950">
                {resolveLocalizedText(content.visionTitle, locale)}
              </h3>
            </div>
            <div className="rounded-[2rem] border border-stone-200 bg-white p-10 shadow-xl">
              <div className="relative mb-6 inline-flex items-center justify-center overflow-hidden rounded-xl border border-emerald-200 px-4 py-2">
                <Image src="/Visi misi - background tulisan visi misi.jpg" alt="Background badge misi" fill sizes="160px" className="object-cover opacity-45" />
                <span className="relative text-sm font-black uppercase tracking-[0.4em] text-emerald-950">
                  {resolveLocalizedText(content.mission, locale)}
                </span>
              </div>
              <h3 className="serif text-3xl font-bold leading-tight text-emerald-950">
                {resolveLocalizedText(content.missionTitle, locale)}
              </h3>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[url('/BG/1.jpg')] bg-cover bg-center py-24">
        <div className="absolute inset-0 bg-white/50" aria-hidden />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="text-center">
            <span className="mb-4 inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-[9px] font-black uppercase tracking-[0.4em] text-emerald-700">
              {resolveLocalizedText(content.machineBadge, locale)}
            </span>
            <h2 className="serif text-3xl font-bold text-emerald-950">
              {resolveLocalizedText(content.machineTitle, locale)}
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base text-stone-600">
              {resolveLocalizedText(content.machineDesc, locale)}
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <article className="rounded-[2rem] border border-emerald-100 bg-white/90 p-8 shadow-sm">
              <div className="mb-6 flex h-72 items-center justify-center rounded-3xl bg-stone-100 p-4">
                <Image src="/gallery/quality-control/machine-color-sorter.png" alt="NMP color sorter machine" width={480} height={320} className="h-full w-auto object-contain" />
              </div>
              <p className="text-[11px] font-black uppercase tracking-[0.4em] text-emerald-600">
                {resolveLocalizedText(content.machine1Subtitle, locale)}
              </p>
              <h3 className="serif mt-2 text-2xl font-bold text-emerald-950">
                {locale === "id" ? "Mesin Color Sorter" : "Color Sorter Machine"}
              </h3>
              <p className="mt-4 text-sm text-stone-600">
                {resolveLocalizedText(content.machine1Desc, locale)}
              </p>
            </article>
            <article className="rounded-[2rem] border border-emerald-100 bg-white/90 p-8 shadow-sm">
              <div className="mb-6 flex h-72 items-center justify-center rounded-3xl bg-stone-100 p-4">
                <Image src="/gallery/quality-control/machine-cdcs25.png" alt="CDCS25 automatic weighing machine" width={480} height={320} className="h-full w-auto object-contain" />
              </div>
              <p className="text-[11px] font-black uppercase tracking-[0.4em] text-emerald-600">
                {resolveLocalizedText(content.machine2Subtitle, locale)}
              </p>
              <h3 className="serif mt-2 text-2xl font-bold text-emerald-950">
                {locale === "id" ? "Mesin Timbang Otomatis CDCS25" : "CDCS25 Automatic Weighing Machine"}
              </h3>
              <p className="mt-4 text-sm text-stone-600">
                {resolveLocalizedText(content.machine2Desc, locale)}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="relative bg-[url('/BG/1.jpg')] bg-cover bg-center py-20">
        <div className="absolute inset-0 bg-white/60" aria-hidden />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="text-center">
            <span className="mb-4 inline-flex items-center justify-center rounded-full bg-emerald-50 px-5 py-2 text-[9px] font-black uppercase tracking-[0.4em] text-emerald-700">
              {resolveLocalizedText(content.qcBadge, locale)}
            </span>
            <h2 className="serif text-3xl font-bold text-emerald-950">
              {resolveLocalizedText(content.qcTitle, locale)}
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base text-stone-600">
              {resolveLocalizedText(content.qcDesc, locale)}
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {qcStages.map((stage) => (
              <article key={stage.title} className="rounded-[1.75rem] border border-emerald-100 bg-stone-50 p-6">
                <p className="text-[11px] font-black uppercase tracking-[0.4em] text-emerald-600">{stage.metric}</p>
                <h3 className="serif mt-3 text-xl font-bold text-emerald-950">{stage.title}</h3>
                <p className="mt-2 text-[13px] text-stone-600">{stage.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
