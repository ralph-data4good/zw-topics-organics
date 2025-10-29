import { z } from "zod";

// Tag types for topics
export const Tag = z.enum([
  "organics",
  "reuse",
  "reduction",
  "policy",
  "false-solutions"
]);
export type Tag = z.infer<typeof Tag>;

// Directory Entry schema
export const DirectoryEntry = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(["facility", "initiative", "organization"]),
  tags: z.array(Tag),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
    city: z.string().optional(),
    country: z.string(),
  }),
  summary: z.string().optional(),
  website: z.string().url().optional(),
  verified: z.boolean().optional(),
});
export type DirectoryEntry = z.infer<typeof DirectoryEntry>;

// Resource schema
export const Resource = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  topics: z.array(Tag),
  publishDate: z.string(),
  cover: z.string().optional(),
  url: z.string().url().optional(),
  content: z.string().optional(),
});
export type Resource = z.infer<typeof Resource>;

// Campaign schema
export const Campaign = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  ctaLabel: z.string(),
  ctaHref: z.string(),
  stats: z.array(
    z.object({
      label: z.string(),
      value: z.number(),
    })
  ),
  faqs: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    })
  ).optional(),
});
export type Campaign = z.infer<typeof Campaign>;

// Help Desk form schema
export const HelpDeskSubmission = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  organization: z.string().optional(),
  country: z.string().min(2, "Please select a country"),
  topic: Tag,
  message: z.string().min(10, "Message must be at least 10 characters"),
});
export type HelpDeskSubmission = z.infer<typeof HelpDeskSubmission>;

// Calculator types
export interface CalculatorInputs {
  households: number;
  organicsPerHouseholdPerDay: number;
  captureRate: number; // 0-100
}

export interface CalculatorOutputs {
  annualDivertedTonnes: number;
  methaneAvoidedTCO2e: number;
}

