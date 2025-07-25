// app/(main)/layout.tsx
"use client"
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/footer";
import {usePathname} from "next/navigation"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) { 
  const pathname=usePathname();
  const isStudioRoute = pathname?.startsWith("/studio");
  return (
    <>
      {!isStudioRoute && <Navbar />}
      <main>{children}</main>
      <Footer />
    </>
  );
}