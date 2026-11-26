"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { cakes, categories, formatAriary, imgFor } from "@/lib/mockData";
import {
  Heart,
  Frown,
  MessageCircle,
  ShoppingCart,
  Star,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

export default function Catalog() {
  const [filter, setFilter] = useState<number | "all">("all");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  type Cmt = { name: string; avatar: string; time: string; text: string };
  const [comments, setComments] = useState<Record<number, Cmt[]>>({
    1: [
      { name: "Nirina R.", avatar: "N", time: "il y a 2 h", text: "Délicieux ! Le chocolat est incroyable." },
      { name: "Hanta M.", avatar: "H", time: "il y a 5 h", text: "Très beau gâteau, bravo !" },
    ],
    2: [{ name: "Tojo A.", avatar: "T", time: "hier", text: "Parfait pour notre mariage." }],
    3: [{ name: "Rado K.", avatar: "R", time: "il y a 1 j", text: "Mon fils a adoré !" }],
    4: [{ name: "Lova S.", avatar: "L", time: "il y a 3 j", text: "Romantique à souhait." }],
  });

  const filtered = useMemo(
    () => (filter === "all" ? cakes : cakes.filter((c) => c.categorieId === filter)),
    [filter]
  );

  const selected = useMemo(
    () => (selectedId == null ? null : cakes.find((c) => c.id === selectedId) ?? null),
    [selectedId]
  );

  const selectedIdx = useMemo(
    () => (selected ? filtered.findIndex((c) => c.id === selected.id) : -1),
    [selected, filtered]
  );

  const goPrev = () => {
    if (filtered.length === 0) return;
    const i = selectedIdx <= 0 ? filtered.length - 1 : selectedIdx - 1;
    setSelectedId(filtered[i].id);
  };
  const goNext = () => {
    if (filtered.length === 0) return;
    const i = selectedIdx >= filtered.length - 1 ? 0 : selectedIdx + 1;
    setSelectedId(filtered[i].id);
  };

  return (
    <section id="catalogue" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image src="/media/bg/bg2.jpg" alt="" fill sizes="100vw" className="object-cover opacity-12 dark:opacity-6 blur-sm scale-110" />
        <div className="absolute inset-0 bg-[#f0e0d4]/85 dark:bg-[#0a0604]/85" />
      </div>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8"
        >
          <div>
            <p className="text-[#c97b7b] dark:text-[#e8a0a0] uppercase tracking-[0.3em] text-sm mb-2">
              Notre catalogue
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#2a1d13] dark:text-[#f5e9d3]">
              Nos créations <span className="gradient-text">signature</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 rounded-full text-xs transition ${
                filter === "all"
                  ? "bg-gradient-to-r from-[#e8a0a0] to-[#c97b7b] text-white font-semibold shadow"
                  : "bg-white dark:bg-[#050302] text-[#6b5a4a] dark:text-[#a89880] hover:text-[#c97b7b] dark:hover:text-[#e8a0a0] border border-[#e8a0a0]/30"
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
                  className={`px-3 py-1.5 rounded-full text-xs transition ${
                    filter === c.id
                      ? "bg-gradient-to-r from-[#e8a0a0] to-[#c97b7b] text-white font-semibold shadow"
                      : "bg-white dark:bg-[#050302] text-[#6b5a4a] dark:text-[#a89880] hover:text-[#c97b7b] dark:hover:text-[#e8a0a0] border border-[#e8a0a0]/30"
                  }`}
                >
                  {c.nom}
                </button>
              ))}
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((cake, i) => (
            <motion.article
              key={cake.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group glass rounded-2xl overflow-hidden card-hover relative"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-[#e8a0a0]/20 to-transparent pointer-events-none z-0" />
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={imgFor(cake.photo)}
                  alt={cake.titre}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a120b]/70 via-transparent to-transparent" />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full glass text-[10px] text-[#f0c987] dark:text-[#d4a373]">
                  {categories.find((c) => c.id === cake.categorieId)?.nom}
                </div>
                <button
                  onClick={() => setSelectedId(cake.id)}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 dark:bg-[#0a0604]/80 backdrop-blur flex items-center justify-center text-[#8b5a2b] dark:text-[#d4a373] hover:scale-110 transition shadow"
                  aria-label="Voir le détail"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <div className="absolute bottom-2 right-2 flex items-center gap-1 text-[#f0c987]">
                  <Star className="w-3.5 h-3.5 fill-[#f0c987]" />
                  <span className="text-xs font-semibold">4.9</span>
                </div>
              </div>

              <div className="relative p-3">
                <h3 className="font-display text-base font-bold text-[#2a1d13] dark:text-[#f5e9d3] line-clamp-1">
                  {cake.titre}
                </h3>
                <p className="mt-1 text-[#6b5a4a] dark:text-[#a89880] text-xs leading-relaxed line-clamp-2">
                  {cake.description}
                </p>

                <div className="mt-2 flex items-center gap-3 text-[10px] text-[#6b5a4a] dark:text-[#a89880]">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3 text-[#e07a7a]" />
                    {cake.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <Frown className="w-3 h-3 text-[#7aa7e0]" />
                    {cake.dislikes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" /> 12
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap gap-1">
                  {cake.portions.slice(0, 4).map((p) => (
                    <span
                      key={p}
                      className="px-1.5 py-0.5 rounded glass text-[10px] text-[#8b5a2b] dark:text-[#d4a373]"
                    >
                      {p}p
                    </span>
                  ))}
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-[#6b5a4a] dark:text-[#a89880]">
                      Prix portion
                    </div>
                    <div className="font-display text-base font-bold text-[#8b5a2b] dark:text-[#d4a373]">
                      {formatAriary(cake.prixPortion)}
                    </div>
                  </div>
                  <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#e8a0a0] to-[#c97b7b] text-white font-semibold text-xs hover:shadow transition">
                    <ShoppingCart className="w-3.5 h-3.5" />
                    Commander
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl bg-white dark:bg-[#0a0604] shadow-2xl flex flex-col"
            >
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid md:grid-cols-2 flex-1 min-h-0">
                <div className="relative h-52 md:h-full">
                  <Image
                    src={imgFor(selected.photo)}
                    alt={selected.titre}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a120b]/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full glass text-xs text-[#f0c987] dark:text-[#d4a373]">
                    {categories.find((c) => c.id === selected.categorieId)?.nom}
                  </div>
                </div>
                <div className="p-6 flex flex-col overflow-hidden">
                  <h3 className="font-display text-2xl font-bold text-[#2a1d13] dark:text-[#f5e9d3]">
                    {selected.titre}
                  </h3>
                  <div className="mt-2 flex items-center gap-3 text-xs text-[#6b5a4a] dark:text-[#a89880]">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-[#e07a7a]" /> {selected.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Frown className="w-3.5 h-3.5 text-[#7aa7e0]" /> {selected.dislikes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5" /> 12
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-[#d4a373] text-[#d4a373]" /> 4.9
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-[#6b5a4a] dark:text-[#a89880] leading-relaxed">
                    {selected.description}
                  </p>

                  <div className="mt-4">
                    <div className="text-xs text-[#6b5a4a] dark:text-[#a89880] mb-1">
                      Portions disponibles
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selected.portions.map((p) => (
                        <span
                          key={p}
                          className="px-2.5 py-1 rounded-md glass text-xs text-[#8b5a2b] dark:text-[#d4a373]"
                        >
                          {p} pers.
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-[#6b5a4a] dark:text-[#a89880]">
                        Prix portion
                      </div>
                      <div className="font-display text-2xl font-bold text-[#8b5a2b] dark:text-[#d4a373]">
                        {formatAriary(selected.prixPortion)}
                      </div>
                    </div>
                    <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#e8a0a0] to-[#c97b7b] text-white font-semibold text-sm hover:shadow transition">
                      <ShoppingCart className="w-4 h-4" />
                      Commander
                    </button>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-xs text-[#c97b7b] dark:text-[#e8a0a0] hover:scale-105 transition">
                      <Heart className="w-3.5 h-3.5" /> Délicieux ({selected.likes})
                    </button>
                    <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-xs text-[#7aa7e0] dark:text-[#a8c5e8] hover:scale-105 transition">
                      <Frown className="w-3.5 h-3.5" /> Pas trop ({selected.dislikes})
                    </button>
                  </div>

                  <div className="mt-5">
                    <div className="text-xs text-[#6b5a4a] dark:text-[#a89880] mb-2">
                      Commentaires
                    </div>
                    <div className="space-y-3 max-h-28 overflow-y-auto pr-1">
                      {(comments[selected.id] ?? []).map((cm, idx) => (
                        <div key={idx} className="flex gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#e8a0a0] to-[#c97b7b] flex items-center justify-center text-white text-xs font-bold shrink-0">
                            {cm.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="bg-[#f0e0d4] dark:bg-[#050302] rounded-2xl px-3 py-2">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-[#2a1d13] dark:text-[#f5e9d3]">
                                  {cm.name}
                                </span>
                                <span className="text-[10px] text-[#6b5a4a] dark:text-[#a89880]">
                                  {cm.time}
                                </span>
                              </div>
                              <p className="text-xs text-[#2a1d13] dark:text-[#f5e9d3] mt-0.5">
                                {cm.text}
                              </p>
                            </div>
                            <div className="flex gap-3 mt-1 ml-2 text-[10px] text-[#6b5a4a] dark:text-[#a89880]">
                              <button className="hover:text-[#c97b7b] dark:hover:text-[#e8a0a0]">
                                J&apos;aime
                              </button>
                              <button className="hover:text-[#c97b7b] dark:hover:text-[#e8a0a0]">
                                Répondre
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      {(comments[selected.id] ?? []).length === 0 && (
                        <div className="text-xs text-[#6b5a4a] dark:text-[#a89880] italic">
                          Aucun commentaire.
                        </div>
                      )}
                    </div>
                    <div className="mt-3 flex gap-2 items-center">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#d4a373] to-[#8b5a2b] flex items-center justify-center text-white text-xs font-bold shrink-0">
                        V
                      </div>
                      <input
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Écrire un commentaire..."
                        className="flex-1 px-3 py-2 rounded-full bg-white dark:bg-[#050302] border border-[#e8a0a0]/30 text-xs text-[#2a1d13] dark:text-[#f5e9d3] focus:outline-none focus:border-[#c97b7b]"
                      />
                      <button
                        onClick={() => {
                          if (!comment.trim()) return;
                          setComments((prev) => ({
                            ...prev,
                            [selected.id]: [
                              ...(prev[selected.id] ?? []),
                              { name: "Vous", avatar: "V", time: "à l&apos;instant", text: comment.trim() },
                            ],
                          }));
                          setComment("");
                        }}
                        className="px-3 py-2 rounded-full bg-gradient-to-r from-[#e8a0a0] to-[#c97b7b] text-white text-xs font-semibold"
                      >
                        Envoyer
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-[#e8a0a0]/20 pt-4">
                    <button
                      onClick={goPrev}
                      className="inline-flex items-center gap-1 text-sm text-[#6b5a4a] dark:text-[#a89880] hover:text-[#c97b7b] dark:hover:text-[#e8a0a0] transition"
                    >
                      <ChevronLeft className="w-4 h-4" /> Précédent
                    </button>
                    <span className="text-xs text-[#6b5a4a] dark:text-[#a89880]">
                      {selectedIdx + 1} / {filtered.length}
                    </span>
                    <button
                      onClick={goNext}
                      className="inline-flex items-center gap-1 text-sm text-[#6b5a4a] dark:text-[#a89880] hover:text-[#c97b7b] dark:hover:text-[#e8a0a0] transition"
                    >
                      Suivant <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}