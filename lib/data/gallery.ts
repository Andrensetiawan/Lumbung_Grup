export interface GalleryImage {
  src: string;
  alt: string;
}

export interface GalleryCategory {
  id: string;
  title: string;
  description: string;
  images: GalleryImage[];
}

export interface GalleryPageContent {
  categories: GalleryCategory[];
}

export const DEFAULT_GALLERY_CONTENT: GalleryPageContent = {
  categories: [
    {
      id: "facilities",
      title: "Facilities & Warehouse",
      description: "Modern warehouse with temperature-controlled systems",
      images: [
        { src: "/gallery/facilities-warehouse/foto-gudang-terbaru.jpeg", alt: "Foto gudang terbaru - pagar hitam" },
        { src: "/gallery/facilities-warehouse/Warehouse facility - bahan baku digudang.jpg", alt: "Foto bahan baku di gudang" },
        { src: "/gallery/facilities-warehouse/Warehouse facility - stok bahan baku.jpg", alt: "Foto stok bahan baku" },
      ],
    },
    {
      id: "quality-control",
      title: "Quality Control",
      description: "24/7 inspection and quality-testing process",
      images: [
        { src: "/gallery/quality-control/machine-color-sorter.png", alt: "Color sorting machine" },
        { src: "/gallery/quality-control/machine-color-sorter-1.png", alt: "Rice sorting process" },
        { src: "/gallery/quality-control/machine-cdcs25.png", alt: "CDCS25 automatic weighing machine" },
        { src: "/gallery/quality-control/machine-shifter.png", alt: "Shifter machine for quality control" },
      ],
    },
    {
      id: "partnership",
      title: "Customer Warehouse Visit",
      description: "Documentation of customer warehouse visits and partnership activities",
      images: [
        { src: "/gallery/customer-warehouse-visit/Customer warehouse visit - dinas pangan.jpg", alt: "Customer warehouse visit with dinas pangan" },
        { src: "/gallery/customer-warehouse-visit/Customer warehouse visit- marugame.jpg", alt: "Customer warehouse visit with Marugame" },
        { src: "/gallery/customer-warehouse-visit/Customer warehouse wisit-sushi tei. Jpg.jpg", alt: "Customer warehouse visit with Sushi Tei" },
      ],
    },
    {
      id: "events",
      title: "Events & Training",
      description: "Workshops, cooking demos, and exhibitions",
      images: [
        { src: "/gallery/events-training/Event -Foto outing kantor.jpg", alt: "Foto outing arung jeram" },
        { src: "/gallery/events-training/Event- Training staff.jpg", alt: "Foto training staf" },
        { src: "/gallery/events-training/foto-bersama-petani.jpeg", alt: "Foto owner dan petani" },
      ],
    },
    {
      id: "team",
      title: "Team & Culture",
      description: "The people behind NMP's success",
      images: [
        { src: "/gallery/team-culture/team-management.jpg", alt: "Foto bareng tim kantor" },
        { src: "/gallery/team-culture/Team- foto tim kantor.jpg", alt: "Training staf" },
      ],
    },
    {
      id: "logistics",
      title: "Fleet & Logistics",
      description: "Fleet and distribution process across Indonesia",
      images: [
        { src: "/gallery/fleet-logistics/armada-pengiriman.jpeg", alt: "Foto truk" },
        { src: "/gallery/fleet-logistics/muat-ke-logistik.jpeg", alt: "Granmax" },
        { src: "/gallery/fleet-logistics/armada-pengiriman-3.png", alt: "Kontainer" },
        { src: "/gallery/fleet-logistics/armada-pengiriman-4.png", alt: "Flat dan logistik" },
      ],
    },
  ],
};
