import { asc, eq } from "drizzle-orm";
import { projects, siteSettings, teamMembers, testimonials } from "../db/schema";
import {
  defaultProjects,
  defaultSettings,
  defaultTeam,
  type Project,
  type SiteSettings,
  type TeamMember,
  type Testimonial,
} from "./content";

function parseList(value: string): string[] {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function cleanPublicPlace(value: string) {
  return value.replace(/,\s*Pakistan\b/gi, "").replace(/^Pakistan$/i, "Lahore");
}

const legacyTeamPortraits: Record<string, string[]> = {
  "Faizan Aziz": ["/media/team/faizan.webp"],
  "Aden Mansoor": ["/media/team/aden.webp", "/media/team/aden-portrait.webp"],
  "Sufyan Ilyas": ["/media/team/sufyan.webp", "/media/team/sufyan-portrait.webp", "/media/team/sufyan-profile-2026.webp"],
};

const currentPortraitNames = new Set([
  "Sufyan Ilyas",
  "Abdur Rehman",
  "Farwa Kashif",
  "Rohma Fatima",
  "Eunica Amir",
  "Shumail",
  "Hamza Rizwan",
]);

export async function getPublicContent(): Promise<{
  projects: Project[];
  team: TeamMember[];
  testimonials: Testimonial[];
  settings: SiteSettings;
}> {
  try {
    const { getDb } = await import("../db");
    const db = getDb();
    const [projectRows, teamRows, testimonialRows, settingRows] = await Promise.all([
      db.select().from(projects).where(eq(projects.published, true)).orderBy(asc(projects.sortOrder)),
      db.select().from(teamMembers).orderBy(asc(teamMembers.sortOrder)),
      db.select().from(testimonials).orderBy(asc(testimonials.id)),
      db.select().from(siteSettings),
    ]);

    const normalizedTeamRows = teamRows.map((member) => {
      const defaultMember = defaultTeam.find((item) => item.name === member.name);
      const legacyPortrait = legacyTeamPortraits[member.name]?.includes(member.image) ?? false;
      return {
        ...member,
        role: member.name === "Aden Mansoor" && member.role === "Studio Collaborator" ? "Project Lead Architect" : member.role,
        bio: member.name === "Aden Mansoor" && member.role === "Studio Collaborator"
          ? "Leads architectural projects from early spatial strategy through design development, team coordination and delivery."
          : member.bio,
        image: defaultMember && (currentPortraitNames.has(member.name) || !member.image || legacyPortrait) ? defaultMember.image : member.image,
      };
    });
    const existingTeamNames = new Set(normalizedTeamRows.map((member) => member.name.toLowerCase()));
    const publicTeam = [
      ...normalizedTeamRows.filter((member) => member.published),
      ...defaultTeam.filter((member) => member.published && !existingTeamNames.has(member.name.toLowerCase())),
    ].sort((a, b) => a.sortOrder - b.sortOrder);

    // Public trust must be real: only records explicitly approved in the database
    // are returned. No anonymous seeded or placeholder testimonials are mixed in.
    const publicTestimonials = testimonialRows
      .filter((review) => review.status === "published")
      .map((review) => ({ ...review, company: cleanPublicPlace(review.company) }));

    const publicProjects = (projectRows.length
      ? projectRows.map((row) => ({ ...row, gallery: parseList(row.gallery), services: parseList(row.services) }))
      : defaultProjects).map((project) => project.slug === "music-campus-for-pakistan"
        ? { ...project, slug: "harmonic-horizons", title: "Harmonic Horizons", location: "Lakeside cultural district" }
        : { ...project, location: cleanPublicPlace(project.location) });

    const publicSettings = {
      ...defaultSettings,
      ...Object.fromEntries(settingRows.map((row) => [
        row.key,
        row.key === "contactEmail" && row.value === "ar.faizan01@gmail.com"
          ? defaultSettings.contactEmail
          : cleanPublicPlace(row.value),
      ])),
    };

    return {
      projects: publicProjects,
      team: publicTeam.length ? publicTeam : defaultTeam,
      testimonials: publicTestimonials,
      settings: publicSettings,
    };
  } catch {
    return {
      projects: defaultProjects,
      team: defaultTeam,
      testimonials: [],
      settings: defaultSettings,
    };
  }
}
