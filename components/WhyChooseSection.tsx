"use client";

import Image from "next/image";
import { Shield, Truck, Award } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSiteLocale } from "./useSiteLocale";

const benefits = {
  id: [
    {
      icon: Shield,
      title: "Pengendalian Mutu 5 Lapis",
      description: "Setiap batch Kyohikari dan Hikaru melalui 5 lapisan inspeksi QC sesuai standar BPOM dan keamanan pangan internasional, mulai dari incoming raw check hingga final release.",
      stat: "Tingkat Lolos 98%",
    },
    {
      icon: Truck,
      title: "Jaringan Logistik Nasional",
      description: "Armada distribusi menjangkau 38 provinsi di Indonesia dengan garansi kesegaran produk sampai lokasi Anda.",
      stat: "38 Provinsi",
    },
    {
      icon: Award,
      title: "Dipercaya Sejak 2020",
      description: "Dipercaya oleh jaringan hotel, grup restoran, dan retail modern untuk menjaga konsistensi pasokan. Portofolio mitra kami mencakup nama-nama besar di industri hospitality Indonesia.",
      stat: "19+ Klien Utama",
    },
  ],
  en: [
    {
      icon: Shield,
      title: "5-Layer Quality Control",
      description: "Every Kyohikari and Hikaru batch passes through 5 QC layers under BPOM and international food-safety standards, from incoming raw checks to final release.",
      stat: "98% Pass Rate",
    },
    {
      icon: Truck,
      title: "National Logistics Network",
      description: "A temperature-controlled distribution fleet serving all 38 provinces with real-time tracking. Lead time is 3-7 days with freshness guaranteed until it reaches your location.",
      stat: "38 Provinces",
    },
    {
      icon: Award,
      title: "Trusted Since 2020",
      description: "Trusted by hotel chains, restaurant groups, and modern retail to maintain supply consistency. Our partner portfolio includes major names in Indonesia's hospitality industry.",
      stat: "19+ Key Clients",
    },
  ],
} as const;

const qualityControlMedia = {
  id: [
    {
      label: "Incoming raw check",
      type: "image",
      src: "/gallery/quality-control/Quality control- raw check.PNG",
      alt: "Beras diuji kadar air saat incoming raw check",
    },
    {
      label: "Optical sorting",
      type: "video",
      src: "/Optical sorting.mp4",
      alt: "Proses optical sorting beras di mesin sorter",
    },
    {
      label: "Quality Assurance 24 hours",
      type: "image",
      src: "/gallery/quality-control/Quality control - quality asurance.PNG",
      alt: "Staff quality assurance melakukan pengecekan",
    },
  ],
  en: [
    {
      label: "Incoming raw check",
      type: "image",
      src: "/gallery/quality-control/Quality control- raw check.PNG",
      alt: "Rice moisture-level testing during incoming raw check",
    },
    {
      label: "Optical sorting",
      type: "video",
      src: "/Optical sorting.mp4",
      alt: "Rice optical sorting process in sorting machine",
    },
    {
      label: "Quality Assurance 24 hours",
      type: "image",
      src: "/gallery/quality-control/Quality control - quality asurance.PNG",
      alt: "Quality assurance staff conducting inspection",
    },
  ],
} as const;

const logisticsMedia = {
  id: [
    {
      label: "Armada distribusi",
      src: "/gallery/fleet-logistics/armada-pengiriman.jpeg",
      alt: "Armada distribusi NMP",
    },
    {
      label: "Muat ke logistik",
      src: "/gallery/fleet-logistics/muat-ke-logistik.jpeg",
      alt: "Proses muat barang ke armada logistik",
    },
    {
      label: "Pengiriman customer",
      src: "/gallery/fleet-logistics/pengiriman-ke-gudang-customer.jpeg",
      alt: "Pengiriman ke gudang customer",
    },
  ],
  en: [
    {
      label: "Distribution fleet",
      src: "/gallery/fleet-logistics/armada-pengiriman.jpeg",
      alt: "NMP distribution fleet",
    },
    {
      label: "Logistics loading",
      src: "/gallery/fleet-logistics/muat-ke-logistik.jpeg",
      alt: "Product loading process into logistics fleet",
    },
    {
      label: "Customer delivery",
      src: "/gallery/fleet-logistics/pengiriman-ke-gudang-customer.jpeg",
      alt: "Delivery to customer warehouse",
    },
  ],
} as const;

const successSlides = {
  id: [
    {
      title: '"Konsistensi Pengirimannya Terjaga."',
      description:
        "Selama satu tahun terakhir, kami telah menggunakan beras Hikaru di restoran kami. Beras ini memiliki tekstur yang pulen, lengket, dan berasnya putih bersih. Selama pemakaian, kami tidak menerima komplain dari pelanggan terkait kualitasnya. Dari segi pelayanan, respons yang diberikan sangat cepat, penanganan kendala berjalan dengan baik, serta progres pengiriman selalu tepat waktu.",
      name: "Ibu Endah",
      role: "Resto Batari",
      avatar: "/fake/ibu-endah-avatar.svg",
      avatarAlt: "Foto profil Ibu Endah",
    },
    {
      title: '"Konsistensi Kualitasnya Terjaga Sempurna"',
      description:
        "Kyohikari memberi konsistensi tekstur yang kami butuhkan untuk plating, tim NMP sigap untuk mengamankan stok saat high season.",
      name: "Head Chef Shigeru",
      role: "Head Chef Shigeru",
      avatar: "/fake/head-chef-shigeru-avatar.svg",
      avatarAlt: "Foto profil Head Chef Shigeru",
    },
  ],
  en: [
    {
      title: '"Delivery consistency stays reliable"',
      description:
        "For the past year, we have used Hikaru rice in our restaurant. The rice is fluffy, sticky, and clean white. We have not received customer complaints related to quality. In terms of service, responses are very fast, issue handling is smooth, and shipping progress is always on schedule.",
      name: "Mrs. Endah",
      role: "Resto Batari",
      avatar: "/fake/ibu-endah-avatar.svg",
      avatarAlt: "Mrs. Endah profile photo",
    },
    {
      title: '"Its quality consistency is perfectly maintained"',
      description:
        "Kyohikari provides the texture consistency we need for plating, and the NMP team is responsive in securing stock during high season.",
      name: "Head Chef Shigeru",
      role: "Head Chef Shigeru",
      avatar: "/fake/head-chef-shigeru-avatar.svg",
      avatarAlt: "Head Chef Shigeru profile photo",
    },
  ],
} as const;

const copy = {
  id: {
    badge: "Mengapa Bermitra dengan Kami",
    title: "Mengapa Memilih Niaga Multi Pangan?",
    description:
      "Lebih dari sekadar distributor, kami adalah partner strategis yang memahami tantangan procurement di industri hospitality dan retail modern.",
    successStory: "Pesan Direksi",
    successTitle: '"Konsistensi Pengirimanya Terjaga."',
    successDescription:
      "Selama satu tahun terakhir, kami telah menggunakan beras Hikaru di restoran kami. Beras ini punya teksture yang pulen, lengket dan berasnya putih bersih. Selama pemakaian, kami tidak menerima komplain dari pelanggan terkait kualitasnya. Dari segi pelayanan, respons yang diberikan sangat cepat, penangan kendala berjalan dengan baik, serta progress pengiriman selalu tepat waktu.",
    personRole: "Resto Batari",
    monthlyVolume: "Volume Bulanan",
    nationwideCoverage: "Cakupan Nasional",
    since2019: "Sejak 2019",
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
    successTitle: '"The same flavor consistency every month"',
    successDescription:
      "A hotel chain with 12 outlets in Jakarta and Bali has chosen Kyohikari as its exclusive rice partner since 2019. Procurement volume reaches 2 tons per month with zero complaints.",
    personRole: "Procurement Manager, Premium Hotel Group",
    monthlyVolume: "Monthly Volume",
    nationwideCoverage: "Nationwide Coverage",
    since2019: "Since 2019",
    ctaTitle: "Ready for a Partnership?",
    ctaDescription:
      "Discuss your procurement needs directly with our sales team. We are ready to support sample testing, trial orders, and annual contracts.",
    scheduleConsultation: "Schedule Consultation",
    whatsappNow: "WhatsApp Now",
  },
} as const;

export default function WhyChooseSection() {
  const { locale } = useSiteLocale();
  const t = copy[locale];
  const localizedBenefits = benefits[locale];
  const localizedQualityControlMedia = qualityControlMedia[locale];
  const localizedLogisticsMedia = logisticsMedia[locale];
  const localizedSuccessSlides = successSlides[locale];
  const [activeSuccessIndex, setActiveSuccessIndex] = useState(0);

  useEffect(() => {
    setActiveSuccessIndex(0);
  }, [locale]);

  useEffect(() => {
    if (localizedSuccessSlides.length < 2) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveSuccessIndex((prev) => (prev + 1) % localizedSuccessSlides.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [localizedSuccessSlides.length]);

  const activeSuccessSlide = localizedSuccessSlides[activeSuccessIndex];

  return (
    <section className="relative bg-[url('/BG/1.jpg')] bg-cover bg-center py-16 sm:py-20">
      <div className="absolute inset-0 bg-white/50" aria-hidden />
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        {/* Header */}
        <div className="mb-10 text-center sm:mb-12">
          <span className="mb-4 inline-block rounded-full bg-emerald-50 px-5 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-emerald-700">
            {t.badge}
          </span>
          <h2 className="serif mb-4 text-3xl font-bold text-emerald-950 sm:text-4xl lg:text-5xl">
            {t.title}
          </h2>
          <p className="mx-auto max-w-2xl text-base text-stone-600 sm:text-lg">
            {t.description}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
          {localizedBenefits.map((benefit, index) => (
            <div
              key={index}
              className="group rounded-3xl border border-stone-200 bg-gradient-to-br from-white to-emerald-50/30 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-900 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <benefit.icon size={28} strokeWidth={2} />
                </div>
                <div className="rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-bold text-emerald-900">
                  {benefit.stat}
                </div>
              </div>
              <h3 className="mb-3 text-xl font-bold text-emerald-950">
                {benefit.title}
              </h3>
              <p className="text-sm leading-relaxed text-stone-600">
                {benefit.description}
              </p>

              {index === 0 ? (
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {localizedQualityControlMedia.map((media) => (
                    <div key={media.label} className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
                      <div className="relative aspect-[4/3] bg-stone-100">
                        {media.type === "video" ? (
                          <video
                            src={media.src}
                            className="h-full w-full object-cover"
                            muted
                            loop
                            playsInline
                            autoPlay
                            controls
                            aria-label={media.alt}
                          />
                        ) : (
                          <Image
                            src={media.src}
                            alt={media.alt}
                            fill
                            sizes="(max-width: 768px) 100vw, 220px"
                            className="object-cover"
                          />
                        )}
                      </div>
                      <p className="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-900">
                        {media.label}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}

              {index === 1 ? (
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {localizedLogisticsMedia.map((media) => (
                    <div key={media.label} className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
                      <div className="relative aspect-[4/3] bg-stone-100">
                        <Image
                          src={media.src}
                          alt={media.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 220px"
                          className="object-cover"
                        />
                      </div>
                      <p className="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-900">
                        {media.label}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>

        {/* Case Study Teaser */}
        <div className="mt-12 rounded-3xl bg-gradient-to-br from-emerald-900 to-emerald-800 p-8 text-white shadow-2xl sm:p-10">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.3em] text-emerald-300">
                {t.successStory}
              </span>
              <h3 className="serif mb-3 text-2xl font-bold sm:text-3xl">
                {activeSuccessSlide.title}
              </h3>
              <p className="mb-5 text-emerald-100">
                {activeSuccessSlide.description}
              </p>
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/20 bg-white/10">
                  <Image
                    src={activeSuccessSlide.avatar}
                    alt={activeSuccessSlide.avatarAlt}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold">{activeSuccessSlide.name}</p>
                  <p className="text-sm text-emerald-200">{activeSuccessSlide.role}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                {localizedSuccessSlides.map((slide, index) => (
                  <button
                    key={slide.name}
                    type="button"
                    onClick={() => setActiveSuccessIndex(index)}
                    aria-label={`Slide ${index + 1}`}
                    className={`h-2.5 rounded-full transition-all ${index === activeSuccessIndex ? "w-7 bg-white" : "w-2.5 bg-white/40"}`}
                  />
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                <p className="text-2xl font-black sm:text-3xl">2 Ton</p>
                <p className="text-sm text-emerald-200">{t.monthlyVolume}</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                <p className="text-2xl font-black sm:text-3xl">12 Outlets</p>
                <p className="text-sm text-emerald-200">{t.nationwideCoverage}</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                <p className="text-2xl font-black sm:text-3xl">0 Complaints</p>
                <p className="text-sm text-emerald-200">{t.since2019}</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-12 rounded-3xl border-2 border-dashed border-emerald-200 bg-emerald-50 p-6 text-center sm:p-8">
          <h3 className="serif mb-3 text-2xl font-bold text-emerald-950 sm:text-3xl">
            {t.ctaTitle}
          </h3>
          <p className="mx-auto mb-5 max-w-2xl text-stone-600">
            {t.ctaDescription}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-block rounded-full bg-emerald-950 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.28em] text-white transition hover:bg-emerald-900"
            >
              {t.scheduleConsultation}
            </Link>
            <a
              href={locale === "id"
                ? "https://wa.me/6285811848112?text=Halo%20NMP%2C%20saya%20ingin%20diskusi%20procurement"
                : "https://wa.me/6285811848112?text=Hello%20NMP%2C%20I%20would%20like%20to%20discuss%20procurement"}
              target="_blank"
              className="inline-block rounded-full border-2 border-emerald-950 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-950 transition hover:bg-emerald-100"
            >
              {t.whatsappNow}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
