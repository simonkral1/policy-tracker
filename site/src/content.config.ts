import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const baseSchema = z.object({
  date: z.coerce.date(),
  title: z.string(),
  period_start: z.coerce.date().optional(),
  period_end: z.coerce.date().optional(),
  sources_cited: z.number().optional(),
  editor_note: z.string().optional(),
});

const legislative = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/legislative" }),
  schema: baseSchema.extend({
    type: z.literal("legislative"),
  }),
});

const newsletter = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/newsletter" }),
  schema: baseSchema.extend({
    type: z.literal("newsletter"),
  }),
});

const papers = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/papers" }),
  schema: baseSchema.extend({
    type: z.literal("papers"),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/news" }),
  schema: baseSchema.extend({
    type: z.literal("news"),
  }),
});

// The consolidated weekly digest — the active digest going forward. The other
// four collections remain so the historical archive keeps rendering.
const weekly = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/weekly" }),
  schema: baseSchema.extend({
    type: z.literal("weekly"),
  }),
});

export const collections = {
  legislative,
  newsletter,
  papers,
  news,
  weekly,
};
