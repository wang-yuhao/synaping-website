import { getCollection } from 'astro:content';
export async function GET(ctx: { site: URL }) {
  const posts = (await getCollection('insights', (p) => !p.data.draft)).sort((a, b) => +b.data.date - +a.data.date);
  const esc = (s: string) => s.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]!));
  const items = posts.map((p) => {
    const url = new URL((p.data.lang === 'zh' ? '/' : `/${p.data.lang}/`) + `insights/${p.data.slug}/`, ctx.site).href;
    return `<item><title>${esc(p.data.title)}</title><link>${url}</link><guid>${url}</guid><pubDate>${p.data.date.toUTCString()}</pubDate><description>${esc(p.data.description)}</description></item>`;
  }).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Synaping Insights</title><link>${ctx.site.href}</link><description>惟意科技 Synaping</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
