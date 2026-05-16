import { NextRequest, NextResponse } from "next/server";
import { addHendelse, getHendelser } from "@/lib/db";

export async function GET() {
  const hendelser = getHendelser().filter((h) => h.godkjent && h.samtykke_anonym);
  // Return only anonymous fields
  const anonyme = hendelser.map((h) => ({
    id: h.id,
    dato: h.dato,
    tid_start: h.tid_start,
    tid_slutt: h.tid_slutt,
    adresse: h.adresse,
    type_stoy: h.type_stoy,
    lydniva: h.lydniva,
  }));
  return NextResponse.json(anonyme);
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (!data.samtykke_lagring) {
      return NextResponse.json({ error: "Mangler samtykke" }, { status: 400 });
    }
    const ny = addHendelse(data);
    return NextResponse.json({ ok: true, id: ny.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Feil ved lagring" }, { status: 500 });
  }
}
