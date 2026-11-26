"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function ClickHandler({ onChange }: { onChange: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onChange(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function FlyTo({ center }: { center: [number, number] | null }) {
  const map = useMap();
  if (center) map.flyTo(center, 15);
  return null;
}

type Props = {
  value: { lat: number; lng: number } | null;
  onChange: (v: { lat: number; lng: number }) => void;
  address: string;
  onAddressChange: (v: string) => void;
};

export default function LocationPicker({ value, onChange, address, onAddressChange }: Props) {
  const [satellite, setSatellite] = useState(false);
  const [flyTarget, setFlyTarget] = useState<[number, number] | null>(null);
  const [searching, setSearching] = useState(false);
  const center: [number, number] = value ? [value.lat, value.lng] : [-18.8792, 47.5079];

  const handleSearch = async () => {
    if (!address.trim()) return;
    setSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
      );
      const data = await res.json();
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        setFlyTarget([lat, lon]);
      }
    } catch {
      // ignore
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex gap-2">
        <input
          value={address}
          onChange={(e) => onAddressChange(e.target.value)}
          placeholder="Rechercher une adresse..."
          className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-[#050302] border border-[#e8a0a0]/30 text-sm text-[#2a1d13] dark:text-[#f5e9d3] focus:outline-none focus:border-[#c97b7b]"
        />
        <button
          type="button"
          onClick={handleSearch}
          disabled={searching}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#e8a0a0] to-[#c97b7b] text-white text-sm font-semibold disabled:opacity-50"
        >
          {searching ? "..." : "Rechercher"}
        </button>
      </div>
      <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-[#e8a0a0]/30">
        <button
          type="button"
          onClick={() => setSatellite((v) => !v)}
          className="absolute top-2 right-2 z-[1000] px-3 py-1 rounded-full bg-white/90 dark:bg-[#0a0604]/90 backdrop-blur text-xs font-semibold text-[#2a1d13] dark:text-[#f5e9d3] shadow hover:scale-105 transition"
        >
          {satellite ? "Carte" : "Satellite"}
        </button>
        <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }} scrollWheelZoom={true}>
          {satellite ? (
            <TileLayer
              attribution='&copy; Esri'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          ) : (
            <TileLayer
              attribution='&copy; OpenStreetMap'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          )}
          <ClickHandler onChange={(lat, lng) => onChange({ lat, lng })} />
          {value && <Marker position={[value.lat, value.lng]} icon={icon} />}
          {flyTarget && <FlyTo center={flyTarget} />}
        </MapContainer>
      </div>
      {value && (
        <p className="text-xs text-[#6b5a4a] dark:text-[#a89880]">
          Position: {value.lat.toFixed(5)}, {value.lng.toFixed(5)}
        </p>
      )}
      <p className="text-xs text-[#6b5a4a] dark:text-[#a89880] italic">
        Cliquez sur la carte pour confirmer votre position.
      </p>
    </div>
  );
}