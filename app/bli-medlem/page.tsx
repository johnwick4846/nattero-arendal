import Link from "next/link";
import EmailSignup from "@/components/EmailSignup";

export default function BliMedlem() {
  return (
    <main className="max-w-xl mx-auto px-6 py-12">
      <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 mb-8 inline-block">← Tilbake</Link>

      <h1 className="text-3xl font-bold mb-4">Bli medlem</h1>

      <div className="space-y-4 text-gray-600 text-base leading-relaxed mb-10">
        <p>
          Nattero Arendal er en forening som jobber for at alle innbyggere skal ha rett til
          nattero — også når det er russetid. Medlemskapet er vår måte å stå samlet på.
        </p>
        <p>
          Som medlem viser du at du støtter kravet om likebehandling, og du får nyhetsbrev
          når det skjer noe nytt i saken.
        </p>
        <p>
          Medlemskontingenten er <strong>30 kr</strong> og går til drift av nettside og
          programvare. Eventuelt overskudd doneres til et formål i tråd med russefeiringen.
        </p>
        <div className="bg-gray-50 rounded-xl p-5 text-sm text-gray-500">
          <p className="font-semibold text-gray-700 mb-1">Betaling</p>
          <p>
            Etter registrering sender du 30 kr til Vipps-nummer{" "}
            <strong className="text-gray-900">[VIPPS-NUMMER]</strong> med melding{" "}
            <em>«Nattero medlem»</em>. Du aktiveres som medlem når betalingen er bekreftet.
          </p>
        </div>
      </div>

      <EmailSignup />
    </main>
  );
}
