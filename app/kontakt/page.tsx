import Link from "next/link";

export default function Kontakt() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 mb-6 inline-block">← Tilbake</Link>
      <h1 className="text-2xl font-bold mb-8">Kontakt</h1>

      <div className="space-y-8 text-sm text-gray-700">
        <section>
          <h2 className="font-semibold text-gray-900 mb-2">Presse og intervjuer</h2>
          <p>
            <a href="mailto:post@neitilrussestoy.no" className="underline">post@neitilrussestoy.no</a>
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-gray-900 mb-2">Slette en innmeldt hendelse</h2>
          <p>
            Send e-post med beskrivelse til{" "}
            <a href="mailto:post@neitilrussestoy.no" className="underline">post@neitilrussestoy.no</a>.
          </p>
        </section>

        <section>
          <Link href="/om" className="underline text-gray-500 hover:text-gray-900">Om initiativet →</Link>
        </section>
      </div>
    </main>
  );
}
