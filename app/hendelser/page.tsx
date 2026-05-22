"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface PublicHendelse {
  id: string;
  dato: string;
  gatenavn: string;
  beskrivelse: string | null;
}

function formatDate(dato: string): string {
  const d = new Date(dato);
  return d.toLocaleDateString("nb-NO", { day: "numeric", month: "long", year: "numeric" });
}

export default function Hendelser() {
  const [hendelser, setHendelser] = useState<PublicHendelse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/hendelser")
      .then((r) => r.json())
      .then((data: PublicHendelse[]) => {
        setHendelser(data.sort((a, b) => b.dato.localeCompare(a.dato)));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Unique nights and street names for summary
  const netter = new Set(hendelser.map((h) => h.dato)).size;
  const gater = new Set(hendelser.map((h) => h.gatenavn)).size;

  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 mb-6 inline-block">← Tilbake</Link>
      <h1 className="text-2xl font-bold mb-2">Registrerte hendelser</h1>
      <p className="text-sm text-gray-500 mb-8">
        Godkjente innmeldinger publiseres anonymt. Kun gatenavn vises — ikke husnummer.
      </p>

      {hendelser.length > 0 && (
        <div className="grid grid-cols-3 gap-px bg-gray-200 rounded-xl overflow-hidden mb-10">
          <div className="bg-white px-6 py-5 text-center">
            <div className="text-3xl font-bold text-gray-900 tabular-nums">{hendelser.length}</div>
            <div className="text-xs text-gray-500 mt-1">hendelser</div>
          </div>
          <div className="bg-white px-6 py-5 text-center">
            <div className="text-3xl font-bold text-gray-900 tabular-nums">{netter}</div>
            <div className="text-xs text-gray-500 mt-1">netter med støy</div>
          </div>
          <div className="bg-white px-6 py-5 text-center">
            <div className="text-3xl font-bold text-gray-900 tabular-nums">{gater}</div>
            <div className="text-xs text-gray-500 mt-1">ulike gater</div>
          </div>
        </div>
      )}

      {loading && (
        <p className="text-sm text-gray-400">Laster hendelser…</p>
      )}

      {!loading && hendelser.length === 0 && (
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <p className="text-gray-500 text-sm mb-4">Ingen godkjente hendelser ennå.</p>
          <Link
            href="/meld-inn"
            className="bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-700 transition"
          >
            Vær den første — registrer en hendelse
          </Link>
        </div>
      )}

      <div className="space-y-4">
        {hendelser.map((h) => (
          <div key={h.id} className="border border-gray-200 rounded-xl p-5">
            <div className="flex items-start justify-between gap-4 mb-2">
              <span className="font-medium text-gray-900">{h.gatenavn}</span>
              <span className="text-xs text-gray-400 whitespace-nowrap">{formatDate(h.dato)}</span>
            </div>
            {h.beskrivelse && (
              <p className="text-sm text-gray-600 leading-relaxed">{h.beskrivelse}</p>
            )}
          </div>
        ))}
      </div>

      {hendelser.length > 0 && (
        <div className="mt-10 pt-8 border-t border-gray-100">
          <Link
            href="/meld-inn"
            className="bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition text-sm"
          >
            Registrer din hendelse
          </Link>
        </div>
      )}
    </main>
  );
}
