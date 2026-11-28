"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function ShopMarker({ position }: { position: [number, number] }) {
  const map = useMap();
  const [zoom, setZoom] = useState(() => map.getZoom());
  useMapEvents({
    zoomend() {
      setZoom(map.getZoom());
    },
  });
  const show = zoom >= 14;
  if (!show) return null;
  const scale = Math.max(0.6, Math.min(1.6, zoom / 14));
  const logoSize = Math.round(44 * scale);
  const tail = 16;
  const totalH = logoSize + tail;
  const html = `
    <div style="display:flex;flex-direction:column;align-items:center;">
      <div style="width:${logoSize}px;height:${logoSize}px;border-radius:50%;background:#fff;padding:2px;box-shadow:0 2px 8px rgba(0,0,0,.3);overflow:hidden;">
        <img src="/logo.png" style="width:100%;height:100%;border-radius:50%;object-fit:cover;" />
      </div>
      <div style="width:0;height:0;border-left:${Math.round(6*scale)}px solid transparent;border-right:${Math.round(6*scale)}px solid transparent;border-top:${tail}px solid #fff;margin-top:-1px;filter:drop-shadow(0 2px 4px rgba(0,0,0,.2));"></div>
    </div>`;
  const divIcon = L.divIcon({
    html,
    className: "",
    iconSize: [logoSize, totalH],
    iconAnchor: [logoSize / 2, totalH],
  });
  return <Marker position={position} icon={divIcon} />;
}

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
  onDistanceChange?: (km: number | null) => void;
};

export default function LocationPicker({ value, onChange, address, onAddressChange, onDistanceChange }: Props) {
  const [satellite, setSatellite] = useState(true);
  const [flyTarget, setFlyTarget] = useState<[number, number] | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [distLoading, setDistLoading] = useState(false);
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);
  const [pickedAddress, setPickedAddress] = useState<string>("");

  useEffect(() => {
    if (!value) {
      const t = setTimeout(() => {
        setRouteCoords([]);
        setPickedAddress("");
        setDistance(null);
        onDistanceChange?.(null);
      }, 0);
      return () => clearTimeout(t);
    }
    const shop: [number, number] = [-18.86889, 47.54821];
    let cancelled = false;
    const run = async () => {
      setDistLoading(true);
      try {
        const res = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${shop[1]},${shop[0]};${value.lng},${value.lat}?overview=full&geometries=geojson`
        );
        const data = await res.json();
        if (cancelled) return;
        const d = data?.routes?.[0]?.distance;
        const km = d ? d / 1000 : null;
        setDistance(km);
        onDistanceChange?.(km);
        const coords = data?.routes?.[0]?.geometry?.coordinates;
        if (coords) {
          setRouteCoords(coords.map((c: [number, number]) => [c[1], c[0]]));
        } else {
          setRouteCoords([]);
        }
        // reverse geocode
        try {
          const r = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${value.lat}&lon=${value.lng}`
          );
          const rd = await r.json();
          const addr = rd?.display_name || "";
          setPickedAddress(addr);
          if (addr) onAddressChange(addr);
        } catch {
          setPickedAddress("");
        }
      } catch {
        if (cancelled) return;
        setDistance(null);
        onDistanceChange?.(null);
        setRouteCoords([]);
      } finally {
        if (!cancelled) setDistLoading(false);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [value, onDistanceChange, onAddressChange]);
  const [searching, setSearching] = useState(false);
  const shop: [number, number] = [-18.86889, 47.54821];
  const center: [number, number] = value ? [value.lat, value.lng] : shop;

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
          <ShopMarker position={shop} />
        {value && <Marker position={[value.lat, value.lng]} icon={icon} />}
        {routeCoords.length > 0 && (
          <Polyline positions={routeCoords} pathOptions={{ color: "#ef4444", weight: 4, opacity: 0.85 }} />
        )}
          {flyTarget && <FlyTo center={flyTarget} />}
        </MapContainer>
      </div>
      {value && (
        <p className="text-xs text-[#6b5a4a] dark:text-[#a89880]">
          Position: {value.lat.toFixed(5)}, {value.lng.toFixed(5)}
        </p>
      )}
      <div>
        <label className="text-xs text-[#6b5a4a] dark:text-[#a89880] mb-1 block">
          Adresse détectée
        </label>
        <input
          readOnly
          value={pickedAddress}
          placeholder="Cliquez sur la carte pour détecter l'adresse"
          className="w-full px-3 py-2 rounded-xl bg-[#f0e0d4] dark:bg-[#050302] border border-[#e8a0a0]/30 text-sm text-[#2a1d13] dark:text-[#f5e9d3] focus:outline-none"
        />
      </div>
      {value && (
        <p className="text-sm font-semibold text-[#8b5a2b] dark:text-[#d4a373]">
          {distLoading
            ? "Calcul de la distance..."
            : distance != null
            ? `Distance (route): ${distance.toFixed(2)} km`
            : "Distance indisponible"}
        </p>
      )}
      <p className="text-xs text-[#6b5a4a] dark:text-[#a89880] italic">
        Cliquez sur la carte pour confirmer votre position.
      </p>
    </div>
  );
}