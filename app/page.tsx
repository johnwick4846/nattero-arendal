import Link from "next/link";
import Stats from "@/components/Stats";

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gray-950 text-white">
        <div className="max-w-4xl mx-auto px-6 pt-20 pb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full mb-8 tracking-wide uppercase">
            Innbyggerinitiativ · Arendal
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-6 max-w-2xl">
            Nattero – også i russetiden
          </h1>
          <p className="text-gray-300 text-lg max-w-xl mb-6 leading-relaxed">
            Vi krever nattero for alle innbyggere i Arendal, selv om det er russetid. Russen skal
            selvfølgelig få feire — uten at det går på bekostning av vanlige folk i deres hjem.
          </p>
          <p className="text-gray-400 text-sm max-w-xl mb-10 italic leading-relaxed">
            «Mellom kl. 23.00 og kl. 06.00 skal ro og orden holdes på offentlig sted
            slik at ingen forstyrres unødig.» — Politivedtektene § 2-1
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/meld-inn"
              className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition text-sm"
            >
              Registrer en hendelse
            </Link>
            <Link
              href="/bli-medlem"
              className="bg-white/15 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/25 transition text-sm"
            >
              Bli medlem
            </Link>
            <Link
              href="/kart"
              className="border border-white/30 text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition text-sm"
            >
              Se kartet
            </Link>
          </div>
        </div>
      </section>

      {/* Om foreningen + stats */}
      <section className="max-w-4xl mx-auto px-6 -mt-6 relative z-10">
        <Stats />
        <div className="mt-8 mb-4">
          <p className="text-gray-700 text-base leading-relaxed max-w-2xl">
            Formålet til foreningen Nattero Arendal er å tale med en samlet stemme på vegne av de som plages av vedvarende støy fra russefeiringen.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-xl font-bold mb-8">Slik virker det</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: "1",
              title: "Du registrerer",
              body: "Fyll ut skjemaet med sted, tid og hva som skjedde.",
            },
            {
              step: "2",
              title: "Vi dokumenterer",
              body: "Godkjente hendelser publiseres anonymt på kartet.",
            },
            {
              step: "3",
              title: "Vi tar det videre",
              body: "Faktagrunnlaget sendes til politiledelse og bystyre.",
            },
          ].map((item) => (
            <div key={item.step} className="bg-gray-50 rounded-xl p-6">
              <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold mb-4">
                {item.step}
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-xl font-bold mb-4">Hvem er dette for?</h2>
          <p className="text-gray-600 text-base leading-relaxed max-w-2xl">
            Målgruppen vår er folk som ønsker å sove godt om natten, og ikke ser noen grunn til at reglene om nattero ikke skal gjelde for russen også, på lik linje med alle andre.
          </p>
        </div>
      </section>

      {/* Take action */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-xl font-bold mb-6">Hva kan du gjøre?</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/meld-inn" className="group border border-gray-200 rounded-xl p-6 hover:border-gray-400 transition">
            <p className="font-semibold mb-1 group-hover:text-gray-700">📝 Registrer en hendelse</p>
            <p className="text-sm text-gray-500">Tar 3 minutter.</p>
          </Link>
          <a
            href="https://www.arendal.kommune.no/politikk/kommunestyre-og-bystyret/"
            target="_blank"
            rel="noopener noreferrer"
            className="group border border-gray-200 rounded-xl p-6 hover:border-gray-400 transition"
          >
            <p className="font-semibold mb-1 group-hover:text-gray-700">🏛️ Kontakt kommunen</p>
            <p className="text-sm text-gray-500">Skriv til Arendal bystyre.</p>
          </a>
          <Link href="/bli-medlem" className="group border border-gray-200 rounded-xl p-6 hover:border-gray-400 transition">
            <p className="font-semibold mb-1 group-hover:text-gray-700">🤝 Bli medlem</p>
            <p className="text-sm text-gray-500">Støtt arbeidet vårt og bidra til at stemmen vår blir tydelig.</p>
          </Link>
          <a
            href="https://natteroarendal.no"
            onClick={(e) => { e.preventDefault(); if (navigator.share) { navigator.share({ title: 'Nattero Arendal', url: 'https://natteroarendal.no' }); } else { navigator.clipboard.writeText('https://natteroarendal.no'); } }}
            className="group border border-gray-200 rounded-xl p-6 hover:border-gray-400 transition cursor-pointer"
          >
            <p className="font-semibold mb-1 group-hover:text-gray-700">📲 Del med en venn</p>
            <p className="text-sm text-gray-500">Spre ordet om Nattero Arendal.</p>
          </a>
        </div>
      </section>

      <footer className="border-t border-gray-100 px-6 py-6">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-between items-center gap-4 text-xs text-gray-400">
          <span>Nattero Arendal - innbyggerinitiativ</span>
          <div className="flex gap-4">
            <Link href="/om" className="hover:text-gray-600">Om</Link>
            <Link href="/kontakt" className="hover:text-gray-600">Kontakt</Link>
            <Link href="/personvern" className="hover:text-gray-600">Personvern</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
