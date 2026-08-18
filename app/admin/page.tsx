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
