"use client";

import { motion } from "framer-motion";
import { categories, cakes } from "@/lib/mockData";
import { Cake, Heart, Baby, Snowflake, Sparkles, Cookie, GlassWater } from "lucide-react";

const icons: Record<number, React.ReactNode> = {
  1: <Heart className="w-8 h-8" />,
  2: <Cake className="w-8 h-8" />,
  3: <Baby className="w-8 h-8" />,
  4: <Snowflake className="w-8 h-8" />,
  5: <Sparkles className="w-8 h-8" />,
  6: <Cookie className="w-8 h-8" />,
  7: <GlassWater className="w-8 h-8" />,
};

const gradients = [
  "from-[#e8a0a0] to-[#c97b7b]",
  "from-[#d4a373] to-[#b07a3a]",
  "from-[#f0c987] to-[#d4a373]",
  "from-[#c97b7b] to-[#8b5a2b]",
  "from-[#e8a0a0] to-[#d4a373]",
  "from-[#b07a3a] to-[#8b5a2b]",
  "from-[#d4a373] to-[#e8a0a0]",
];

export default function Categories() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
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
          <p className="text-sm text-[#6b5a4a] dark:text-[#b8a88a] max-w-sm">
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
              className="group relative overflow-hidden rounded-3xl p-6 flex flex-col items-start gap-4 min-h-[150px] card-hover cursor-pointer"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradients[i % gradients.length]} opacity-90`}
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_60%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_60%)]" />
              <div className="relative w-12 h-12 rounded-2xl bg-white dark:bg-[#2a1d13]/25 backdrop-blur flex items-center justify-center text-white group-hover:scale-110 transition">
                {icons[c.id]}
              </div>
              <span className="relative font-display text-lg font-semibold text-white mt-auto">
                {c.nom}
              </span>
              <div className="relative text-xs text-white/80">
                {cakes.filter((k) => k.categorieId === c.id).length || 1} création
                {cakes.filter((k) => k.categorieId === c.id).length > 1 ? "s" : ""}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}