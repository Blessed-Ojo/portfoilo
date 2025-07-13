"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTheme } from "next-themes";

interface MenuItem {
  label: string;
  link: string;
}

const menuItems: MenuItem[] = [
  { label: "Home", link: "/" },
  { label: "About", link: "/about" },
  { label: "Portfolio", link: "/projects" },
  { label: "Blog", link: "/blog" },
 {label: "Contact", link: "/contact" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false); // Add mounted state
  const pathname = usePathname();
  const { theme, systemTheme } = useTheme();

  // Handle mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;

  // Use consistent logo during SSR, then switch after mounting
  const logoSrc = mounted && currentTheme === "dark" 
    ? "/codeninjadark.webp" 
    : "/codeninjapurple.webp";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  const renderedMenuItems = useMemo(
    () =>
      menuItems.map(({ label, link }) => {
        const isActive = pathname === link;
        return (
          <li key={label}>
            <Link
              href={link}
              prefetch
              className={`relative px-3 py-1 font-medium text-gray-600  dark:text-gray-300  transition-colors duration-200
                after:content-[''] after:absolute after:w-full after:h-[2px] after:left-0 after:-bottom-1 after:rounded-full
                after:transition-transform after:duration-300 after:bg-purple-400
                ${
                  isActive
                    ? "after:scale-x-100"
                    : "after:scale-x-0 hover:after:scale-x-100"
                }
                after:origin-left`}
              aria-current={isActive ? "page" : undefined}
            >
              {label}
            </Link>
          </li>
        );
      }),
    [pathname]
  );

  const renderedMobileMenuItems = useMemo(
    () =>
      menuItems.map(({ label, link }) => {
        const isActive = pathname === link;
        return (
          <Link
            key={label}
            href={link}
            prefetch
            className={`block w-full px-3 py-2 rounded-xl font-medium text-gray-600  dark:text-gray-300 transition-colors duration-200
              ${isActive ? "bg-purple-400/30" : "hover:bg-purple-400/10"}
            `}
            onClick={() => setIsOpen(false)}
            aria-current={isActive ? "page" : undefined}
          >
            {label}
          </Link>
        );
      }),
    [pathname]
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-light-bg/80 dark:bg-gray-800/10 backdrop-blur-md py-2 border-b border-cyan-900/10 dark:border-gray-700/10"
          : "bg-light-bg/40 dark:bg-gray-800/10 backdrop-blur-xs py-4"
      }`}
    >
      <div className="flex justify-center items-center max-w-5xl mx-auto">
        <div className="bg-light-bg/90 dark:bg-gray-800/10 rounded-full px-8 py-2 shadow-md flex items-center mx-auto z-40 border border-light-mini/20 dark:border-mini/20">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold mr-12" prefetch>
            <Image
              src={logoSrc} 
              alt="Logo"
              width={50}
              height={20} 
              className="object-cover"
              priority
            />
          </Link>
          {/* Navigation Links */}
          <ul className="hidden md:flex gap-4">{renderedMenuItems}</ul>
          {/* Theme Toggle */}
          <div className="ml-6">
            <ThemeToggle />
          </div>
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-light-heading dark:text-dark-heading text-2xl focus:outline-none ml-auto"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
            type="button"
          >
            ☰
          </button>
        </div>
      </div>
      {/* Mobile Dropdown Menu */}
      <div
        id="mobile-menu"
        className={`absolute top-full left-0 right-0 mx-4 mt-2 bg-light-bg dark:bg-gray-800 text-light-heading dark:text-dark-heading flex flex-col gap-2 py-6 px-6 z-50 shadow-lg md:hidden rounded-3xl border border-light-mini/10 dark:border-gray-700/10 backdrop-blur-xs transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
        role="menu"
        aria-labelledby="menu-button"
      >
        {renderedMobileMenuItems}
      </div>
    </nav>
  );
};

export default Navbar;