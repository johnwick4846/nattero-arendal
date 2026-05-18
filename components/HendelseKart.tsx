"use client";
import { useEffect, useRef, useState } from "react";

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



export default function HendelseKart() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);
  const [hendelser, setHendelser] = useState<Hendelse[]>([]);
  const [ready, setReady] = useState(false);

  // Fetch real data
  useEffect(() => {
    fetch("/api/hendelser")
      .then((r) => r.json())
      .then((data: Hendelse[]) => {
        const withCoords = data.filter((h) => h.lat && h.lng);
        setHendelser(withCoords);
      })
      .catch(() => {});
  }, []);

  // Init map once
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    import("leaflet").then((L) => {
      // Fix default icon paths broken by webpack
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current!).setView([58.4618, 8.7716], 14);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      mapInstanceRef.current = map;
      setReady(true);
    });

    return () => {
      if (mapInstanceRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (mapInstanceRef.current as any).remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Add/update markers when data or map is ready
  useEffect(() => {
    if (!ready || !mapInstanceRef.current) return;

    import("leaflet").then((L) => {
      const map = mapInstanceRef.current as ReturnType<typeof L.map>;

      // Remove existing circle markers
      map.eachLayer((layer: unknown) => {
        if ((layer as { options?: { radius?: number } }).options?.radius !== undefined) {
          map.removeLayer(layer as Parameters<typeof map.removeLayer>[0]);
        }
      });

      hendelser
        .filter((h) => h.lat && h.lng)
        .forEach((h) => {
          L.circleMarker([h.lat!, h.lng!], {
            radius: 12,
            color: "#dc2626",
            fillColor: "#dc2626",
            fillOpacity: 0.5,
            weight: 2,
          })
            .bindPopup(
              `<div style="min-width:150px;font-size:13px">
                <strong>${h.dato}</strong><br/>
                kl. ${h.tid_start}${h.tid_slutt ? "–" + h.tid_slutt : ""}<br/>
                ${h.type_stoy.join(", ")}<br/>
                <em style="color:#666">${h.lydniva}</em>
              </div>`
            )
            .addTo(map);
        });
    });
  }, [ready, hendelser]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        crossOrigin=""
      />
      <div
        ref={mapRef}
        style={{ height: "500px", width: "100%" }}
        className="rounded-xl overflow-hidden"
      />
    </>
  );
}
