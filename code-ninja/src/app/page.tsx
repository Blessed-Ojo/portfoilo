"use client";

import { AnimatePresence } from "framer-motion";
import WelcomeScreen from "@/components/welcome/WelcomeScreen";
import { useAppContext } from "@/context/AppContext";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/footer";
import Hero from "@/components/hero";
import ProjectGrid from "@/components/project-grid";
import WorkHistory from "@/components/work-history";
import SkillsSection from "@/components/skills-section";
import { usePathname } from "next/navigation";

export default function Page() {
  const { showWelcome, setShowWelcome } = useAppContext();
  const pathname = usePathname();
  const isStudioRoute = pathname?.startsWith("/studio");

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {showWelcome ? (
          <WelcomeScreen
            key="welcome"
            onComplete={handleWelcomeComplete}
          />
        ) : (
          <>
            {!isStudioRoute && <Navbar />}
            <main>
              <Hero />
              <ProjectGrid />
              <WorkHistory />
              <SkillsSection />
              {/* Now playing component */}
            </main>
            <Footer />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}