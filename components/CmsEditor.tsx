"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Partner } from "../lib/data/partners";
import type { Product, ProductCategory } from "../lib/data/products";
import type { HomePageContent } from "../lib/data/home";
import type { AboutPageContent } from "../lib/data/about";
import type { PartnersPageContent } from "../lib/data/partners-page";
import type { GalleryPageContent } from "../lib/data/gallery";
import CloudinaryUploadButton from "./CloudinaryUploadButton";

interface CmsEditorProps {
  initialProducts: Product[];
  initialPartners: Partner[];
  initialHome: HomePageContent;
  initialAbout: AboutPageContent;
  initialPartnersPage: PartnersPageContent;
  initialGallery: GalleryPageContent;
  updatedAt: string;
}

type CmsTab = "home" | "about" | "products" | "partners" | "gallery";
type HomeEditorTab = "hero" | "stats" | "creds" | "quality" | "why";
type VideoLayoutMode = "alternate" | "2" | "3" | "4";

const categoryOptions: Array<{ label: string; value: ProductCategory }> = [
  { label: "🌾 Beras Biasa", value: "rice" },
  { label: "🌽 Biji-bijian Lain", value: "grains" },
  { label: "⭐ Beras Spesial (Hikaru)", value: "hikaru" },
];

const badgeColorOptions: Array<{ label: string; value: string }> = [
  { label: "🟢 Hijau", value: "text-emerald-600" },
  { label: "🔴 Merah", value: "text-red-600" },
  { label: "🟣 Ungu", value: "text-purple-700" },
  { label: "🔵 Biru", value: "text-sky-600" },
  { label: "🟠 Oranye", value: "text-amber-600" },
  { label: "🪨 Abu-abu", value: "text-stone-700" },
];

function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "item"
  );
}

function createUniqueId(base: string, existingIds: string[]): string {
  const root = slugify(base);
  if (!existingIds.includes(root)) {
    return root;
  }

  let suffix = 2;
  while (existingIds.includes(`${root}-${suffix}`)) {
    suffix += 1;
  }

  return `${root}-${suffix}`;
}

function createProductDraft(seed?: Partial<Product>): Product {
  const title = seed?.title ?? "New Product";
  return {
    id: seed?.id ?? slugify(title),
    title,
    category: seed?.category ?? "rice",
    image: seed?.image ?? "/beras-jepang-2kg.jpeg",
    badge: seed?.badge ?? "Beras Super",
    badgeColor: seed?.badgeColor ?? "text-emerald-600",
    description:
      seed?.description ??
      "Write a short story about this item. What makes it unique and high quality?",
    size: seed?.size ?? "1 KG",
    ribbon: seed?.ribbon,
  };
}

function createPartnerDraft(seed?: Partial<Partner>): Partner {
  return {
    name: seed?.name ?? "Teman Baru",
    sector: seed?.sector ?? "Toko Kue",
    logo: seed?.logo ?? "/partners/the-food-hall.png",
  };
}

function reorderItems<T>(items: T[], fromIndex: number, targetIndex: number): T[] {
  if (fromIndex === targetIndex) {
    return items;
  }

  const next = [...items];
  const [movedItem] = next.splice(fromIndex, 1);
  const insertionIndex = fromIndex < targetIndex ? targetIndex - 1 : targetIndex;

  next.splice(insertionIndex, 0, movedItem);
  return next;
}

function updateSelectedIndexAfterMove(selectedIndex: number, fromIndex: number, targetIndex: number): number {
  if (selectedIndex === fromIndex) {
    return fromIndex < targetIndex ? targetIndex - 1 : targetIndex;
  }

  if (fromIndex < targetIndex) {
    if (selectedIndex > fromIndex && selectedIndex < targetIndex) {
      return selectedIndex - 1;
    }

    return selectedIndex;
  }

  if (selectedIndex >= targetIndex && selectedIndex < fromIndex) {
    return selectedIndex + 1;
  }

  return selectedIndex;
}

export default function CmsEditor({
  initialProducts,
  initialPartners,
  initialHome,
  initialAbout,
  initialPartnersPage,
  initialGallery,
  updatedAt,
}: CmsEditorProps) {
  const router = useRouter();
  const [tab, setTab] = useState<CmsTab>("home");
  const [homeEditorTab, setHomeEditorTab] = useState<HomeEditorTab>("hero");
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [home, setHome] = useState<HomePageContent>(initialHome);
  const [about, setAbout] = useState<AboutPageContent>(initialAbout);
  const [partnersPage, setPartnersPage] = useState<PartnersPageContent>(initialPartnersPage);
  const [gallery, setGallery] = useState<GalleryPageContent>(initialGallery);
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [selectedPartnerIndex, setSelectedPartnerIndex] = useState(0);
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(0);
  const [status, setStatus] = useState("✨ All good! Nothing has been changed yet.");
  const [saving, setSaving] = useState(false);
  const [draggedSelectorIndex, setDraggedSelectorIndex] = useState<number | null>(null);
  const [draggedSelectorTab, setDraggedSelectorTab] = useState<CmsTab | null>(null);
  const selectorClickSuppression = useRef(false);

  useEffect(() => {
    if (products.length === 0) {
      setSelectedProductIndex(0);
      return;
    }
    setSelectedProductIndex((current) => Math.min(current, products.length - 1));
  }, [products.length]);

  useEffect(() => {
    if (partners.length === 0) {
      setSelectedPartnerIndex(0);
      return;
    }
    setSelectedPartnerIndex((current) => Math.min(current, partners.length - 1));
  }, [partners.length]);

  useEffect(() => {
    if (gallery.categories.length === 0) {
      setSelectedGalleryIndex(0);
      return;
    }
    setSelectedGalleryIndex((current) => Math.min(current, gallery.categories.length - 1));
  }, [gallery.categories.length]);

  function updateHomeHero(key: keyof HomePageContent["hero"], value: string) {
    setHome((current) => ({ ...current, hero: { ...current.hero, [key]: value } }));
  }

  function updateHomeQuality(key: keyof HomePageContent["quality"], value: string) {
    setHome((current) => ({ ...current, quality: { ...current.quality, [key]: value } }));
  }

  function updateHomeVideoLayout(value: VideoLayoutMode) {
    setHome((current) => ({ ...current, quality: { ...current.quality, videoLayout: value } }));
  }

  function updateHomeVideo(index: number, value: string) {
    setHome((current) => ({
      ...current,
      quality: {
        ...current.quality,
        videoUrls: current.quality.videoUrls.map((item, itemIndex) =>
          itemIndex === index ? value : item,
        ),
      },
    }));
  }

  function updateHomeWhyField(key: string, value: any) {
    setHome((current) => ({ ...current, why: { ...(current as any).why, id: { ...((current as any).why?.id || {}), [key]: value } } }));
  }

  function updateWhyBenefit(index: number, key: string, value: string) {
    setHome((current) => ({
      ...current,
      why: {
        ...(current as any).why,
        id: {
          ...((current as any).why?.id || {}),
          benefits: (((current as any).why?.id?.benefits || []) as any[]).map((b: any, i: number) => (i === index ? { ...b, [key]: value } : b)),
        },
      },
    }));
  }

  function updateWhyMedia(type: 'qualityMedia'|'logisticsMedia', index: number, key: string, value: string) {
    setHome((current) => ({
      ...current,
      why: {
        ...(current as any).why,
        id: {
          ...((current as any).why?.id || {}),
          [type]: (((current as any).why?.id?.[type] || []) as any[]).map((m: any, i: number) => (i === index ? { ...m, [key]: value } : m)),
        },
      },
    }));
  }

  function addWhyMedia(type: 'qualityMedia'|'logisticsMedia') {
    setHome((current) => ({
      ...current,
      why: {
        ...(current as any).why,
        id: {
          ...((current as any).why?.id || {}),
          [type]: [ ...(((current as any).why?.id?.[type] || []) as any[]), { label: '', src: '', alt: '' } ],
        },
      },
    }));
  }

  function removeWhyMedia(type: 'qualityMedia'|'logisticsMedia', index: number) {
    setHome((current) => ({
      ...current,
      why: {
        ...(current as any).why,
        id: {
          ...((current as any).why?.id || {}),
          [type]: (((current as any).why?.id?.[type] || []) as any[]).filter((_, i: number) => i !== index),
        },
      },
    }));
  }

  function addHomeVideo() {
    setHome((current) => ({
      ...current,
      quality: { ...current.quality, videoUrls: [...current.quality.videoUrls, ""] },
    }));
  }

  function removeHomeVideo(index: number) {
    setHome((current) => ({
      ...current,
      quality: {
        ...current.quality,
        videoUrls: current.quality.videoUrls.filter((_, itemIndex) => itemIndex !== index),
      },
    }));
  }

  function updateHomeStat(index: number, key: "label" | "value", value: string) {
    setHome((current) => ({
      ...current,
      stats: current.stats.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [key]: value } : item,
      ),
    }));
  }

  function updateHomeCredential(index: number, key: "label" | "href", value: string) {
    setHome((current) => ({
      ...current,
      credentials: current.credentials.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [key]: value } : item,
      ),
    }));
  }

  function addHomeStat() {
    setHome((current) => ({
      ...current,
      stats: [...current.stats, { label: "Keterangan Baru", value: "100" }],
    }));
  }

  function removeHomeStat(index: number) {
    setHome((current) => ({
      ...current,
      stats: current.stats.filter((_, itemIndex) => itemIndex !== index),
    }));
  }

  function addHomeCredential() {
    setHome((current) => ({
      ...current,
      credentials: [...current.credentials, { label: "Dokumen Baru", href: "/docs/" }],
    }));
  }

  function removeHomeCredential(index: number) {
    setHome((current) => ({
      ...current,
      credentials: current.credentials.filter((_, itemIndex) => itemIndex !== index),
    }));
  }

  function updateAboutField(key: keyof AboutPageContent, locale: "id" | "en", value: string) {
    setAbout((current) => {
      const nextValue = current[key];
      if (Array.isArray(nextValue)) {
        return current;
      }

      return {
        ...current,
        [key]: { ...nextValue, [locale]: value },
      };
    });
  }

  function updateAboutArrayField(
    key: "paragraphs" | "missionList",
    index: number,
    locale: "id" | "en",
    value: string,
  ) {
    setAbout((current) => ({
      ...current,
      [key]: current[key].map((item, itemIndex) =>
        itemIndex === index ? { ...item, [locale]: value } : item,
      ) as typeof current[typeof key],
    }));
  }

  function updatePartnersPageField(key: keyof PartnersPageContent, locale: "id" | "en", value: string) {
    setPartnersPage((current) => ({
      ...current,
      [key]: { ...current[key], [locale]: value },
    }));
  }

  function updateProduct(index: number, patch: Partial<Product>) {
    setSelectedProductIndex(index);
    setProducts((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)),
    );
  }

  function updatePartner(index: number, patch: Partial<Partner>) {
    setSelectedPartnerIndex(index);
    setPartners((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)),
    );
  }

  function handleSelectorClickGuard() {
    if (selectorClickSuppression.current) {
      selectorClickSuppression.current = false;
      return true;
    }

    return false;
  }

  function handleSelectProduct(index: number) {
    if (handleSelectorClickGuard()) {
      return;
    }

    setSelectedProductIndex(index);
  }

  function handleSelectPartner(index: number) {
    if (handleSelectorClickGuard()) {
      return;
    }

    setSelectedPartnerIndex(index);
  }

  function startSelectorDrag(tabName: CmsTab, index: number, event: React.DragEvent<HTMLButtonElement>) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", `${tabName}:${index}`);
    setDraggedSelectorIndex(index);
    setDraggedSelectorTab(tabName);
    selectorClickSuppression.current = true;
  }

  function endSelectorDrag() {
    setDraggedSelectorIndex(null);
    setDraggedSelectorTab(null);
    window.setTimeout(() => {
      selectorClickSuppression.current = false;
    }, 0);
  }

  function reorderSelectedProduct(fromIndex: number, targetIndex: number) {
    setProducts((current) => reorderItems(current, fromIndex, targetIndex));
    setSelectedProductIndex((current) => updateSelectedIndexAfterMove(current, fromIndex, targetIndex));
  }

  function reorderSelectedPartner(fromIndex: number, targetIndex: number) {
    setPartners((current) => reorderItems(current, fromIndex, targetIndex));
    setSelectedPartnerIndex((current) => updateSelectedIndexAfterMove(current, fromIndex, targetIndex));
  }

  function handleSelectorDrop(tabName: CmsTab, targetIndex: number) {
    if (draggedSelectorIndex === null || draggedSelectorTab !== tabName) {
      return;
    }

    if (tabName === "products") {
      reorderSelectedProduct(draggedSelectorIndex, targetIndex);
    } else if (tabName === "partners") {
      reorderSelectedPartner(draggedSelectorIndex, targetIndex);
    }

    endSelectorDrag();
  }

  function handleSelectorDropToEnd(tabName: CmsTab) {
    if (draggedSelectorIndex === null || draggedSelectorTab !== tabName) {
      return;
    }

    if (tabName === "products") {
      reorderSelectedProduct(draggedSelectorIndex, products.length);
    } else if (tabName === "partners") {
      reorderSelectedPartner(draggedSelectorIndex, partners.length);
    }

    endSelectorDrag();
  }

  function handleSelectorScroll(event: React.UIEvent<HTMLDivElement>) {
    const container = event.currentTarget;
    const items = Array.from(container.querySelectorAll<HTMLElement>("[data-selector-index]"));

    if (items.length === 0) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    items.forEach((item) => {
      const itemIndex = Number(item.dataset.selectorIndex ?? "0");
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.left + itemRect.width / 2;
      const distance = Math.abs(itemCenter - containerCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = itemIndex;
      }
    });

    if (tab === "products" && closestIndex !== selectedProductIndex) {
      setSelectedProductIndex(closestIndex);
    }

    if (tab === "partners" && closestIndex !== selectedPartnerIndex) {
      setSelectedPartnerIndex(closestIndex);
    }
  }

  function duplicateProduct(index: number) {
    const copy = {
      ...products[index],
      id: createUniqueId(`${products[index].id}-copy`, products.map((product) => product.id)),
      title: `${products[index].title} (Copy)`,
    };
    setProducts((current) => {
      const next = [...current];
      next.splice(index + 1, 0, copy);
      return next;
    });
  }

  function duplicatePartner(index: number) {
    const copy = { ...partners[index], name: `${partners[index].name} (Copy)` };
    setPartners((current) => {
      const next = [...current];
      next.splice(index + 1, 0, copy);
      return next;
    });
  }

  function addProduct() {
    setProducts((current) => {
      const nextId = createUniqueId("new-product", current.map((product) => product.id));
      const next = [...current, createProductDraft({ id: nextId, title: "Our New Product" })];
      setSelectedProductIndex(next.length - 1);
      return next;
    });
    setTab("products");
  }

  function addPartner() {
    setPartners((current) => {
      const next = [
        ...current,
        createPartnerDraft({ name: `Teman Bekerja Sama ${current.length + 1}` }),
      ];
      setSelectedPartnerIndex(next.length - 1);
      return next;
    });
    setTab("partners");
  }

  function removeProduct(index: number) {
    setProducts((current) => current.filter((_, itemIndex) => itemIndex !== index));
  }

  function removePartner(index: number) {
    setPartners((current) => current.filter((_, itemIndex) => itemIndex !== index));
  }

  function updateGalleryCategory(index: number, patch: Partial<typeof gallery.categories[0]>) {
    setSelectedGalleryIndex(index);
    setGallery((current) => ({
      ...current,
      categories: current.categories.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)),
    }));
  }

  function updateGalleryImage(categoryIndex: number, imageIndex: number, patch: Partial<typeof gallery.categories[0]["images"][0]>) {
    setGallery((current) => ({
      ...current,
      categories: current.categories.map((category, catIdx) =>
        catIdx === categoryIndex
          ? {
              ...category,
              images: category.images.map((img, imgIdx) =>
                imgIdx === imageIndex ? { ...img, ...patch } : img,
              ),
            }
          : category,
      ),
    }));
  }

  function addGalleryImage(categoryIndex: number) {
    setGallery((current) => ({
      ...current,
      categories: current.categories.map((category, catIdx) =>
        catIdx === categoryIndex
          ? {
              ...category,
              images: [...category.images, { src: "", alt: "" }],
            }
          : category,
      ),
    }));
  }

  function removeGalleryImage(categoryIndex: number, imageIndex: number) {
    setGallery((current) => ({
      ...current,
      categories: current.categories.map((category, catIdx) =>
        catIdx === categoryIndex
          ? {
              ...category,
              images: category.images.filter((_, imgIdx) => imgIdx !== imageIndex),
            }
          : category,
      ),
    }));
  }

  async function handleSave() {
    setStatus("⏳ Please wait, sending to the website...");
    setSaving(true);

    try {
      const response = await fetch("/api/cms/data", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          products,
          partners,
          home,
          about,
          partnersPage,
          gallery,
        }),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        const errorMsg = payload.message ?? "Something went wrong.";
        setStatus(`❌ Save failed: ${errorMsg}`);
        alert(`❌ Gagal Menyimpan!\n\n${errorMsg}`);
        return;
      }

      setStatus("🎉 Great! Your changes are now live on the website!");
      alert("✅ Berhasil!\n\nPerubahan Anda sudah tersimpan dan tampil di website!");
      router.refresh();
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Unknown error";
      setStatus("🔌 Network issue detected. Please try saving again.");
      alert(`🔌 Terjadi Kesalahan!\n\n${errorMsg}\n\nSilakan coba lagi.`);
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/cms/logout", { method: "POST" });
    router.push("/cms/login");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-sky-50 px-4 py-8 font-sans sm:px-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="overflow-hidden rounded-[2rem] border-4 border-white bg-emerald-600 bg-gradient-to-br from-emerald-500 to-teal-700 p-6 text-white shadow-xl sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div>
              <p className="inline-block rounded-full bg-yellow-300 px-3 py-1 text-xs font-black uppercase tracking-widest text-emerald-900 shadow-sm">
                🎮 Control Center
              </p>
              <h1 className="mt-4 text-3xl font-black drop-shadow-md sm:text-5xl">Website Studio</h1>
              <p className="mt-3 max-w-2xl text-base font-medium leading-relaxed text-emerald-50 sm:text-lg">
                Hello! 👋 Here you can update text, images, and product listings on the website with ease.
                No coding needed.
              </p>
            </div>

            <div className="rounded-2xl border-2 border-emerald-300/50 bg-black/10 p-5 text-sm text-emerald-50 backdrop-blur-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-200">💾 Last Saved</p>
              <p className="mt-2 text-xl font-bold">{new Date(updatedAt).toLocaleString("en-US")}</p>
              <p className="mt-2 text-xs leading-relaxed text-emerald-100/90">
                💡 <b>Tip:</b> Don&apos;t forget to click Save at the bottom after finishing your edits.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/products"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border-2 border-white/50 bg-white/20 px-5 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-emerald-800"
            >
              👀 View Products Page
            </a>
            <a
              href="/partners"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border-2 border-white/50 bg-white/20 px-5 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-emerald-800"
            >
              🤝 View Partners Page
            </a>
            <button
              type="button"
              onClick={handleLogout}
              className="ml-auto rounded-full border-2 border-red-500 bg-red-400 px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-red-500"
            >
              🚪 Logout
            </button>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          <button
            type="button"
            onClick={() => setTab("home")}
            className={`rounded-[2rem] p-5 text-left transition transform hover:-translate-y-1 ${
              tab === "home"
                ? "scale-105 border-4 border-white bg-amber-400 text-amber-950 shadow-xl"
                : "border-4 border-transparent bg-white text-stone-600 shadow-md hover:bg-amber-50"
            }`}
          >
            <p className="mb-2 text-4xl">🏠</p>
            <p className="text-xs font-black uppercase tracking-widest opacity-70">Section 1</p>
            <p className="mt-1 text-2xl font-black">Home Page</p>
            <p className="mt-2 text-sm font-medium opacity-90">Update the greeting and story on the home page.</p>
          </button>

          <button
            type="button"
            onClick={() => setTab("about")}
            className={`rounded-[2rem] p-5 text-left transition transform hover:-translate-y-1 ${
              tab === "about"
                ? "scale-105 border-4 border-white bg-emerald-400 text-emerald-950 shadow-xl"
                : "border-4 border-transparent bg-white text-stone-600 shadow-md hover:bg-emerald-50"
            }`}
          >
            <p className="mb-2 text-4xl">🏢</p>
            <p className="text-xs font-black uppercase tracking-widest opacity-70">Section 2</p>
            <p className="mt-1 text-2xl font-black">About Page</p>
            <p className="mt-2 text-sm font-medium opacity-90">Edit the company story in both languages.</p>
          </button>

          <button
            type="button"
            onClick={() => setTab("products")}
            className={`rounded-[2rem] p-5 text-left transition transform hover:-translate-y-1 ${
              tab === "products"
                ? "scale-105 border-4 border-white bg-sky-400 text-sky-950 shadow-xl"
                : "border-4 border-transparent bg-white text-stone-600 shadow-md hover:bg-sky-50"
            }`}
          >
            <p className="mb-2 text-4xl">🛍️</p>
            <p className="text-xs font-black uppercase tracking-widest opacity-70">Section 3</p>
            <p className="mt-1 text-2xl font-black">Products</p>
            <p className="mt-2 text-sm font-medium opacity-90">
              There are <b>{products.length} products</b>. Which one do you want to add or edit?
            </p>
          </button>

          <button
            type="button"
            onClick={() => setTab("partners")}
            className={`rounded-[2rem] p-5 text-left transition transform hover:-translate-y-1 ${
              tab === "partners"
                ? "scale-105 border-4 border-white bg-purple-400 text-purple-950 shadow-xl"
                : "border-4 border-transparent bg-white text-stone-600 shadow-md hover:bg-purple-50"
            }`}
          >
            <p className="mb-2 text-4xl">🤝</p>
            <p className="text-xs font-black uppercase tracking-widest opacity-70">Section 4</p>
            <p className="mt-1 text-2xl font-black">Partners</p>
            <p className="mt-2 text-sm font-medium opacity-90">
              There are <b>{partners.length} partner logos</b> listed.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setTab("gallery")}
            className={`rounded-[2rem] p-5 text-left transition transform hover:-translate-y-1 ${
              tab === "gallery"
                ? "scale-105 border-4 border-white bg-pink-400 text-pink-950 shadow-xl"
                : "border-4 border-transparent bg-white text-stone-600 shadow-md hover:bg-pink-50"
            }`}
          >
            <p className="mb-2 text-4xl">🖼️</p>
            <p className="text-xs font-black uppercase tracking-widest opacity-70">Section 5</p>
            <p className="mt-1 text-2xl font-black">Gallery</p>
            <p className="mt-2 text-sm font-medium opacity-90">
              There are <b>{gallery.categories.length} categories</b> with photos.
            </p>
          </button>
        </section>

        <section className="rounded-[2.5rem] border-4 border-stone-100 bg-white p-6 shadow-xl sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-4 border-stone-100 pb-6">
            <div>
              <h2 className="text-2xl font-black text-stone-800">
                {tab === "home"
                  ? "🏠 Home Page Settings"
                  : tab === "about"
                    ? "🏢 About Page Settings"
                  : tab === "products"
                    ? "🛍️ Product Directory"
                    : tab === "partners"
                      ? "🤝 Partner Directory"
                      : "🖼️ Gallery"}
              </h2>
              <p className="mt-2 text-base font-medium text-stone-500">
                {tab === "home"
                  ? "Type in any field below and it updates automatically."
                  : tab === "about"
                    ? "Edit the company story, vision, mission, and QC copy in both languages."
                  : tab === "products"
                    ? "Pick a product on the left, then edit details on the right."
                    : tab === "partners"
                      ? "Add a new partner by entering their name and logo."
                      : "Edit gallery categories and images."}
              </p>
            </div>
            <div className="flex gap-2">
              {tab === "products" && (
                <button
                  type="button"
                  onClick={addProduct}
                  className="transform rounded-full bg-sky-500 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:scale-105 hover:bg-sky-600"
                >
                  ➕ Add New Product
                </button>
              )}
              {tab === "partners" && (
                <button
                  type="button"
                  onClick={addPartner}
                  className="transform rounded-full bg-purple-500 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:scale-105 hover:bg-purple-600"
                >
                  ➕ Tambah Teman Baru
                </button>
              )}
            </div>
          </div>

          {tab === "home" && (
            <div className="mt-8 grid gap-8 xl:grid-cols-[1.3fr_0.7fr]">
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2 rounded-2xl bg-stone-100 p-2">
                  {[
                    { value: "hero", label: "👋 Sambutan Atas", icon: "✨" },
                    { value: "stats", label: "🏆 Prestasi & Angka", icon: "📈" },
                    { value: "creds", label: "📜 Sertifikat Kita", icon: "🥇" },
                    { value: "quality", label: "💖 Cerita Bagus", icon: "📖" },
                  ].map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setHomeEditorTab(item.value as HomeEditorTab)}
                      className={`flex-1 rounded-xl px-5 py-3 text-center text-sm font-bold transition sm:flex-none ${
                        homeEditorTab === item.value
                          ? "bg-white text-emerald-700 shadow-md"
                          : "text-stone-500 hover:bg-stone-200"
                      }`}
                    >
                      {item.icon} {item.label}
                    </button>
                  ))}
                </div>

                {homeEditorTab === "hero" && (
                  <div className="space-y-5 rounded-2xl border-2 border-amber-100 bg-amber-50 p-6">
                    <Field label="🎈 Tulisan Kecil Paling Atas (Contoh: Pengumuman!)">
                      <input
                        value={home.hero.badge}
                        onChange={(event) => updateHomeHero("badge", event.target.value)}
                        className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base font-medium outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20"
                      />
                    </Field>
                    <div className="grid gap-5 md:grid-cols-2">
                      <Field label="Besar Banget: Judul Utama">
                        <input
                          value={home.hero.titleMain}
                          onChange={(event) => updateHomeHero("titleMain", event.target.value)}
                          className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-lg font-black outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20"
                        />
                      </Field>
                      <Field label="Besar Biasa: Lanjutan Judul">
                        <input
                          value={home.hero.titleSub}
                          onChange={(event) => updateHomeHero("titleSub", event.target.value)}
                          className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-lg font-black outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20"
                        />
                      </Field>
                    </div>
                    <Field label="Penjelasan Singkat (Bawah Judul)">
                      <input
                        value={home.hero.subheading}
                        onChange={(event) => updateHomeHero("subheading", event.target.value)}
                        className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20"
                      />
                    </Field>
                    <Field label="📝 Cerita Lengkapnya / Kenapa Harus Beli di Sini?">
                      <textarea
                        value={home.hero.description}
                        onChange={(event) => updateHomeHero("description", event.target.value)}
                        className="min-h-[140px] w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base leading-relaxed outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20"
                      />
                    </Field>
                  </div>
                )}

                {homeEditorTab === "stats" && (
                  <div className="space-y-4 rounded-2xl border-2 border-sky-100 bg-sky-50 p-6">
                    <p className="mb-4 text-sm font-medium text-stone-600">
                      Ayo tulis angka-angka hebat yang bikin orang percaya sama kita!
                    </p>
                    {home.stats.map((item, index) => (
                      <div
                        key={`home-stat-${index}`}
                        className="rounded-2xl border-2 border-sky-200 bg-white p-5 shadow-sm"
                      >
                        <div className="grid gap-4 md:grid-cols-[0.35fr_0.65fr_auto] md:items-end">
                          <Field label="Angka Hebatnya">
                            <input
                              value={item.value}
                              onChange={(event) => updateHomeStat(index, "value", event.target.value)}
                              placeholder="Contoh: 100+"
                              className="w-full rounded-xl border-2 border-stone-200 bg-stone-50 px-4 py-3 text-lg font-black outline-none transition focus:border-sky-400"
                            />
                          </Field>
                          <Field label="Itu Angka Apa?">
                            <input
                              value={item.label}
                              onChange={(event) => updateHomeStat(index, "label", event.target.value)}
                              placeholder="Contoh: Orang yang suka"
                              className="w-full rounded-xl border-2 border-stone-200 bg-stone-50 px-4 py-3 text-base outline-none transition focus:border-sky-400"
                            />
                          </Field>
                          <button
                            type="button"
                            onClick={() => removeHomeStat(index)}
                            className="rounded-xl border-2 border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-500 hover:text-white"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addHomeStat}
                      className="w-full rounded-2xl border-4 border-dashed border-sky-300 bg-sky-100/50 px-5 py-4 text-sm font-bold text-sky-700 transition hover:bg-sky-200"
                    >
                      ➕ Bikin Angka Baru
                    </button>
                  </div>
                )}

                {homeEditorTab === "creds" && (
                  <div className="space-y-4 rounded-2xl border-2 border-purple-100 bg-purple-50 p-6">
                    <p className="mb-4 text-sm font-medium text-stone-600">
                      Unggah file PDF atau ketik tautan sertifikat yang mau dipamerin.
                    </p>
                    {home.credentials.map((item, index) => (
                      <div
                        key={`home-credential-${index}`}
                        className="rounded-2xl border-2 border-purple-200 bg-white p-5 shadow-sm"
                      >
                        <div className="space-y-4">
                          <Field label="Nama Tombol Sertifikatnya">
                            <input
                              value={item.label}
                              onChange={(event) => updateHomeCredential(index, "label", event.target.value)}
                              className="w-full rounded-xl border-2 border-stone-200 bg-stone-50 px-4 py-3 text-base font-bold outline-none transition focus:border-purple-400"
                            />
                          </Field>
                          <Field label="Alamat / Link Dokumennya">
                            <div className="flex gap-2">
                              <input
                                value={item.href}
                                onChange={(event) => updateHomeCredential(index, "href", event.target.value)}
                                className="flex-1 rounded-xl border-2 border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-purple-400"
                              />
                            </div>
                          </Field>
                          <div className="flex items-center gap-3 rounded-xl bg-purple-50 p-3">
                            <span className="text-sm font-bold text-purple-800">Or choose a file from your laptop:</span>
                            <CloudinaryUploadButton
                              label="📤 Upload Dokumen"
                              accept=".pdf,.doc,.docx,.ppt,.pptx"
                              folder="nmp/docs"
                              onUploaded={(url) => updateHomeCredential(index, "href", url)}
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeHomeCredential(index)}
                            className="w-full rounded-xl border-2 border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-500 hover:text-white"
                          >
                            🗑️ Delete This Credential
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addHomeCredential}
                      className="w-full rounded-2xl border-4 border-dashed border-purple-300 bg-purple-100/50 px-5 py-4 text-sm font-bold text-purple-700 transition hover:bg-purple-200"
                    >
                      ➕ Bikin Sertifikat Baru
                    </button>
                  </div>
                )}

                {homeEditorTab === "quality" && (
                  <div className="space-y-5 rounded-2xl border-2 border-emerald-100 bg-emerald-50 p-6">
                    <Field label="📖 Judul Cerita">
                      <input
                        value={home.quality.title}
                        onChange={(event) => updateHomeQuality("title", event.target.value)}
                        className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-lg font-black outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20"
                      />
                    </Field>
                    <Field label="Isi Ceritanya Dong!">
                      <textarea
                        value={home.quality.description}
                        onChange={(event) => updateHomeQuality("description", event.target.value)}
                        className="min-h-[160px] w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base leading-relaxed outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20"
                      />
                    </Field>
                    <Field label="🎬 Mode Tampil Video">
                      <select
                        value={home.quality.videoLayout}
                        onChange={(event) => updateHomeVideoLayout(event.target.value as VideoLayoutMode)}
                        className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20"
                      >
                        <option value="alternate">Bergantian 1 video</option>
                        <option value="2">Tampil 2 video</option>
                        <option value="3">Tampil 3 video</option>
                        <option value="4">Tampil 4 video</option>
                      </select>
                    </Field>
                    <div className="space-y-4 rounded-2xl border-2 border-emerald-200 bg-white p-5">
                      <p className="text-sm font-bold text-emerald-800">🎥 Link Video Keren Kita</p>
                      {home.quality.videoUrls.map((videoUrl, index) => (
                        <div
                          key={`home-video-${index}`}
                          className="space-y-3 rounded-xl border-2 border-stone-100 bg-stone-50 p-4"
                        >
                          <input
                            value={videoUrl}
                            onChange={(event) => updateHomeVideo(index, event.target.value)}
                            placeholder="Ketik alamat videonya di sini..."
                            className="w-full rounded-xl border-2 border-stone-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-400"
                          />
                          <div className="flex flex-wrap items-center gap-2">
                            <CloudinaryUploadButton
                              label="📤 Upload Videonya"
                              accept="video/*"
                              folder="nmp/videos"
                              onUploaded={(url) => updateHomeVideo(index, url)}
                            />
                            <button
                              type="button"
                              onClick={() => removeHomeVideo(index)}
                              className="rounded-xl border-2 border-red-200 bg-white px-4 py-2 text-xs font-bold text-red-600 transition hover:bg-red-500 hover:text-white"
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addHomeVideo}
                        className="w-full rounded-xl border-4 border-dashed border-emerald-300 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700 transition hover:bg-emerald-100"
                      >
                        ➕ Tambah Kolom Video Baru
                      </button>
                    </div>
                  </div>
                )}
                {homeEditorTab === "why" && (
                  <div className="space-y-5 rounded-2xl border-2 border-emerald-100 bg-emerald-50 p-6">
                    <Field label="Badge Kecil (atas)">
                      <input value={(home as any).why?.id?.badge || ''} onChange={(e) => updateHomeWhyField('badge', e.target.value)} className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base outline-none" />
                    </Field>
                    <Field label="Judul Section">
                      <input value={(home as any).why?.id?.title || ''} onChange={(e) => updateHomeWhyField('title', e.target.value)} className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-lg font-black outline-none" />
                    </Field>
                    <Field label="Deskripsi Section">
                      <textarea value={(home as any).why?.id?.description || ''} onChange={(e) => updateHomeWhyField('description', e.target.value)} className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base outline-none" />
                    </Field>

                    <div className="space-y-4 rounded-2xl border-2 border-white bg-white p-5">
                      <p className="text-sm font-bold text-emerald-800">Benefit Cards</p>
                      {(((home as any).why?.id?.benefits || []) as any[]).map((b, idx) => (
                        <div key={idx} className="space-y-2 rounded-xl border-2 border-stone-100 bg-stone-50 p-4">
                          <input value={b.title || ''} onChange={(e) => updateWhyBenefit(idx, 'title', e.target.value)} className="w-full rounded-xl border-2 px-3 py-2" />
                          <input value={b.stat || ''} onChange={(e) => updateWhyBenefit(idx, 'stat', e.target.value)} className="w-full rounded-xl border-2 px-3 py-2" />
                          <textarea value={b.description || ''} onChange={(e) => updateWhyBenefit(idx, 'description', e.target.value)} className="w-full rounded-xl border-2 px-3 py-2" />
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4 rounded-2xl border-2 border-white bg-white p-5">
                      <p className="text-sm font-bold text-emerald-800">Quality Media (labels, alt & src)</p>
                      {(((home as any).why?.id?.qualityMedia || []) as any[]).map((m, idx) => (
                        <div key={idx} className="space-y-2 rounded-xl border-2 border-stone-100 bg-stone-50 p-4">
                          <input placeholder="Label (optional)" value={m.label || ''} onChange={(e) => updateWhyMedia('qualityMedia', idx, 'label', e.target.value)} className="w-full rounded-xl border-2 px-3 py-2" />
                          <input placeholder="Alt text (optional)" value={m.alt || ''} onChange={(e) => updateWhyMedia('qualityMedia', idx, 'alt', e.target.value)} className="w-full rounded-xl border-2 px-3 py-2" />
                          <div className="flex gap-2">
                            <input placeholder="Image URL" value={m.src || ''} onChange={(e) => updateWhyMedia('qualityMedia', idx, 'src', e.target.value)} className="flex-1 rounded-xl border-2 px-3 py-2" />
                            <CloudinaryUploadButton label="📤 Upload" accept="image/*" folder="nmp/why" onUploaded={(url) => updateWhyMedia('qualityMedia', idx, 'src', url)} />
                          </div>
                          <div className="flex gap-2">
                            <button type="button" onClick={() => removeWhyMedia('qualityMedia', idx)} className="rounded-xl border-2 border-red-200 bg-red-50 px-4 py-2 text-xs font-bold text-red-600">🗑️ Remove</button>
                          </div>
                        </div>
                      ))}
                      <button type="button" onClick={() => addWhyMedia('qualityMedia')} className="w-full rounded-xl border-4 border-dashed border-emerald-300 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">➕ Tambah Foto Kualitas</button>
                    </div>

                    <div className="space-y-4 rounded-2xl border-2 border-white bg-white p-5">
                      <p className="text-sm font-bold text-emerald-800">Logistics Media (labels, alt & src)</p>
                      {(((home as any).why?.id?.logisticsMedia || []) as any[]).map((m, idx) => (
                        <div key={idx} className="space-y-2 rounded-xl border-2 border-stone-100 bg-stone-50 p-4">
                          <input placeholder="Label (optional)" value={m.label || ''} onChange={(e) => updateWhyMedia('logisticsMedia', idx, 'label', e.target.value)} className="w-full rounded-xl border-2 px-3 py-2" />
                          <input placeholder="Alt text (optional)" value={m.alt || ''} onChange={(e) => updateWhyMedia('logisticsMedia', idx, 'alt', e.target.value)} className="w-full rounded-xl border-2 px-3 py-2" />
                          <div className="flex gap-2">
                            <input placeholder="Image URL" value={m.src || ''} onChange={(e) => updateWhyMedia('logisticsMedia', idx, 'src', e.target.value)} className="flex-1 rounded-xl border-2 px-3 py-2" />
                            <CloudinaryUploadButton label="📤 Upload" accept="image/*" folder="nmp/why" onUploaded={(url) => updateWhyMedia('logisticsMedia', idx, 'src', url)} />
                          </div>
                          <div className="flex gap-2">
                            <button type="button" onClick={() => removeWhyMedia('logisticsMedia', idx)} className="rounded-xl border-2 border-red-200 bg-red-50 px-4 py-2 text-xs font-bold text-red-600">🗑️ Remove</button>
                          </div>
                        </div>
                      ))}
                      <button type="button" onClick={() => addWhyMedia('logisticsMedia')} className="w-full rounded-xl border-4 border-dashed border-emerald-300 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">➕ Tambah Foto Logistik</button>
                    </div>
                  </div>
                )}
              </div>

              <aside className="flex flex-col items-center rounded-[2.5rem] border-4 border-stone-200 bg-stone-100 p-6 shadow-inner">
                <p className="mb-4 rounded-full bg-white px-4 py-2 text-sm font-black text-stone-500 shadow-sm">
                  📱 Mobile Preview
                </p>
                <div className="relative mx-auto w-full max-w-[320px] overflow-hidden rounded-[2.5rem] border-[8px] border-stone-800 bg-white shadow-2xl">
                  <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-b-xl bg-stone-800" />
                  <div className="h-[580px] overflow-y-auto">
                    <div className="bg-gradient-to-br from-emerald-600 to-teal-800 px-5 pb-8 pt-10 text-center text-white">
                      <span className="inline-block rounded-full border border-yellow-300/50 bg-yellow-300/20 px-3 py-1 text-[10px] font-bold text-yellow-100">
                        {home.hero.badge || "PENGUMUMAN"}
                      </span>
                      <h3 className="mt-4 text-2xl font-black leading-tight drop-shadow-md">
                        {home.hero.titleMain || "Judul Utama"}
                      </h3>
                      <p className="mt-2 text-sm font-bold text-emerald-100">{home.hero.titleSub || "Judul Tambahan"}</p>
                      <p className="mt-3 rounded-lg bg-black/10 p-2 text-xs font-medium text-emerald-50/90">
                        {home.hero.subheading || "Penjelasan Singkat"}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 bg-stone-50 p-4">
                      {home.stats.map((item, index) => (
                        <div
                          key={`home-preview-stat-${index}`}
                          className="rounded-2xl border border-stone-100 bg-white p-3 text-center shadow-sm"
                        >
                          <p className="text-xl font-black text-sky-600">{item.value || "0"}</p>
                          <p className="mt-1 text-[10px] font-bold text-stone-500">{item.label || "Keterangan"}</p>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-stone-100 bg-white p-5">
                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500">💖 Cerita Bagus Kita</p>
                      <p className="mt-2 text-lg font-black text-stone-800">{home.quality.title || "Judul Cerita"}</p>
                      <p className="mt-2 line-clamp-4 text-xs leading-relaxed text-stone-600">
                        {home.quality.description || "Isi ceritanya akan muncul di sini..."}
                      </p>
                    </div>
                    <div className="bg-emerald-950 p-5 text-white">
                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-300">📜 Sertifikat Keren</p>
                      <div className="mt-3 space-y-2">
                        {home.credentials.map((item, index) => (
                          <div
                            key={`home-preview-credential-${index}`}
                            className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-center text-xs font-bold"
                          >
                            📄 {item.label || "Dokumen"}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          )}

          {tab === "about" && (
            <div className="mt-8 grid gap-8 xl:grid-cols-[1.3fr_0.7fr]">
              <div className="space-y-6 rounded-[2.5rem] border-4 border-emerald-100 bg-emerald-50 p-6 sm:p-8">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="About Badge - ID"><input value={about.aboutBadge.id} onChange={(event) => updateAboutField("aboutBadge", "id", event.target.value)} className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base outline-none" /></Field>
                  <Field label="About Badge - EN"><input value={about.aboutBadge.en} onChange={(event) => updateAboutField("aboutBadge", "en", event.target.value)} className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base outline-none" /></Field>
                  <Field label="Company Name - ID"><input value={about.companyName.id} onChange={(event) => updateAboutField("companyName", "id", event.target.value)} className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base outline-none" /></Field>
                  <Field label="Company Name - EN"><input value={about.companyName.en} onChange={(event) => updateAboutField("companyName", "en", event.target.value)} className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base outline-none" /></Field>
                </div>

                {[0, 1, 2].map((index) => (
                  <div key={`about-paragraph-${index}`} className="grid gap-4 md:grid-cols-2">
                    <Field label={`Paragraph ${index + 1} - ID`}>
                      <textarea value={about.paragraphs[index].id} onChange={(event) => updateAboutArrayField("paragraphs", index, "id", event.target.value)} className="min-h-[120px] w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-sm leading-relaxed outline-none" />
                    </Field>
                    <Field label={`Paragraph ${index + 1} - EN`}>
                      <textarea value={about.paragraphs[index].en} onChange={(event) => updateAboutArrayField("paragraphs", index, "en", event.target.value)} className="min-h-[120px] w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-sm leading-relaxed outline-none" />
                    </Field>
                  </div>
                ))}

                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Award - ID"><input value={about.award.id} onChange={(event) => updateAboutField("award", "id", event.target.value)} className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base outline-none" /></Field>
                  <Field label="Award - EN"><input value={about.award.en} onChange={(event) => updateAboutField("award", "en", event.target.value)} className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base outline-none" /></Field>
                  <Field label="Vision Title - ID"><input value={about.visionTitle.id} onChange={(event) => updateAboutField("visionTitle", "id", event.target.value)} className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base outline-none" /></Field>
                  <Field label="Vision Title - EN"><input value={about.visionTitle.en} onChange={(event) => updateAboutField("visionTitle", "en", event.target.value)} className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base outline-none" /></Field>
                  <Field label="Vision Desc - ID"><textarea value={about.visionDesc.id} onChange={(event) => updateAboutField("visionDesc", "id", event.target.value)} className="min-h-[120px] w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-sm leading-relaxed outline-none" /></Field>
                  <Field label="Vision Desc - EN"><textarea value={about.visionDesc.en} onChange={(event) => updateAboutField("visionDesc", "en", event.target.value)} className="min-h-[120px] w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-sm leading-relaxed outline-none" /></Field>
                  <Field label="Mission Title - ID"><input value={about.missionTitle.id} onChange={(event) => updateAboutField("missionTitle", "id", event.target.value)} className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base outline-none" /></Field>
                  <Field label="Mission Title - EN"><input value={about.missionTitle.en} onChange={(event) => updateAboutField("missionTitle", "en", event.target.value)} className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base outline-none" /></Field>
                </div>

                {[0, 1, 2].map((index) => (
                  <div key={`about-mission-${index}`} className="grid gap-4 md:grid-cols-2">
                    <Field label={`Mission ${index + 1} - ID`}>
                      <input value={about.missionList[index].id} onChange={(event) => updateAboutArrayField("missionList", index, "id", event.target.value)} className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base outline-none" />
                    </Field>
                    <Field label={`Mission ${index + 1} - EN`}>
                      <input value={about.missionList[index].en} onChange={(event) => updateAboutArrayField("missionList", index, "en", event.target.value)} className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base outline-none" />
                    </Field>
                  </div>
                ))}

                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Machine Badge - ID"><input value={about.machineBadge.id} onChange={(event) => updateAboutField("machineBadge", "id", event.target.value)} className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base outline-none" /></Field>
                  <Field label="Machine Badge - EN"><input value={about.machineBadge.en} onChange={(event) => updateAboutField("machineBadge", "en", event.target.value)} className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base outline-none" /></Field>
                  <Field label="Machine Title - ID"><input value={about.machineTitle.id} onChange={(event) => updateAboutField("machineTitle", "id", event.target.value)} className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base outline-none" /></Field>
                  <Field label="Machine Title - EN"><input value={about.machineTitle.en} onChange={(event) => updateAboutField("machineTitle", "en", event.target.value)} className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base outline-none" /></Field>
                  <Field label="Machine Desc - ID"><textarea value={about.machineDesc.id} onChange={(event) => updateAboutField("machineDesc", "id", event.target.value)} className="min-h-[120px] w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-sm leading-relaxed outline-none" /></Field>
                  <Field label="Machine Desc - EN"><textarea value={about.machineDesc.en} onChange={(event) => updateAboutField("machineDesc", "en", event.target.value)} className="min-h-[120px] w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-sm leading-relaxed outline-none" /></Field>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="QC Badge - ID"><input value={about.qcBadge.id} onChange={(event) => updateAboutField("qcBadge", "id", event.target.value)} className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base outline-none" /></Field>
                  <Field label="QC Badge - EN"><input value={about.qcBadge.en} onChange={(event) => updateAboutField("qcBadge", "en", event.target.value)} className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base outline-none" /></Field>
                  <Field label="QC Title - ID"><input value={about.qcTitle.id} onChange={(event) => updateAboutField("qcTitle", "id", event.target.value)} className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base outline-none" /></Field>
                  <Field label="QC Title - EN"><input value={about.qcTitle.en} onChange={(event) => updateAboutField("qcTitle", "en", event.target.value)} className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base outline-none" /></Field>
                  <Field label="QC Desc - ID"><textarea value={about.qcDesc.id} onChange={(event) => updateAboutField("qcDesc", "id", event.target.value)} className="min-h-[120px] w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-sm leading-relaxed outline-none" /></Field>
                  <Field label="QC Desc - EN"><textarea value={about.qcDesc.en} onChange={(event) => updateAboutField("qcDesc", "en", event.target.value)} className="min-h-[120px] w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-sm leading-relaxed outline-none" /></Field>
                </div>
              </div>

              <aside className="rounded-[2.5rem] border-4 border-stone-200 bg-stone-100 p-6 shadow-inner">
                <p className="mb-4 rounded-full bg-white px-4 py-2 text-sm font-black text-stone-500 shadow-sm">📱 About Preview</p>
                <div className="space-y-4 rounded-3xl bg-white p-5 shadow-xl">
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700">{about.aboutBadge.id}</p>
                  <h3 className="serif text-2xl font-bold text-emerald-950">{about.companyName.id}</h3>
                  <p className="text-sm text-stone-600">{about.paragraphs[0].id}</p>
                  <p className="text-sm text-stone-600">{about.paragraphs[1].id}</p>
                  <p className="text-sm text-stone-600">{about.paragraphs[2].id}</p>
                </div>
              </aside>
            </div>
          )}

          {(tab === "products" || tab === "partners" || tab === "gallery") && (
            <div className="mt-8 space-y-6">
              {tab === "partners" && (
                <div className="rounded-[2rem] border-4 border-purple-100 bg-purple-50 p-5">
                  <p className="mb-4 text-sm font-bold text-purple-800">Partners Page Copy</p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Hero Badge - ID"><input value={partnersPage.heroBadge.id} onChange={(event) => updatePartnersPageField("heroBadge", "id", event.target.value)} className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base outline-none" /></Field>
                    <Field label="Hero Badge - EN"><input value={partnersPage.heroBadge.en} onChange={(event) => updatePartnersPageField("heroBadge", "en", event.target.value)} className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base outline-none" /></Field>
                    <Field label="Hero Title - ID"><input value={partnersPage.heroTitle.id} onChange={(event) => updatePartnersPageField("heroTitle", "id", event.target.value)} className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base outline-none" /></Field>
                    <Field label="Hero Title - EN"><input value={partnersPage.heroTitle.en} onChange={(event) => updatePartnersPageField("heroTitle", "en", event.target.value)} className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base outline-none" /></Field>
                    <Field label="Hero Desc - ID"><textarea value={partnersPage.heroDesc.id} onChange={(event) => updatePartnersPageField("heroDesc", "id", event.target.value)} className="min-h-[120px] w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-sm leading-relaxed outline-none" /></Field>
                    <Field label="Hero Desc - EN"><textarea value={partnersPage.heroDesc.en} onChange={(event) => updatePartnersPageField("heroDesc", "en", event.target.value)} className="min-h-[120px] w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-sm leading-relaxed outline-none" /></Field>
                    <Field label="Section Title - ID"><input value={partnersPage.sectionTitle.id} onChange={(event) => updatePartnersPageField("sectionTitle", "id", event.target.value)} className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base outline-none" /></Field>
                    <Field label="Section Title - EN"><input value={partnersPage.sectionTitle.en} onChange={(event) => updatePartnersPageField("sectionTitle", "en", event.target.value)} className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base outline-none" /></Field>
                    <Field label="Section Desc - ID"><textarea value={partnersPage.sectionDesc.id} onChange={(event) => updatePartnersPageField("sectionDesc", "id", event.target.value)} className="min-h-[120px] w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-sm leading-relaxed outline-none" /></Field>
                    <Field label="Section Desc - EN"><textarea value={partnersPage.sectionDesc.en} onChange={(event) => updatePartnersPageField("sectionDesc", "en", event.target.value)} className="min-h-[120px] w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-sm leading-relaxed outline-none" /></Field>
                    <Field label="CTA Button - ID"><input value={partnersPage.ctaButton.id} onChange={(event) => updatePartnersPageField("ctaButton", "id", event.target.value)} className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base outline-none" /></Field>
                    <Field label="CTA Button - EN"><input value={partnersPage.ctaButton.en} onChange={(event) => updatePartnersPageField("ctaButton", "en", event.target.value)} className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base outline-none" /></Field>
                  </div>
                </div>
              )}

              <div className="rounded-[2rem] border-4 border-stone-100 bg-stone-50 p-5">
                <p className="mb-4 text-sm font-bold text-stone-600">
                  {tab === "products"
                    ? "👉 Drag the product card to reorder, or click to edit:"
                    : tab === "partners"
                      ? "👉 Drag the partner card to reorder, or click to edit:"
                      : "👉 Click on a category to edit:"}
                </p>
                <div
                  className="custom-scrollbar flex gap-3 overflow-x-auto pb-4 select-none"
                  style={{ touchAction: "pan-y" }}
                  onScroll={handleSelectorScroll}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={() => handleSelectorDropToEnd(tab)}
                >
                  {tab === "products"
                    ? products.map((product, index) => (
                        <button
                          key={`product-editor-select-${index}`}
                          type="button"
                          onClick={() => handleSelectProduct(index)}
                          draggable
                          data-selector-index={index}
                          onDragStart={(event) => startSelectorDrag("products", index, event)}
                          onDragEnd={endSelectorDrag}
                          onDragOver={(event) => event.preventDefault()}
                          onDrop={() => handleSelectorDrop("products", index)}
                          className={`min-w-[140px] flex-shrink-0 rounded-2xl border-2 px-4 py-3 text-left transition transform hover:-translate-y-1 ${
                            selectedProductIndex === index
                              ? "scale-105 border-sky-400 bg-sky-100 shadow-md"
                              : "border-stone-200 bg-white hover:border-stone-300"
                          }`}
                        >
                          <p className="line-clamp-1 font-bold text-stone-900">{product.title || "Untitled"}</p>
                          <p className="mt-1 text-xs text-stone-500">{product.size || "Size?"}</p>
                        </button>
                      ))
                    : tab === "partners"
                      ? partners.map((partner, index) => (
                          <button
                            key={`partner-editor-select-${index}`}
                            type="button"
                            onClick={() => handleSelectPartner(index)}
                            draggable
                            data-selector-index={index}
                            onDragStart={(event) => startSelectorDrag("partners", index, event)}
                            onDragEnd={endSelectorDrag}
                            onDragOver={(event) => event.preventDefault()}
                            onDrop={() => handleSelectorDrop("partners", index)}
                            className={`min-w-[140px] flex-shrink-0 rounded-2xl border-2 px-4 py-3 text-left transition transform hover:-translate-y-1 ${
                              selectedPartnerIndex === index
                                ? "scale-105 border-purple-400 bg-purple-100 shadow-md"
                                : "border-stone-200 bg-white hover:border-stone-300"
                            }`}
                          >
                            <p className="line-clamp-1 font-bold text-stone-900">{partner.name || "Untitled"}</p>
                            <p className="mt-1 text-xs text-stone-500">{partner.sector || "Bidang?"}</p>
                          </button>
                        ))
                      : gallery.categories.map((category, index) => (
                          <button
                            key={`gallery-editor-select-${index}`}
                            type="button"
                            onClick={() => setSelectedGalleryIndex(index)}
                            className={`min-w-[140px] flex-shrink-0 rounded-2xl border-2 px-4 py-3 text-left transition transform hover:-translate-y-1 ${
                              selectedGalleryIndex === index
                                ? "scale-105 border-pink-400 bg-pink-100 shadow-md"
                                : "border-stone-200 bg-white hover:border-stone-300"
                            }`}
                          >
                            <p className="line-clamp-1 font-bold text-stone-900">{category.title || "Untitled"}</p>
                            <p className="mt-1 text-xs text-stone-500">{category.images.length} foto</p>
                          </button>
                        ))}
                </div>
              </div>

              <div className="grid gap-8 xl:grid-cols-[1.3fr_0.7fr]">
                <div className="space-y-4">
                  {tab === "products"
                    ? products.map((product, index) =>
                        index !== selectedProductIndex ? null : (
                          <article
                            key={`product-editor-${index}`}
                            className="rounded-[2.5rem] border-4 border-sky-100 bg-white p-6 shadow-xl sm:p-8"
                          >
                            <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b-2 border-stone-100 pb-5">
                              <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-xl font-black text-sky-600">
                                  {index + 1}
                                </div>
                                <h3 className="text-2xl font-black text-stone-800">{product.title || "New Product"}</h3>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={() => duplicateProduct(index)}
                                  className="rounded-full bg-stone-100 px-4 py-2 text-sm font-bold text-stone-600 transition hover:bg-stone-200"
                                >
                                  👯‍♂️ Duplicate
                                </button>
                                <button
                                  type="button"
                                  onClick={() => removeProduct(index)}
                                  className="rounded-full bg-red-100 px-4 py-2 text-sm font-bold text-red-600 transition hover:bg-red-500 hover:text-white"
                                >
                                  🗑️ Delete
                                </button>
                              </div>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                              <div className="hidden">
                                <input value={product.id} readOnly />
                              </div>

                              <Field label="🛍️ Product Name">
                                <input
                                  value={product.title}
                                  onChange={(event) => updateProduct(index, { title: event.target.value })}
                                  className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-lg font-bold outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-400/20"
                                />
                              </Field>

                              <Field label="Kategori Kelompok">
                                <select
                                  value={product.category}
                                  onChange={(event) =>
                                    updateProduct(index, { category: event.target.value as ProductCategory })
                                  }
                                  className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-400/20"
                                >
                                  {categoryOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))}
                                </select>
                              </Field>

                              <Field label="⚖️ Berat / Ukurannya Berapa? (contoh: 5 KG)">
                                <input
                                  value={product.size}
                                  onChange={(event) => updateProduct(index, { size: event.target.value })}
                                  className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-400/20"
                                />
                              </Field>

                              <Field label="🖼️ Gambar Fotonya">
                                <div className="flex flex-col gap-3">
                                  <input
                                    value={product.image}
                                    onChange={(event) => updateProduct(index, { image: event.target.value })}
                                    placeholder="Alamat gambar akan otomatis terisi..."
                                    readOnly
                                    className="w-full rounded-2xl border-2 border-stone-100 bg-stone-50 px-5 py-3 text-sm text-stone-500 outline-none"
                                  />
                                  <div className="w-full rounded-2xl border-2 border-dashed border-sky-300 bg-sky-50 p-4 text-center">
                                    <CloudinaryUploadButton
                                      label="📸 Choose Product Photo"
                                      accept="image/*"
                                      folder="nmp/products"
                                      onUploaded={(url) => updateProduct(index, { image: url })}
                                    />
                                  </div>
                                </div>
                              </Field>

                              <Field label="🏷️ Pita Tulisan Kecil (contoh: Paling Laku!)">
                                <input
                                  value={product.badge}
                                  onChange={(event) => updateProduct(index, { badge: event.target.value })}
                                  className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-400/20"
                                />
                              </Field>

                              <Field label="🎨 Warna Tulisan Kecilnya">
                                <select
                                  value={product.badgeColor}
                                  onChange={(event) => updateProduct(index, { badgeColor: event.target.value })}
                                  className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-400/20"
                                >
                                  {badgeColorOptions.map((color) => (
                                    <option key={color.value} value={color.value}>
                                      {color.label}
                                    </option>
                                  ))}
                                </select>
                              </Field>

                              <Field label="🎗️ Corner Ribbon (leave empty if none)">
                                <input
                                  value={product.ribbon ?? ""}
                                  onChange={(event) =>
                                    updateProduct(index, { ribbon: event.target.value.trim() || undefined })
                                  }
                                  placeholder="Example: Buy 1 Get 1"
                                  className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-400/20"
                                />
                              </Field>
                            </div>

                            <div className="mt-6">
                              <Field label="📝 Product Description">
                                <textarea
                                  value={product.description}
                                  onChange={(event) => updateProduct(index, { description: event.target.value })}
                                  className="min-h-[140px] w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base leading-relaxed outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-400/20"
                                />
                              </Field>
                            </div>
                          </article>
                        ),
                      )
                    : tab === "partners"
                      ? partners.map((partner, index) =>
                          index !== selectedPartnerIndex ? null : (
                            <article
                              key={`partner-editor-${index}`}
                              className="rounded-[2.5rem] border-4 border-purple-100 bg-white p-6 shadow-xl sm:p-8"
                            >
                            <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b-2 border-stone-100 pb-5">
                              <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-xl font-black text-purple-600">
                                  {index + 1}
                                </div>
                                <h3 className="text-2xl font-black text-stone-800">{partner.name || "Teman Baru"}</h3>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={() => duplicatePartner(index)}
                                  className="rounded-full bg-stone-100 px-4 py-2 text-sm font-bold text-stone-600 transition hover:bg-stone-200"
                                >
                                  👯‍♂️ Gandakan
                                </button>
                                <button
                                  type="button"
                                  onClick={() => removePartner(index)}
                                  className="rounded-full bg-red-100 px-4 py-2 text-sm font-bold text-red-600 transition hover:bg-red-500 hover:text-white"
                                >
                                  🗑️ Delete
                                </button>
                              </div>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                              <Field label="🧑‍🤝‍🧑 Siapa Nama Perusahaannya?">
                                <input
                                  value={partner.name}
                                  onChange={(event) => updatePartner(index, { name: event.target.value })}
                                  className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-lg font-bold outline-none transition focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20"
                                />
                              </Field>

                              <Field label="🏭 Mereka Jual Apa? (Restoran/Hotel/Toko)">
                                <input
                                  value={partner.sector}
                                  onChange={(event) => updatePartner(index, { sector: event.target.value })}
                                  className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base outline-none transition focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20"
                                />
                              </Field>

                              <div className="md:col-span-2">
                                <Field label="🖼️ Logo Perusahaannya">
                                  <div className="flex flex-col gap-3">
                                    <input
                                      value={partner.logo}
                                      readOnly
                                      placeholder="Alamat gambar otomatis terisi..."
                                      className="w-full rounded-2xl border-2 border-stone-100 bg-stone-50 px-5 py-3 text-sm text-stone-500 outline-none"
                                    />
                                    <div className="w-full rounded-2xl border-2 border-dashed border-purple-300 bg-purple-50 p-4 text-center">
                                      <CloudinaryUploadButton
                                        label="📸 Choose Partner Logo"
                                        accept="image/*"
                                        folder="nmp/partners"
                                        onUploaded={(url) => updatePartner(index, { logo: url })}
                                      />
                                    </div>
                                  </div>
                                </Field>
                              </div>
                            </div>
                          </article>
                        ),
                      )
                      : gallery.categories.map((category, index) =>
                          index !== selectedGalleryIndex ? null : (
                            <article
                              key={`gallery-editor-${index}`}
                            className="rounded-[2.5rem] border-4 border-pink-100 bg-white p-6 shadow-xl sm:p-8"
                          >
                            <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b-2 border-stone-100 pb-5">
                              <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 text-xl font-black text-pink-600">
                                  {index + 1}
                                </div>
                                <h3 className="text-2xl font-black text-stone-800">{category.title || "Untitled"}</h3>
                              </div>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                              <Field label="🏷️ Category Title">
                                <input
                                  value={category.title}
                                  onChange={(event) => updateGalleryCategory(index, { title: event.target.value })}
                                  className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-lg font-bold outline-none transition focus:border-pink-400 focus:ring-4 focus:ring-pink-400/20"
                                />
                              </Field>

                              <Field label="📝 Category Description">
                                <input
                                  value={category.description}
                                  onChange={(event) => updateGalleryCategory(index, { description: event.target.value })}
                                  className="w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4 text-base outline-none transition focus:border-pink-400 focus:ring-4 focus:ring-pink-400/20"
                                />
                              </Field>
                            </div>

                            <div className="mt-8 space-y-5 rounded-2xl border-2 border-pink-200 bg-pink-50 p-5">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-bold text-pink-800">📸 Gallery Images ({category.images.length})</p>
                                <button
                                  type="button"
                                  onClick={() => addGalleryImage(index)}
                                  className="rounded-full bg-pink-400 px-3 py-1 text-xs font-bold text-white transition hover:bg-pink-500"
                                >
                                  ➕ Add Image
                                </button>
                              </div>

                              {category.images.map((image, imgIndex) => (
                                <div key={`gallery-image-${imgIndex}`} className="rounded-2xl border-2 border-pink-200 bg-white p-4 space-y-3">
                                  <div className="grid gap-3 md:grid-cols-2">
                                    <Field label="Image URL">
                                      <div className="flex flex-col gap-2">
                                        <input
                                          value={image.src}
                                          onChange={(event) =>
                                            updateGalleryImage(index, imgIndex, { src: event.target.value })
                                          }
                                          placeholder="Enter image URL..."
                                          className="w-full rounded-xl border-2 border-stone-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-pink-400"
                                        />
                                        <CloudinaryUploadButton
                                          label="📤 Upload Image"
                                          accept="image/*"
                                          folder="nmp/gallery"
                                          onUploaded={(url) =>
                                            updateGalleryImage(index, imgIndex, { src: url })
                                          }
                                        />
                                      </div>
                                    </Field>

                                    <Field label="Alt Text (Description)">
                                      <input
                                        value={image.alt}
                                        onChange={(event) =>
                                          updateGalleryImage(index, imgIndex, { alt: event.target.value })
                                        }
                                        placeholder="Describe this image..."
                                        className="w-full rounded-xl border-2 border-stone-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-pink-400"
                                      />
                                    </Field>
                                  </div>

                                  {image.src && (
                                    <div className="rounded-xl border-2 border-stone-100 bg-stone-50 p-3 overflow-hidden">
                                      <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="h-32 w-full object-cover rounded-lg"
                                      />
                                    </div>
                                  )}

                                  <button
                                    type="button"
                                    onClick={() => removeGalleryImage(index, imgIndex)}
                                    className="w-full rounded-xl border-2 border-red-200 bg-red-50 px-4 py-2 text-xs font-bold text-red-600 transition hover:bg-red-500 hover:text-white"
                                  >
                                    🗑️ Delete Image
                                  </button>
                                </div>
                              ))}
                            </div>
                          </article>
                        ),
                      )}
                </div>

                <aside className="flex flex-col items-center rounded-[2.5rem] border-4 border-stone-200 bg-stone-100 p-6 shadow-inner">
                  <p className="mb-4 rounded-full bg-white px-4 py-2 text-sm font-black text-stone-500 shadow-sm">
                    📱 Mobile Preview
                  </p>

                  {tab === "products" && products[selectedProductIndex] && (
                    <div className="group relative mx-auto w-full max-w-[280px] overflow-hidden rounded-3xl border-2 border-stone-200 bg-white shadow-xl transition hover:border-sky-300">
                      {products[selectedProductIndex].ribbon && (
                        <div className="absolute -right-12 top-4 z-10 rotate-45 bg-yellow-400 px-12 py-1 text-[10px] font-black uppercase text-yellow-950 shadow-md">
                          {products[selectedProductIndex].ribbon}
                        </div>
                      )}

                      <div className="relative flex h-48 items-center justify-center bg-stone-50 p-4">
                        {products[selectedProductIndex].image ? (
                          <img
                            src={products[selectedProductIndex].image}
                            alt={products[selectedProductIndex].title}
                            className="max-h-full max-w-full object-contain drop-shadow-md transition duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <span className="text-4xl">📸</span>
                        )}
                      </div>

                      <div className="border-t-2 border-stone-100 p-5">
                        <div className="mb-2 flex items-start justify-between">
                          <p
                            className={`rounded-md bg-stone-100 px-2 py-1 text-[10px] font-black uppercase tracking-widest ${products[selectedProductIndex].badgeColor}`}
                          >
                            {products[selectedProductIndex].category}
                          </p>
                        </div>
                        <h3 className="text-xl font-black leading-tight text-stone-800">
                          {products[selectedProductIndex].title || "Untitled"}
                        </h3>
                        <p className="mt-1 text-xs font-bold text-sky-600">{products[selectedProductIndex].badge}</p>
                        <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-stone-500">
                          {products[selectedProductIndex].description || "Ceritanya masih kosong nih..."}
                        </p>

                        <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-4">
                          <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-800">
                            ⚖️ {products[selectedProductIndex].size || "0 KG"}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {tab === "partners" && partners[selectedPartnerIndex] && (
                    <div className="mx-auto w-full max-w-[280px] overflow-hidden rounded-3xl border-2 border-stone-200 bg-white p-6 text-center shadow-xl">
                      <div className="mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-2xl border-2 border-stone-100 bg-stone-50 p-3 shadow-inner">
                        {partners[selectedPartnerIndex].logo ? (
                          <img
                            src={partners[selectedPartnerIndex].logo}
                            alt={partners[selectedPartnerIndex].name}
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <span className="text-3xl">🏢</span>
                        )}
                      </div>
                      <h3 className="text-lg font-black text-stone-800">
                        {partners[selectedPartnerIndex].name || "Nama Perusahaan"}
                      </h3>
                      <p className="mt-2 inline-block rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700">
                        {partners[selectedPartnerIndex].sector || "Bidang Usaha"}
                      </p>
                    </div>
                  )}

                  {tab === "gallery" && gallery.categories[selectedGalleryIndex] && (
                    <div className="mx-auto w-full max-w-[280px] overflow-hidden rounded-3xl border-2 border-stone-200 bg-white shadow-xl">
                      <div className="bg-pink-100 p-4 text-center">
                        <h3 className="text-lg font-black text-stone-800">
                          {gallery.categories[selectedGalleryIndex].title || "Untitled"}
                        </h3>
                      </div>
                      <div className="space-y-2 p-4">
                        <div className="grid grid-cols-2 gap-2">
                          {gallery.categories[selectedGalleryIndex].images.slice(0, 4).map((image, idx) => (
                            <div
                              key={idx}
                              className="rounded-lg border-2 border-stone-100 bg-stone-50 overflow-hidden aspect-square"
                            >
                              {image.src ? (
                                <img
                                  src={image.src}
                                  alt={image.alt}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-2xl">🖼️</div>
                              )}
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-stone-600 text-center mt-3">
                          {gallery.categories[selectedGalleryIndex].images.length} images
                        </p>
                      </div>
                    </div>
                  )}
                </aside>
              </div>
            </div>
          )}
        </section>

        <section className="sticky bottom-2 z-50 mx-auto flex max-w-5xl flex-col gap-3 rounded-[1.75rem] border-4 border-stone-700 bg-stone-900 p-4 shadow-2xl sm:bottom-4 sm:gap-4 sm:rounded-[2.5rem] sm:p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3 sm:items-center sm:gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-800 text-xl sm:h-12 sm:w-12 sm:text-2xl">🤖</div>
            <div>
              <p className="text-sm font-bold text-white sm:text-base">{status}</p>
              <p className="mt-1 text-xs leading-relaxed text-stone-400 sm:text-sm">
                Kalo udah beres, jangan lupa dipencet tombol di samping ya! 👉
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="w-full flex-shrink-0 rounded-full bg-amber-400 px-5 py-3 text-xs font-black text-amber-950 shadow-[0_0_20px_rgba(251,191,36,0.4)] transition hover:scale-105 hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 sm:w-auto sm:px-8 sm:py-4 sm:text-sm"
          >
            {saving ? "⏳ Tunggu Ya..." : "✨ SIMPAN SEMUA & TAMPILKAN! ✨"}
          </button>
        </section>
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-stone-700">{label}</span>
      {children}
    </label>
  );
}
