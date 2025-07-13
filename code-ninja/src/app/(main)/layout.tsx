// app/(main)/layout.tsx
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}