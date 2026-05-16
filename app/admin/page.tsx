import { getHendelser, godkjennHendelse, slettHendelse } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export default async function Admin() {
  const alle = await getHendelser();
  const ventende = alle.filter((h) => !h.godkjent);
  const godkjente = alle.filter((h) => h.godkjent);

  async function godkjenn(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await godkjennHendelse(id);
    revalidatePath("/admin");
  }

  async function slett(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await slettHendelse(id);
    revalidatePath("/admin");
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-2">Admin — godkjenningskø</h1>
      <p className="text-sm text-gray-500 mb-8">
        Totalt {alle.length} hendelser — {ventende.length} venter på godkjenning.
      </p>

      <section className="mb-12">
        <h2 className="font-semibold mb-4 text-amber-700">Venter på godkjenning ({ventende.length})</h2>
        {ventende.length === 0 && (
          <p className="text-gray-500 text-sm bg-gray-50 rounded-lg p-4">Ingen ventende hendelser.</p>
        )}
        {ventende.map((h) => (
          <div key={h.id} className="border border-amber-200 bg-amber-50 rounded-lg p-5 mb-4 text-sm">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="font-semibold text-base">{h.adresse}</span>
                <div className="text-gray-500 mt-0.5">
                  {h.dato} kl. {h.tid_start}{h.tid_slutt ? `–${h.tid_slutt}` : ""}
                </div>
              </div>
              <span className="text-xs text-gray-400">
                {new Date(h.innsendt).toLocaleDateString("nb-NO", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>

            <div className="space-y-1 mb-3">
              <p><span className="text-gray-400">Støy:</span> {h.type_stoy.join(", ")} — {h.lydniva}</p>
              {h.vekket_noen && (
                <p><span className="text-gray-400">Vekket:</span> {h.hvem_vekket || "ja"}</p>
              )}
              {h.kontaktet_politiet && (
                <p>
                  <span className="text-gray-400">Politiet:</span> {h.hva_skjedde_politi}
                  {h.saksnummer && <span className="ml-1 text-gray-400">(sak: {h.saksnummer})</span>}
                </p>
              )}
              {h.sa_fra_direkte && h.hva_skjedde_direkte && (
                <p><span className="text-gray-400">Sa fra:</span> {h.hva_skjedde_direkte}</p>
              )}
            </div>

            <div className="border-t border-amber-200 pt-3 mt-3 flex justify-between items-center">
              <div className="text-xs text-gray-400">
                <p>{h.navn} &lt;{h.epost}&gt;</p>
                <p>Anonym publisering: {h.samtykke_anonym ? "✓ ja" : "✗ nei"}</p>
                {h.lat && <p className="text-gray-300">📍 {h.lat.toFixed(4)}, {h.lng?.toFixed(4)}</p>}
              </div>
              <div className="flex gap-2">
                <form action={godkjenn}>
                  <input type="hidden" name="id" value={h.id} />
                  <button className="bg-green-700 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-green-800 transition">
                    ✓ Godkjenn
                  </button>
                </form>
                <form action={slett}>
                  <input type="hidden" name="id" value={h.id} />
                  <button className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-xs font-semibold hover:bg-red-200 transition">
                    Slett
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section>
        <h2 className="font-semibold mb-4 text-gray-600">Godkjente ({godkjente.length})</h2>
        {godkjente.length === 0 && (
          <p className="text-gray-500 text-sm">Ingen godkjente hendelser ennå.</p>
        )}
        {godkjente.map((h) => (
          <div key={h.id} className="border border-gray-200 rounded-lg px-4 py-3 mb-2 text-sm text-gray-600 flex justify-between">
            <span><strong>{h.adresse}</strong> — {h.dato} kl. {h.tid_start}</span>
            <form action={slett}>
              <input type="hidden" name="id" value={h.id} />
              <button className="text-xs text-red-400 hover:text-red-600 transition">Slett</button>
            </form>
          </div>
        ))}
      </section>
    </main>
  );
}
