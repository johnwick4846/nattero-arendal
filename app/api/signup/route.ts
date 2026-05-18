import { NextRequest, NextResponse } from "next/server";

const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY!;
const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID!;

export async function POST(req: NextRequest) {
  try {
    const { name, last_name, email, phone, address, z_i_p, city, birth_date } = await req.json();
    if (!name || !email) {
      return NextResponse.json({ error: "Mangler felt" }, { status: 400 });
    }

    if (!MAILERLITE_API_KEY || !MAILERLITE_GROUP_ID) {
      console.error("MailerLite env vars mangler");
      return NextResponse.json({ error: "E-posttjeneste ikke konfigurert" }, { status: 500 });
    }

    // Add subscriber to MailerLite
    const mlRes = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MAILERLITE_API_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        fields: {
          name,
          ...(last_name && { last_name }),
          ...(phone && { phone }),
          ...(address && { address }),
          ...(z_i_p && { z_i_p }),
          ...(city && { city }),
          ...(birth_date && { birth_date }),
        },
        groups: [MAILERLITE_GROUP_ID],
      }),
    });

    if (!mlRes.ok) {
      const err = await mlRes.json();
      console.error("MailerLite feil:", err);
      // 409 = already subscribed — treat as OK
      if (mlRes.status !== 409) {
        return NextResponse.json({ error: "Feil ved påmelding" }, { status: 500 });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Serverfeil" }, { status: 500 });
  }
}
