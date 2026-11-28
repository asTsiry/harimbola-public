"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import { cakes, categories, formatAriary, imgFor, portions as allPortions } from "@/lib/mockData";
import { useCart, CartItem } from "@/components/CartProvider";
import dynamic from "next/dynamic";
const Dropdown = dynamic(() => import("@/components/Dropdown"), { ssr: false });

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
  Upload,
} from "lucide-react";
import Image from "next/image";

export default function Catalog() {
  const { addItem } = useCart();
  const [filter, setFilter] = useState<number | "all">("all");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [imgIdx, setImgIdx] = useState(0);
  const [orderCake, setOrderCake] = useState<number | null>(null);
  const [orderOpen, setOrderOpen] = useState(false);
  const [orderModel, setOrderModel] = useState<string>("");

  const [orderPortion, setOrderPortion] = useState<number | null>(null);
  const [orderQty, setOrderQty] = useState(1);
  const [orderDetails, setOrderDetails] = useState("");
  const [orderPhoto, setOrderPhoto] = useState<string | null>(null);
  const [orderPhotoPreview, setOrderPhotoPreview] = useState<string | null>(null);
  const [orderType, setOrderType] = useState<"recup" | "livraison">("recup");
  const [orderDate, setOrderDate] = useState("");
  const [orderTime, setOrderTime] = useState("");

  const [orderContact, setOrderContact] = useState("");
  const [orderAvance, setOrderAvance] = useState("");
  const [orderDone, setOrderDone] = useState(false);
  const [comment, setComment] = useState("");
  const [descExpanded, setDescExpanded] = useState(false);
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

  useEffect(() => {
    if (!selected) return;
    const id = setInterval(() => {
      setImgIdx((i) => (i >= selected.photos.length - 1 ? 0 : i + 1));
    }, 4000);
    return () => clearInterval(id);
  }, [selected]);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { model?: string } | undefined;
      setOrderCake(null);
      setOrderOpen(true);
      setOrderModel(detail?.model || "Model Simple");
      setOrderPortion(null);
      setOrderQty(1);
      setOrderDetails("");
      setOrderPhoto(null);
      setOrderPhotoPreview(null);
      setOrderType("recup");
      setOrderDate("");
      setOrderTime("");
      setOrderDone(false);
    };
    window.addEventListener("open-order", handler);
    return () => window.removeEventListener("open-order", handler);
  }, []);

  const goPrev = () => {
    if (filtered.length === 0) return;
    const i = selectedIdx <= 0 ? filtered.length - 1 : selectedIdx - 1;
    setSelectedId(filtered[i].id);
    setDescExpanded(false);
    setImgIdx(0);
  };
  const goNext = () => {
    if (filtered.length === 0) return;
    const i = selectedIdx >= filtered.length - 1 ? 0 : selectedIdx + 1;
    setSelectedId(filtered[i].id);
    setDescExpanded(false);
    setImgIdx(0);
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
                  src={imgFor(cake.photos?.[0])}
                  alt={cake.titre}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a120b]/70 via-transparent to-transparent" />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full glass text-[10px] text-[#8b5a2b] dark:text-[#d4a373]">
                  {categories.find((c) => c.id === cake.categorieId)?.nom}
                </div>
                <button
                  onClick={() => {
                    setSelectedId(cake.id);
                    setDescExpanded(false);
                    setImgIdx(0);
                  }}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 dark:bg-[#0a0604]/80 backdrop-blur flex items-center justify-center text-[#8b5a2b] dark:text-[#d4a373] hover:scale-110 transition shadow"
                  aria-label="Voir le détail"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <div className="absolute bottom-2 right-2 flex items-center gap-1 text-[#8b5a2b] dark:text-[#f0c987]">
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
                  <button
                    onClick={() => {
                      setOrderCake(cake.id);
                      setOrderModel(cake.titre);
                      setOrderPortion(cake.portions[0] ?? null);
                      setOrderQty(1);
                      setOrderDetails("");
                      setOrderPhoto(null);
                      setOrderPhotoPreview(null);
                      setOrderType("recup");
                      setOrderDate("");
                      setOrderTime("");
                      setOrderContact("");
                      setOrderAvance("");
                      setOrderDone(false);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#e8a0a0] to-[#c97b7b] text-white font-semibold text-xs hover:shadow transition"
                  >
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
              className="relative w-full max-w-3xl max-h-[95vh] overflow-visible rounded-3xl bg-white dark:bg-[#0a0604] shadow-2xl flex flex-col"
            >
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid md:grid-cols-2 flex-1 min-h-0">
                <div className="relative h-72 md:h-full group">
                  <AnimatePresence mode="sync">
                    <motion.div
                      key={imgIdx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={imgFor(selected.photos?.[imgIdx] ?? selected.photos?.[0])}
                        alt={selected.titre}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-70 group-hover:opacity-100 transition duration-500" />
                  {/* dots at top center */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {selected.photos.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setImgIdx(idx)}
                        className={`w-2 h-2 rounded-full transition ${idx === imgIdx ? "bg-white scale-125" : "bg-white/40"}`}
                        aria-label={`Image ${idx + 1}`}
                      />
                    ))}
                  </div>
                  {/* prev/next image */}
                  {selected.photos.length > 1 && (
                    <>
                      <button
                        onClick={() => setImgIdx((i) => (i <= 0 ? selected.photos.length - 1 : i - 1))}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setImgIdx((i) => (i >= selected.photos.length - 1 ? 0 : i + 1))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="px-3 py-1 rounded-full glass text-xs text-[#8b5a2b] dark:text-[#d4a373] inline-block mb-2">
                      {categories.find((c) => c.id === selected.categorieId)?.nom}
                    </div>
                    <p className="text-sm text-white leading-relaxed drop-shadow">
                      {descExpanded || selected.description.length <= 90
                        ? selected.description
                        : selected.description.slice(0, 90) + "…"}
                      {selected.description.length > 90 && !descExpanded && (
                        <button
                          onClick={() => setDescExpanded(true)}
                          className="ml-1 text-xs font-semibold text-[#f0c987] hover:underline"
                        >
                          Voir plus
                        </button>
                      )}
                      {selected.description.length > 90 && descExpanded && (
                        <button
                          onClick={() => setDescExpanded(false)}
                          className="ml-1 text-xs font-semibold text-[#f0c987] hover:underline"
                        >
                          Voir moins
                        </button>
                      )}
                    </p>
                  </div>
                </div>
                <div className="p-6 flex flex-col overflow-visible">
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
                    <button
                      onClick={() => {
                        setOrderCake(selected.id);
                        setOrderModel(selected.titre);
                        setOrderPortion(selected.portions[0] ?? null);
                        setOrderQty(1);
                        setOrderDetails("");
                        setOrderPhoto(null);
                        setOrderPhotoPreview(null);
                        setOrderType("recup");
                        setOrderDate("");
                        setOrderTime("");
                        setOrderDone(false);
                        setSelectedId(null);
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#e8a0a0] to-[#c97b7b] text-white font-semibold text-sm hover:shadow transition"
                    >
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
                    <div className="space-y-3 max-h-44 overflow-y-auto pr-1">
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

      {/* Order modal */}
      <AnimatePresence>
        {(orderCake != null || orderOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl bg-white dark:bg-[#0a0604] shadow-2xl p-6"
            >
              <button
                onClick={() => {
                  setOrderCake(null);
                  setOrderOpen(false);
                }}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition"
              >
                <X className="w-5 h-5" />
              </button>

              {(() => {
                const cake = orderCake ? cakes.find((c) => c.id === orderCake) : null;

                const price = cake?.prixPortion ?? 4000;
                if (orderDone) {
                  return (
                    <div className="text-center py-10">
                      <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#e8a0a0] to-[#c97b7b] flex items-center justify-center text-white text-3xl">
                        ✓
                      </div>
                      <h3 className="mt-4 font-display text-xl font-bold text-[#2a1d13] dark:text-[#f5e9d3]">
                        Commande envoyée !
                      </h3>
                      <p className="mt-2 text-sm text-[#6b5a4a] dark:text-[#a89880]">
                        Nous vous contacterons pour confirmer la livraison.
                      </p>
                      <button
                        onClick={() => {
                          setOrderCake(null);
                          setOrderOpen(false);
                        }}
                        className="mt-6 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#e8a0a0] to-[#c97b7b] text-white font-semibold text-sm"
                      >
                        Fermer
                      </button>
                    </div>
                  );
                }
                return (
                  <>
                    <h3 className="font-display text-xl font-bold text-[#2a1d13] dark:text-[#f5e9d3]">
                      Détail de la commande
                    </h3>
                    <p className="text-xs text-[#6b5a4a] dark:text-[#a89880] mt-1">
                      {formatAriary(price)} / portion
                    </p>

                    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2 text-sm text-[#2a1d13] dark:text-[#f5e9d3]">
                        Modèle: <span className="font-semibold">{orderModel || "Model Simple"}</span>
                      </div>
                      <Dropdown
                        label="Portion"
                        required
                        placeholder="Choisir une portion"
                        value={orderPortion}
                        onChange={(v) => setOrderPortion(Number(v))}
                        options={(cake?.portions?.length ? cake.portions : allPortions.map((p) => p.nb))
                          .filter((p) => p >= 4)
                          .map((p) => ({ value: p, label: `${p} personnes` }))}
                      />
                      <div>
                        <label className="text-xs text-[#6b5a4a] dark:text-[#a89880] mb-1 block">
                          Quantité <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          required
                          min={1}
                          value={orderQty}
                          onChange={(e) => setOrderQty(Math.max(1, Number(e.target.value)))}
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#050302] border border-[#e8a0a0]/30 text-sm text-[#2a1d13] dark:text-[#f5e9d3] focus:outline-none focus:border-[#c97b7b]"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-[#6b5a4a] dark:text-[#a89880] mb-1 block">
                          Détails (couleur, texte, etc.)
                        </label>
                        <textarea
                          value={orderDetails}
                          onChange={(e) => setOrderDetails(e.target.value)}
                          rows={3}
                          placeholder="Précisez vos souhaits..."
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#050302] border border-[#e8a0a0]/30 text-sm text-[#2a1d13] dark:text-[#f5e9d3] focus:outline-none focus:border-[#c97b7b] resize-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-[#6b5a4a] dark:text-[#a89880] mb-1 block">
                          Photo modèle (optionnel)
                        </label>
                        <div
                          onDragOver={(e) => {
                            e.preventDefault();
                            e.currentTarget.classList.add("border-[#c97b7b]", "bg-[#e8a0a0]/10");
                          }}
                          onDragLeave={(e) => {
                            e.currentTarget.classList.remove("border-[#c97b7b]", "bg-[#e8a0a0]/10");
                          }}
                          onDrop={(e) => {
                            e.preventDefault();
                            e.currentTarget.classList.remove("border-[#c97b7b]", "bg-[#e8a0a0]/10");
                            const f = e.dataTransfer.files?.[0];
                            if (f) {
                              setOrderPhoto(f.name);
                              setOrderPhotoPreview(URL.createObjectURL(f));
                            }
                          }}
                          onClick={() => document.getElementById("orderPhotoInput")?.click()}
                          className="border-2 border-dashed border-[#e8a0a0]/40 rounded-2xl p-6 text-center cursor-pointer hover:border-[#c97b7b] transition group/preview"
                        >
                          <input
                            id="orderPhotoInput"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) {
                                setOrderPhoto(f.name);
                                setOrderPhotoPreview(URL.createObjectURL(f));
                              }
                            }}
                          />
                          {orderPhotoPreview ? (
                            <div className="relative inline-block">
                              <Image
                                src={orderPhotoPreview}
                                alt="Aperçu"
                                width={128}
                                height={128}
                                unoptimized
                                className="w-32 h-32 object-cover rounded-xl shadow"
                              />
                              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 group-hover/preview:opacity-100 transition rounded-xl">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    document.getElementById("orderPhotoInput")?.click();
                                  }}
                                  className="w-9 h-9 rounded-full bg-white/90 text-[#8b5a2b] flex items-center justify-center hover:scale-110 transition"
                                  aria-label="Remplacer"
                                >
                                  <Upload className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setOrderPhoto(null);
                                    setOrderPhotoPreview(null);
                                  }}
                                  className="w-9 h-9 rounded-full bg-white/90 text-red-500 flex items-center justify-center hover:scale-110 transition"
                                  aria-label="Supprimer"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                              <p className="text-xs text-[#6b5a4a] dark:text-[#a89880] mt-1 text-center">
                                {orderPhoto}
                              </p>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-2">
                              <Upload className="w-10 h-10 text-[#c97b7b] dark:text-[#e8a0a0]" />
                              <p className="text-sm text-[#6b5a4a] dark:text-[#a89880]">
                                Glissez-déposez une image ici
                              </p>
                              <p className="text-xs text-[#6b5a4a] dark:text-[#a89880]">
                                ou cliquez pour choisir
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-sm text-[#2a1d13] dark:text-[#f5e9d3] pt-2 border-t border-[#e8a0a0]/20 md:col-span-2">
                        Total estimé:{" "}
                        <span className="font-bold text-[#8b5a2b] dark:text-[#d4a373]">
                          {formatAriary(price * (orderPortion || 1) * orderQty)}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          const item: CartItem = {
                            id: Date.now(),
                            titre: orderModel || "Model Simple",
                            photo: cake?.photos?.[0] ?? "montagne.jpg",
                            prix: price,
                            qty: orderQty,
                            portion: orderPortion,
                            details: orderDetails,
                            photoPreview: orderPhotoPreview,
                            type: orderType,
                            date: orderDate,
                            time: orderTime,
                            contact: orderContact,
                            avance: orderAvance,
                            address: "",
                            location: null,
                          };
                          addItem(item);
                          setOrderCake(null);
                          setOrderOpen(false);
                        }}
                        className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#e8a0a0] to-[#c97b7b] text-white font-semibold text-sm hover:shadow transition md:col-span-2"
                      >
                        Ajouter au panier
                      </button>
                  </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}