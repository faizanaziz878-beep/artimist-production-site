import "../admin-portal.css";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminUser } from "../../../lib/admin-auth";
import { usingDefaultPassword } from "../../../lib/site-auth";
import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Studio sign-in — Artimist Production",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await getAdminUser()) redirect("/admin");

  return (
    <main className="admin-access-page">
      <div className="admin-access-orbit" aria-hidden="true"><i /><i /><i /></div>
      <section className="admin-access-card">
        <span className="admin-brand-mark">A.</span>
        <p className="admin-kicker">Protected studio system</p>
        <h1>Control room.</h1>
        <p>
          Sign in to manage projects, team, reviews and the client messages left on the site.
        </p>

        <LoginForm />

        {usingDefaultPassword() ? (
          <p className="admin-login-warning">
            This portal is still on its default password. Anyone who guesses it can edit your
            portfolio and read every client message. Set <strong>ADMIN_PASSWORD</strong> in your
            Vercel environment variables to close it.
          </p>
        ) : null}

        <div className="admin-access-actions">
          <Link href="/">Return to the site</Link>
        </div>
      </section>
    </main>
  );
}
