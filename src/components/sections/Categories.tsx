"use client";

import { motion } from "framer-motion";
import { categories, cakes } from "@/lib/mockData";
import { Cake, Heart, Baby, Snowflake, Sparkles, Cookie, GlassWater } from "lucide-react";
import Image from "next/image";

const icons: Record<number, React.ReactNode> = {
  1: <Heart className="w-6 h-6" />,
  2: <Cake className="w-6 h-6" />,
  3: <Baby className="w-6 h-6" />,
  4: <Snowflake className="w-6 h-6" />,
  5: <Sparkles className="w-6 h-6" />,
  6: <Cookie className="w-6 h-6" />,
  7: <GlassWater className="w-6 h-6" />,
};

const accents = [
  "text-[#c97b7b] bg-[#e8a0a0]/15",
  "text-[#b07a3a] bg-[#d4a373]/15",
  "text-[#c97b7b] bg-[#e8a0a0]/15",
  "text-[#8b5a2b] bg-[#d4a373]/20",
  "text-[#c97b7b] bg-[#e8a0a0]/15",
  "text-[#b07a3a] bg-[#d4a373]/15",
  "text-[#c97b7b] bg-[#e8a0a0]/15",
];

const cardImages = [
  "/media/bg/bg1.jpg",
  "/media/bg/bg2.jpg",
  "/media/bg/bg3.jpg",
  "/media/bg/bg4.jpg",
  "/media/bg/bg5.jpg",
  "/media/gen/montagne.jpg",
  "/media/gen/love.jpg",
];

export default function Categories() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image src="/media/bg/bg1.jpg" alt="" fill sizes="100vw" priority className="object-cover opacity-15 dark:opacity-8 blur-sm scale-110" />
        <div className="absolute inset-0 bg-[#f0e0d4]/80 dark:bg-[#0a0604]/80" />
      </div>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10"
        >
          <div>
            <p className="text-[#c97b7b] dark:text-[#e8a0a0] uppercase tracking-[0.3em] text-sm mb-2">
              Nos univers
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#2a1d13] dark:text-[#f5e9d3]">
              Une catégorie pour <span className="gradient-text">chaque fête</span>
            </h2>
          </div>
          <p className="text-sm text-[#6b5a4a] dark:text-[#a89880] max-w-sm">
            Du mariage à la Saint-Valentin, en passant par les anniversaires
            d&apos;enfants — explorez nos créations par thème.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((c, i) => (
            <motion.a
              href="#catalogue"
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative overflow-hidden glass rounded-3xl p-6 flex flex-col items-start gap-4 min-h-[140px] card-hover cursor-pointer border border-transparent hover:border-[#e8a0a0]/40 dark:hover:border-[#e8a0a0]/30 transition"
            >
              <Image
                src={cardImages[i % cardImages.length]}
                alt=""
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover opacity-20 dark:opacity-10 scale-110 group-hover:scale-125 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#f0e0d4]/90 via-[#f0e0d4]/60 to-transparent dark:from-[#0a0604]/90 dark:via-[#0a0604]/60" />
              <div
                className={`relative w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition ${accents[i % accents.length]}`}
              >
                {icons[c.id]}
              </div>
              <div className="relative mt-auto">
                <span className="font-display text-base font-semibold text-[#2a1d13] dark:text-[#f5e9d3]">
                  {c.nom}
                </span>
                <div className="text-xs text-[#6b5a4a] dark:text-[#a89880] mt-1">
                  {cakes.filter((k) => k.categorieId === c.id).length || 1} création
                  {cakes.filter((k) => k.categorieId === c.id).length > 1 ? "s" : ""}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}