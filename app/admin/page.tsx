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
import { asc, desc } from "drizzle-orm";
import { inquiries, projects, siteSettings, teamMembers, testimonials } from "../../db/schema";
import { defaultSettings } from "../../lib/content";
import { isAdminEmail } from "../../lib/admin-auth";
import { getChatGPTUser, chatGPTSignInPath, chatGPTSignOutPath } from "../chatgpt-auth";
import { AdminDashboard } from "./admin-dashboard";
import Link from "next/link";
import type { ReactNode } from "react";

export const dynamic = "force-dynamic";

function AccessShell({ children }: { children: ReactNode }) {
  return (
    <main className="admin-access-page">
      <div className="admin-access-orbit" aria-hidden="true"><i /><i /><i /></div>
      <section className="admin-access-card">
        <span className="admin-brand-mark">A.</span>
        {children}
      </section>
    </main>
  );
}

export default async function AdminPage() {
  const user = await getChatGPTUser();

  // Sign-in with ChatGPT is injected by the OpenAI Sites control plane. On any
  // other host those identity headers never arrive, and the sign-in route does
  // not exist — so explain that rather than redirecting into a dead end.
  if (!user) {
    return (
      <AccessShell>
        <p className="admin-kicker">Protected studio system</p>
        <h1>The control room is not available on this deployment.</h1>
        <p>
          Studio sign-in is provided by the ChatGPT Sites host. This copy of the site is served
          from a different platform, so the control room cannot verify who you are and the
          studio database is not attached.
        </p>
        <p>
          The public site is fully live and reads from the bundled studio content. Open the
          Sites deployment to manage projects, team, testimonials and enquiries.
        </p>
        <div className="admin-access-actions">
          <Link href="/">Return to the site</Link>
          <a href={chatGPTSignInPath("/admin")}>Try studio sign-in</a>
        </div>
      </AccessShell>
    );
  }

  if (!isAdminEmail(user.email)) {
    return (
      <main className="admin-access-page">
        <div className="admin-access-orbit" aria-hidden="true"><i /><i /><i /></div>
        <section className="admin-access-card">
          <span className="admin-brand-mark">A.</span>
          <p className="admin-kicker">Protected studio system</p>
          <h1>This account does not have control-room access.</h1>
          <p>
            You are signed in as <strong>{user.email}</strong>. Access is limited to the Artimist studio owner.
          </p>
          <div className="admin-access-actions">
            <Link href="/">Return to the site</Link>
            <a href={chatGPTSignOutPath("/admin")}>Use another account</a>
          </div>
        </section>
      </main>
    );
  }

  let rows;
  try {
    const { seedStudioContent } = await import("../../lib/seed");
    await seedStudioContent();
    const { getDb } = await import("../../db");
    const db = getDb();
    rows = await Promise.all([
      db.select().from(projects).orderBy(asc(projects.sortOrder), asc(projects.id)),
      db.select().from(teamMembers).orderBy(asc(teamMembers.sortOrder), asc(teamMembers.id)),
      db.select().from(testimonials).orderBy(desc(testimonials.id)),
      db.select().from(inquiries).orderBy(desc(inquiries.id)),
      db.select().from(siteSettings),
    ]);
  } catch {
    return (
      <AccessShell>
        <p className="admin-kicker">Protected studio system</p>
        <h1>The studio database is not attached to this deployment.</h1>
        <p>
          You are signed in as <strong>{user.email}</strong>, but the D1 binding that stores
          projects, team, testimonials and enquiries is unavailable here.
        </p>
        <div className="admin-access-actions">
          <Link href="/">Return to the site</Link>
          <a href={chatGPTSignOutPath("/admin")}>Use another account</a>
        </div>
      </AccessShell>
    );
  }

  const [projectRows, teamRows, testimonialRows, inquiryRows, settingRows] = rows;

  return (
    <AdminDashboard
      user={{ name: user.fullName || user.displayName, email: user.email }}
      projects={projectRows}
      team={teamRows}
      testimonials={testimonialRows}
      inquiries={inquiryRows}
      settings={{
        ...defaultSettings,
        ...Object.fromEntries(settingRows.map((row) => [row.key, row.value])),
      }}
    />
  );
}
