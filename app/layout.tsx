import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nattero Arendal",
  description: "Innbyggerinitiativ for likebehandling av politivedtektens § 2-1 — nattero for alle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nb">
      <body className="min-h-screen bg-white text-gray-900">
        <nav className="border-b border-gray-100 px-6 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link href="/" className="font-semibold text-gray-900 tracking-tight">
              Nattero Arendal
            </Link>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/kart" className="text-gray-500 hover:text-gray-900 transition">Kart</Link>
              <Link href="/meld-inn" className="bg-gray-900 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-700 transition">
                Meld inn hendelse
              </Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
