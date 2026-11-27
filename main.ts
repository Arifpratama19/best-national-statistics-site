// main.ts — Menyerahkan situs NusaData ke /output (atau MAKEFUN_OUTPUT_DIR).
// Node 22, standard library only. Salinan app/ dan screenshots/ bersifat
// deterministik: entri disalin dalam urutan nama yang terurut.
import { cpSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

function copySorted(src: string, dest: string): void {
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src).sort()) {
    const from = join(src, entry);
    const to = join(dest, entry);
    if (statSync(from).isDirectory()) copySorted(from, to);
    else cpSync(from, to);
  }
}

mkdirSync(outDir, { recursive: true });
// Hapus HANYA isi direktori output — jangan pernah hapus direktorinya sendiri.
for (const entry of readdirSync(outDir)) {
  rmSync(join(outDir, entry), { recursive: true, force: true });
}

copySorted(join(repoRoot, "app"), join(outDir, "app"));
copySorted(join(repoRoot, "screenshots"), join(outDir, "screenshots"));

const dossier = await buildDossier(outDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
writeFileSync(join(outDir, "dossier.json"), dossier);
