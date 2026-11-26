"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#e8a0a0] via-[#c97b7b] to-[#b07a3a] p-10 sm:p-14 text-white shadow-2xl"
        >
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white dark:bg-[#1a120b]/15 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white dark:bg-[#1a120b]/10 blur-2xl" />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight">
                Prêt à créer votre gâteau sur mesure ?
              </h2>
              <p className="mt-3 text-white/85 max-w-md">
                Réservez un rendez-vous et parlons de votre projet. Devis gratuit
                et personnalisé.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-[#1a120b] text-[#c97b7b] dark:text-[#e8a0a0] font-semibold shadow-lg hover:scale-105 transition"
              >
                <Calendar className="w-4 h-4" /> Prendre rendez-vous
              </a>
              <a
                href="#catalogue"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/60 text-white font-semibold hover:bg-white/10 dark:hover:bg-white/10 transition"
              >
                Voir le catalogue <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}