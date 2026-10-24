import { copyFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "docs");

for (const name of ["CNAME", "og.png", "robots.txt", "sitemap.xml"]) {
  copyFileSync(resolve(root, name), resolve(output, name));
}

writeFileSync(resolve(output, ".nojekyll"), "");
