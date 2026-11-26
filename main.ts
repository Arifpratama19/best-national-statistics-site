/* NusaStat — main.ts
 * Entry point for the make.fun hand-in. Copies app/ and screenshots/
 * into the output directory and writes dossier.json with buildDossier
 * from vendor/makefun-frontend.ts (the kit's copy, unchanged).
 * Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output.
 * Node 22 stdlib only; deterministic: the same input writes the same bytes. */

import { buildDossier } from "./vendor/makefun-frontend.ts";
import { cp, mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

await mkdir(outDir, { recursive: true });
await cp(join(repoRoot, "app"), join(outDir, "app"), { recursive: true });
await cp(join(repoRoot, "screenshots"), join(outDir, "screenshots"), { recursive: true });

const dossier = buildDossier(outDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
  app_path_max_bytes: 1000,
});

await writeFile(join(outDir, "dossier.json"), dossier);
console.log("Wrote " + join(outDir, "dossier.json") + " (" + dossier.length + " bytes)");
