import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const writing = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./docs" }),
  schema: z.object({
    title: z.string().optional().default("Untitled"),
    date: z.string().optional().default(""),
    category: z.string().optional().default("general"),
    summary: z.string().optional().default(""),
    tags: z.array(z.string()).optional().default([]),
    ref: z.string().optional().default(""),
  }),
});

export const collections = { writing };
