export type ProductCategory = "rice" | "grains" | "hikaru";

export interface Product {
  id: string;
  title: string;
  category: ProductCategory;
  image: string;
  badge: string;
  badgeColor: string;
  description: string;
  size: string;
  ribbon?: string;
}

export interface ProductFilter {
  label: string;
  value: "all" | "kyohikari" | "hikaru";
  logo?: string;
}

export type ProductInquiryLocale = "id" | "en";

export const PRODUCT_FILTERS = [
  { label: "All Products", value: "all" },
  { label: "Kyohikari", value: "kyohikari", logo: "/logo/logo-kyohikari.png" },
  { label: "Hikaru", value: "hikaru", logo: "/logo/logo-hikaru.png" },
] as const satisfies readonly ProductFilter[];

export const PRODUCTS: Product[] = [
  {
    id: "kyohikari-white-2kg",
    title: "KYOHIKARI BERAS JAPONICA",
    category: "rice",
    image: "/beras-jepang-2kg.jpeg",
    badge: "Kyohikari",
    badgeColor: "text-emerald-600",
    description:
      "Beras japonica premium dengan tekstur pulen dan aroma bersih untuk kebutuhan rumah tangga maupun bisnis kuliner.",
    size: "2KG | 5KG | 20KG",
  },
  {
    id: "kyohikari-red",
    title: "KYOHIKARI BERAS MERAH",
    category: "rice",
    image: "/kyohikari-red-rice-1kg.jpeg",
    badge: "Kyohikari",
    badgeColor: "text-red-600",
    description:
      "Beras merah pilihan dengan kandungan serat tinggi dan rasa khas yang cocok untuk menu sehat.",
    size: "1KG",
  },
  {
    id: "kyohikari-black",
    title: "KYOHIKARI BERAS HITAM",
    category: "rice",
    image: "/beras-hitam-1kg.jpeg",
    badge: "Kyohikari",
    badgeColor: "text-purple-700",
    description:
      "Beras hitam premium dengan aroma khas dan kandungan antioksidan tinggi.",
    size: "1KG",
  },
  {
    id: "kyohikari-mung",
    title: "KYOHIKARI MUNG BEAN",
    category: "grains",
    image: "/kyohikari-kacang-hijau-500g.jpeg",
    badge: "Kyohikari",
    badgeColor: "text-emerald-600",
    description:
      "Kacang hijau berkualitas dengan tingkat kebersihan tinggi untuk kebutuhan kuliner dan olahan modern.",
    size: "500GR",
  },
  {
    id: "kyohikari-merah",
    title: "KYOHIKARI KACANG MERAH",
    category: "grains",
    image: "/kyohikari-kacang-merah-500g.jpeg",
    badge: "Kyohikari",
    badgeColor: "text-emerald-600",
    description:
      "Kacang merah pilihan dengan ukuran seragam untuk sup, dessert, dan menu premium.",
    size: "500GR",
  },
  {
    id: "kyohikari-jogo",
    title: "KYOHIKARI KACANG JOGO",
    category: "grains",
    image: "/kyohikari-kacang-jogo-500g.jpeg",
    badge: "Kyohikari",
    badgeColor: "text-emerald-600",
    description:
      "Kacang jogo premium yang kaya nutrisi dan cocok untuk berbagai olahan makanan.",
    size: "500GR",
  },
  {
    id: "kyohikari-peanut",
    title: "KYOHIKARI KACANG TANAH",
    category: "grains",
    image: "/kyohikari-kacang-tanah-500g.jpeg",
    badge: "Kyohikari",
    badgeColor: "text-emerald-600",
    description:
      "Kacang tanah bersih berkualitas untuk olahan manis maupun gurih.",
    size: "450GR",
  },
  {
    id: "kyohikari-soy",
    title: "KYOHIKARI KEDELAI",
    category: "grains",
    image: "/kyohikari-kedelai-500g.jpeg",
    badge: "Kyohikari",
    badgeColor: "text-emerald-600",
    description:
      "Kedelai kuning pilihan dengan kualitas konsisten untuk berbagai kebutuhan produksi.",
    size: "500GR",
  },
  {
    id: "kyohikari-tolo",
    title: "KYOHIKARI KACANG TOLO",
    category: "grains",
    image: "/kyohikari-kacang-tolo-500g.jpeg",
    badge: "Kyohikari",
    badgeColor: "text-emerald-600",
    description:
      "Kacang tolo berkualitas dengan tingkat kekeringan optimal untuk kebutuhan bisnis pangan.",
    size: "500GR",
  },
  {
    id: "hikaru-tobiko-green",
    title: "Hikaru Tobiko Green",
    category: "hikaru",
    image: "/tobiko green.jpeg",
    badge: "Green Flying Fish Roe",
    badgeColor: "text-emerald-700",
    description:
      "Tobiko hijau premium dengan tekstur renyah dan rasa gurih segar. Ideal untuk sushi, sashimi, rice bowl, dan salad. Simpan dalam freezer.",
    size: "500GR",
    ribbon: "Premium Seafood",
  },
  {
    id: "hikaru-tobiko-black",
    title: "Hikaru Tobiko Black",
    category: "hikaru",
    image: "/tobiko Black.jpeg",
    badge: "Flying Fish Roe",
    badgeColor: "text-stone-700",
    description:
      "Tobiko hitam premium dengan tekstur renyah dan rasa gurih segar. Cocok untuk sushi, sashimi, rice bowl, gunkan, dan salad. Simpan dalam freezer.",
    size: "500GR",
    ribbon: "Premium Seafood",
  },
  {
    id: "hikaru-tobiko-orange",
    title: "Hikaru Tobiko Orange",
    category: "hikaru",
    image: "/tobiko orange.jpeg",
    badge: "Orange Flying Fish Roe",
    badgeColor: "text-orange-600",
    description:
      "Tobiko oranye premium dengan tekstur renyah dan rasa gurih segar. Cocok untuk sushi, gunkan, sashimi, rice bowl, dan salad. Simpan dalam freezer.",
    size: "500GR",
    ribbon: "Premium Seafood",
  },
  {
    id: "hikaru-10",
    title: "Hikaru Rice 10KG",
    category: "hikaru",
    image: "/beras-jepang-10kg.jpeg",
    badge: "Resto & Hotel Line",
    badgeColor: "text-emerald-600",
    description:
      "Rice specification for hotels and Japanese restaurants with high head-rice ratio for perfect plating.",
    size: "10KG",
    ribbon: "Professional Use",
  },
  {
    id: "hikaru-25",
    title: "Hikaru Rice 25KG",
    category: "hikaru",
    image: "/beras-jepang-20kg.jpeg",
    badge: "Supply Chain Line",
    badgeColor: "text-emerald-600",
    description:
      "Economical pack for large kitchens, catering, and food-industry chains.",
    size: "25KG",
    ribbon: "Industrial Scale",
  },
];

export function buildProductInquiryLink(productName = "[Product Name]", locale: ProductInquiryLocale = "en"): string {
  const message =
    locale === "id"
      ? `Halo Admin! \u{1F44B}\u{1F3FB}\n\nSaya tertarik membeli produk ${productName}. Boleh dibantu untuk proses pemesanannya?`
      : `Hello Admin! \u{1F44B}\u{1F3FB}\n\nI'm interested in purchasing product ${productName}. Could you help with the ordering process?`;
  return `https://wa.me/6285889006572?text=${encodeURIComponent(message)}`;
}

export const CONTACT_WHATSAPP = buildProductInquiryLink();
