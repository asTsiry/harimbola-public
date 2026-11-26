"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative min-h-[92vh] flex items-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src="/media/gen/hero.jpg"
          alt="Gâteau signature Hari'mbola"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fef7f2] dark:from-[#0a0604] via-[#fef7f2]/85 dark:via-[#0a0604]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fef7f2] dark:from-[#0a0604] via-transparent to-transparent" />
      </div>

      <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-[#e8a0a0]/30 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 w-[360px] h-[360px] rounded-full bg-[#d4a373]/25 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-10 items-center pt-24 pb-16">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-[#1a120b]/70 backdrop-blur border border-[#e8a0a0]/40 text-sm text-[#c97b7b] dark:text-[#e8a0a0] mb-6 shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            Pâtisserie artisanale à Madagascar
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] text-[#2a1d13] dark:text-[#f5e9d3]"
          >
            Des gâteaux <br />
            <span className="gradient-text">qui racontent</span>
            <br /> votre histoire.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 text-base text-[#6b5a4a] dark:text-[#a89880] max-w-xl leading-relaxed"
          >
            Mariage, fiançailles, anniversaire, Noël, Saint-Valentin — chaque
            occasion mérite un gâteau sur mesure. Personnalisé selon vos envies,
            livré avec amour.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href="#catalogue"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#e8a0a0] to-[#c97b7b] text-white font-semibold shadow-lg shadow-[#e8a0a0]/30 hover:scale-105 transition"
            >
              Découvrir le catalogue
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-[#1a120b] text-[#2a1d13] dark:text-[#f5e9d3] font-semibold border border-[#d4a373]/40 shadow-sm hover:bg-[#fef7f2] dark:hover:bg-[#1a120b] transition"
            >
              Prendre rendez-vous
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex items-center gap-6 text-sm text-[#6b5a4a] dark:text-[#a89880]"
          >
            <div>
              <div className="font-display text-2xl font-bold text-[#8b5a2b] dark:text-[#d4a373]">
                4+
              </div>
              créations signature
            </div>
            <div className="w-px h-10 bg-[#d4a373]/30" />
            <div>
              <div className="font-display text-2xl font-bold text-[#8b5a2b] dark:text-[#d4a373]">
                7
              </div>
              univers
            </div>
            <div className="w-px h-10 bg-[#d4a373]/30" />
            <div>
              <div className="font-display text-2xl font-bold text-[#8b5a2b] dark:text-[#d4a373]">
                100%
              </div>
              personnalisé
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="relative hidden lg:block"
        >
          <div className="relative w-full aspect-[4/5] max-w-sm ml-auto">
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-[#e8a0a0]/40 to-[#d4a373]/40 blur-2xl" />
            <Image
              src="/media/gen/hero.jpg"
              alt="Gâteau signature"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover rounded-[2.5rem] shadow-2xl"
            />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-4 -left-8 bg-white dark:bg-[#1a120b] rounded-2xl px-5 py-3 shadow-xl border border-[#e8a0a0]/30"
            >
              <div className="text-xs text-[#6b5a4a] dark:text-[#a89880]">Prix portion</div>
              <div className="font-display text-lg font-bold text-[#8b5a2b] dark:text-[#d4a373]">
                dès 7 000 Ar
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute top-8 -right-6 bg-white dark:bg-[#1a120b] rounded-2xl px-5 py-3 shadow-xl border border-[#d4a373]/30"
            >
              <div className="text-xs text-[#6b5a4a] dark:text-[#a89880]">Note</div>
              <div className="font-display text-lg font-bold text-[#8b5a2b] dark:text-[#d4a373] flex items-center gap-1">
                4.9 <Star className="w-4 h-4 fill-[#d4a373] text-[#d4a373]" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}