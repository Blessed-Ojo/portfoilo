import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}