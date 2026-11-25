import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDir: string = path.dirname(fileURLToPath(import.meta.url));
const sourcePath: string = path.join(currentDir, "entry.txt");
const outputDir: string = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const destPath: string = path.join(outputDir, "entry.txt");

const payload: Buffer = fs.readFileSync(sourcePath);
const text: string = payload.toString("utf8");
if (text.trim().length === 0) {
  console.error("entry.txt is empty");
  process.exit(1);
}
if (/[\r\n]/.test(text)) {
  console.error("entry.txt must be a single line");
  process.exit(1);
}
if (Array.from(text).length > 140) {
  console.error("entry.txt exceeds 140 characters");
  process.exit(1);
}
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(destPath, payload);
