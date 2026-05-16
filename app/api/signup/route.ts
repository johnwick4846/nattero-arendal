import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json();
    if (!name || !email) {
      return NextResponse.json({ error: "Mangler felt" }, { status: 400 });
    }

    // TODO: Replace with real MailerLite API call
    // const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
    // const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID;
    // await fetch(`https://connect.mailerlite.com/api/subscribers`, {
    //   method: "POST",
    //   headers: {
    //     Authorization: `Bearer ${MAILERLITE_API_KEY}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ email, fields: { name }, groups: [MAILERLITE_GROUP_ID] }),
    // });

    console.log("Signup (prototype):", { name, email });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Feil" }, { status: 500 });
  }
}
