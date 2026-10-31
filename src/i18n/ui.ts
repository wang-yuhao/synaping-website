// UI strings shared by all pages. zh is the source of truth.
export const locales = ['zh', 'en', 'de'] as const;
export type Locale = (typeof locales)[number];
export const htmlLang: Record<Locale, string> = { zh: 'zh-CN', en: 'en', de: 'de' };

/** Pages that exist in German. Every other page links back to the German home. */
export const dePages = new Set(['', 'services/', 'contact/', 'legal/privacy/', 'legal/notice/']);

export function localePath(locale: Locale, slug: string): string {
  const prefix = locale === 'zh' ? '/' : `/${locale}/`;
  return prefix + slug;
}

export const company = {
  legalNameZh: '上海惟意计划科技有限公司',
  legalNameEn: 'Shanghai Weiyi Jihua Technology Co., Ltd.',
  brandZh: '惟意科技',
  brand: 'Synaping',
  icp: '沪ICP备2023014586号-3',
  icpUrl: 'https://beian.miit.gov.cn/',
  email: 'hello@synaping.com',
  phoneCn: '+86 152 2194 8775',
  phoneDe: '+49 174 6279243',
  addressCn: '上海市松江区九亭镇易安小区12号502室',
  addressDe: 'Kidlerstr. 38, München, Deutschland',
  sisterSites: [
    { name: 'Weiyi International 惟意国际', url: 'https://wang-yuhao.github.io/weiyi-international-website/' },
    { name: '惟意留学', url: 'https://weiyiliuxue.com/' },
  ],
};

export const ui = {
  zh: {
    nav: { services: '服务', solution: '欧洲落地包', cases: '案例', labs: '研发实验室', insights: '洞察', about: '关于我们', contact: '联系我们' },
    cta: '预约 30 分钟免费咨询',
    ctaShort: '免费咨询',
    learnMore: '了解更多',
    footerTagline: '连接数据、云与市场',
    footerGroup: '集团品牌',
    footerLegal: '法律信息',
    privacy: '隐私政策',
    notice: '法律声明',
    rights: '保留所有权利',
    skip: '跳到正文',
    langName: '中文',
    menu: '菜单',
  },
  en: {
    nav: { services: 'Services', solution: 'EU Launch Kit', cases: 'Cases', labs: 'Labs', insights: 'Insights', about: 'About', contact: 'Contact' },
    cta: 'Book a free 30-min call',
    ctaShort: 'Free call',
    learnMore: 'Learn more',
    footerTagline: 'Connecting data, cloud and markets',
    footerGroup: 'Group brands',
    footerLegal: 'Legal',
    privacy: 'Privacy policy',
    notice: 'Legal notice',
    rights: 'All rights reserved',
    skip: 'Skip to content',
    langName: 'English',
    menu: 'Menu',
  },
  de: {
    nav: { services: 'Leistungen', solution: 'EU-Launch-Kit', cases: 'Referenzen', labs: 'Labs', insights: 'Insights', about: 'Über uns', contact: 'Kontakt' },
    cta: 'Kostenloses 30-Minuten-Gespräch',
    ctaShort: 'Gespräch buchen',
    learnMore: 'Mehr erfahren',
    footerTagline: 'Daten, Cloud und Märkte verbinden',
    footerGroup: 'Marken der Gruppe',
    footerLegal: 'Rechtliches',
    privacy: 'Datenschutz',
    notice: 'Impressum',
    rights: 'Alle Rechte vorbehalten',
    skip: 'Zum Inhalt springen',
    langName: 'Deutsch',
    menu: 'Menü',
  },
} satisfies Record<Locale, unknown>;
