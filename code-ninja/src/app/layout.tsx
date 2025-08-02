import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/theme-provider";
import { AppProvider } from "@/context/AppContext";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(process.env.NODE_ENV === 'production'
      ? 'https://blessedojo.com'
      : 'http://localhost:3000'
    ),
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
      images: ["/codeninjasm.webp"], // Will now resolve to full URL
    },
    twitter: {
      card: "summary_large_image",
      title:
        "Blessed Ojo | Elevating the Business Landscape with Web/Mobile Dev & SEO",
      description:
        "Blessed Ojo is a leading provider of web and mobile development solutions, specializing in SEO to enhance online visibility and business growth.",
      images: ["/codeninjasm.webp"], // Will now resolve to full URL
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
        <AppProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={false}
          >
            {children}
            <Analytics />
            <SpeedInsights />
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: "rgba(255, 255, 255, 0.95)",
                  color: "#374151",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  borderRadius: "16px",
                  padding: "16px 20px",
                  fontSize: "14px",
                  fontWeight: "500",
                  backdropFilter: "blur(16px)",
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  maxWidth: "400px",
                  zIndex: 9999,
                },
                className: "dark:!bg-gray-800/95 dark:!text-gray-100 dark:!border-gray-700/50",
                duration: 4000,
              }}
            />
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}