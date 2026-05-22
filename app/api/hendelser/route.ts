import { NextRequest, NextResponse } from "next/server";
import { addHendelse, getHendelser } from "@/lib/db";

export const dynamic = "force-dynamic";

function stripHouseNumber(adresse: string): string {
  return adresse.replace(/\s+\d+[A-Za-z]?\s*$/, "").trim();
}

export async function GET() {
  const hendelser = await getHendelser();
  const godkjente = hendelser.filter((h) => h.godkjent);
  const anonyme = godkjente.map((h) => ({
    id: h.id,
    dato: h.dato,
    gatenavn: stripHouseNumber(h.adresse),
    beskrivelse: h.beskrivelse ?? null,
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
        const query = data.adresse.toLowerCase().includes("arendal")
          ? data.adresse
          : `${data.adresse}, Arendal, Norway`;
        const geo = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`,
          { headers: { "User-Agent": "NatteroArendal/1.0 (natteroarendal.no)" } }
        );
        const geoData = await geo.json();
        if (geoData.length) {
          lat = parseFloat(geoData[0].lat);
          lng = parseFloat(geoData[0].lon);
        }
      } catch { /* ignore geocoding errors */ }
    }

    const ny = await addHendelse({ ...data, lat, lng });
    return NextResponse.json({ ok: true, id: ny.id }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Feil ved lagring" }, { status: 500 });
  }
}
