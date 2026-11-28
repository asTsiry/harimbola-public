"use client";

import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap, Polyline } from "react-leaflet";
import { Loader2 } from "lucide-react";
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
  if (center) map.flyTo(center, 18);
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
  const [locating, setLocating] = useState(true);
  const [userPos, setUserPos] = useState<[number, number] | null>(null);
  const locatedRef = useRef(false);
  const [distance, setDistance] = useState<number | null>(null);
  const [distLoading, setDistLoading] = useState(false);
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);
  const [addrDetails, setAddrDetails] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!value) {
      const t = setTimeout(() => {
        setRouteCoords([]);
        setAddrDetails({});
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
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${value.lat}&lon=${value.lng}&addressdetails=1`
          );
          const rd = await r.json();
          const addr = rd?.display_name || "";
          const a = rd?.address || {};
          const details: Record<string, string> = {};
          if (a.suburb || a.neighbourhood) details["Quartier"] = a.suburb || a.neighbourhood;
          if (a.city || a.town || a.village) details["Ville"] = a.city || a.town || a.village;
          if (a.state) details["Région"] = a.state;
          setAddrDetails(details);
          if (addr) onAddressChange(addr);
        } catch {
          setAddrDetails({});
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
  const center: [number, number] = value ? [value.lat, value.lng] : userPos ?? shop;

  // Geolocation on mount
  useEffect(() => {
    if (locatedRef.current) return;
    locatedRef.current = true;
    const apply = (lat: number, lng: number) => {
      setUserPos([lat, lng]);
      if (!value) {
        onChange({ lat, lng });
        setFlyTarget([lat, lng]);
      }
      setLocating(false);
    };
    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => apply(pos.coords.latitude, pos.coords.longitude),
        async () => {
          try {
            const res = await fetch("https://ipapi.co/json/");
            const data = await res.json();
            if (data?.latitude && data?.longitude) {
              apply(data.latitude, data.longitude);
            } else {
              setLocating(false);
            }
          } catch {
            setLocating(false);
          }
        },
        { timeout: 8000 }
      );
    } else {
      // IP fallback
      fetch("https://ipapi.co/json/")
        .then((r) => r.json())
        .then((data) => {
          if (data?.latitude && data?.longitude) apply(data.latitude, data.longitude);
          else setLocating(false);
        })
        .catch(() => setLocating(false));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        {(locating || searching || distLoading) && (
          <div className="absolute inset-0 z-[1001] flex flex-col items-center justify-center bg-white/60 dark:bg-[#0a0604]/60 backdrop-blur-sm">
            <Loader2 className="w-10 h-10 animate-spin text-[#c97b7b] dark:text-[#e8a0a0]" />
            <span className="mt-3 text-sm font-medium text-[#2a1d13] dark:text-[#f5e9d3]">
              {locating
                ? "Localisation en cours..."
                : searching
                ? "Recherche en cours..."
                : "Calcul de la distance..."}
            </span>
          </div>
        )}
        <button
          type="button"
          onClick={() => setSatellite((v) => !v)}
          className="absolute top-2 right-2 z-[1000] px-3 py-1 rounded-full bg-white/90 dark:bg-[#0a0604]/90 backdrop-blur text-xs font-semibold text-[#2a1d13] dark:text-[#f5e9d3] shadow hover:scale-105 transition"
        >
          {satellite ? "Carte" : "Satellite"}
        </button>
        <MapContainer center={center} zoom={18} maxZoom={19} style={{ height: "100%", width: "100%" }} scrollWheelZoom={true}>
          {satellite ? (
            <TileLayer
              attribution='&copy; Esri'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              maxZoom={19}
              maxNativeZoom={19}
            />
          ) : (
            <TileLayer
              attribution='&copy; OpenStreetMap'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              maxZoom={19}
              maxNativeZoom={19}
            />
          )}
          <ClickHandler onChange={(lat, lng) => onChange({ lat, lng })} />
          <ShopMarker position={shop} />
        {value && (
          <Marker
            position={[value.lat, value.lng]}
            icon={icon}
            draggable={true}
            eventHandlers={{
              dragend: (e) => {
                const m = e.target as L.Marker;
                const p = m.getLatLng();
                onChange({ lat: p.lat, lng: p.lng });
              },
            }}
          />
        )}
        {routeCoords.length > 0 && (
          <Polyline
            positions={routeCoords}
            smoothFactor={1.5}
            pathOptions={{
              color: "#3b82f6",
              weight: 5,
              opacity: 0.6,
              lineCap: "round",
              lineJoin: "round",
            }}
          />
        )}
          {flyTarget && <FlyTo center={flyTarget} />}
        </MapContainer>
      </div>
      {value && (
        <p className="text-xs text-[#6b5a4a] dark:text-[#a89880]">
          Position: {value.lat.toFixed(5)}, {value.lng.toFixed(5)}
        </p>
      )}
      {Object.keys(addrDetails).length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(addrDetails).map(([k, v]) => (
            <div key={k} className="bg-[#f0e0d4] dark:bg-[#050302] rounded-lg px-2 py-1.5">
              <div className="text-[9px] uppercase tracking-wide text-[#6b5a4a] dark:text-[#a89880]">
                {k}
              </div>
              <div className="text-xs text-[#2a1d13] dark:text-[#f5e9d3] font-medium truncate">
                {v}
              </div>
            </div>
          ))}
        </div>
      )}
      {value && (
        <p className="text-sm font-semibold text-[#8b5a2b] dark:text-[#d4a373]">
          {distLoading
            ? "Calcul de la distance..."
            : distance != null
            ? `Distance (route): ${distance.toFixed(2)} km`
            : "Distance indisponible"}
        </p>
      )}

    </div>
  );
}