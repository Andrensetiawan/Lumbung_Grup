import "server-only";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { unstable_cache, revalidateTag } from "next/cache";
import { partners as defaultPartners, type Partner } from "./data/partners";
import { PRODUCTS as defaultProducts, type Product } from "./data/products";
import { DEFAULT_HOME_CONTENT, type HomePageContent } from "./data/home";
import { DEFAULT_ABOUT_CONTENT, type AboutPageContent } from "./data/about";
import { DEFAULT_PARTNERS_PAGE_CONTENT, type PartnersPageContent } from "./data/partners-page";
import { DEFAULT_GALLERY_CONTENT, type GalleryPageContent } from "./data/gallery";

interface CmsData {
  products: Product[];
  partners: Partner[];
  home: HomePageContent;
  about: AboutPageContent;
  partnersPage: PartnersPageContent;
  gallery: GalleryPageContent;
  updatedAt: string;
}

const cmsFilePath = path.join(process.cwd(), "FILE", "cms-data.json");
const CMS_DATA_TAG = "cms-data";

function getDefaultCmsData(): CmsData {
  return {
    products: defaultProducts,
    partners: defaultPartners,
    home: DEFAULT_HOME_CONTENT,
    about: DEFAULT_ABOUT_CONTENT,
    partnersPage: DEFAULT_PARTNERS_PAGE_CONTENT,
    gallery: DEFAULT_GALLERY_CONTENT,
    updatedAt: new Date().toISOString(),
  };
}

function isValidProductArray(value: unknown): value is Product[] {
  return Array.isArray(value);
}

function isValidPartnerArray(value: unknown): value is Partner[] {
  return Array.isArray(value);
}

function isValidHomeContent(value: unknown): value is HomePageContent {
  if (!value || typeof value !== "object") {
    return false;
  }

  const target = value as Partial<HomePageContent>;

  return (
    !!target.hero &&
    !!target.quality &&
    Array.isArray(target.stats) &&
    Array.isArray(target.credentials) &&
    typeof target.hero.badge === "string" &&
    typeof target.hero.titleMain === "string" &&
    typeof target.hero.titleSub === "string" &&
    typeof target.hero.subheading === "string" &&
    typeof target.hero.description === "string" &&
    typeof target.quality.title === "string" &&
    typeof target.quality.description === "string" &&
    Array.isArray(target.quality.videoUrls) &&
    (target.quality.videoLayout === "alternate" ||
      target.quality.videoLayout === "2" ||
      target.quality.videoLayout === "3" ||
      target.quality.videoLayout === "4")
  );
}

function isValidAboutContent(value: unknown): value is AboutPageContent {
  return !!value && typeof value === "object";
}

function isValidPartnersPageContent(value: unknown): value is PartnersPageContent {
  return !!value && typeof value === "object";
}

function isValidGalleryContent(value: unknown): value is GalleryPageContent {
  return !!value && typeof value === "object" && Array.isArray((value as any).categories);
}

async function readCmsDataFromFile(): Promise<CmsData> {
  try {
    const raw = await readFile(cmsFilePath, "utf8");
    const parsed = JSON.parse(raw) as Partial<CmsData>;

    if (!isValidProductArray(parsed.products) || !isValidPartnerArray(parsed.partners)) {
      return getDefaultCmsData();
    }

    return {
      products: parsed.products,
      partners: parsed.partners,
      home: isValidHomeContent(parsed.home) ? parsed.home : DEFAULT_HOME_CONTENT,
      about: isValidAboutContent(parsed.about) ? parsed.about : DEFAULT_ABOUT_CONTENT,
      partnersPage: isValidPartnersPageContent(parsed.partnersPage) ? parsed.partnersPage : DEFAULT_PARTNERS_PAGE_CONTENT,
      gallery: isValidGalleryContent(parsed.gallery) ? parsed.gallery : DEFAULT_GALLERY_CONTENT,
      updatedAt: parsed.updatedAt ?? new Date().toISOString(),
    };
  } catch {
    return getDefaultCmsData();
  }
}

const getCachedCmsData = unstable_cache(readCmsDataFromFile, ["cms-data"], {
  tags: [CMS_DATA_TAG],
  revalidate: 60,
});

export async function getCmsData(): Promise<CmsData> {
  return getCachedCmsData();
}

export async function saveCmsData(input: {
  products: Product[];
  partners: Partner[];
  home: HomePageContent;
  about: AboutPageContent;
  partnersPage: PartnersPageContent;
  gallery: GalleryPageContent;
}): Promise<CmsData> {
  const nextData: CmsData = {
    products: input.products,
    partners: input.partners,
    home: input.home,
    about: input.about,
    partnersPage: input.partnersPage,
    gallery: input.gallery,
    updatedAt: new Date().toISOString(),
  };

  await mkdir(path.dirname(cmsFilePath), { recursive: true });
  await writeFile(cmsFilePath, `${JSON.stringify(nextData, null, 2)}\n`, "utf8");
  revalidateTag(CMS_DATA_TAG, "max");

  return nextData;
}
