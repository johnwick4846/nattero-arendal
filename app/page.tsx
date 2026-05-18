import Link from "next/link";
import EmailSignup from "@/components/EmailSignup";
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
            Nattero gjelder for alle —<br />
            <span className="text-gray-400">også russen.</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-xl mb-10 leading-relaxed">
            § 2-1 i politivedtekten forbyr støy på offentlig sted mellom kl. 23 og 06 — for alle.
            Vi dokumenterer det som skjer og krever likebehandling.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/meld-inn"
              className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition text-sm"
            >
              Registrer en hendelse
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

      {/* Stats */}
      <section className="max-w-4xl mx-auto px-6 -mt-6 relative z-10">
        <Stats />
      </section>

      {/* Law quote */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-2">
            Politivedtekt § 2-1 — Nattero
          </p>
          <p className="text-gray-800 text-lg italic leading-relaxed">
            «Mellom kl. 23.00 og kl. 06.00 skal ro og orden holdes på offentlig sted
            slik at ingen forstyrres unødig.»
          </p>

        </div>
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
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
              title: "Vi eskalerer",
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
          <h2 className="text-xl font-bold mb-8">Hvem er dette for?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "👨‍👩‍👧", label: "Barnefamilier", desc: "Barn som trenger å sove." },
              { icon: "🏥", label: "Skiftarbeidere", desc: "Med tidlig arbeid neste dag." },
              { icon: "🏠", label: "Fastboende i sentrum", desc: "Nær der russen samles." },
            ].map((item) => (
              <div key={item.label} className="flex gap-4 items-start">
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <p className="font-semibold text-sm">{item.label}</p>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
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
            href="https://politiet.no/tjenester/anmeld/"
            target="_blank"
            rel="noopener noreferrer"
            className="group border border-gray-200 rounded-xl p-6 hover:border-gray-400 transition"
          >
            <p className="font-semibold mb-1 group-hover:text-gray-700">🚔 Anmeld til politiet</p>
            <p className="text-sm text-gray-500">Via politiet.no</p>
          </a>
          <a
            href="https://www.arendal.kommune.no/kontakt-oss/"
            target="_blank"
            rel="noopener noreferrer"
            className="group border border-gray-200 rounded-xl p-6 hover:border-gray-400 transition"
          >
            <p className="font-semibold mb-1 group-hover:text-gray-700">🏛️ Kontakt kommunen</p>
            <p className="text-sm text-gray-500">Skriv til Arendal bystyre.</p>
          </a>
          <Link href="/kart" className="group border border-gray-200 rounded-xl p-6 hover:border-gray-400 transition">
            <p className="font-semibold mb-1 group-hover:text-gray-700">🗺️ Del kartet</p>
            <p className="text-sm text-gray-500">Del med naboer og medier.</p>
          </Link>
        </div>
      </section>

      {/* Press / contact */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="border border-gray-200 rounded-xl p-6 flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Pressekontakt</p>
            <p className="text-gray-600 text-sm">Andreas Poléo, Arendal</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <a
              href="mailto:post@natteroarendal.no"
              className="bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-700 transition text-center"
            >
              post@natteroarendal.no
            </a>
            <Link
              href="/om"
              className="border border-gray-200 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-50 transition text-center"
            >
              Om initiativet
            </Link>
          </div>
        </div>
      </section>

      {/* Email signup */}
      <section className="bg-gray-950 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <div className="md:flex md:items-center md:justify-between gap-12">
            <div className="mb-8 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Bli medlem</h2>
              <p className="text-gray-400 text-sm max-w-sm">
                Støtt initiativet. Du får oppdateringer når noe skjer.
              </p>
            </div>
            <div className="flex-1 max-w-sm">
              <EmailSignup dark />
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-100 px-6 py-6">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-between items-center gap-4 text-xs text-gray-400">
          <span>Nattero Arendal — innbyggerinitiativ</span>
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
