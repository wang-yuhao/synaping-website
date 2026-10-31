// 广告法 absolute-term check for Chinese copy. Exceptions must be reviewed and listed below.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
const banned = ['最', '第一', '顶级', '国家级', '唯一', '首个', '首选', '极致', '绝对', '100%', '万能', '世界级', '全网'];
const allow = ['最近', '最终', '最小权限', '最小化'];
const files = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : /\.(ts|astro|md)$/.test(p) && files.push(p); });
walk('src');
let bad = 0;
for (const f of files) {
  readFileSync(f, 'utf8').split('\n').forEach((line, i) => {
    let l = line; allow.forEach((a) => (l = l.split(a).join('')));
    if (!/[一-鿿]/.test(l)) return;
    for (const w of banned) if (l.includes(w)) { console.error(`${f}:${i + 1}: 广告法 term "${w}": ${line.trim().slice(0, 90)}`); bad++; }
  });
}
if (bad) { console.error(`\n${bad} finding(s). Rephrase, or add a reviewed exception to scripts/ad-law-check.mjs (owner review).`); process.exit(1); }
console.log('ad-law check passed');
