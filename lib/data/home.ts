export interface HomeHeroContent {
  badge: string;
  titleMain: string;
  titleSub: string;
  subheading: string;
  description: string;
}

export interface HomeStat {
  label: string;
  value: string;
}

export interface HomeCredential {
  label: string;
  href: string;
}

export interface HomeQualityContent {
  title: string;
  description: string;
  videoUrls: string[];
  videoLayout: "alternate" | "2" | "3" | "4";
}

export interface CaseStudySlide {
  title: string;
  description: string;
  name: string;
  role: string;
  avatar: string;
  avatarAlt?: string;
}

export interface HomeSuccessContent {
  slides: CaseStudySlide[];
  stats: { value: string; label: string }[];
}

export interface HomePageContent {
  hero: HomeHeroContent;
  stats: HomeStat[];
  credentials: HomeCredential[];
  quality: HomeQualityContent;
  success?: HomeSuccessContent;
  why?: any;
}

export const DEFAULT_HOME_CONTENT: HomePageContent = {
  hero: {
    badge: "",
    titleMain: "Kyohikari & Hikaru",
    titleSub: "Certified Quality Since 2020",
    subheading: "Trusted partner for premium Japonica rice procurement",
    description:
      "Serving hotel chains, restaurant groups, and modern retail with international QC standards, nationwide logistics, and free consultation.",
  },
  stats: [
    { label: "Key Partners", value: "19+" },
    { label: "Provinces", value: "20+" },
    { label: "Satisfaction", value: "98%" },
    { label: "Support", value: "24/7" },
  ],
  credentials: [],
  quality: {
    title: "How We Maintain Quality",
    description:
      "See how every Kyohikari grain is processed to international standards - from paddy selection to final packaging.",
    videoUrls: ["/Vidio/Vidio produk hikaru.mp4", "/Vidio/Vidio produk kyohikari.mp4", "/Vidio/Behind the quality- vidio proses menjaga kualitas.mp4"],
    videoLayout: "alternate",
  },
  why: {
    id: {
      badge: "Mengapa Bermitra dengan Kami",
      title: "Mengapa Memilih Niaga Multi Pangan?",
      description:
        "Lebih dari sekadar distributor, kami adalah partner strategis yang memahami tantangan procurement di industri hospitality dan retail modern.",
      benefits: [
        {
          title: "Pengendalian Mutu 5 Lapis",
          description:
            "Setiap batch Kyohikari dan Hikaru melalui 5 lapisan inspeksi QC sesuai standar BPOM dan keamanan pangan internasional, mulai dari incoming raw check hingga final release.",
          stat: "Tingkat Lolos 98%",
        },
        {
          title: "Jaringan Logistik Nasional",
          description:
            "Armada distribusi menjangkau 38 provinsi di Indonesia dengan garansi kesegaran produk sampai lokasi Anda.",
          stat: "38 Provinsi",
        },
        {
          title: "Dipercaya Sejak 2020",
          description:
            "Dipercaya oleh jaringan hotel, grup restoran, dan retail modern untuk menjaga konsistensi pasokan.",
          stat: "19+ Klien Utama",
        },
      ],
      qualityMedia: [
        { label: "Incoming raw check", type: "image", src: "/gallery/quality-control/Quality control- raw check.PNG", alt: "" },
        { label: "Optical sorting", type: "video", src: "/Optical sorting.mp4", alt: "" },
        { label: "Quality Assurance 24 hours", type: "image", src: "/gallery/quality-control/Quality control - quality asurance.PNG", alt: "" },
      ],
      logisticsMedia: [
        { label: "Proses muat barang ke armada logistik", src: "/gallery/fleet-logistics/armada-pengiriman-2.jpeg", alt: "Armada distribusi NMP" },
        { label: "Muat ke logistik", src: "/gallery/fleet-logistics/muat-ke-logistik.jpeg", alt: "Proses muat barang ke armada logistik" },
        { label: "Pengiriman ke gudang customer", src: "/gallery/fleet-logistics/pengiriman-ke-gudang-customer.jpeg", alt: "Pengiriman ke gudang customer" },
      ],
    },
    en: {},
  },
};