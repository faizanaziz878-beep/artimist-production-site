import { sql } from "drizzle-orm";
import { boolean, integer, pgTable, serial, text } from "drizzle-orm/pg-core";

// Timestamps stay as text so every existing consumer (admin portal, public
// content mapper, seed) keeps working unchanged after the move off SQLite.
const now = sql`(now()::text)`;

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  summary: text("summary").notNull(),
  description: text("description").notNull().default(""),
  image: text("image").notNull(),
  gallery: text("gallery").notNull().default("[]"),
  year: text("year").notNull().default(""),
  location: text("location").notNull().default(""),
  services: text("services").notNull().default("[]"),
  featured: boolean("featured").notNull().default(false),
  published: boolean("published").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: text("created_at").notNull().default(now),
  updatedAt: text("updated_at").notNull().default(now),
});

export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  bio: text("bio").notNull().default(""),
  image: text("image").notNull().default(""),
  linkedin: text("linkedin").notNull().default(""),
  published: boolean("published").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: text("created_at").notNull().default(now),
  updatedAt: text("updated_at").notNull().default(now),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  clientName: text("client_name").notNull(),
  role: text("role").notNull().default(""),
  company: text("company").notNull().default(""),
  rating: integer("rating").notNull().default(5),
  quote: text("quote").notNull(),
  photoKey: text("photo_key").notNull().default(""),
  status: text("status", { enum: ["pending", "published", "rejected"] })
    .notNull()
    .default("pending"),
  createdAt: text("created_at").notNull().default(now),
  publishedAt: text("published_at"),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull().default(""),
  projectType: text("project_type").notNull(),
  budget: text("budget").notNull().default(""),
  timeline: text("timeline").notNull().default(""),
  message: text("message").notNull(),
  status: text("status", { enum: ["new", "contacted", "closed"] })
    .notNull()
    .default("new"),
  createdAt: text("created_at").notNull().default(now),
});

export const siteSettings = pgTable("site_settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: text("updated_at").notNull().default(now),
});
