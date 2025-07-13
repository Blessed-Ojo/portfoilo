"use client";
import type React from "react";
import { useState, useEffect, useMemo, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import SpotifyNowPlaying from "@/components/spotify-now-playing";


const socialLinks = [
  {
    href: "https://github.com/AndersonDesign1",
    icon: faGithub,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/anderson-josh/",
    icon: faLinkedin,
    label: "LinkedIn",
  },
  {
    href: "https://x.com/HeyItsAndersonJ",
    icon: faXTwitter,
    label: "X",
  },
  {
    href: "https://www.instagram.com/josephandy_official/",
    icon: faInstagram,
    label: "Instagram",
  },
];

const Footer: React.FC = () => {
  const [showButton, setShowButton] = useState(false);
  const currentYear = useMemo(() => new Date().getFullYear(), []);
 
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowButton(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="relative pt-10 pb-6 overflow-hidden border-t border-white/10 bg-gradient-to-b from-[#f0f4ff] via-[#e4d9ff] to-[#f3f4f6] text-gray-800 dark:from-[#0f0c29] dark:via-[#302b63] dark:to-[#24243e] dark:text-gray-300">
      {/* Floating Orbs */}
      <motion.div
        className="absolute top-10 left-10 w-36 h-36 bg-gradient-to-br from-purple-400/20 to-pink-400/10 rounded-full blur-2xl dark:from-purple-500/20 dark:to-pink-500/10"
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-28 h-28 bg-gradient-to-br from-cyan-400/20 to-blue-400/10 rounded-full blur-2xl dark:from-cyan-500/20 dark:to-blue-500/10"
        animate={{ x: [0, -40, 0], y: [0, 25, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative container mx-auto text-center px-4">
        <p className="text-sm mb-4 tracking-wide font-semibold">
          © {currentYear} <span className="text-purple-600 dark:text-purple-400">Blessed Ojo</span> • CODE~NINJA 🥷
        </p>

        <div className="flex justify-center gap-8 mb-4">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="hover:text-purple-700 dark:hover:text-purple-400 transition-transform transform hover:scale-110"
            >
              <FontAwesomeIcon icon={link.icon} className="w-6 h-6 md:w-7 md:h-7" />
            </a>
          ))}
        </div>
        
      </div>

      {/* Scroll to Top */}
      {showButton && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-50 p-4 rounded-full bg-gradient-to-r from-purple-700 to-pink-600 text-white shadow-lg hover:scale-110 transition-all"
          whileHover={{ rotate: [0, -5, 5, 0] }}
          title="Return to Top"
        >
          <ChevronUpIcon className="w-6 h-6" />
          
        </motion.button>
      )}
           
        <SpotifyNowPlaying />

    </footer>
  );
};

export default Footer;
