import "./admin-portal.css";
import { asc, desc } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";
import { inquiries, projects, siteSettings, teamMembers, testimonials } from "../../db/schema";
import { defaultProjects, defaultSettings, defaultTeam, defaultTestimonials } from "../../lib/content";
import { getAdminUser } from "../../lib/admin-auth";
import { usingDefaultPassword } from "../../lib/site-auth";
import { AdminDashboard } from "./admin-dashboard";
import { LogoutButton } from "./logout-button";

export const dynamic = "force-dynamic";

const now = "1970-01-01 00:00:00";

/**
 * Bundled studio content shaped like database rows.
 *
 * When no database is attached the control room still opens and shows the live
 * site's content, so the studio can review everything. Saving is what needs
 * storage, and the banner above the dashboard says so.
 */
function bundledRows() {
  return {
    projects: defaultProjects.map((project, index) => ({
      id: index + 1,
      slug: project.slug,
      title: project.title,
      category: project.category,
      summary: project.summary,
      description: project.description,
      image: project.image,
      gallery: JSON.stringify(project.gallery ?? []),
      year: project.year,
      location: project.location,
      services: JSON.stringify(project.services ?? []),
      featured: project.featured,
      published: project.published,
      sortOrder: project.sortOrder,
      createdAt: now,
      updatedAt: now,
    })),
    team: defaultTeam.map((member, index) => ({
      id: index + 1,
      name: member.name,
      role: member.role,
      bio: member.bio,
      image: member.image,
      linkedin: member.linkedin,
      published: member.published,
      sortOrder: member.sortOrder,
      createdAt: now,
      updatedAt: now,
    })),
    testimonials: defaultTestimonials.map((review, index) => ({
      id: review.id ?? index + 1,
      clientName: review.clientName,
      role: review.role,
      company: review.company,
      rating: review.rating,
      quote: review.quote,
      photoKey: review.photoKey,
      status: review.status,
      createdAt: review.createdAt || now,
      publishedAt: review.publishedAt ?? null,
    })),
    inquiries: [],
    settings: { ...defaultSettings } as unknown as Record<string, string>,
  };
}

const emptyVisitors: VisitorStats = {
  available: false,
  totalViews: 0,
  totalVisitors: 0,
  viewsToday: 0,
  visitorsToday: 0,
  views7d: 0,
  visitors7d: 0,
  topPages: [],
  topReferrers: [],
  countries: [],
  devices: [],
  daily: [],
};

/**
 * Visit numbers for the control room.
 *
 * Read straight out of `page_views`, which the tracking endpoint creates on
 * first use. Every failure path returns zeros so the control room still opens
 * when there is no database, no table yet, or no traffic.
 */
async function readVisitorStats(): Promise<VisitorStats> {
  try {
    const { getDb } = await import("../../db");
    const db = getDb();
    const rows = (await db.execute(sql`
      SELECT path, referrer, visitor_id, country, device, created_at FROM page_views
    `)) as unknown as { rows?: VisitRow[] } | VisitRow[];
    const list: VisitRow[] = Array.isArray(rows) ? rows : rows.rows ?? [];
    return summarize(list);
  } catch {
    return emptyVisitors;
  }
}

type VisitRow = {
  path: string;
  referrer: string;
  visitor_id: string;
  country: string;
  device: string;
  created_at: string;
};

function dayKey(value: string): string {
  return (value || "").slice(0, 10);
}

function rank<T extends string>(values: T[], limit: number): Array<{ key: string; views: number }> {
  const counts = new Map<string, number>();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return [...counts.entries()]
    .map(([key, views]) => ({ key, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}

function summarize(list: VisitRow[]): VisitorStats {
  const today = new Date().toISOString().slice(0, 10);
  const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10);

  const todayRows = list.filter((row) => dayKey(row.created_at) === today);
  const weekRows = list.filter((row) => dayKey(row.created_at) >= weekAgo);
  const uniques = (rows: VisitRow[]) => new Set(rows.map((row) => row.visitor_id || `anon-${row.created_at}`)).size;

  // Group referrers by host so one campaign is not spread over many URLs.
  const referrerHost = (value: string) => {
    if (!value) return "";
    try {
      const host = new URL(value).hostname.replace(/^www\./, "");
      return host.endsWith("artimistproductions.com") ? "" : host;
    } catch {
      return value.slice(0, 60);
    }
  };

  const daily: Array<{ day: string; views: number }> = [];
  for (let back = 13; back >= 0; back -= 1) {
    const day = new Date(Date.now() - back * 86400000).toISOString().slice(0, 10);
    daily.push({ day, views: list.filter((row) => dayKey(row.created_at) === day).length });
  }

  return {
    available: true,
    totalViews: list.length,
    totalVisitors: uniques(list),
    viewsToday: todayRows.length,
    visitorsToday: uniques(todayRows),
    views7d: weekRows.length,
    visitors7d: uniques(weekRows),
    topPages: rank(list.map((row) => row.path || "/"), 8).map(({ key, views }) => ({ path: key, views })),
    topReferrers: rank(list.map((row) => referrerHost(row.referrer)).filter(Boolean), 6).map(({ key, views }) => ({ referrer: key, views })),
    countries: rank(list.map((row) => row.country).filter(Boolean), 5).map(({ key, views }) => ({ country: key, views })),
    devices: rank(list.map((row) => row.device).filter(Boolean), 3).map(({ key, views }) => ({ device: key, views })),
    daily,
  };
}

export default async function AdminPage() {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");

  let data = null;
  try {
    const { seedStudioContent } = await import("../../lib/seed");
    await seedStudioContent();
    const { getDb } = await import("../../db");
    const db = getDb();
    const [projectRows, teamRows, testimonialRows, inquiryRows, settingRows] = await Promise.all([
      db.select().from(projects).orderBy(asc(projects.sortOrder), asc(projects.id)),
      db.select().from(teamMembers).orderBy(asc(teamMembers.sortOrder), asc(teamMembers.id)),
      db.select().from(testimonials).orderBy(desc(testimonials.id)),
      db.select().from(inquiries).orderBy(desc(inquiries.id)),
      db.select().from(siteSettings),
    ]);
    data = {
      projects: projectRows,
      team: teamRows,
      testimonials: testimonialRows,
      inquiries: inquiryRows,
      settings: {
        ...defaultSettings,
        ...Object.fromEntries(settingRows.map((row) => [row.key, row.value])),
      } as unknown as Record<string, string>,
    };
  } catch {
    data = null;
  }

  const readOnly = data === null;
  const rows = data ?? bundledRows();

  return (
    <>
      {usingDefaultPassword() ? (
        <div className="admin-alert admin-alert-danger">
          <strong>This portal is still on the default password.</strong>
          <span>
            Anyone who guesses <code>admin</code> / <code>admin</code> can edit your portfolio and
            read every client message. Add <code>ADMIN_PASSWORD</code> in Vercel → Settings →
            Environment Variables, then redeploy.
          </span>
        </div>
      ) : null}

      {readOnly ? (
        <div className="admin-alert">
          <strong>Read-only — no database attached.</strong>
          <span>
            The control room is showing the content bundled with the site. Uploading projects,
            approving reviews and storing client messages all need storage. Create a free Postgres
            store in Vercel → Storage and everything below starts saving.
          </span>
          <Link href="/">Back to site</Link>
        </div>
      ) : null}

      <LogoutButton />

      <AdminDashboard
        user={{ name: user.fullName || user.displayName, email: user.email }}
        projects={rows.projects}
        team={rows.team}
        testimonials={rows.testimonials}
        inquiries={rows.inquiries}
        settings={rows.settings}
      />
    </>
  );
}
