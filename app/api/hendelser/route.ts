import { NextRequest, NextResponse } from "next/server";
import { addHendelse, getHendelser } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const hendelser = getHendelser().filter((h) => h.godkjent && h.samtykke_anonym);
  const anonyme = hendelser.map((h) => ({
    id: h.id,
    dato: h.dato,
    tid_start: h.tid_start,
    tid_slutt: h.tid_slutt,
    adresse: h.adresse,
    type_stoy: h.type_stoy,
    lydniva: h.lydniva,
    lat: h.lat,
    lng: h.lng,
  }));
  return NextResponse.json(anonyme);
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (!data.samtykke_lagring) {
      return NextResponse.json({ error: "Mangler samtykke" }, { status: 400 });
    }

    // Geocode the address
    let lat: number | null = null;
    let lng: number | null = null;
    if (data.adresse) {
      try {
        const geo = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(data.adresse + ", Arendal, Norway")}&format=json&limit=1`,
          { headers: { "User-Agent": "NatteroArendal/1.0 (natteroarendal.no)" } }
        );
        const geoData = await geo.json();
        if (geoData.length) {
          lat = parseFloat(geoData[0].lat);
          lng = parseFloat(geoData[0].lon);
        }
      } catch { /* ignore geocoding errors */ }
    }

    const ny = addHendelse({ ...data, lat, lng });
    return NextResponse.json({ ok: true, id: ny.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Feil ved lagring" }, { status: 500 });
  }
}
