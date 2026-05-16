import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q");
  if (!q) return NextResponse.json({ error: "Mangler adresse" }, { status: 400 });

  // Append Arendal for better local results
  const query = q.includes("Arendal") ? q : `${q}, Arendal, Norway`;

  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`;
  const res = await fetch(url, {
    headers: { "User-Agent": "NatteroArendal/1.0 (natteroarendal.no)" },
  });
  const data = await res.json();

  if (!data.length) return NextResponse.json({ error: "Ingen treff" }, { status: 404 });

  return NextResponse.json({ lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) });
}
