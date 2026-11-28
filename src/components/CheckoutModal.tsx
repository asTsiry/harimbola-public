"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import { formatAriary } from "@/lib/mockData";
import dynamic from "next/dynamic";

const LocationPicker = dynamic(() => import("@/components/LocationPicker"), { ssr: false });

export default function CheckoutModal() {
  const { clear, total } = useCart();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [done, setDone] = useState(false);
  const [orderType, setOrderType] = useState<"recup" | "livraison">("recup");

  const hasDelivery = orderType === "livraison";

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { type?: "recup" | "livraison"; date?: string; time?: string } | undefined;
      setOpen(true);
      setStep(1);
      setLocation(null);
      setDone(false);
      setOrderType(detail?.type || "recup");
    };
    window.addEventListener("open-checkout", handler);
    return () => window.removeEventListener("open-checkout", handler);
  }, []);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#0a0604] shadow-2xl p-6"
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>

          {done ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#e8a0a0] to-[#c97b7b] flex items-center justify-center text-white text-3xl">
                ✓
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-[#2a1d13] dark:text-[#f5e9d3]">
                Commande confirmée !
              </h3>
              <p className="mt-2 text-sm text-[#6b5a4a] dark:text-[#a89880]">
                Merci pour votre commande.
              </p>
              <button
                onClick={() => {
                  clear();
                  setOpen(false);
                }}
                className="mt-6 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#e8a0a0] to-[#c97b7b] text-white font-semibold text-sm"
              >
                Fermer
              </button>
            </div>
          ) : (
            <>
              <h3 className="font-display text-xl font-bold text-[#2a1d13] dark:text-[#f5e9d3]">
                {step === 1 && hasDelivery
                  ? "Lieu de livraison"
                  : "Paiement"}
              </h3>
              <p className="text-xs text-[#6b5a4a] dark:text-[#a89880] mt-1">
                Total: {formatAriary(total)}
              </p>

              {step === 1 && hasDelivery && (
                <div className="mt-5 space-y-4">
                  <LocationPicker
                    value={location}
                    onChange={setLocation}
                    address=""
                    onAddressChange={() => {}}
                    onDistanceChange={() => {}}
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={() => setOpen(false)}
                      className="flex-1 py-2.5 rounded-full glass text-[#8b5a2b] dark:text-[#d4a373] font-semibold text-sm"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={() => setStep(2)}
                      disabled={!location}
                      className="flex-1 py-2.5 rounded-full bg-gradient-to-r from-[#e8a0a0] to-[#c97b7b] text-white font-semibold text-sm disabled:opacity-50"
                    >
                      Confirmer le lieu de livraison
                    </button>
                  </div>
                </div>
              )}

              {(step === 2 || !hasDelivery) && (
                <div className="mt-5 space-y-4">
                  <h4 className="font-display text-lg font-bold text-[#2a1d13] dark:text-[#f5e9d3]">
                    Paiement
                  </h4>
                  <div>
                    <label className="text-xs text-[#6b5a4a] dark:text-[#a89880] mb-1 block">
                      Nom sur la carte
                    </label>
                    <input
                      placeholder="Nom complet"
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#050302] border border-[#e8a0a0]/30 text-sm text-[#2a1d13] dark:text-[#f5e9d3] focus:outline-none focus:border-[#c97b7b]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#6b5a4a] dark:text-[#a89880] mb-1 block">
                      Numéro de carte
                    </label>
                    <input
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#050302] border border-[#e8a0a0]/30 text-sm text-[#2a1d13] dark:text-[#f5e9d3] focus:outline-none focus:border-[#c97b7b]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-[#6b5a4a] dark:text-[#a89880] mb-1 block">
                        Expiration
                      </label>
                      <input
                        placeholder="MM/AA"
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#050302] border border-[#e8a0a0]/30 text-sm text-[#2a1d13] dark:text-[#f5e9d3] focus:outline-none focus:border-[#c97b7b]"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#6b5a4a] dark:text-[#a89880] mb-1 block">
                        CVC
                      </label>
                      <input
                        placeholder="123"
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#050302] border border-[#e8a0a0]/30 text-sm text-[#2a1d13] dark:text-[#f5e9d3] focus:outline-none focus:border-[#c97b7b]"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setDone(true)}
                    className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#e8a0a0] to-[#c97b7b] text-white font-semibold text-sm hover:shadow transition"
                  >
                    Payer
                  </button>
                </div>
              )}
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}