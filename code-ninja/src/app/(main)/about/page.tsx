import AboutPage from "@/components/about-page";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title:
      "Blessed Ojo | Elevating the Business Landscape with Web/Mobile Dev & SEO",
    description:
      "Blessed Ojo is a leading provider of web and mobile development solutions, specializing in SEO to enhance online visibility and business growth.",
    keywords: [
      "Blessed Ojo",
      "Web Developer",
      "Mobile Apps Developer",
      "SEO Specialist",
      "Web Performance",
      "Mobile Apps Performance",
    ],
    openGraph: {
      title:
        "Blessed Ojo | Elevating the Business Landscape with Web/Mobile Dev & SEO",
      description:
        "Blessed Ojo is a leading provider of web and mobile development solutions, specializing in SEO to enhance online visibility and business growth.",
      url: "https://blessedojo.com",
      type: "website",
      images: ["/codeninjasm.webp"],
    },
    twitter: {
      card: "summary_large_image",
      title:
        "Blessed Ojo | Elevating the Business Landscape with Web/Mobile Dev & SEO",
      description:
        "Blessed Ojo is a leading provider of web and mobile development solutions, specializing in SEO to enhance online visibility and business growth.",
      images: ["/codeninjasm.webp"],
    },
  };
}

export default function About() {
  return <AboutPage />;
}
