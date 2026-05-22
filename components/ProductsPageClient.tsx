"use client";

import Link from "next/link";
import ProductGrid from "./ProductGrid";
import StructuredData from "./StructuredData";
import { PRODUCT_FILTERS, type Product } from "../lib/data/products";
import { buildProductInquiryLink } from "../lib/data/products";
import { useSiteLocale } from "./useSiteLocale";

type Props = {
  products: Product[];
  productSchemas: Record<string, unknown>[];
};

const copy = {
  id: {
    badge: "Katalog Produk",
    title: "Lini Produk Kyohikari & Hikaru",
    description:
      "Portofolio lengkap beras Japonica premium dan palawija profesional dengan dokumentasi spec sheet, opsi MOQ, dan info lead time untuk kebutuhan B2B Anda.",
    downloadCatalog: "Unduh Katalog Lengkap PDF",
    requestSample: "Minta Sampel",
    moq: "MOQ Fleksibel",
    moqDesc: "Minimum order disesuaikan dengan kebutuhan bisnis Anda",
    lead: "Lead Time 3-7 Hari",
    leadDesc: "Pengiriman cepat ke seluruh Indonesia dengan tracking",
    privateLabel: "Private Label Ready",
    privateLabelDesc: "Konsultasi gratis untuk white-label dan custom packaging",
    ctaDesc: "Hubungi Procurement Desk untuk quotation volume besar dan kerja sama eksklusif",
    whatsapp: "WhatsApp: +62 858-8900-6572",
  },
  en: {
    badge: "Product Catalog",
    title: "Kyohikari & Hikaru Product Lines",
    description:
      "Complete portfolio of premium Japonica rice and professional grains with spec sheets, MOQ options, and lead-time info for your B2B needs.",
    downloadCatalog: "Download Full Catalog PDF",
    requestSample: "Request Sample Kit",
    moq: "Flexible MOQ",
    moqDesc: "Minimum order adjusted to your business needs",
    lead: "3-7 Day Lead Time",
    leadDesc: "Fast shipping across Indonesia with tracking",
    privateLabel: "Private Label Ready",
    privateLabelDesc: "Free consultation for white-label and custom packaging",
    ctaDesc: "Contact our Procurement Desk for high-volume quotations and exclusive partnerships",
    whatsapp: "WhatsApp: +62 858-8900-6572",
  },
} as const;

export default function ProductsPageClient({ products, productSchemas }: Props) {
  const { locale } = useSiteLocale();
  const t = copy[locale];

  return (
    <section className="relative bg-[url('/BG/1.jpg')] bg-cover bg-center py-28">
      <div className="absolute inset-0 bg-white/50" aria-hidden />
      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center mb-16">
        <span className="mb-4 inline-block rounded-full border border-emerald-200 bg-emerald-50 px-6 py-2 text-[10px] font-bold uppercase tracking-[0.4em] text-emerald-700">
          {t.badge}
        </span>
        <h1 className="serif mb-6 text-4xl font-bold text-emerald-950 sm:text-5xl">{t.title}</h1>
        <p className="mx-auto max-w-3xl text-lg text-stone-600 mb-8">{t.description}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="/doc/COMPANY%20PROFILE%20PT%20NIAGA%20MULTI%20PANGAN.pdf"
            target="_blank"
            className="inline-block rounded-full bg-emerald-950 px-8 py-3 text-xs font-bold uppercase tracking-[0.3em] text-white transition hover:bg-emerald-900"
          >
            {t.downloadCatalog}
          </a>
          <Link
            href="/contact"
            className="inline-block rounded-full border-2 border-emerald-950 px-8 py-3 text-xs font-bold uppercase tracking-[0.3em] text-emerald-950 transition hover:bg-emerald-50"
          >
            {t.requestSample}
          </Link>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <ProductGrid products={products} filters={PRODUCT_FILTERS} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 mt-20">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200 p-8 sm:p-12">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="text-3xl font-black text-emerald-900 mb-2">{t.moq}</div>
              <p className="text-sm text-stone-600">{t.moqDesc}</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-emerald-900 mb-2">{t.lead}</div>
              <p className="text-sm text-stone-600">{t.leadDesc}</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-emerald-900 mb-2">{t.privateLabel}</div>
              <p className="text-sm text-stone-600">{t.privateLabelDesc}</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm font-semibold text-stone-700 mb-4">{t.ctaDesc}</p>
            <a
              href={buildProductInquiryLink("[Product Name]", locale)}
              target="_blank"
              className="inline-block rounded-full bg-emerald-950 px-8 py-3 text-xs font-bold uppercase tracking-[0.3em] text-white transition hover:bg-emerald-900"
            >
              {t.whatsapp}
            </a>
          </div>
        </div>
      </div>

      <StructuredData data={productSchemas} id="products-schema" />
    </section>
  );
}
