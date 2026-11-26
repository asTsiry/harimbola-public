"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";

const links = [
  { href: "#accueil", label: "Accueil" },
  { href: "#catalogue", label: "Catalogues" },
  { href: "#apropos", label: "À propos" },
  { href: "#contact", label: "Nous contacter" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#fef7f2] dark:bg-[#1a120b]/85 backdrop-blur-md border-b border-[#d4a373]/20 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#accueil" className="flex items-center gap-3 group">
            <Image
              src="/logo.png"
              alt="Hari'mbola"
              width={44}
              height={44}
              className="rounded-full shadow-lg group-hover:scale-110 transition"
              priority
            />
            <span className="font-display text-2xl font-bold gradient-text">
              Hari&apos;mbola
            </span>
          </a>

          <div className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative text-sm uppercase tracking-widest text-[#2a1d13] dark:text-[#f5e9d3]/80 hover:text-[#8b5a2b] dark:text-[#d4a373] transition group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#d4a373] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full glass text-[#8b5a2b] dark:text-[#d4a373] hover:scale-110 transition"
              aria-label="Toggle theme"
            >
              {mounted && theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
            <a
              href="#contact"
              className="ml-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#d4a373] to-[#8b5a2b] text-[#1a120b] font-semibold text-sm hover:shadow-[0_0_24px_rgba(212,163,115,0.5)] transition"
            >
              Commander
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg glass"
            aria-label="menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden glass"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-lg text-[#2a1d13] dark:text-[#f5e9d3]/90 hover:text-[#8b5a2b] dark:text-[#d4a373]"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="tel:+261344638128"
                className="flex items-center gap-2 text-[#8b5a2b] dark:text-[#d4a373]"
              >
                <Phone className="w-4 h-4" /> +261 34 46 381 28
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}