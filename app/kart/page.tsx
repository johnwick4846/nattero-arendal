"use client";
import Link from "next/link";
import HendelseKart from "@/components/HendelseKart";
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

export default function Kart() {
  const [hendelser, setHendelser] = useState<Hendelse[]>([]);

  useEffect(() => {
    fetch("/api/hendelser")
      .then((r) => r.json())
      .then((data: Hendelse[]) => setHendelser(data))
      .catch(() => {});
  }, []);

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 mb-6 inline-block">← Tilbake</Link>
      <h1 className="text-2xl font-bold mb-2">Registrerte hendelser</h1>
      <p className="text-sm text-gray-500 mb-6">
        Viser godkjente og anonymiserte innmeldinger. Kun sted og tid publiseres.
      </p>

      <HendelseKart />

      <div className="mt-8 space-y-3">
        <h2 className="font-semibold text-sm uppercase tracking-wide text-gray-500">Liste</h2>
        {hendelser.length === 0 && (
          <p className="text-sm text-gray-400">Ingen godkjente hendelser ennå.</p>
        )}
        {hendelser.map((h) => (
          <div key={h.id} className="border border-gray-200 rounded-lg p-4 text-sm">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-medium">{h.adresse}</span>
                <span className="text-gray-400 ml-2">{h.dato}, kl. {h.tid_start}{h.tid_slutt ? `–${h.tid_slutt}` : ""}</span>
              </div>
              <span className="text-xs text-gray-400">{h.type_stoy.join(", ")}</span>
            </div>
            <p className="text-gray-500 mt-1">{h.lydniva}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Link href="/meld-inn"
          className="bg-gray-900 text-white px-5 py-3 rounded-lg font-medium hover:bg-gray-700 transition inline-block">
          Registrer en hendelse
        </Link>
      </div>
    </main>
  );
}
