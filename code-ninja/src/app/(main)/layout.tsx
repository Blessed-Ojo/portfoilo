// app/(main)/layout.tsx
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/footer";
import Homepage from "./page";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main><Homepage /></main>
      <Footer />
    </>
  );
}