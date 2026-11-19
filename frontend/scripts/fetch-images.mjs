// Downloads HD product photos listed in image-sources.json into public/products/<slug>.jpg
// Usage:  npm run fetch-images      (needs internet; only fills entries that have a URL)
// Use photos you own or are licensed to use (your own shots, supplier photos, or licensed stock).
import { readFile, writeFile } from 'node:fs/promises';

const sources = JSON.parse(await readFile(new URL('../image-sources.json', import.meta.url)));
let ok = 0, skipped = 0, failed = 0;
for (const [slug, url] of Object.entries(sources)) {
  if (!url) { skipped++; continue; }
  try {
    const res = await fetch(url);
    const type = res.headers.get('content-type') || '';
    if (!res.ok || !type.startsWith('image/')) throw new Error(`HTTP ${res.status} ${type}`);
    await writeFile(new URL(`../public/products/${slug}.jpg`, import.meta.url), Buffer.from(await res.arrayBuffer()));
    console.log(`OK    ${slug}`); ok++;
  } catch (e) { console.log(`FAIL  ${slug}: ${e.message}`); failed++; }
}
console.log(`\n${ok} downloaded, ${skipped} skipped (no URL), ${failed} failed`);
