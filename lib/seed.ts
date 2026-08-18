import { and, eq, inArray } from "drizzle-orm";
import { projects, siteSettings, teamMembers, testimonials } from "../db/schema";
import { defaultProjects, defaultSettings, defaultTeam, defaultTestimonials } from "./content";

export async function seedStudioContent() {
  const { getDb } = await import("../db");
  const db = getDb();

  await db
    .update(projects)
    .set({
      slug: "harmonic-horizons",
      title: "Harmonic Horizons",
      location: "Lakeside cultural district",
    })
    .where(eq(projects.slug, "music-campus-for-pakistan"));

  await db
    .insert(projects)
    .values(
      defaultProjects.map((project) => ({
        ...project,
        gallery: JSON.stringify(project.gallery),
        services: JSON.stringify(project.services),
      })),
    )
    .onConflictDoNothing();

  const existingTeam = await db.select({ name: teamMembers.name }).from(teamMembers);
  const existingTeamNames = new Set(existingTeam.map((member) => member.name.toLowerCase()));
  const missingTeam = defaultTeam.filter((member) => !existingTeamNames.has(member.name.toLowerCase()));
  if (missingTeam.length) {
    await db.insert(teamMembers).values(missingTeam);
  }

  const existingReviews = await db.select({ clientName: testimonials.clientName }).from(testimonials);
  const existingReviewNames = new Set(existingReviews.map((review) => review.clientName.toLowerCase()));
  const missingReviews = defaultTestimonials.filter((review) => !existingReviewNames.has(review.clientName.toLowerCase()));
  if (missingReviews.length) {
    await db.insert(testimonials).values(missingReviews.map((review) => ({
      clientName: review.clientName,
      role: review.role,
      company: review.company,
      rating: review.rating,
      quote: review.quote,
      photoKey: review.photoKey,
      status: review.status,
      createdAt: review.createdAt,
      publishedAt: review.publishedAt,
    })));
  }

  // Bring the original seeded record forward without overwriting later admin edits.
  await db
    .update(teamMembers)
    .set({
      role: "Project Lead Architect",
      bio: "Leads architectural projects from early spatial strategy through design development, team coordination and delivery.",
    })
    .where(and(eq(teamMembers.name, "Aden Mansoor"), eq(teamMembers.role, "Studio Collaborator")));

  const legacyPortraits: Record<string, string[]> = {
    "Faizan Aziz": ["/media/team/faizan.webp"],
    "Aden Mansoor": ["/media/team/aden.webp", "/media/team/aden-portrait.webp"],
    "Sufyan Ilyas": ["/media/team/sufyan.webp", "/media/team/sufyan-portrait.webp", "/media/team/sufyan-profile-2026.webp"],
  };

  for (const member of defaultTeam.filter((item) => item.name in legacyPortraits)) {
    await db
      .update(teamMembers)
      .set({ image: member.image })
      .where(and(eq(teamMembers.name, member.name), inArray(teamMembers.image, legacyPortraits[member.name])));
  }

  // Apply the portraits supplied for this refresh so old/mismatched database images
  // cannot reappear on another page.
  const refreshedPortraitNames = new Set([
    "Sufyan Ilyas",
    "Abdur Rehman",
    "Farwa Kashif",
    "Rohma Fatima",
    "Eunica Amir",
    "Shumail",
  ]);
  for (const member of defaultTeam.filter((item) => refreshedPortraitNames.has(item.name))) {
    await db.update(teamMembers).set({ image: member.image }).where(eq(teamMembers.name, member.name));
  }

  // Fill portrait slots that were intentionally left blank in earlier builds.
  for (const member of defaultTeam.filter((item) => Boolean(item.image))) {
    await db
      .update(teamMembers)
      .set({ image: member.image })
      .where(and(eq(teamMembers.name, member.name), eq(teamMembers.image, "")));
  }

  await db
    .update(siteSettings)
    .set({ value: defaultSettings.contactEmail })
    .where(and(eq(siteSettings.key, "contactEmail"), eq(siteSettings.value, "ar.faizan01@gmail.com")));

  await db.update(siteSettings).set({ value: defaultSettings.address }).where(and(eq(siteSettings.key, "address"), eq(siteSettings.value, "Raya DHA, Lahore, Pakistan")));
  await db.update(siteSettings).set({ value: defaultSettings.officePakistan }).where(and(eq(siteSettings.key, "officePakistan"), eq(siteSettings.value, "Raya DHA, Lahore, Pakistan")));

  await db.update(testimonials).set({ company: "Lahore" }).where(eq(testimonials.company, "Pakistan"));

  for (const [key, value] of Object.entries(defaultSettings)) {
    await db.insert(siteSettings).values({ key, value }).onConflictDoNothing();
  }
}
