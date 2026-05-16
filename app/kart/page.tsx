import Link from "next/link";
import HendelseKart from "@/components/HendelseKart";

export default function Kart() {
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
        {[
          { dato: "15. mai 2025", tid: "23:15–04:00", sted: "Pollen", type: "Musikk", nivå: "Meget høyt" },
          { dato: "15. mai 2025", tid: "01:00–02:45", sted: "Tyholmen", type: "Kjøretøy", nivå: "Forstyrrende" },
          { dato: "14. mai 2025", tid: "00:30–03:15", sted: "Langbrygga", type: "Musikk, bråk", nivå: "Meget høyt" },
        ].map((h, i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-4 text-sm">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-medium">{h.sted}</span>
                <span className="text-gray-400 ml-2">{h.dato}, kl. {h.tid}</span>
              </div>
              <span className="text-xs text-gray-400">{h.type}</span>
            </div>
            <p className="text-gray-500 mt-1">{h.nivå}</p>
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
