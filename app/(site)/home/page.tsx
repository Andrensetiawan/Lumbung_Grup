import type { Metadata } from "next";
import HomePageClient from "../../../components/HomePageClient";
import { getCmsData } from "../../../lib/cms-store";
import { DEFAULT_HOME_CONTENT } from "../../../lib/data/home";

const siteUrl = "https://lumbunggrup.id";
const logoImage = "/Logo nmp.jpg";
const showcaseImage = "/beras-jepang-10kg.jpeg";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PT Niaga Multi Pangan",
  url: siteUrl,
  logo: `${siteUrl}${logoImage}`,
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+62-21-2784-6285",
      contactType: "customer service",
      areaServed: "ID",
      availableLanguage: ["id", "en"],
    },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Pala I No. 50 A.LKMD, Pd Cabe Udik",
    addressLocality: "Tangerang Selatan",
    addressRegion: "Banten",
    postalCode: "15418",
    addressCountry: "ID",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "NMP Procurement Desk",
  url: `${siteUrl}/home`,
  telephone: "+62-858-8900-6572",
  priceRange: "$$$",
  servesCuisine: ["Japanese", "Indonesian"],
  areaServed: "Indonesia",
  image: `${siteUrl}${showcaseImage}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Pala I No. 50 A.LKMD, Pd Cabe Udik",
    addressLocality: "Tangerang Selatan",
    addressRegion: "Banten",
    postalCode: "15418",
    addressCountry: "ID",
  },
};

export function generateMetadata(): Metadata {
  const title = "NMP | Kyohikari & Hikaru Specialist";
  const description =
    "Official distributor of Kyohikari and Hikaru with 24/7 QC support for retail, hotel, and food-industry needs in Indonesia.";

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/home`,
      type: "website",
      images: [
        {
          url: `${siteUrl}${showcaseImage}`,
          width: 1200,
          height: 630,
          alt: "NMP facility",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}${showcaseImage}`],
    },
  };
}

export default async function HomePage() {
  const { home: homeContent } = await getCmsData();
  const content = homeContent ?? DEFAULT_HOME_CONTENT;

  return <HomePageClient content={content} organizationSchema={organizationSchema} localBusinessSchema={localBusinessSchema} />;
}
