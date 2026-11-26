"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Nirina R.",
    text: "La Montagne de Chocolat a fait sensation à l'anniversaire de mon fils. Personnalisation parfaite, goût incroyable !",
    rating: 5,
  },
  {
    name: "Hanta M.",
    text: "Gâteau Bible dorée pour nos fiançailles — exactement comme demandé. Service impeccable et livraison soignée.",
    rating: 5,
  },
  {
    name: "Tojo A.",
    text: "Manoir de Batman : mon enfant était aux anges. Équipe à l'écoute, résultat bluffant. Je recommande !",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[#c97b7b] dark:text-[#e8a0a0] uppercase tracking-[0.3em] text-sm mb-3">
            Témoignages
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#2a1d13] dark:text-[#f5e9d3]">
            Ils ont <span className="gradient-text">adoré</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative bg-white dark:bg-[#1a120b] rounded-3xl p-6 shadow-lg border border-[#e8a0a0]/20 card-hover"
            >
              <Quote className="absolute top-5 right-5 w-8 h-8 text-[#e8a0a0]/30" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-[#d4a373] text-[#d4a373]"
                  />
                ))}
              </div>
              <p className="text-[#6b5a4a] dark:text-[#a89880] text-sm leading-relaxed">
                « {t.text} »
              </p>
              <div className="mt-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#e8a0a0] to-[#c97b7b] flex items-center justify-center text-white font-bold">
                  {t.name[0]}
                </div>
                <div className="font-semibold text-[#2a1d13] dark:text-[#f5e9d3] text-sm">
                  {t.name}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}