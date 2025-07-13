"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import WelcomeScreen from "@/components/welcome/WelcomeScreen";

import MainContent from "@/components/main-content";
import MainLayout from "./(main)/layout";



export default function Page() {
  const [showWelcome, setShowWelcome] = useState(true);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
  };

  return (
    <main className="min-h-screen">
      <AnimatePresence mode="wait">
        {showWelcome ? (
          <WelcomeScreen 
            key="welcome"
            onComplete={handleWelcomeComplete} 
          />
        ) : (
          <MainLayout>
            <MainContent />
          </MainLayout>
        )}
      </AnimatePresence>
    </main>
  );
}