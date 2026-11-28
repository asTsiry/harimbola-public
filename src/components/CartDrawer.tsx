"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2 } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/components/CartProvider";
import { formatAriary, imgFor } from "@/lib/mockData";

export default function CartDrawer() {
  const { items, removeItem, total, count } = useCart();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-cart", handler);
    return () => window.removeEventListener("open-cart", handler);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-[#0a0604] shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-[#e8a0a0]/20">
              <h3 className="font-display text-xl font-bold text-[#2a1d13] dark:text-[#f5e9d3]">
                Panier ({count})
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="w-9 h-9 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {items.length === 0 && (
                <p className="text-sm text-[#6b5a4a] dark:text-[#a89880] text-center py-10">
                  Votre panier est vide.
                </p>
              )}
              {items.map((it, idx) => (
                <div
                  key={idx}
                  className="flex gap-3 bg-[#f0e0d4] dark:bg-[#050302] rounded-2xl p-3"
                >
                  <Image
                    src={imgFor(it.photo)}
                    alt={it.titre}
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-sm font-bold text-[#2a1d13] dark:text-[#f5e9d3] truncate">
                      {it.titre}
                    </div>
                    <div className="text-xs text-[#6b5a4a] dark:text-[#a89880]">
                      {it.portion ? `${it.portion} pers.` : ""} × {it.qty}
                    </div>
                    <div className="text-xs font-semibold text-[#8b5a2b] dark:text-[#d4a373]">
                      {formatAriary(it.prix * it.qty)}
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(idx)}
                    className="text-red-500 hover:scale-110 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {items.length > 0 && (
              <div className="p-5 border-t border-[#e8a0a0]/20 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#6b5a4a] dark:text-[#a89880]">Total</span>
                  <span className="font-display text-lg font-bold text-[#8b5a2b] dark:text-[#d4a373]">
                    {formatAriary(total)}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setOpen(false);
                    window.dispatchEvent(new Event("open-checkout"));
                  }}
                  className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#e8a0a0] to-[#c97b7b] text-white font-semibold text-sm"
                >
                  Passer la commande
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}