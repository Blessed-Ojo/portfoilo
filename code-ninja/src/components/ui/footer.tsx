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
    href: "https://github.com/Blessed-Ojo",
    icon: faGithub,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/ojo-blessed/",
    icon: faLinkedin,
    label: "LinkedIn",
  },
  {
    href: "https://x.com/dev_ojoblessed",
    icon: faXTwitter,
    label: "X",
  },
  {
    href: "https://www.instagram.com/blessedcode_official/",
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
    <footer className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-t border-white/10 dark:border-gray-700/50 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.gray.200)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.gray.200)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,theme(colors.gray.800)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.gray.800)_1px,transparent_1px)] bg-[size:6rem_6rem] opacity-30" />
        
        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotateZ: [0, 3, -3, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-5 left-10 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotateZ: [0, -3, 3, 0],
            scale: [1, 0.95, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-8 right-20 w-12 h-12 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-xl"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-purple-50/80 to-pink-50/80 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20" />
      </div>
      {/* Main Footer Content */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-8 lg:px-16 py-6 relative z-10">
        <div className="flex flex-col items-center space-y-4">
          
          {/* Spotify Component */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            <SpotifyNowPlaying />
          </motion.div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="group relative p-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg hover:shadow-xl hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300"
                whileHover={{ 
                  y: -5, 
                  scale: 1.05,
                  rotateY: 10
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                style={{
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden"
                }}
              >
                <FontAwesomeIcon 
                  icon={link.icon} 
                  className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" 
                />
                
                {/* Tooltip */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900/90 dark:bg-white/90 text-white dark:text-gray-900 text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none backdrop-blur-sm shadow-lg">
                  {link.label}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/90 dark:border-t-white/90"></div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Divider */}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-white/30 dark:via-gray-700/50 to-transparent"
          />

          {/* Copyright */}
           <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium backdrop-blur-sm">
              © {currentYear} {" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-semibold">
                Blessed Ojo {" "}
              </span>
              • CODE~NINJA 🥷 • All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showButton && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl hover:shadow-2xl text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
          whileHover={{ 
            scale: 1.1, 
            y: -5,
            rotateY: 10
          }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0, rotate: 180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0, rotate: 180 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20 
          }}
          title="Back to top"
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden"
          }}
        >
          <ChevronUpIcon className="w-5 h-5" />
        </motion.button>
      )}
    </footer>
  );
};

export default Footer;