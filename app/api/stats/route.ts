import { NextResponse } from "next/server";
import { getHendelser } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const hendelser = getHendelser();
  const godkjente = hendelser.filter((h) => h.godkjent);

  const netter = new Set(godkjente.map((h) => h.dato)).size;
  const politiKontaktet = godkjente.filter((h) => h.kontaktet_politiet).length;
  const vekketNoen = godkjente.filter((h) => h.vekket_noen).length;

  return NextResponse.json({
    totalt: godkjente.length,
    netter,
    politiKontaktet,
    vekketNoen,
  });
}
