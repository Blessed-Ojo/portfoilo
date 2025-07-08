"use client";
import type React from "react";
import { useState, useEffect, useMemo, useCallback } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import {
//   faGithub,
//   faLinkedin,
//   faInstagram,
//   faXTwitter,
// } from "@fortawesome/free-brands-svg-icons";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

// const socialLinks = [
//   {
//     href: "https://github.com/AndersonDesign1",
//     icon: faGithub,
//     label: "GitHub",
//   },
//   {
//     href: "https://www.linkedin.com/in/anderson-josh/",
//     icon: faLinkedin,
//     label: "LinkedIn",
//   },
//   {
//     href: "https://x.com/HeyItsAndersonJ",
//     icon: faXTwitter,
//     label: "X",
//   },
//   {
//     href: "https://www.instagram.com/josephandy_official/",
//     icon: faInstagram,
//     label: "Instagram",
//   },
// ];

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
    <footer className="relative bg-gradient-to-b from-gray-100 via-purple-50 to-gray-200 dark:from-gray-900 dark:via-purple-900/40 dark:to-gray-800 text-gray-700 dark:text-gray-300 pt-10 pb-6 overflow-hidden border-t border-white/10">
      {/* Floating chakra energy orbs */}
      <motion.div
        className="absolute top-10 left-10 w-48 h-48 bg-gradient-to-br from-purple-500/10 to-pink-500/5 rounded-full blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-36 h-36 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 rounded-full blur-2xl"
        animate={{ x: [0, -40, 0], y: [0, 25, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative container mx-auto text-center">
        <p className="text-xs mb-3 tracking-wide font-medium">
          © {currentYear} Anderson Joseph • Code Ninja Mode 🥷
        </p>

        {/* <div className="flex justify-center gap-6 mb-4">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="hover:text-purple-600 dark:hover:text-purple-400 transition-transform transform hover:scale-110"
            >
              <FontAwesomeIcon icon={link.icon} className="w-5 h-5" />
            </a>
          ))}
        </div> */}

        
      </div>

      {/* Katana Scroll-to-Top Button */}
      {showButton && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-25 left-5 z-50 p-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl hover:scale-110 transition-all"
          whileHover={{ rotate: [0, -5, 5, 0] }}
          title="Return to Top"
        >
          <ChevronUpIcon className="w-5 h-5" />
        </motion.button>
      )}
    </footer>
  );
};

export default Footer;
