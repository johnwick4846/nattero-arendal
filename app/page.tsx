import Link from "next/link";
import EmailSignup from "@/components/EmailSignup";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <section className="max-w-2xl mx-auto px-6 pt-16 pb-12">
        <h1 className="text-3xl font-bold mb-4">Nattero i Arendal</h1>
        <p className="text-lg text-gray-700 mb-6">
          Ifølge politivedtektens § 2-1 gjelder nattero mellom kl. 23:00 og 06:00 på offentlig sted — for alle.
          Ikke bare de som ikke er i russetiden.
        </p>
        <p className="text-gray-600 mb-6">
          Dette initiativet handler ikke om å forby russefeiringen. Det handler om likebehandling: at eksisterende
          regelverk håndheves likt uavhengig av hvem som bryter det. Vi krever ikke noe nytt — vi krever at loven
          følges.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-sm font-medium text-amber-800">
            📋 Politivedtekt § 2-1 — Nattero: <em>«Mellom kl. 23.00 og kl. 06.00 skal ro og orden holdes på
            offentlig sted slik at ingen forstyrres unødig.»</em>
          </p>
        </div>

        <div className="flex gap-4 flex-wrap">
          <Link
            href="/meld-inn"
            className="bg-gray-900 text-white px-5 py-3 rounded-lg font-medium hover:bg-gray-700 transition"
          >
            Registrer en hendelse
          </Link>
          <Link
            href="/kart"
            className="border border-gray-300 px-5 py-3 rounded-lg font-medium hover:bg-gray-50 transition"
          >
            Se kartet
          </Link>
        </div>
      </section>

      {/* Email signup */}
      <section className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-2xl mx-auto px-6 py-10">
          <h2 className="text-xl font-semibold mb-2">Hold deg oppdatert</h2>
          <p className="text-gray-600 mb-4 text-sm">
            Meld deg på e-postlisten for oppdateringer om initiativet.
          </p>
          <EmailSignup />
        </div>
      </section>

      {/* Why */}
      <section className="max-w-2xl mx-auto px-6 py-12">
        <h2 className="text-xl font-semibold mb-4">Hvorfor dette initiativet?</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex gap-3">
            <span className="text-gray-400 mt-1">—</span>
            <span>Naboer, barnefamilier, skiftarbeidere og andre mister nattesøvn uten at politiet griper inn.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-gray-400 mt-1">—</span>
            <span>Regelverket finnes allerede. Det er håndhevingen som mangler.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-gray-400 mt-1">—</span>
            <span>Vi dokumenterer hendelsene og krever svar fra kommunen og politiet.</span>
          </li>
        </ul>
      </section>

      <footer className="border-t border-gray-100 text-center py-6 text-xs text-gray-400">
        Nattero i Arendal — innbyggerinitiativ
      </footer>
    </main>
  );
}
