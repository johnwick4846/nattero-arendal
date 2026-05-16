import { getHendelser, godkjennHendelse, slettHendelse } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export default function Admin() {
  const alle = getHendelser();
  const ventende = alle.filter((h) => !h.godkjent);
  const godkjente = alle.filter((h) => h.godkjent);

  async function godkjenn(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    godkjennHendelse(id);
    revalidatePath("/admin");
  }

  async function slett(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    slettHendelse(id);
    revalidatePath("/admin");
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-2">Admin — godkjenningskø</h1>
      <p className="text-sm text-gray-500 mb-8">
        ⚠️ Prototype: ingen autentisering. Legg til passord før produksjon.
      </p>

      <section className="mb-12">
        <h2 className="font-semibold mb-4">Venter på godkjenning ({ventende.length})</h2>
        {ventende.length === 0 && <p className="text-gray-500 text-sm">Ingen ventende hendelser.</p>}
        {ventende.map((h) => (
          <div key={h.id} className="border border-amber-200 bg-amber-50 rounded-lg p-4 mb-3 text-sm">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="font-medium">{h.adresse}</span>
                <span className="text-gray-500 ml-2">{h.dato} kl. {h.tid_start}–{h.tid_slutt || "?"}</span>
              </div>
              <span className="text-xs text-gray-400">{new Date(h.innsendt).toLocaleDateString("nb-NO")}</span>
            </div>
            <p className="text-gray-700">{h.type_stoy.join(", ")} — {h.lydniva}</p>
            {h.kontaktet_politiet && (
              <p className="text-gray-600 mt-1">Politiet kontaktet: {h.hva_skjedde_politi} {h.saksnummer && `(sak: ${h.saksnummer})`}</p>
            )}
            <p className="text-gray-400 mt-2 text-xs">Innsendt av: {h.navn} &lt;{h.epost}&gt;</p>
            <p className="text-gray-400 text-xs">Anonym publisering: {h.samtykke_anonym ? "ja" : "nei"}</p>
            <div className="flex gap-2 mt-3">
              <form action={godkjenn}>
                <input type="hidden" name="id" value={h.id} />
                <button className="bg-green-700 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-green-800">
                  Godkjenn
                </button>
              </form>
              <form action={slett}>
                <input type="hidden" name="id" value={h.id} />
                <button className="bg-red-100 text-red-700 px-3 py-1.5 rounded text-xs font-medium hover:bg-red-200">
                  Slett
                </button>
              </form>
            </div>
          </div>
        ))}
      </section>

      <section>
        <h2 className="font-semibold mb-4">Godkjente ({godkjente.length})</h2>
        {godkjente.length === 0 && <p className="text-gray-500 text-sm">Ingen godkjente hendelser ennå.</p>}
        {godkjente.map((h) => (
          <div key={h.id} className="border border-gray-200 rounded-lg p-3 mb-2 text-sm text-gray-600">
            {h.dato} kl. {h.tid_start} — {h.adresse}
          </div>
        ))}
      </section>
    </main>
  );
}
