"use client";

import { motion } from "framer-motion";
import { Award, Heart, Sparkles, Truck } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "100% personnalisé",
    text: "Nom, texte sacré, photo, animation — on réalise votre gâteau selon vos envies.",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Fait avec amour",
    text: "Chaque création est préparée à la main, avec des ingrédients de qualité.",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Savoir-faire artisanal",
    text: "Des recettes éprouvées et un sens du détail pour des résultats bluffants.",
  },
  {
    icon: <Truck className="w-6 h-6" />,
    title: "Livraison soignée",
    text: "Emballage sécurisé et livraison à domicile dans la région.",
  },
];

export default function About() {
  return (
    <section id="apropos" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image src="/media/bg/bg4.jpg" alt="" fill sizes="100vw" className="object-cover opacity-15 dark:opacity-8 blur-sm scale-110" />
        <div className="absolute inset-0 bg-[#f0e0d4]/80 dark:bg-[#0a0604]/80" />
      </div>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glass">
            <Image
              src="/media/img/2.png"
              alt="Hari'mbola atelier"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2a1d13]/40 dark:from-[#000000]/70 to-transparent" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute -bottom-6 -right-6 glass rounded-2xl px-6 py-4 shadow-xl"
          >
            <div className="font-display text-3xl font-bold text-[#8b5a2b] dark:text-[#d4a373]">
              7+
            </div>
            <div className="text-xs text-[#6b5a4a] dark:text-[#a89880]">catégories de fêtes</div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[#d4a373] uppercase tracking-[0.3em] text-sm mb-3">
            À propos
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight">
            Hari&apos;mbola, <br />
            <span className="gradient-text">l&apos;art du gâteau sur mesure</span>
          </h2>
          <p className="mt-6 text-[#6b5a4a] dark:text-[#a89880] leading-relaxed">
            Hari&apos;mbola est une pâtisserie artisanale dédiée à transformer vos
            moments précieux en souvenirs gourmands. Mariage, fiançailles,
            anniversaire d&apos;enfant, Noël, Saint-Valentin — nous créons des gâteaux
            personnalisés selon vos photos, vos textes et vos envies.
          </p>
          <p className="mt-4 text-[#6b5a4a] dark:text-[#a89880] leading-relaxed">
            De la « Montagne de Chocolat » pour les amateurs de chocolat à la
            « Bible dorée » pour vos fiançailles, chaque création est pensée pour
            émouvoir. Choisissez votre portion, votre décoration, et laissez-nous
            faire le reste.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-2xl p-4 card-hover"
              >
                <div className="text-[#8b5a2b] dark:text-[#d4a373] mb-3">{f.icon}</div>
                <h3 className="font-display text-lg font-semibold text-[#2a1d13] dark:text-[#f5e9d3]">
                  {f.title}
                </h3>
                <p className="mt-1 text-sm text-[#6b5a4a] dark:text-[#a89880]">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}