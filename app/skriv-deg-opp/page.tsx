import Link from "next/link";
import EmailSignup from "@/components/EmailSignup";

export default function SkrivDegOpp() {
  return (
    <main className="max-w-xl mx-auto px-6 py-12">
      <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 mb-8 inline-block">← Tilbake</Link>

      <h1 className="text-3xl font-bold mb-4">Skriv deg opp</h1>

      <div className="space-y-4 text-gray-600 text-base leading-relaxed mb-10">
        <p>
          Du trenger ikke gjøre noe mer enn dette: oppgi navn og e-post, og du er med.
          Det er ingen kontingent, ingen forpliktelser og ingen møter.
        </p>
        <p>
          Du viser at du støtter kravet om at politivedtektens § 2-1 skal håndheves likt
          — også i russetiden. Jo flere som skriver seg opp, desto sterkere er argumentet
          overfor politiledelse og bystyre.
        </p>
        <p>
          Du får en e-post hvis det skjer noe vesentlig i saken.
        </p>
      </div>

      <EmailSignup />
    </main>
  );
}
