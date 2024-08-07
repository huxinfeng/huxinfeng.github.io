import { defineCollection, z } from 'astro:content';

import { SITE } from '@config';

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(['others']),
      ogImage: image()
        .refine(img => img.width >= 1200 && img.height >= 630, {
          message: 'OpenGraph 图像必须至少为 1200 X 630 像素！',
        })
        .or(z.string())
        .optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
    }),
});

export const collections = { blog };
