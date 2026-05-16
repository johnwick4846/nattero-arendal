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
            <span className="text-gray-400">ikke bare dem som ikke er i russetiden.</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-xl mb-10 leading-relaxed">
            Politivedtektens § 2-1 er klar: ro og orden på offentlig sted mellom kl. 23:00 og 06:00.
            Vi krever ikke noe nytt. Vi krever at loven håndheves likt for alle.
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
          <p className="text-sm text-gray-500 mt-3">
            Denne bestemmelsen håndheves konsekvent for alle andre. Målet med dette initiativet er at det også skal gjelde under russefeiring.
          </p>
        </div>
      </section>

      {/* Why */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: "⚖️",
              title: "Likebehandling",
              body: "Loven gjelder for alle. Vi krever ikke et unntak — vi krever at unntaket opphører.",
            },
            {
              icon: "📍",
              title: "Dokumentasjon",
              body: "Innbyggere registrerer hendelser. Vi bygger et faktabasert bilde som politikere og politi ikke kan ignorere.",
            },
            {
              icon: "😴",
              title: "Søvn er ikke en luksus",
              body: "Barnefamilier, skiftarbeidere og syke skal ikke måtte tape én måned i året til andres feiring.",
            },
          ].map((item) => (
            <div key={item.title} className="bg-gray-50 rounded-xl p-6">
              <div className="text-2xl mb-3">{item.icon}</div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Email signup */}
      <section className="bg-gray-950 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <div className="md:flex md:items-center md:justify-between gap-12">
            <div className="mb-8 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Hold deg oppdatert</h2>
              <p className="text-gray-400 text-sm max-w-sm">
                Meld deg på e-postlisten. Vi sender oppdateringer når noe skjer — ikke spam.
              </p>
            </div>
            <div className="flex-1 max-w-sm">
              <EmailSignup dark />
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-100 text-center py-6 text-xs text-gray-400">
        Nattero Arendal — innbyggerinitiativ · <Link href="/admin" className="hover:text-gray-600">Admin</Link>
      </footer>
    </main>
  );
}
