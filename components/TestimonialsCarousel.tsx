"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useSiteLocale } from "./useSiteLocale";

const testimonials = {
  id: [
    {
      quote:
        "Selama satu tahun terakhir, kami telah menggunakan beras Hikaru di restoran kami. Beras ini memiliki tekstur yang pulen, lengket, dan berasnya putih bersih. Selama pemakaian, kami tidak menerima komplain dari pelanggan terkait kualitasnya. Dari segi pelayanan, respons yang diberikan sangat cepat, penanganan kendala berjalan dengan baik, serta progres pengiriman selalu tepat waktu.",
      name: "Ibu Endah",
      role: "Resto Batari",
      avatar: "/partners/sushi-hiro.jpg",
    },
    {
      quote:
        "Kyohikari memberi konsistensi tekstur yang kami butuhkan untuk plating, tim NMP sigap untuk mengamankan stok saat high season.",
      name: "Head Chef Shigeru",
      role: "Head Chef Shigeru",
      avatar: "/partners/ramen-sanpachi.png",
    },
    {
      quote:
        "Beras merah Kyohikari menjadi unggulan di rak premium kami. Edukasi produk dari tim NMP membuat penjualan naik signifikan.",
      name: "Dewi Astari",
      role: "Manajer Kategori, Ranch Market",
      avatar: "/partners/ranch-market.jpg",
    },
  ],
  en: [
    {
      quote:
        "Over the past year, we have used Hikaru rice in our restaurant. The rice has a fluffy, sticky texture, and is clean white. During usage, we have not received any customer complaints regarding its quality. In terms of service, the response provided is very fast, issue handling goes smoothly, and delivery progress is always on time.",
      name: "Mrs. Endah",
      role: "Resto Batari",
      avatar: "/partners/sushi-hiro.jpg",
    },
    {
      quote:
        "Kyohikari provides the texture consistency we need for plating, and the NMP team is quick to secure stock during high season.",
      name: "Head Chef Shigeru",
      role: "Head Chef Shigeru",
      avatar: "/partners/ramen-sanpachi.png",
    },
    {
      quote:
        "Kyohikari red rice became a premium shelf standout for us. Product education from the NMP team significantly increased sales.",
      name: "Dewi Astari",
      role: "Category Manager, Ranch Market",
      avatar: "/partners/ranch-market.jpg",
    },
  ],
} as const;

const facilityShots = [
  "/gallery/customer-warehouse-visit/customer-shigeru.jpg",
  "/gallery/customer-warehouse-visit/customer-sushi-tei.jpg",
  "/gallery/customer-warehouse-visit/customer-marugame.jpg",
  "/gallery/customer-warehouse-visit/foto-bersama-dinas-pangan.jpg",
  "/gallery/activities/foto-bersama-tim-management.jpg",
];

const copy = {
  id: {
    badge: "Testimoni Mitra Horeca",
    imageAlt: "Foto bersama customer NMP",
  },
  en: {
    badge: "Horeca Partner Testimonials",
    imageAlt: "Photo with NMP customers",
  },
} as const;

export default function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const { locale } = useSiteLocale();
  const t = copy[locale];
  const localizedTestimonials = testimonials[locale];
  const testimonialCount = localizedTestimonials.length;

  useEffect(() => {
    setIndex(0);
  }, [locale]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonialCount);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonialCount]);

  const activeTestimonial = localizedTestimonials[index];

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-emerald-100 bg-white p-10 shadow-xl">
        <p className="text-xs font-black uppercase tracking-[0.4em] text-emerald-600">
          {t.badge}
        </p>
        <p className="serif mt-6 text-3xl font-bold text-emerald-950">
          “{activeTestimonial.quote}”
        </p>
        <div className="mt-8 flex items-center gap-4">
          <span className="relative block h-14 w-14 overflow-hidden rounded-full border border-emerald-100">
            <Image src={activeTestimonial.avatar} alt={activeTestimonial.name} fill sizes="56px" className="object-cover" />
          </span>
          <div>
            <p className="text-lg font-semibold text-emerald-900">{activeTestimonial.name}</p>
            <p className="text-sm text-stone-500">{activeTestimonial.role}</p>
          </div>
        </div>
        <div className="mt-10 flex gap-2">
          {localizedTestimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setIndex(idx)}
              className={`h-2 w-8 rounded-full transition ${
                idx === index ? "bg-emerald-900" : "bg-emerald-100"
              }`}
              aria-label={locale === "id" ? `Tampilkan testimoni ${idx + 1}` : `Show testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {facilityShots.map((src) => (
          <div key={src} className="relative h-48 overflow-hidden rounded-3xl">
            <Image src={src} alt={t.imageAlt} fill sizes="(max-width: 1024px) 50vw, 200px" className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
