"use client";
import { useEffect, useState } from "react";

interface Hendelse {
  id: string;
  dato: string;
  tid_start: string;
  tid_slutt: string;
  adresse: string;
  type_stoy: string[];
  lydniva: string;
  lat: number | null;
  lng: number | null;
}

// Fallback mock data so the map isn't empty in prototype/demo
const MOCK: Hendelse[] = [
  { id: "m1", dato: "2025-05-14", tid_start: "00:30", tid_slutt: "03:15", adresse: "Langbrygga, Arendal", lat: 58.4609, lng: 8.7716, type_stoy: ["Musikk", "Bråk"], lydniva: "Meget høyt" },
  { id: "m2", dato: "2025-05-15", tid_start: "01:00", tid_slutt: "02:45", adresse: "Tyholmen, Arendal", lat: 58.4635, lng: 8.7721, type_stoy: ["Kjøretøy"], lydniva: "Forstyrrende" },
  { id: "m3", dato: "2025-05-15", tid_start: "23:15", tid_slutt: "04:00", adresse: "Pollen, Arendal", lat: 58.4618, lng: 8.7698, type_stoy: ["Musikk"], lydniva: "Meget høyt" },
];

export default function HendelseKart() {
  const [hendelser, setHendelser] = useState<Hendelse[]>(MOCK);
  const [MapComponent, setMapComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    fetch("/api/hendelser")
      .then((r) => r.json())
      .then((data: Hendelse[]) => {
        const withCoords = data.filter((h) => h.lat && h.lng);
        if (withCoords.length > 0) setHendelser(withCoords);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    import("react-leaflet").then(({ MapContainer, TileLayer, CircleMarker, Popup }) => {
      const data = hendelser;
      function Map() {
        return (
          <MapContainer
            center={[58.4618, 8.7716]}
            zoom={14}
            style={{ height: "500px", width: "100%" }}
            className="rounded-xl"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {data.map((h) => (
              <CircleMarker
                key={h.id}
                center={[h.lat!, h.lng!]}
                radius={12}
                pathOptions={{ color: "#dc2626", fillColor: "#dc2626", fillOpacity: 0.5, weight: 2 }}
              >
                <Popup>
                  <div className="text-sm min-w-[160px]">
                    <p className="font-semibold">{h.dato}</p>
                    <p className="text-gray-600">kl. {h.tid_start}{h.tid_slutt ? `–${h.tid_slutt}` : ""}</p>
                    <p className="mt-1">{h.type_stoy.join(", ")}</p>
                    <p className="text-gray-500 italic text-xs mt-1">{h.lydniva}</p>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        );
      }
      setMapComponent(() => Map);
    });
  }, [hendelser]);

  if (!MapComponent) {
    return <div className="h-96 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">Laster kart...</div>;
  }

  return <MapComponent />;
}
