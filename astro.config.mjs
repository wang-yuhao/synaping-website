// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.synaping.com',
  trailingSlash: 'always',
  output: 'static',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'zh', locales: { zh: 'zh-CN', en: 'en', de: 'de' } },
      filter: (page) => !page.includes('/brand/'),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
