import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const HENDELSER_FILE = path.join(DATA_DIR, "hendelser.json");

export interface Hendelse {
  id: string;
  godkjent: boolean;
  innsendt: string;
  dato: string;
  tid_start: string;
  tid_slutt: string;
  adresse: string;
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

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

export function getHendelser(): Hendelse[] {
  ensureDir();
  if (!fs.existsSync(HENDELSER_FILE)) return [];
  return JSON.parse(fs.readFileSync(HENDELSER_FILE, "utf-8"));
}

export function addHendelse(data: Omit<Hendelse, "id" | "godkjent" | "innsendt">): Hendelse {
  const hendelser = getHendelser();
  const ny: Hendelse = {
    ...data,
    id: Date.now().toString(),
    godkjent: false,
    innsendt: new Date().toISOString(),
  };
  hendelser.push(ny);
  fs.writeFileSync(HENDELSER_FILE, JSON.stringify(hendelser, null, 2));
  return ny;
}

export function godkjennHendelse(id: string): boolean {
  const hendelser = getHendelser();
  const idx = hendelser.findIndex((h) => h.id === id);
  if (idx === -1) return false;
  hendelser[idx].godkjent = true;
  fs.writeFileSync(HENDELSER_FILE, JSON.stringify(hendelser, null, 2));
  return true;
}

export function slettHendelse(id: string): boolean {
  const hendelser = getHendelser();
  const filtered = hendelser.filter((h) => h.id !== id);
  if (filtered.length === hendelser.length) return false;
  fs.writeFileSync(HENDELSER_FILE, JSON.stringify(filtered, null, 2));
  return true;
}
