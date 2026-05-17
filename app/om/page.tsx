import Link from "next/link";

export default function Om() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 mb-6 inline-block">← Tilbake</Link>
      <h1 className="text-2xl font-bold mb-8">Om initiativet</h1>

      <div className="space-y-8 text-sm text-gray-700 leading-relaxed">
        <section>
          <p>
            Nattero Arendal dokumenterer brudd på politivedtektens § 2-1 og krever
            at regelen håndheves likt — uavhengig av hvem som lager støy.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base text-gray-900 mb-2">Bakgrunn</h2>
          <p>
            Politivedtektens § 2-1 forbyr støy på offentlig sted mellom kl. 23:00 og 06:00.
            Regelen gjelder russetid på lik linje med alt annet. Vi mener den ikke håndheves deretter,
            og vil dokumentere dette systematisk — med faktagrunnlag som politiledelse og bystyre ikke kan avfeie.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base text-gray-900 mb-2">Initiativtaker</h2>
          <p>
            Andreas Poléo, Arendal.<br />
            Uavhengig initiativ — ikke tilknyttet parti eller organisasjon.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base text-gray-900 mb-2">Kontakt</h2>
          <p>
            <a href="mailto:post@natteroarendal.no" className="underline">post@natteroarendal.no</a>
          </p>
        </section>
      </div>
    </main>
  );
}
