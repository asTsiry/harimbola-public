import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hari'mbola — Pâtisserie artisanale",
  description:
    "Gâteaux personnalisés pour mariage, anniversaire, enfants, Noël, Saint-Valentin. Commandez votre gâteau sur mesure à Madagascar.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-[#fef7f2] text-[#2a1d13] dark:bg-[#0a0604] dark:text-[#f5e9d3]" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}