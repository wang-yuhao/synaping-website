import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const insights = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/insights' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    lang: z.enum(['zh', 'en']),
    date: z.coerce.date(),
    draft: z.boolean().default(true),
  }),
});
export const collections = { insights };
