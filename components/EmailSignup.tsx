"use client";
import { useState } from "react";

export default function EmailSignup({ dark = false }: { dark?: boolean }) {
  const [form, setForm] = useState({
    name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    z_i_p: "",
    city: "",
    birth_date: "",
  });
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form }),
      });
      setStatus(res.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return <p className={`font-medium ${dark ? "text-green-400" : "text-green-700"}`}>Takk! Du er skrevet opp.</p>;
  }

  const inputClass = dark
    ? "w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/50"
    : "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gray-500";

  const labelClass = dark ? "text-white/60" : "text-gray-500";
  const checkboxClass = dark ? "accent-white" : "";

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <input type="text" placeholder="Fornavn *" value={form.name} onChange={set("name")} required className={inputClass} />
        <input type="text" placeholder="Etternavn" value={form.last_name} onChange={set("last_name")} className={inputClass} />
      </div>
      <input type="email" placeholder="E-post *" value={form.email} onChange={set("email")} required className={inputClass} />
      <input type="tel" placeholder="Telefon" value={form.phone} onChange={set("phone")} className={inputClass} />
      <input type="text" placeholder="Gateadresse" value={form.address} onChange={set("address")} className={inputClass} />
      <div className="grid grid-cols-2 gap-3">
        <input type="text" placeholder="Postnummer" value={form.z_i_p} onChange={set("z_i_p")} className={inputClass} />
        <input type="text" placeholder="Poststed" value={form.city} onChange={set("city")} className={inputClass} />
      </div>
      <div>
        <label className={`block text-xs mb-1 ${labelClass}`}>Fødselsdato</label>
        <input type="date" value={form.birth_date} onChange={set("birth_date")} className={inputClass} />
      </div>
      <label className={`flex items-start gap-2 text-xs ${labelClass}`}>
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className={`mt-0.5 ${checkboxClass}`}
          required
        />
        Jeg samtykker til lagring av mine opplysninger som støttespiller for Nei til russestøy i Arendal (GDPR).
      </label>
      <button
        type="submit"
        disabled={!consent || status === "loading"}
        className={`w-full py-2.5 rounded-full text-sm font-semibold transition disabled:opacity-40 ${
          dark
            ? "bg-white text-gray-900 hover:bg-gray-100"
            : "bg-gray-900 text-white hover:bg-gray-700"
        }`}
      >
        {status === "loading" ? "Sender..." : "Skriv meg opp"}
      </button>
      {status === "error" && (
        <p className={`text-xs ${dark ? "text-red-400" : "text-red-600"}`}>Noe gikk galt. Prøv igjen.</p>
      )}
    </form>
  );
}
