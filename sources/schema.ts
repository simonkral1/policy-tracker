import { z } from "zod";

const priority = z.enum(["core", "secondary", "experimental"]);

export const newsletterSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  rss: z.string().url().nullable(),
  category: z.enum([
    "ai-policy-analysis",
    "technical-safety",
    "eu-policy",
    "us-policy",
    "uk-policy",
    "international",
    "frontier-model-news",
    "general-ai-news",
  ]),
  language: z.string().default("en"),
  priority,
  last_verified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  notes: z.string().optional(),
});

export const newslettersFileSchema = z.object({
  version: z.number(),
  updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  newsletters: z.array(newsletterSchema),
});

export const paperVenueSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  type: z.enum(["conference", "journal", "preprint", "workshop", "forum"]),
  priority,
  last_verified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  notes: z.string().optional(),
});

export const arxivCategorySchema = z.object({
  code: z.string(),
  description: z.string(),
  priority,
});

export const trackedAuthorSchema = z.object({
  name: z.string(),
  affiliation: z.string().optional(),
  url: z.string().url().optional(),
  priority,
  notes: z.string().optional(),
});

export const papersFileSchema = z.object({
  version: z.number(),
  updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  arxiv_categories: z.array(arxivCategorySchema),
  venues: z.array(paperVenueSchema),
  tracked_authors: z.array(trackedAuthorSchema),
  keywords: z.array(z.string()),
});

export const legislativeTargetSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  jurisdiction: z.string(),
  body_type: z.enum([
    "executive",
    "legislature",
    "regulator",
    "intergovernmental",
    "standards-body",
    "portal",
  ]),
  priority,
  last_verified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  search_hints: z.array(z.string()).optional(),
  notes: z.string().optional(),
});

export const legislativeFileSchema = z.object({
  version: z.number(),
  updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  targets: z.array(legislativeTargetSchema),
});

export const personSchema = z.object({
  name: z.string(),
  handle: z.string(),
  platform: z.enum(["twitter-x", "mastodon", "bluesky", "linkedin"]),
  url: z.string().url(),
  affiliation: z.string().optional(),
  priority,
  notes: z.string().optional(),
});

export const peopleFileSchema = z.object({
  version: z.number(),
  updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  people: z.array(personSchema),
});

export const eventSchema = z.object({
  name: z.string(),
  organiser: z.string(),
  url: z.string().url(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  jurisdiction: z.string().optional(),
  notes: z.string().optional(),
});

export const eventsFileSchema = z.object({
  version: z.number(),
  updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  events: z.array(eventSchema),
});

export type Newsletter = z.infer<typeof newsletterSchema>;
export type NewslettersFile = z.infer<typeof newslettersFileSchema>;
export type PapersFile = z.infer<typeof papersFileSchema>;
export type LegislativeFile = z.infer<typeof legislativeFileSchema>;
export type PeopleFile = z.infer<typeof peopleFileSchema>;
export type EventsFile = z.infer<typeof eventsFileSchema>;
