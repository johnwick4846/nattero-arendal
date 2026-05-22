"use client";
import { useEffect, useState } from "react";

interface StatsData {
  totalt: number;
  netter: number;
  politiKontaktet: number;
  stottespillere: number;
}

export default function Stats() {
  const [data, setData] = useState<StatsData>({ totalt: 0, netter: 0, politiKontaktet: 0, stottespillere: 0 });

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => {});
  }, []);

  const items = [
    { value: data.totalt, label: "registrerte hendelser" },
    { value: data.netter, label: "netter med støy" },
    { value: data.politiKontaktet, label: "politiet kontaktet" },
    { value: data.stottespillere, label: "støttespillere" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200 rounded-xl overflow-hidden">
      {items.map((item) => (
        <div key={item.label} className="bg-white px-6 py-6 text-center">
          <div className="text-4xl font-bold text-gray-900 tabular-nums">{item.value}</div>
          <div className="text-xs text-gray-500 mt-1 leading-snug">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
