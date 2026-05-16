"use client";
import { useState } from "react";

export default function EmailSignup({ dark = false }: { dark?: boolean }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
        body: JSON.stringify({ name, email }),
      });
      setStatus(res.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return <p className={`font-medium ${dark ? "text-green-400" : "text-green-700"}`}>Takk! Du er meldt på.</p>;
  }

  const inputClass = dark
    ? "w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/50"
    : "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gray-500";

  const labelClass = dark ? "text-white/60" : "text-gray-500";
  const checkboxClass = dark ? "accent-white" : "";

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="Navn"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className={inputClass}
      />
      <input
        type="email"
        placeholder="E-post"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={inputClass}
      />
      <label className={`flex items-start gap-2 text-xs ${labelClass}`}>
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className={`mt-0.5 ${checkboxClass}`}
          required
        />
        Jeg samtykker til lagring av e-postadressen for oppdateringer fra Nattero Arendal (GDPR).
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
        {status === "loading" ? "Sender..." : "Meld meg på"}
      </button>
      {status === "error" && (
        <p className={`text-xs ${dark ? "text-red-400" : "text-red-600"}`}>Noe gikk galt. Prøv igjen.</p>
      )}
    </form>
  );
}
