"use client";
import { useState } from "react";

export default function EmailSignup() {
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
    return <p className="text-green-700 font-medium">Takk! Du er meldt på.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-sm">
      <input
        type="text"
        placeholder="Navn"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
      />
      <input
        type="email"
        placeholder="E-post"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
      />
      <label className="flex items-start gap-2 text-sm text-gray-600">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5"
          required
        />
        Jeg samtykker til at e-postadressen min lagres og brukes til oppdateringer fra Nattero i Arendal (GDPR).
      </label>
      <button
        type="submit"
        disabled={!consent || status === "loading"}
        className="bg-gray-900 text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-700 disabled:opacity-50 transition"
      >
        {status === "loading" ? "Sender..." : "Meld meg på"}
      </button>
      {status === "error" && (
        <p className="text-red-600 text-sm">Noe gikk galt. Prøv igjen.</p>
      )}
    </form>
  );
}
