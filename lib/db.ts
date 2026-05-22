import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.POSTGRES_URL!);

export interface Hendelse {
  id: string;
  godkjent: boolean;
  innsendt: string;
  dato: string;
  tid_start: string;
  tid_slutt: string;
  adresse: string;
  beskrivelse: string;
  lat: number | null;
  lng: number | null;
  type_stoy: string[];
  lydniva: string;
  vekket_noen: boolean;
  hvem_vekket: string;
  sa_fra_direkte: boolean;
  hva_skjedde_direkte: string;
  kontaktet_politiet: boolean;
  hva_skjedde_politi: string;
  saksnummer: string;
  navn: string;
  epost: string;
  samtykke_anonym: boolean;
  samtykke_lagring: boolean;
}

export async function initDb() {
  await sql`
    CREATE TABLE IF NOT EXISTS hendelser (
      id TEXT PRIMARY KEY,
      godkjent BOOLEAN NOT NULL DEFAULT FALSE,
      innsendt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      dato TEXT NOT NULL,
      tid_start TEXT,
      tid_slutt TEXT,
      adresse TEXT NOT NULL,
      beskrivelse TEXT,
      lat DOUBLE PRECISION,
      lng DOUBLE PRECISION,
      type_stoy TEXT[] NOT NULL DEFAULT '{}',
      lydniva TEXT,
      vekket_noen BOOLEAN NOT NULL DEFAULT FALSE,
      hvem_vekket TEXT,
      sa_fra_direkte BOOLEAN NOT NULL DEFAULT FALSE,
      hva_skjedde_direkte TEXT,
      kontaktet_politiet BOOLEAN NOT NULL DEFAULT FALSE,
      hva_skjedde_politi TEXT,
      saksnummer TEXT,
      navn TEXT NOT NULL,
      epost TEXT NOT NULL,
      samtykke_anonym BOOLEAN NOT NULL DEFAULT FALSE,
      samtykke_lagring BOOLEAN NOT NULL DEFAULT FALSE
    )
  `;
  // Migrations: add columns if they don't exist
  await sql`ALTER TABLE hendelser ADD COLUMN IF NOT EXISTS beskrivelse TEXT`;
  await sql`ALTER TABLE hendelser ADD COLUMN IF NOT EXISTS tid_start TEXT`;
  await sql`
    CREATE TABLE IF NOT EXISTS signups (
      id SERIAL PRIMARY KEY,
      innsendt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      epost TEXT NOT NULL UNIQUE
    )
  `;
}

export async function getHendelser(): Promise<Hendelse[]> {
  await initDb();
  const rows = await sql`SELECT * FROM hendelser ORDER BY innsendt DESC`;
  return rows as Hendelse[];
}

export async function addHendelse(
  data: Omit<Hendelse, "id" | "godkjent" | "innsendt">
): Promise<Hendelse> {
  await initDb();
  const id = Date.now().toString();
  const rows = await sql`
    INSERT INTO hendelser (
      id, dato, tid_start, tid_slutt, adresse, beskrivelse, lat, lng,
      type_stoy, lydniva, vekket_noen, hvem_vekket,
      sa_fra_direkte, hva_skjedde_direkte,
      kontaktet_politiet, hva_skjedde_politi, saksnummer,
      navn, epost, samtykke_anonym, samtykke_lagring
    ) VALUES (
      ${id}, ${data.dato}, ${data.tid_start ?? null}, ${data.tid_slutt ?? null},
      ${data.adresse}, ${data.beskrivelse ?? null}, ${data.lat ?? null}, ${data.lng ?? null},
      ${(data.type_stoy?.length ? data.type_stoy : []) as string[]}, ${data.lydniva ?? null},
      ${data.vekket_noen ?? false}, ${data.hvem_vekket ?? null},
      ${data.sa_fra_direkte ?? false}, ${data.hva_skjedde_direkte ?? null},
      ${data.kontaktet_politiet ?? false}, ${data.hva_skjedde_politi ?? null},
      ${data.saksnummer ?? null},
      ${data.navn}, ${data.epost},
      ${data.samtykke_anonym ?? false}, ${data.samtykke_lagring}
    ) RETURNING *
  `;
  return rows[0] as Hendelse;
}

export async function getTotalSignups(): Promise<number> {
  await initDb();
  const rows = await sql`SELECT COUNT(*) as count FROM signups`;
  return parseInt((rows[0] as { count: string }).count, 10);
}

export async function addSignup(epost: string): Promise<void> {
  await initDb();
  await sql`INSERT INTO signups (epost) VALUES (${epost}) ON CONFLICT (epost) DO NOTHING`;
}

export async function godkjennHendelse(id: string): Promise<boolean> {
  await initDb();
  const rows = await sql`
    UPDATE hendelser SET godkjent = TRUE WHERE id = ${id} RETURNING id
  `;
  return rows.length > 0;
}

export async function slettHendelse(id: string): Promise<boolean> {
  await initDb();
  const rows = await sql`
    DELETE FROM hendelser WHERE id = ${id} RETURNING id
  `;
  return rows.length > 0;
}
