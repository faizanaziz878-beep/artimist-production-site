import { asc, desc } from "drizzle-orm";
import { inquiries, projects, siteSettings, teamMembers, testimonials } from "../../db/schema";
import { defaultSettings } from "../../lib/content";
import { isAdminEmail } from "../../lib/admin-auth";
import { requireChatGPTUser, chatGPTSignOutPath } from "../chatgpt-auth";
import { AdminDashboard } from "./admin-dashboard";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await requireChatGPTUser("/admin");
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
