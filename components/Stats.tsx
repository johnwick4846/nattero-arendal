"use client";
import { useEffect, useState } from "react";

interface StatsData {
  totalt: number;
  netter: number;
  politiKontaktet: number;
  vekketNoen: number;
}

// Mock data for prototype — replace with real API call when DB is live
const MOCK: StatsData = {
  totalt: 14,
  netter: 8,
  politiKontaktet: 6,
  vekketNoen: 11,
};

export default function Stats() {
  const [data, setData] = useState<StatsData>(MOCK);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((d) => {
        if (d.totalt > 0) setData(d);
      })
      .catch(() => {});
  }, []);

  const items = [
    { value: data.totalt, label: "registrerte hendelser" },
    { value: data.netter, label: "netter med støy" },
    { value: data.vekketNoen, label: "rapporterte om vekket noen" },
    { value: data.politiKontaktet, label: "kontaktet politiet" },
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
