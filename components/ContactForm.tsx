"use client";

import { MessageCircle } from "lucide-react";
import { type FormEvent } from "react";
import { useSiteLocale } from "./useSiteLocale";

const copy = {
  id: {
    badge: "Form Inquiry B2B",
    title: "Minta Penawaran dan Konsultasi",
    desc: "Isi form berikut dan tim kami akan menghubungi Anda dalam 24 jam untuk diskusi detail kebutuhan procurement.",
    company: "Nama Perusahaan *",
    yourName: "Nama Anda *",
    jobTitle: "Jabatan",
    phone: "Nomor Telepon *",
    businessType: "Tipe Bisnis *",
    selectBusiness: "Pilih kategori bisnis",
    other: "Lainnya",
    monthly: "Estimasi Kebutuhan per Bulan *",
    selectRange: "Pilih range volume",
    interested: "Produk yang Diminati",
    message: "Pesan / Kebutuhan Spesifik",
    messagePlaceholder: "Jelaskan kebutuhan Anda: custom packaging, jadwal pengiriman, dll.",
    submit: "Kirim Inquiry via WhatsApp",
    note: "Form ini akan membuka WhatsApp dengan pesan pre-filled. Anda bisa edit sebelum mengirim.",
  },
  en: {
    badge: "B2B Inquiry Form",
    title: "Request Quotation & Consultation",
    desc: "Fill out the form below and our team will contact you within 24 hours to discuss your procurement needs in detail.",
    company: "Company Name *",
    yourName: "Your Name *",
    jobTitle: "Job Title",
    phone: "Phone Number *",
    businessType: "Business Type *",
    selectBusiness: "Select a business category",
    other: "Other",
    monthly: "Estimated Monthly Volume *",
    selectRange: "Select a volume range",
    interested: "Interested Products",
    message: "Message / Specific Needs",
    messagePlaceholder: "Describe your needs: custom packaging, delivery schedule, etc.",
    submit: "Send Inquiry via WhatsApp",
    note: "This form will open WhatsApp with a pre-filled message. You can edit it before sending.",
  },
} as const;

export default function ContactForm() {
  const { locale } = useSiteLocale();
  const t = copy[locale];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const companyName = String(formData.get("companyName") ?? "-").trim() || "-";
    const contactName = String(formData.get("contactName") ?? "-").trim() || "-";
    const jobTitle = String(formData.get("jobTitle") ?? "-").trim() || "-";
    const email = String(formData.get("email") ?? "-").trim() || "-";
    const phone = String(formData.get("phone") ?? "-").trim() || "-";
    const businessType = String(formData.get("businessType") ?? "-").trim() || "-";
    const monthlyVolume = String(formData.get("monthlyVolume") ?? "-").trim() || "-";
    const specificNeeds = String(formData.get("specificNeeds") ?? "-").trim() || "-";
    const interestedProducts = formData
      .getAll("interestedProducts")
      .map((value) => String(value).trim())
      .filter(Boolean);

    const productText = interestedProducts.length > 0 ? interestedProducts.join(", ") : "-";

    const message =
      locale === "id"
        ? `Halo Admin! 👋\n\nSaya ingin inquiry dari website. Berikut detail saya:\n\nNama Perusahaan: ${companyName}\nNama Kontak: ${contactName}\nJabatan: ${jobTitle}\nEmail: ${email}\nNomor Telepon: ${phone}\nTipe Bisnis: ${businessType}\nEstimasi Kebutuhan/Bulan: ${monthlyVolume}\nProduk Diminati: ${productText}\nKebutuhan Spesifik: ${specificNeeds}`
        : `Hello Admin! 👋\n\nI would like to submit an inquiry from your website. Here are my details:\n\nCompany Name: ${companyName}\nContact Name: ${contactName}\nJob Title: ${jobTitle}\nEmail: ${email}\nPhone Number: ${phone}\nBusiness Type: ${businessType}\nEstimated Monthly Volume: ${monthlyVolume}\nInterested Products: ${productText}\nSpecific Needs: ${specificNeeds}`;

    const whatsappLink = `https://wa.me/6285889006572?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="rounded-[3rem] bg-white p-8 text-stone-900 shadow-2xl sm:p-12">
      <div className="mb-8">
        <span className="mb-3 inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.3em] text-emerald-700">
          {t.badge}
        </span>
        <h3 className="serif text-2xl font-bold text-emerald-950 sm:text-3xl">
          {t.title}
        </h3>
        <p className="mt-3 text-sm text-stone-600">
          {t.desc}
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Company Name */}
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-700">
            {t.company}
          </label>
          <input
            name="companyName"
            type="text"
            placeholder="PT. Example Indonesia"
            className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            required
          />
        </div>

        {/* Contact Person */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-700">
              {t.yourName}
            </label>
            <input
              name="contactName"
              type="text"
              placeholder="Budi Santoso"
              className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-700">
              {t.jobTitle}
            </label>
            <input
              name="jobTitle"
              type="text"
              placeholder="Procurement Manager"
              className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </div>
        </div>

        {/* Email & Phone */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-700">
              Email *
            </label>
            <input
              name="email"
              type="email"
              placeholder="procurement@company.com"
              className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-700">
              {t.phone}
            </label>
            <input
              name="phone"
              type="tel"
              placeholder="08123456789"
              className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              required
            />
          </div>
        </div>

        {/* Business Type */}
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-700">
            {t.businessType}
          </label>
          <select
            name="businessType"
            className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            required
          >
            <option value="">{t.selectBusiness}</option>
            <option value="hotel">Hotel / Resort</option>
            <option value="restaurant">Restaurant / Cafe</option>
            <option value="retail">Modern Retail / Supermarket</option>
            <option value="catering">Catering / Cloud Kitchen</option>
            <option value="distributor">Distributor / Wholesaler</option>
            <option value="other">{t.other}</option>
          </select>
        </div>

        {/* Monthly Volume */}
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-700">
            {t.monthly}
          </label>
          <select
            name="monthlyVolume"
            className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            required
          >
            <option value="">{t.selectRange}</option>
            <option value="<100kg">{"< 100 kg (Trial Order)"}</option>
            <option value="100-500kg">100 - 500 kg</option>
            <option value="500kg-1ton">500 kg - 1 Ton</option>
            <option value="1-3ton">1 - 3 Ton</option>
            <option value=">3ton">{"> 3 Ton (Enterprise)"}</option>
          </select>
        </div>

        {/* Product Interest */}
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-700">
            {t.interested}
          </label>
          <div className="space-y-2">
            <label className="flex items-center gap-3">
              <input
                name="interestedProducts"
                type="checkbox"
                value="Kyohikari White Rice (Premium)"
                className="h-4 w-4 rounded border-stone-300 text-emerald-600"
              />
              <span className="text-sm">Kyohikari White Rice (Premium)</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                name="interestedProducts"
                type="checkbox"
                value="Hikaru Professional Line"
                className="h-4 w-4 rounded border-stone-300 text-emerald-600"
              />
              <span className="text-sm">Hikaru Professional Line</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                name="interestedProducts"
                type="checkbox"
                value="Specialty Grains (Red/Black Rice, Beans)"
                className="h-4 w-4 rounded border-stone-300 text-emerald-600"
              />
              <span className="text-sm">Specialty Grains (Red/Black Rice, Beans)</span>
            </label>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-700">
            {t.message}
          </label>
          <textarea
            name="specificNeeds"
            placeholder={t.messagePlaceholder}
            rows={4}
            className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-full bg-emerald-950 py-4 text-sm font-bold uppercase tracking-[0.3em] text-white shadow-lg transition hover:bg-emerald-900 active:scale-95"
        >
          <MessageCircle className="inline-block h-4 w-4 mr-2" />
          {t.submit}
        </button>

        <p className="text-center text-xs text-stone-500">
          {t.note}
        </p>
      </form>
    </div>
  );
}
