"use client";
import { useState } from "react";
import Link from "next/link";

export default function MeldInn() {
  const [form, setForm] = useState({
    dato: "",
    adresse: "",
    beskrivelse: "",
    navn: "",
    epost: "",
    samtykke_lagring: false,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.samtykke_lagring) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/hendelser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          type_stoy: [],
          vekket_noen: false,
          sa_fra_direkte: false,
          kontaktet_politiet: false,
          samtykke_anonym: true,
        }),
      });
      setStatus(res.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <main className="max-w-xl mx-auto px-6 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Takk for innmeldingen</h1>
        <p className="text-gray-600 mb-6">
          Hendelsen er registrert og vil vises i oversikten etter gjennomgang.
        </p>
        <Link href="/" className="text-gray-900 underline text-sm">Tilbake til forsiden</Link>
      </main>
    );
  }

  return (
    <main className="max-w-xl mx-auto px-6 py-12">
      <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 mb-6 inline-block">← Tilbake</Link>
      <h1 className="text-2xl font-bold mb-2">Registrer en hendelse</h1>
      <p className="text-sm text-gray-500 mb-8">
        Felter merket med * er påkrevd. Navn og e-post publiseres ikke — de brukes kun til verifisering.
        I den offentlige oversikten vises kun gatenavn, uten nummer.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Eksakt adresse (gate + nummer) *</label>
          <input
            type="text"
            required
            placeholder="f.eks. Torggata 5"
            value={form.adresse}
            onChange={(e) => setForm({ ...form, adresse: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gray-500"
          />
          <p className="text-xs text-gray-400 mt-1">Eksakt adresse lagres internt. Kun gatenavn vises offentlig.</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Hvilken natt *</label>
          <input
            type="date"
            required
            value={form.dato}
            onChange={(e) => setForm({ ...form, dato: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gray-500"
          />
          <p className="text-xs text-gray-400 mt-1">Opplevde du støy over flere netter? Send én innmelding per natt.</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Hva skjedde? *</label>
          <textarea
            required
            rows={4}
            placeholder="Beskriv kort hva som skjedde — hva slags støy, omtrent når, og hvilken virkning det hadde (maks 3–4 setninger)."
            value={form.beskrivelse}
            onChange={(e) => setForm({ ...form, beskrivelse: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gray-500 resize-none"
          />
        </div>

        <fieldset className="space-y-3">
          <legend className="font-medium text-sm">Kontaktinformasjon</legend>
          <p className="text-xs text-gray-500">Publiseres ikke. Brukes kun til verifisering.</p>
          <input
            type="text"
            placeholder="Navn *"
            required
            value={form.navn}
            onChange={(e) => setForm({ ...form, navn: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gray-500"
          />
          <input
            type="email"
            placeholder="E-post *"
            required
            value={form.epost}
            onChange={(e) => setForm({ ...form, epost: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gray-500"
          />
        </fieldset>

        <label className="flex items-start gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            className="mt-0.5"
            required
            checked={form.samtykke_lagring}
            onChange={(e) => setForm({ ...form, samtykke_lagring: e.target.checked })}
          />
          Jeg samtykker til at informasjonen lagres og brukes av initiativtaker for dokumentasjon (GDPR). *
        </label>

        <button
          type="submit"
          disabled={!form.samtykke_lagring || status === "loading"}
          className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-700 disabled:opacity-50 transition"
        >
          {status === "loading" ? "Sender..." : "Send inn hendelse"}
        </button>
        {status === "error" && <p className="text-red-600 text-sm">Noe gikk galt. Prøv igjen.</p>}
      </form>
    </main>
  );
}
