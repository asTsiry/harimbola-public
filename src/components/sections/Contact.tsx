"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Calendar, Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[#d4a373] uppercase tracking-[0.3em] text-sm mb-3">
            Contact
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold">
            Parlons de <span className="gradient-text">votre projet</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-6"
          >
            <h3 className="font-display text-2xl font-bold text-[#2a1d13] dark:text-[#f5e9d3] mb-6">
              Envoyez-nous un message
            </h3>
            {sent ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-[#8b5a2b] dark:text-[#d4a373] mb-4" />
                <p className="text-[#2a1d13] dark:text-[#f5e9d3] font-semibold">
                  Message envoyé !
                </p>
                <p className="text-sm text-[#6b5a4a] dark:text-[#a89880] mt-2">
                  Nous vous répondrons très vite.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="space-y-4"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    required
                    placeholder="Votre nom"
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a120b]/5 border border-[#d4a373]/20 text-[#2a1d13] dark:text-[#f5e9d3] placeholder:text-[#6b5a4a] dark:placeholder:text-[#a89880]/60 focus:outline-none focus:border-[#d4a373]"
                  />
                  <input
                    required
                    placeholder="Contact"
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a120b]/5 border border-[#d4a373]/20 text-[#2a1d13] dark:text-[#f5e9d3] placeholder:text-[#6b5a4a] dark:placeholder:text-[#a89880]/60 focus:outline-none focus:border-[#d4a373]"
                  />
                </div>
                <input
                  placeholder="Adresse"
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a120b]/5 border border-[#d4a373]/20 text-[#2a1d13] dark:text-[#f5e9d3] placeholder:text-[#6b5a4a] dark:placeholder:text-[#a89880]/60 focus:outline-none focus:border-[#d4a373]"
                />
                <textarea
                  required
                  rows={5}
                  placeholder="Votre message"
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a120b]/5 border border-[#d4a373]/20 text-[#2a1d13] dark:text-[#f5e9d3] placeholder:text-[#6b5a4a] dark:placeholder:text-[#a89880]/60 focus:outline-none focus:border-[#d4a373] resize-none"
                />
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4a373] to-[#8b5a2b] text-[#1a120b] font-semibold hover:shadow-[0_0_24px_rgba(212,163,115,0.5)] transition"
                >
                  <Send className="w-4 h-4" /> Envoyer
                </button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="glass rounded-3xl p-6">
              <h3 className="font-display text-2xl font-bold text-[#2a1d13] dark:text-[#f5e9d3] mb-6">
                Prendre rendez-vous
              </h3>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="date"
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a120b]/5 border border-[#d4a373]/20 text-[#2a1d13] dark:text-[#f5e9d3] focus:outline-none focus:border-[#d4a373]"
                  />
                  <input
                    type="time"
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a120b]/5 border border-[#d4a373]/20 text-[#2a1d13] dark:text-[#f5e9d3] focus:outline-none focus:border-[#d4a373]"
                  />
                </div>
                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl glass text-[#8b5a2b] dark:text-[#d4a373] font-semibold hover:bg-white dark:hover:bg-[#1a120b]/10 transition"
                >
                  <Calendar className="w-4 h-4" /> Demander un rendez-vous
                </button>
              </form>
            </div>

            <div className="glass rounded-3xl p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-[#d4a373]/15 flex items-center justify-center text-[#8b5a2b] dark:text-[#d4a373]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[#6b5a4a] dark:text-[#a89880]">Téléphone</div>
                  <div className="text-[#2a1d13] dark:text-[#f5e9d3] font-semibold">
                    +261 34 46 381 28
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-[#d4a373]/15 flex items-center justify-center text-[#8b5a2b] dark:text-[#d4a373]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[#6b5a4a] dark:text-[#a89880]">Email</div>
                  <div className="text-[#2a1d13] dark:text-[#f5e9d3] font-semibold">
                    contact@harimbola.mg
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-[#d4a373]/15 flex items-center justify-center text-[#8b5a2b] dark:text-[#d4a373]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[#6b5a4a] dark:text-[#a89880]">Adresse</div>
                  <div className="text-[#2a1d13] dark:text-[#f5e9d3] font-semibold">
                    III AB 38 Ter F Andrononobe, Madagascar
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}