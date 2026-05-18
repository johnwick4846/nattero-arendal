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

      const map = L.map(mapRef.current!).setView([58.4618, 8.8200], 12);

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

      // Group by approximate location (rounded to ~100m)
      const grouped = new Map<string, typeof hendelser>();
      hendelser
        .filter((h) => h.lat && h.lng)
        .forEach((h) => {
          const key = `${Math.round(h.lat! * 1000) / 1000},${Math.round(h.lng! * 1000) / 1000}`;
          if (!grouped.has(key)) grouped.set(key, []);
          grouped.get(key)!.push(h);
        });

      grouped.forEach((group) => {
        const count = group.length;
        const h0 = group[0];
        const radius = Math.min(8 + count * 4, 28);
        const popup = group
          .map(
            (h) =>
              `<div style="margin-bottom:6px;font-size:13px">
                <strong>${h.dato}</strong> kl. ${h.tid_start}${h.tid_slutt ? "–" + h.tid_slutt : ""}<br/>
                ${h.type_stoy.join(", ")} — <em style="color:#666">${h.lydniva}</em>
              </div>`
          )
          .join("<hr style='margin:4px 0'>");

        const marker = L.circleMarker([h0.lat!, h0.lng!], {
          radius,
          color: "#dc2626",
          fillColor: "#dc2626",
          fillOpacity: 0.7,
          weight: 2,
        }).bindPopup(
          `<div style="min-width:160px"><strong style="font-size:13px">${h0.adresse}${count > 1 ? ` — ${count} hendelser` : ""}</strong><hr style='margin:4px 0'>${popup}</div>`
        );

        if (count > 1) {
          const icon = L.divIcon({
            className: "",
            html: `<div style="width:${radius * 2}px;height:${radius * 2}px;display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;font-size:${count > 9 ? 11 : 13}px;pointer-events:none">${count}</div>`,
            iconSize: [radius * 2, radius * 2],
            iconAnchor: [radius, radius],
          });
          L.marker([h0.lat!, h0.lng!], { icon, interactive: false }).addTo(map);
        }

        marker.addTo(map);
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
