"use client";
import { useState } from "react";
import Link from "next/link";

const noiseTypes = ["Musikk", "Generelt bråk", "Kjøretøy", "Fyrverkeri", "Annet"];

export default function MeldInn() {
  const [form, setForm] = useState({
    dato: "",
    tid_start: "",
    tid_slutt: "",
    adresse: "",
    type_stoy: [] as string[],
    lydniva: "",
    vekket_noen: false,
    hvem_vekket: "",
    sa_fra_direkte: false,
    hva_skjedde_direkte: "",
    kontaktet_politiet: false,
    hva_skjedde_politi: "",
    saksnummer: "",
    navn: "",
    epost: "",
    samtykke_anonym: false,
    samtykke_lagring: false,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  function toggle(field: string, value: string) {
    setForm((f) => {
      const arr = (f as Record<string, unknown>)[field] as string[];
      return {
        ...f,
        [field]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.samtykke_lagring) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/hendelser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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
          Hendelsen er registrert og vil vises på kartet etter godkjenning.
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
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tid og sted */}
        <fieldset className="space-y-3">
          <legend className="font-semibold text-sm uppercase tracking-wide text-gray-500">Tid og sted</legend>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-1">Dato *</label>
              <input type="date" required value={form.dato}
                onChange={(e) => setForm({ ...form, dato: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm mb-1">Starttidspunkt *</label>
              <input type="time" required value={form.tid_start}
                onChange={(e) => setForm({ ...form, tid_start: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1">Slutttidspunkt (hvis kjent)</label>
            <input type="time" value={form.tid_slutt}
              onChange={(e) => setForm({ ...form, tid_slutt: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm mb-1">Adresse eller sted *</label>
            <input type="text" required placeholder="f.eks. Langbrygga, Arendal" value={form.adresse}
              onChange={(e) => setForm({ ...form, adresse: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
          </div>
        </fieldset>

        {/* Type støy */}
        <fieldset className="space-y-2">
          <legend className="font-semibold text-sm uppercase tracking-wide text-gray-500">Type støy *</legend>
          <div className="flex flex-wrap gap-2">
            {noiseTypes.map((t) => (
              <label key={t} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm cursor-pointer transition ${
                form.type_stoy.includes(t) ? "bg-gray-900 text-white border-gray-900" : "border-gray-300 hover:bg-gray-50"
              }`}>
                <input type="checkbox" className="sr-only" checked={form.type_stoy.includes(t)}
                  onChange={() => toggle("type_stoy", t)} />
                {t}
              </label>
            ))}
          </div>
          <div>
            <label className="block text-sm mb-1 mt-3">Omtrentlig lydnivå</label>
            <select value={form.lydniva} onChange={(e) => setForm({ ...form, lydniva: e.target.value })}
              className="border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="">— velg —</option>
              <option>Hørbart, men ikke forstyrrende</option>
              <option>Forstyrrende</option>
              <option>Meget høyt — umulig å sove</option>
            </select>
          </div>
        </fieldset>

        {/* Konsekvenser */}
        <fieldset className="space-y-3">
          <legend className="font-semibold text-sm uppercase tracking-wide text-gray-500">Konsekvenser (valgfritt)</legend>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.vekket_noen}
              onChange={(e) => setForm({ ...form, vekket_noen: e.target.checked })} />
            Noen ble vekket
          </label>
          {form.vekket_noen && (
            <input type="text" placeholder="Hvem? (f.eks. barn, skiftarbeider)" value={form.hvem_vekket}
              onChange={(e) => setForm({ ...form, hvem_vekket: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
          )}
        </fieldset>

        {/* Direkte kontakt */}
        <fieldset className="space-y-3">
          <legend className="font-semibold text-sm uppercase tracking-wide text-gray-500">Sa du fra direkte? (valgfritt)</legend>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.sa_fra_direkte}
              onChange={(e) => setForm({ ...form, sa_fra_direkte: e.target.checked })} />
            Jeg sa fra direkte
          </label>
          {form.sa_fra_direkte && (
            <textarea placeholder="Hva skjedde?" value={form.hva_skjedde_direkte} rows={2}
              onChange={(e) => setForm({ ...form, hva_skjedde_direkte: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
          )}
        </fieldset>

        {/* Politikontakt */}
        <fieldset className="space-y-3">
          <legend className="font-semibold text-sm uppercase tracking-wide text-gray-500">Kontaktet du politiet? (valgfritt)</legend>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.kontaktet_politiet}
              onChange={(e) => setForm({ ...form, kontaktet_politiet: e.target.checked })} />
            Jeg kontaktet politiet
          </label>
          {form.kontaktet_politiet && (
            <div className="space-y-2">
              <textarea placeholder="Hva skjedde?" value={form.hva_skjedde_politi} rows={2}
                onChange={(e) => setForm({ ...form, hva_skjedde_politi: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
              <input type="text" placeholder="Saksnummer (hvis du fikk det)" value={form.saksnummer}
                onChange={(e) => setForm({ ...form, saksnummer: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
            </div>
          )}
        </fieldset>

        {/* Kontaktinfo */}
        <fieldset className="space-y-3">
          <legend className="font-semibold text-sm uppercase tracking-wide text-gray-500">Kontaktinformasjon</legend>
          <p className="text-xs text-gray-500">Publiseres ikke. Brukes kun til verifisering.</p>
          <input type="text" placeholder="Navn *" required value={form.navn}
            onChange={(e) => setForm({ ...form, navn: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
          <input type="email" placeholder="E-post *" required value={form.epost}
            onChange={(e) => setForm({ ...form, epost: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
        </fieldset>

        {/* Samtykke */}
        <fieldset className="space-y-3">
          <legend className="font-semibold text-sm uppercase tracking-wide text-gray-500">Samtykke</legend>
          <label className="flex items-start gap-2 text-sm text-gray-600">
            <input type="checkbox" className="mt-0.5" checked={form.samtykke_anonym}
              onChange={(e) => setForm({ ...form, samtykke_anonym: e.target.checked })} />
            Jeg samtykker til at hendelsen publiseres anonymt på kartet (kun sted og tid vises).
          </label>
          <label className="flex items-start gap-2 text-sm text-gray-600">
            <input type="checkbox" className="mt-0.5" required checked={form.samtykke_lagring}
              onChange={(e) => setForm({ ...form, samtykke_lagring: e.target.checked })} />
            Jeg samtykker til at informasjonen lagres og brukes av prosjekteier for dokumentasjon (GDPR). *
          </label>
        </fieldset>

        <button type="submit" disabled={!form.samtykke_lagring || status === "loading"}
          className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-700 disabled:opacity-50 transition">
          {status === "loading" ? "Sender..." : "Send inn hendelse"}
        </button>
        {status === "error" && <p className="text-red-600 text-sm">Noe gikk galt. Prøv igjen.</p>}
      </form>
    </main>
  );
}
