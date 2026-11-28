"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type CartItem = {
  id: number;
  titre: string;
  photo: string;
  prix: number;
  qty: number;
  portion: number | null;
  details: string;
  photoPreview: string | null;
  type: "recup" | "livraison";
  date: string;
  time: string;
  contact: string;
  avance: string;
  address: string;
  location: { lat: number; lng: number } | null;
};

type CartCtx = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (index: number) => void;
  clear: () => void;
  count: number;
  total: number;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const addItem = (item: CartItem) => setItems((prev) => [...prev, item]);
  const removeItem = (index: number) =>
    setItems((prev) => prev.filter((_, i) => i !== index));
  const clear = () => setItems([]);
  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.prix * i.qty, 0);
  return (
    <Ctx.Provider value={{ items, addItem, removeItem, clear, count, total }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}