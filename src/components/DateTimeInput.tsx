"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  date: string;
  time: string;
  onDateChange: (v: string) => void;
  onTimeChange: (v: string) => void;
  dateLabel?: string;
  timeLabel?: string;
  required?: boolean;
};

const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const MONTHS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function DateTimeInput({
  date,
  time,
  onDateChange,
  onTimeChange,
  dateLabel = "Date",
  timeLabel = "Heure",
  required = false,
}: Props) {
  const [open, setOpen] = useState<"date" | "time" | null>(null);
  const [viewDate, setViewDate] = useState(() => (date ? new Date(date + "T00:00:00") : new Date()));
  const [calView, setCalView] = useState<"days" | "months" | "years">("days");
  const [yearBase, setYearBase] = useState(() => (date ? new Date(date + "T00:00:00").getFullYear() : new Date().getFullYear()));
  const [mode, setMode] = useState<"hour" | "minute">("hour");
  const [ampm, setAmpm] = useState<"AM" | "PM">(() => {
    const h = time ? parseInt(time.split(":")[0]) : 12;
    return h >= 12 ? "PM" : "AM";
  });

  const dateWrapRef = useRef<HTMLDivElement>(null);
  const timeWrapRef = useRef<HTMLDivElement>(null);
  const datePopupRef = useRef<HTMLDivElement>(null);
  const timePopupRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(null);
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      const wrap = open === "date" ? dateWrapRef.current : timeWrapRef.current;
      const popup = open === "date" ? datePopupRef.current : timePopupRef.current;
      if (wrap && wrap.contains(target)) return;
      if (popup && popup.contains(target)) return;
      setOpen(null);
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

  const selectedDate = date ? new Date(date + "T00:00:00") : null;
  const [h, m] = time ? time.split(":").map(Number) : [12, 0];

  const daysInMonth = useMemo(() => {
    const y = viewDate.getFullYear();
    const mo = viewDate.getMonth();
    const first = new Date(y, mo, 1);
    const last = new Date(y, mo + 1, 0);
    const startDay = (first.getDay() + 6) % 7;
    const days: (Date | null)[] = [];
    for (let i = 0; i < startDay; i++) days.push(null);
    for (let d = 1; d <= last.getDate(); d++) days.push(new Date(y, mo, d));
    return days;
  }, [viewDate]);

  const selectDate = (d: Date) => {
    onDateChange(`${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`);
    setOpen(null);
    setCalView("days");
  };

  const selectHour = (hour12: number) => {
    let hour24 = hour12 % 12;
    if (ampm === "PM") hour24 += 12;
    onTimeChange(`${pad(hour24)}:${pad(m)}`);
    setMode("minute");
  };

  const selectMinute = (minute: number) => {
    onTimeChange(`${pad(h)}:${pad(minute)}`);
    setMode("hour");
    setOpen(null);
  };



  const hourNumbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const minuteNumbers = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
  const radius = 78;
  const center = 96;

  const years = Array.from({ length: 12 }, (_, i) => yearBase - 6 + i);

  return (
    <div className="grid grid-cols-2 gap-3">
      <div>
        <label className="block text-xs text-[#6b5a4a] dark:text-[#a89880] mb-1">
          {dateLabel} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative" ref={dateWrapRef}>
          <input
            type="text"
            value={date}
            onChange={(e) => {
              const v = e.target.value;
              onDateChange(v);
              const d = new Date(v + "T00:00:00");
              if (!isNaN(d.getTime())) setViewDate(d);
            }}
            onFocus={() => {
              if (open !== "date") {
                const r = dateWrapRef.current?.getBoundingClientRect();
                if (r) {
                  const popupH = 340;
                  const below = r.bottom + 8;
                  const above = r.top - popupH - 8;
                  const top = below + popupH > window.innerHeight ? Math.max(8, above) : below;
                  setPos({ top, left: r.left });
                }
                setOpen("date");
                setCalView("days");
                setYearBase(viewDate.getFullYear());
              }
            }}
            placeholder="Choisir une date"
            className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-white dark:bg-[#050302] border border-[#e8a0a0]/30 text-sm text-[#2a1d13] dark:text-[#f5e9d3] focus:outline-none focus:border-[#c97b7b]"
          />
          <button
            type="button"
            onClick={() => {
              if (open === "date") { setOpen(null); return; }
              const r = dateWrapRef.current?.getBoundingClientRect();
              if (r) {
                const popupH = 340;
                const below = r.bottom + 8;
                const above = r.top - popupH - 8;
                const top = below + popupH > window.innerHeight ? Math.max(8, above) : below;
                setPos({ top, left: r.left });
              }
              setOpen("date");
              setCalView("days");
              setYearBase(viewDate.getFullYear());
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-[#e8a0a0]/20 text-[#8b5a2b] dark:text-[#d4a373]"
            aria-label="Ouvrir le calendrier"
          >
            <Calendar className="w-4 h-4" />
          </button>
          {createPortal(
            <AnimatePresence>
              {open === "date" && (
                <motion.div ref={datePopupRef} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }} style={{ position: "fixed", top: pos.top, left: pos.left, zIndex: 9999 }} className="w-72 rounded-2xl bg-white dark:bg-[#0a0604] border border-[#e8a0a0]/30 shadow-2xl p-4">
              {calView === "days" && (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <button
                      type="button"
                      onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}
                      className="p-1.5 rounded-lg hover:bg-[#e8a0a0]/20 text-[#8b5a2b] dark:text-[#d4a373]"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => { setCalView("months"); setYearBase(viewDate.getFullYear()); }}
                      className="font-display font-semibold text-[#2a1d13] dark:text-[#f5e9d3] hover:text-[#c97b7b] dark:hover:text-[#e8a0a0] transition"
                    >
                      {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()} ▾
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}
                      className="p-1.5 rounded-lg hover:bg-[#e8a0a0]/20 text-[#8b5a2b] dark:text-[#d4a373]"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 mb-1">
                    {DAYS.map((d) => (
                      <div key={d} className="text-center text-[10px] text-[#6b5a4a] dark:text-[#a89880] py-1">
                        {d}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {daysInMonth.map((d, idx) => {
                      if (!d) return <div key={idx} />;
                      const isSelected =
                        selectedDate &&
                        d.getDate() === selectedDate.getDate() &&
                        d.getMonth() === selectedDate.getMonth() &&
                        d.getFullYear() === selectedDate.getFullYear();
                      const isToday = d.toDateString() === new Date().toDateString();
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => selectDate(d)}
                          className={`text-xs py-1.5 rounded-lg transition ${
                            isSelected
                              ? "bg-gradient-to-br from-[#e8a0a0] to-[#c97b7b] text-white font-semibold"
                              : isToday
                              ? "border border-[#e8a0a0]/60 text-[#c97b7b] dark:text-[#e8a0a0]"
                              : "text-[#2a1d13] dark:text-[#f5e9d3] hover:bg-[#e8a0a0]/20"
                          }`}
                        >
                          {d.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {calView === "months" && (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <button
                      type="button"
                      onClick={() => setYearBase((y) => y - 1)}
                      className="p-1.5 rounded-lg hover:bg-[#e8a0a0]/20 text-[#8b5a2b] dark:text-[#d4a373]"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setCalView("years")}
                      className="font-display font-semibold text-[#2a1d13] dark:text-[#f5e9d3] hover:text-[#c97b7b] dark:hover:text-[#e8a0a0] transition"
                    >
                      {yearBase} ▾
                    </button>
                    <button
                      type="button"
                      onClick={() => setYearBase((y) => y + 1)}
                      className="p-1.5 rounded-lg hover:bg-[#e8a0a0]/20 text-[#8b5a2b] dark:text-[#d4a373]"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {MONTHS.map((mo, idx) => (
                      <button
                        key={mo}
                        type="button"
                        onClick={() => {
                          setViewDate(new Date(yearBase, idx, 1));
                          setCalView("days");
                        }}
                        className={`text-xs py-1.5 rounded-lg transition ${
                          idx === viewDate.getMonth() && yearBase === viewDate.getFullYear()
                            ? "bg-gradient-to-br from-[#e8a0a0] to-[#c97b7b] text-white font-semibold"
                            : "text-[#2a1d13] dark:text-[#f5e9d3] hover:bg-[#e8a0a0]/20"
                        }`}
                      >
                        {mo.slice(0, 3)}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {calView === "years" && (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <button
                      type="button"
                      onClick={() => setYearBase((y) => y - 12)}
                      className="p-1.5 rounded-lg hover:bg-[#e8a0a0]/20 text-[#8b5a2b] dark:text-[#d4a373]"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="font-display font-semibold text-[#2a1d13] dark:text-[#f5e9d3]">
                      {years[0]} - {years[years.length - 1]}
                    </span>
                    <button
                      type="button"
                      onClick={() => setYearBase((y) => y + 12)}
                      className="p-1.5 rounded-lg hover:bg-[#e8a0a0]/20 text-[#8b5a2b] dark:text-[#d4a373]"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {years.map((yr) => (
                      <button
                        key={yr}
                        type="button"
                        onClick={() => {
                          setYearBase(yr);
                          setViewDate(new Date(yr, viewDate.getMonth(), 1));
                          setCalView("months");
                        }}
                        className={`text-xs py-1.5 rounded-lg transition ${
                          yr === viewDate.getFullYear()
                            ? "bg-gradient-to-br from-[#e8a0a0] to-[#c97b7b] text-white font-semibold"
                            : "text-[#2a1d13] dark:text-[#f5e9d3] hover:bg-[#e8a0a0]/20"
                        }`}
                      >
                        {yr}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
              )}
            </AnimatePresence>
          , document.body)}
        </div>
        {date && isNaN(new Date(date + "T00:00:00").getTime()) && (
          <p className="text-xs text-red-500 mt-1">Date invalide</p>
        )}
      </div>

      <div>
        <label className="block text-xs text-[#6b5a4a] dark:text-[#a89880] mb-1">
          {timeLabel} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative" ref={timeWrapRef}>
          <input
            type="text"
            value={time}
            onChange={(e) => {
              const v = e.target.value;
              onTimeChange(v);
            }}
            onFocus={() => {
              if (open !== "time") {
                const r = timeWrapRef.current?.getBoundingClientRect();
                if (r) {
                  const popupH = 280;
                  const below = r.bottom + 8;
                  const above = r.top - popupH - 8;
                  const top = below + popupH > window.innerHeight ? Math.max(8, above) : below;
                  setPos({ top, left: r.left });
                }
                setOpen("time");
                setMode("hour");
              }
            }}
            placeholder="Choisir l'heure"
            className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-white dark:bg-[#050302] border border-[#e8a0a0]/30 text-sm text-[#2a1d13] dark:text-[#f5e9d3] focus:outline-none focus:border-[#c97b7b]"
          />
          <button
            type="button"
            onClick={() => {
              if (open === "time") { setOpen(null); return; }
              const r = timeWrapRef.current?.getBoundingClientRect();
              if (r) {
                const popupH = 280;
                const below = r.bottom + 8;
                const above = r.top - popupH - 8;
                const top = below + popupH > window.innerHeight ? Math.max(8, above) : below;
                setPos({ top, left: r.left });
              }
              setOpen("time");
              setMode("hour");
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-[#e8a0a0]/20 text-[#8b5a2b] dark:text-[#d4a373]"
            aria-label="Ouvrir l'horloge"
          >
            <Clock className="w-4 h-4" />
          </button>
          {createPortal(
            <AnimatePresence>
              {open === "time" && (
                <motion.div ref={timePopupRef} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }} style={{ position: "fixed", top: pos.top, left: pos.left, zIndex: 9999 }} className="w-52 rounded-2xl bg-white dark:bg-[#0a0604] border border-[#e8a0a0]/30 shadow-2xl p-4 flex flex-col items-center">
              <div className="flex gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setAmpm("AM")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${ampm === "AM" ? "bg-gradient-to-r from-[#e8a0a0] to-[#c97b7b] text-white" : "text-[#6b5a4a] dark:text-[#a89880] hover:bg-[#e8a0a0]/20"}`}
                >
                  AM
                </button>
                <button
                  type="button"
                  onClick={() => setAmpm("PM")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${ampm === "PM" ? "bg-gradient-to-r from-[#e8a0a0] to-[#c97b7b] text-white" : "text-[#6b5a4a] dark:text-[#a89880] hover:bg-[#e8a0a0]/20"}`}
                >
                  PM
                </button>
              </div>
              <div className="text-xs text-[#6b5a4a] dark:text-[#a89880] mb-2">
                {mode === "hour" ? "Choisir l'heure" : "Choisir les minutes"}
              </div>
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 rounded-full border border-[#e8a0a0]/30 bg-[#f0e0d4]/40 dark:bg-[#050302]/60" />
                {(mode === "hour" ? hourNumbers : minuteNumbers).map((num, idx, arr) => {
                  const angle = (idx / arr.length) * 2 * Math.PI - Math.PI / 2;
                  const x = center + radius * Math.cos(angle);
                  const y = center + radius * Math.sin(angle);
                  const isSelected =
                    mode === "hour"
                      ? num % 12 === h % 12
                      : num === m;
                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() =>
                        mode === "hour" ? selectHour(num) : selectMinute(num)
                      }
                      style={{ left: x - 16, top: y - 16 }}
                      className={`absolute z-10 w-8 h-8 rounded-full text-xs font-semibold transition cursor-pointer ${
                        isSelected
                          ? "bg-gradient-to-br from-[#e8a0a0] to-[#c97b7b] text-white"
                          : "text-[#2a1d13] dark:text-[#f5e9d3] hover:bg-[#e8a0a0]/30"
                      }`}
                    >
                      {mode === "minute" ? pad(num) : num}
                    </button>
                  );
                })}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-2 h-2 rounded-full bg-[#c97b7b]" />
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMode(mode === "hour" ? "minute" : "hour")}
                className="mt-3 text-xs text-[#c97b7b] dark:text-[#e8a0a0] hover:underline"
              >
                {mode === "hour" ? "Passer aux minutes" : "Passer aux heures"}
              </button>
            </motion.div>
              )}
            </AnimatePresence>
          , document.body)}
        </div>
        {time && !/^\d{2}:\d{2}$/.test(time) && (
          <p className="text-xs text-red-500 mt-1">Heure invalide</p>
        )}
      </div>
    </div>
  );
}