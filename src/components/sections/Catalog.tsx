"use client";

import { motion } from "framer-motion";
import { cakes, categories, formatAriary, imgFor } from "@/lib/mockData";
import { Heart, Frown, MessageCircle, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Catalog() {
  const [filter, setFilter] = useState<number | "all">("all");
  const filtered =
    filter === "all" ? cakes : cakes.filter((c) => c.categorieId === filter);

  return (
    <section id="catalogue" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10"
        >
          <div>
            <p className="text-[#d4a373] uppercase tracking-[0.3em] text-sm mb-3">
              Notre catalogue
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold">
              Nos créations <span className="gradient-text">signature</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-full text-sm transition ${
                filter === "all"
                  ? "bg-gradient-to-r from-[#e8a0a0] to-[#c97b7b] text-white font-semibold shadow"
                  : "bg-white dark:bg-[#1a120b] text-[#6b5a4a] dark:text-[#a89880] hover:text-[#c97b7b] dark:hover:text-[#e8a0a0] border border-[#e8a0a0]/30"
              }`}
            >
              Tout
            </button>
            {categories
              .filter((c) => cakes.some((k) => k.categorieId === c.id))
              .map((c) => (
                <button
                  key={c.id}
                  onClick={() => setFilter(c.id)}
                  className={`px-4 py-2 rounded-full text-sm transition ${
                    filter === c.id
                      ? "bg-[#d4a373] text-[#1a120b] font-semibold"
                      : "glass text-[#2a1d13] dark:text-[#f5e9d3]/80 hover:text-[#8b5a2b] dark:text-[#d4a373]"
                  }`}
                >
                  {c.nom}
                </button>
              ))}
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {filtered.map((cake, i) => (
            <motion.article
              key={cake.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group glass rounded-3xl overflow-hidden card-hover"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={imgFor(cake.photo)}
                  alt={cake.titre}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a120b]/80 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass text-xs text-[#8b5a2b] dark:text-[#d4a373]">
                  {categories.find((c) => c.id === cake.categorieId)?.nom}
                </div>
                <div className="absolute bottom-4 right-4 flex items-center gap-1 text-[#8b5a2b] dark:text-[#d4a373]">
                  <Star className="w-4 h-4 fill-[#f0c987]" />
                  <span className="text-sm font-semibold">4.9</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-display text-2xl font-bold text-[#2a1d13] dark:text-[#f5e9d3]">
                  {cake.titre}
                </h3>
                <p className="mt-2 text-[#6b5a4a] dark:text-[#a89880] text-sm leading-relaxed line-clamp-3">
                  {cake.description}
                </p>

                <div className="mt-4 flex items-center gap-4 text-xs text-[#6b5a4a] dark:text-[#a89880]">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-[#e07a7a]" />
                    {cake.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <Frown className="w-3.5 h-3.5 text-[#7aa7e0]" />
                    {cake.dislikes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5" /> 12
                  </span>
                </div>

                <div className="mt-4">
                  <div className="text-xs text-[#6b5a4a] dark:text-[#a89880] mb-1">
                    Portions disponibles
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cake.portions.map((p) => (
                      <span
                        key={p}
                        className="px-2.5 py-1 rounded-md glass text-xs text-[#8b5a2b] dark:text-[#d4a373]"
                      >
                        {p} pers.
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-[#6b5a4a] dark:text-[#a89880]">Prix portion</div>
                    <div className="font-display text-2xl font-bold text-[#8b5a2b] dark:text-[#d4a373]">
                      {formatAriary(cake.prixPortion)}
                    </div>
                  </div>
                  <button className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#d4a373] to-[#8b5a2b] text-[#1a120b] font-semibold text-sm hover:shadow-[0_0_24px_rgba(212,163,115,0.5)] transition">
                    <ShoppingCart className="w-4 h-4" />
                    Commander
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}