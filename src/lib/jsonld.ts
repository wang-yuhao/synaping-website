// Pure builders for schema.org JSON-LD. No side effects so they can be unit-tested.
import { company, localePath, type Locale } from '../i18n/ui';

type Crumb = { name: string; slug: string };
const lang = (l: Locale) => (l === 'zh' ? 'zh-CN' : l);
const brand = `${company.brandZh} ${company.brand}`;

export function breadcrumbList(locale: Locale, site: URL, crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: new URL(localePath(locale, c.slug), site).href,
    })),
  };
}

export function serviceLd(locale: Locale, site: URL, url: string, s: { title: string; short: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.title,
    description: s.short,
    url,
    inLanguage: lang(locale),
    provider: { '@type': 'Organization', name: brand, url: site.href },
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function articleLd(locale: Locale, site: URL, url: string, p: { title: string; description: string; date: Date | string }) {
  const date = new Date(p.date).toISOString();
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: p.title,
    description: p.description,
    datePublished: date,
    dateModified: date,
    inLanguage: lang(locale),
    mainEntityOfPage: url,
    author: { '@type': 'Organization', name: brand, url: site.href },
    publisher: { '@type': 'Organization', name: brand, logo: { '@type': 'ImageObject', url: new URL('/logo.svg', site).href } },
  };
}

type PageLike = { slug: string; view: string; title: Partial<Record<Locale, string>>; data?: any };

/** All JSON-LD blocks for a page (excluding the sitewide Organization). */
export function pageJsonLd(locale: Locale, site: URL, pg: PageLike, sectionNames: Record<string, string>, homeName: string): object[] {
  const out: object[] = [];
  const url = new URL(localePath(locale, pg.slug), site).href;
  if (pg.slug !== '') {
    const crumbs: Crumb[] = [{ name: homeName, slug: '' }];
    const parts = pg.slug.split('/').filter(Boolean);
    const first = parts[0];
    const stripSfx = (t: string) => t.replace(/ \| .*$/, '');
    if (parts.length > 1 && sectionNames[first]) crumbs.push({ name: sectionNames[first], slug: `${first}/` });
    crumbs.push({ name: stripSfx(pg.title[locale] ?? ''), slug: pg.slug });
    out.push(breadcrumbList(locale, site, crumbs));
  }
  if (pg.view === 'service' && pg.data) {
    const s = pg.data;
    out.push(serviceLd(locale, site, url, { title: s.title[locale], short: s.short[locale] }));
    const faq = s.faq?.[locale];
    if (faq?.length) out.push(faqLd(faq));
  }
  if (pg.view === 'post' && pg.data) {
    out.push(articleLd(locale, site, url, pg.data.data));
  }
  return out;
}
