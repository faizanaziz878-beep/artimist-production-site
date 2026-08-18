import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
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
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  published: integer("published", { mode: "boolean" }).notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const teamMembers = sqliteTable("team_members", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  role: text("role").notNull(),
  bio: text("bio").notNull().default(""),
  image: text("image").notNull().default(""),
  linkedin: text("linkedin").notNull().default(""),
  published: integer("published", { mode: "boolean" }).notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const testimonials = sqliteTable("testimonials", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  clientName: text("client_name").notNull(),
  role: text("role").notNull().default(""),
  company: text("company").notNull().default(""),
  rating: integer("rating").notNull().default(5),
  quote: text("quote").notNull(),
  photoKey: text("photo_key").notNull().default(""),
  status: text("status", { enum: ["pending", "published", "rejected"] })
    .notNull()
    .default("pending"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  publishedAt: text("published_at"),
});

export const inquiries = sqliteTable("inquiries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
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
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const siteSettings = sqliteTable("site_settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
