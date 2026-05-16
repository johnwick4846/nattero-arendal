import Link from "next/link";

export default function Kontakt() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 mb-6 inline-block">← Tilbake</Link>
      <h1 className="text-2xl font-bold mb-2">Kontakt og presse</h1>
      <p className="text-gray-500 text-sm mb-10">
        Vi er ikke anonyme. Vi står for det vi mener og er tilgjengelige for spørsmål fra media og andre.
      </p>

      <section className="mb-10">
        <h2 className="font-semibold mb-4">Hvem er vi?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Nattero Arendal er et innbyggerinitiativ startet av <strong>Andreas Poléo</strong>, bosatt i Arendal.
          Initiativet er uavhengig og ikke tilknyttet noe parti eller organisasjon.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Bakgrunnen er enkel: politivedtektens § 2-1 om nattero gjelder for alle som oppholder seg på offentlig sted
          etter kl. 23:00 — uavhengig av årstid eller anledning. Vi krever ikke nye regler. Vi krever at eksisterende
          regler håndheves likt.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-semibold mb-4">For presse og medier</h2>
        <div className="bg-gray-50 rounded-xl p-6 space-y-3">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Initiativtaker</p>
            <p className="font-medium">Andreas Poléo</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">E-post</p>
            <a href="mailto:post@natteroarendal.no" className="text-gray-900 underline">
              post@natteroarendal.no
            </a>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Sted</p>
            <p className="text-gray-700">Arendal, Norge</p>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Vi stiller gjerne opp til intervju, kommenterer statistikk fra hendelsesloggen, og kan dokumentere konkrete
          tilfeller der politiet ikke grep inn.
        </p>
      </section>

      <section>
        <h2 className="font-semibold mb-4">Generelle henvendelser</h2>
        <p className="text-gray-700 mb-4">
          Spørsmål om initiativet, samarbeid, eller om du vil bidra — send e-post til{" "}
          <a href="mailto:post@natteroarendal.no" className="underline">post@natteroarendal.no</a>.
        </p>
        <p className="text-sm text-gray-500">
          Vil du slette en hendelse du har innmeldt, eller trekke tilbake et samtykke? Send e-post med beskrivelse,
          så behandler vi det så raskt vi kan.
        </p>
      </section>
    </main>
  );
}
