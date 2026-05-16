"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Mock approved incidents for prototype
const mockHendelser = [
  {
    id: 1,
    dato: "2025-05-14",
    tid_start: "00:30",
    tid_slutt: "03:15",
    adresse: "Langbrygga, Arendal",
    lat: 58.4609,
    lng: 8.7716,
    type_stoy: ["Musikk", "Generelt bråk"],
    lydniva: "Meget høyt — umulig å sove",
  },
  {
    id: 2,
    dato: "2025-05-15",
    tid_start: "01:00",
    tid_slutt: "02:45",
    adresse: "Tyholmen, Arendal",
    lat: 58.4635,
    lng: 8.7721,
    type_stoy: ["Kjøretøy"],
    lydniva: "Forstyrrende",
  },
  {
    id: 3,
    dato: "2025-05-15",
    tid_start: "23:15",
    tid_slutt: "04:00",
    adresse: "Pollen, Arendal",
    lat: 58.4618,
    lng: 8.7698,
    type_stoy: ["Musikk"],
    lydniva: "Meget høyt — umulig å sove",
  },
];

export default function HendelseKart() {
  const [MapComponent, setMapComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    // Dynamically import Leaflet components to avoid SSR issues
    import("react-leaflet").then(({ MapContainer, TileLayer, CircleMarker, Popup }) => {
      function Map() {
        return (
          <MapContainer
            center={[58.4618, 8.7716]}
            zoom={14}
            style={{ height: "500px", width: "100%" }}
            className="rounded-lg"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {mockHendelser.map((h) => (
              <CircleMarker
                key={h.id}
                center={[h.lat, h.lng]}
                radius={10}
                pathOptions={{ color: "#dc2626", fillColor: "#dc2626", fillOpacity: 0.6 }}
              >
                <Popup>
                  <div className="text-sm">
                    <p className="font-semibold">{h.dato} kl. {h.tid_start}–{h.tid_slutt}</p>
                    <p className="text-gray-600">{h.adresse}</p>
                    <p>{h.type_stoy.join(", ")}</p>
                    <p className="text-gray-500 italic">{h.lydniva}</p>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        );
      }
      setMapComponent(() => Map);
    });
  }, []);

  if (!MapComponent) {
    return (
      <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
        Laster kart...
      </div>
    );
  }

  return <MapComponent />;
}
