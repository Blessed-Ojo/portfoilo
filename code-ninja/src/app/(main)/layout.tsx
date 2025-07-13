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
     <div>Layout is working!</div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}