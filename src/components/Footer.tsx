"use client";

import { Globe, Send, Play, Music } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative border-t border-[#d4a373]/15 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <div className="mb-4">
            <Image
              src="/logo_footer.png"
              alt="Hari'mbola"
              width={160}
              height={68}
              className="object-contain dark:brightness-0 dark:invert"
            />
          </div>
          <p className="text-sm text-[#6b5a4a] dark:text-[#a89880] leading-relaxed">
            Pâtisserie artisanale — gâteaux personnalisés pour toutes vos fêtes.
          </p>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold text-[#2a1d13] dark:text-[#f5e9d3] mb-4">
            Navigation
          </h4>
          <ul className="space-y-2 text-sm text-[#6b5a4a] dark:text-[#a89880]">
            <li><a href="#accueil" className="hover:text-[#8b5a2b] dark:text-[#d4a373]">Accueil</a></li>
            <li><a href="#catalogue" className="hover:text-[#8b5a2b] dark:text-[#d4a373]">Catalogues</a></li>
            <li><a href="#apropos" className="hover:text-[#8b5a2b] dark:text-[#d4a373]">À propos</a></li>
            <li><a href="#contact" className="hover:text-[#8b5a2b] dark:text-[#d4a373]">Nous contacter</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold text-[#2a1d13] dark:text-[#f5e9d3] mb-4">
            Catégories
          </h4>
          <ul className="space-y-2 text-sm text-[#6b5a4a] dark:text-[#a89880]">
            <li>Mariage et Fiançaille</li>
            <li>Anniversaire</li>
            <li>Enfant</li>
            <li>Noël · Valentin</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold text-[#2a1d13] dark:text-[#f5e9d3] mb-4">
            Suivez-nous
          </h4>
          <div className="flex gap-3">
            {[Globe, Send, Play, Music].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-[#8b5a2b] dark:text-[#d4a373] hover:bg-[#d4a373]/20 transition"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-[#d4a373]/10 py-6 text-center text-xs text-[#6b5a4a] dark:text-[#a89880]">
        © 2026 Hari&apos;mbola. Tous droits réservés.
      </div>
    </footer>
  );
}