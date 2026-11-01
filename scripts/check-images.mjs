// Fails if any raster image in public/ exceeds the 150 KB budget,
// or if an <img> in src/ lacks width/height/loading.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const MAX = 150 * 1024;
const RASTER = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']);
let failed = false;

function walk(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

for (const f of walk('public')) {
  if (!RASTER.has(extname(f).toLowerCase())) continue;
  const size = statSync(f).size;
  if (size > MAX) {
    console.error('FAIL ' + f + ': ' + (size / 1024).toFixed(1) + ' KB > 150 KB');
    failed = true;
  }
}
for (const f of walk('src').filter((p) => /\.(astro|ts|tsx)$/.test(p))) {
  for (const m of readFileSync(f, 'utf8').matchAll(/<img\b[^>]*>/g)) {
    const tag = m[0];
    if (!/\bwidth=/.test(tag) || !/\bheight=/.test(tag) || !/\bloading=/.test(tag)) {
      console.error('FAIL ' + f + ': <img> needs width, height and loading: ' + tag);
      failed = true;
    }
  }
}
if (failed) process.exit(1);
console.log('image budget OK');
