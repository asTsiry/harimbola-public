"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

type Option = { value: number | string; label: string };

type Props = {
  options: Option[];
  value: number | string | null;
  onChange: (v: number | string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
};

export default function Dropdown({
  options,
  value,
  onChange,
  placeholder = "Choisir",
  label,
  required = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (wrapRef.current?.contains(target)) return;
      if (popupRef.current?.contains(target)) return;
      setOpen(false);
    };
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    document.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const handleOpen = () => {
    if (open) {
      setOpen(false);
      return;
    }
    const r = wrapRef.current?.getBoundingClientRect();
    if (r) setPos({ top: r.bottom + 6, left: r.left, width: r.width });
    setOpen(true);
  };

  return (
    <div>
      {label && (
        <label className="block text-xs text-[#6b5a4a] dark:text-[#a89880] mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative" ref={wrapRef}>
        <button
          type="button"
          onClick={handleOpen}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-white dark:bg-[#050302] border border-[#e8a0a0]/30 text-sm text-[#2a1d13] dark:text-[#f5e9d3] focus:outline-none focus:border-[#c97b7b] transition"
        >
          <span className={selected ? "" : "text-[#6b5a4a] dark:text-[#a89880]"}>
            {selected ? selected.label : placeholder}
          </span>
          <ChevronDown className={`w-4 h-4 text-[#8b5a2b] dark:text-[#d4a373] transition ${open ? "rotate-180" : ""}`} />
        </button>
        {open &&
          createPortal(
            <motion.div
              ref={popupRef}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              style={{ position: "fixed", top: pos.top, left: pos.left, width: pos.width, zIndex: 9999 }}
              className="rounded-2xl bg-white dark:bg-[#0a0604] border border-[#e8a0a0]/30 shadow-2xl p-1 max-h-48 overflow-y-auto"
            >
              {options.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-sm transition flex items-center justify-between ${
                    o.value === value
                      ? "bg-gradient-to-r from-[#e8a0a0]/20 to-[#c97b7b]/20 text-[#c97b7b] dark:text-[#e8a0a0] font-semibold"
                      : "text-[#2a1d13] dark:text-[#f5e9d3] hover:bg-[#e8a0a0]/10"
                  }`}
                >
                  {o.label}
                  {o.value === value && <Check className="w-4 h-4" />}
                </button>
              ))}
            </motion.div>,
            document.body
          )}
      </div>
    </div>
  );
}