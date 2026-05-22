import Link from "next/link";

export default function Personvern() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 mb-6 inline-block">← Tilbake</Link>
      <h1 className="text-2xl font-bold mb-8">Personvernerklæring</h1>

      <div className="prose prose-sm text-gray-700 space-y-6">
        <section>
          <h2 className="font-semibold text-base mb-2">Behandlingsansvarlig</h2>
          <p>
            Nei til russestøy i Arendal er et innbyggerinitiativ drevet av Andreas Poléo, Arendal.
            Kontakt: <a href="mailto:post@neitilrussestoy.no" className="underline">post@neitilrussestoy.no</a>
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">Hvilke opplysninger samler vi inn?</h2>
          <p><strong>E-postliste / støttespillere:</strong> Navn og e-postadresse. Brukes kun til oppdateringer om initiativet. Lagres i MailerLite.</p>
          <p className="mt-2"><strong>Hendelsesregistrering:</strong> Dato, adresse og beskrivelse. Navn og e-post samles inn for verifisering og publiseres aldri offentlig. Kun gatenavn (uten husnummer) vises i offentlig oversikt.</p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">Rettslig grunnlag</h2>
          <p>Behandlingen er basert på samtykke (GDPR art. 6 nr. 1 a). Du kan trekke samtykket tilbake når som helst.</p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">Deling av opplysninger</h2>
          <p>Opplysninger deles ikke med tredjeparter, bortsett fra MailerLite for e-postutsendelser. Anonymiserte hendelsesdata (gatenavn, dato, beskrivelse) kan brukes i rapporter til politiet eller kommunen.</p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">Dine rettigheter</h2>
          <p>Du har rett til innsyn, retting og sletting. Send e-post til <a href="mailto:post@neitilrussestoy.no" className="underline">post@neitilrussestoy.no</a>.</p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">Lagringstid</h2>
          <p>E-postadresser beholdes så lenge du er påmeldt. Hendelsesdata beholdes så lenge initiativet er aktivt.</p>
        </section>
      </div>
    </main>
  );
}
