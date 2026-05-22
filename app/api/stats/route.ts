import { NextResponse } from "next/server";
import { getHendelser, getTotalSignups } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const [hendelser, signups] = await Promise.all([getHendelser(), getTotalSignups()]);
  const godkjente = hendelser.filter((h) => h.godkjent);

  const netter = new Set(godkjente.map((h) => h.dato)).size;
  const politiKontaktet = godkjente.filter((h) => h.kontaktet_politiet).length;

  return NextResponse.json({
    totalt: godkjente.length,
    netter,
    politiKontaktet,
    stottespillere: signups,
  });
}
