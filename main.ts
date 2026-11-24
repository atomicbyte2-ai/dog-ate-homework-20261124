// dog-ate-homework-20261124 — writes one excuse line to entry.txt.
//
// The grader runs with a read-only /bot, so output goes ONLY to
// MAKEFUN_OUTPUT_DIR (default /output) — never next to this script.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The dog's excuse, in the dog's own voice: a dog who believes it has
// done nothing wrong, reframing the crime as a public service.
const LINE = "I didn't eat the homework, I graded it. It failed.";

// Gate: exactly one line, 1-200 chars, no trailing newline, not blank.
if (
  LINE.length < 1 ||
  LINE.length > 200 ||
  LINE.includes("\n") ||
  LINE.trim().length === 0
) {
  throw new Error("entry line failed gate: must be one line of 1-200 chars");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, "entry.txt");
writeFileSync(outFile, LINE, "utf8");

// Read back and confirm the file holds exactly the gated line —
// no trailing newline, no extra bytes.
if (readFileSync(outFile, "utf8") !== LINE) {
  throw new Error("entry.txt does not match the gated line");
}
