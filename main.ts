import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDir: string = path.dirname(fileURLToPath(import.meta.url));
const sourcePath: string = path.join(currentDir, "entry.txt");
const outputDir: string = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const destPath: string = path.join(outputDir, "entry.txt");

const payload: Buffer = fs.readFileSync(sourcePath);
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(destPath, payload);
