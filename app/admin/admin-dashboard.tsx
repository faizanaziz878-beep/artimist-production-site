"use client";

import { type FormEvent, useMemo, useState } from "react";
import Link from "next/link";

type Tab = "overview" | "projects" | "team" | "testimonials" | "inquiries" | "settings";

type ProjectRow = {
  id: number;
  slug: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  image: string;
  gallery: string;
  year: string;
  location: string;
  services: string;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

type TeamRow = {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
  published: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

type TestimonialRow = {
  id: number;
  clientName: string;
  role: string;
  company: string;
  rating: number;
  quote: string;
  photoKey: string;
  status: "pending" | "published" | "rejected";
  createdAt: string;
  publishedAt: string | null;
};

type InquiryRow = {
  id: number;
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  status: "new" | "contacted" | "closed";
  createdAt: string;
};

type ServiceWorld = { code: string; title: string; subtitle: string; copy: string };

type DashboardProps = {
  user: { name: string; email: string };
  projects: ProjectRow[];
  team: TeamRow[];
  testimonials: TestimonialRow[];
  inquiries: InquiryRow[];
  settings: Record<string, string>;
};

const nav: Array<{ id: Tab; label: string; index: string }> = [
  { id: "overview", label: "Overview", index: "01" },
  { id: "projects", label: "Projects", index: "02" },
  { id: "team", label: "Team", index: "03" },
  { id: "testimonials", label: "Reviews", index: "04" },
  { id: "inquiries", label: "Inquiries", index: "05" },
  { id: "settings", label: "Site system", index: "06" },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function safeList(value: string): string[] {
  try {
    const list = JSON.parse(value);
    return Array.isArray(list) ? list.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((part) => part[0]).join("");
}

function prettyDate(value: string) {
  const date = new Date(value.includes("T") ? value : `${value.replace(" ", "T")}Z`);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("en", { day: "2-digit", month: "short", year: "numeric" }).format(date);
}

function ratingDisplay(rating: number) {
  const whole = Math.floor(rating);
  return `${"★".repeat(whole)}${rating - whole >= 0.5 ? "½" : ""}`;
}

export function AdminDashboard(props: DashboardProps) {
  const [active, setActive] = useState<Tab>("overview");
  const [projectEditor, setProjectEditor] = useState<ProjectRow | "new" | null>(null);
  const [teamEditor, setTeamEditor] = useState<TeamRow | "new" | null>(null);
  const [reviewRows, setReviewRows] = useState(props.testimonials);
  const [inquiryRows, setInquiryRows] = useState(props.inquiries);
  const [settings, setSettings] = useState(props.settings);
  const [worlds, setWorlds] = useState<ServiceWorld[]>(() => {
    try {
      const parsed = JSON.parse(props.settings.servicesJson || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const [busy, setBusy] = useState("");
  const [notice, setNotice] = useState("");
  const [replyFor, setReplyFor] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  const stats = useMemo(() => ({
    liveProjects: props.projects.filter((project) => project.published).length,
    hiddenProjects: props.projects.filter((project) => !project.published).length,
    pendingReviews: reviewRows.filter((review) => review.status === "pending").length,
    newInquiries: inquiryRows.filter((inquiry) => inquiry.status === "new").length,
  }), [props.projects, reviewRows, inquiryRows]);

  async function saveForm(event: FormEvent<HTMLFormElement>, endpoint: string, method: "POST" | "PATCH", label: string) {
    event.preventDefault();
    setBusy(label);
    setNotice("");
    try {
      const response = await fetch(endpoint, { method, body: new FormData(event.currentTarget) });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "The update could not be saved.");
      setNotice(`${label} saved. Updating the control room…`);
      window.setTimeout(() => window.location.reload(), 500);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Please try again.");
      setBusy("");
    }
  }

  async function sendReply(id: number) {
    const message = replyText.trim();
    if (message.length < 2) {
      setNotice("Write a reply before sending.");
      return;
    }
    setBusy(`reply-${id}`);
    setNotice("");
    try {
      const response = await fetch(`/api/admin/inquiries/${id}/reply`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "The reply could not be sent.");
      setInquiryRows((rows) => rows.map((row) => (row.id === id ? { ...row, status: "contacted" } : row)));
      setReplyFor(null);
      setReplyText("");
      setNotice("Reply sent. The conversation is marked as contacted.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Please try again.");
    } finally {
      setBusy("");
    }
  }

  async function updateStatus(kind: "testimonial" | "inquiry", id: number, status: string) {
    const label = `${kind}-${id}-${status}`;
    setBusy(label);
    setNotice("");
    try {
      const response = await fetch(`/api/admin/${kind === "testimonial" ? "testimonials" : "inquiries"}/${id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "Unable to update the status.");
      if (kind === "testimonial") {
        setReviewRows((rows) => rows.map((row) => row.id === id ? { ...row, status: status as TestimonialRow["status"] } : row));
      } else {
        setInquiryRows((rows) => rows.map((row) => row.id === id ? { ...row, status: status as InquiryRow["status"] } : row));
      }
      setNotice("Status updated. The public site reflects approved content automatically.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Please try again.");
    } finally {
      setBusy("");
    }
  }

  async function uploadReviewPhoto(event: FormEvent<HTMLFormElement>, id: number) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const file = data.get("photo");
    if (!(file instanceof File) || file.size === 0) {
      setNotice("Choose a client photo first.");
      return;
    }
    setBusy(`review-photo-${id}`);
    setNotice("");
    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, { method: "PATCH", body: data });
      const result = (await response.json()) as { error?: string; photoKey?: string };
      if (!response.ok) throw new Error(result.error || "Unable to upload the client photo.");
      if (result.photoKey) setReviewRows((rows) => rows.map((row) => row.id === id ? { ...row, photoKey: result.photoKey! } : row));
      form.reset();
      setNotice("Client photo saved. It will appear publicly when this review is published.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Please try again.");
    } finally {
      setBusy("");
    }
  }

  async function saveSettings(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy("settings");
    setNotice("");
    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...settings, servicesJson: JSON.stringify(worlds) }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "Unable to save the site system.");
      setSettings((current) => ({ ...current, servicesJson: JSON.stringify(worlds) }));
      setNotice("Site system saved. Your public experience is now using the new copy.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Please try again.");
    } finally {
      setBusy("");
    }
  }

  function setting(key: string, value: string) {
    setSettings((current) => ({ ...current, [key]: value }));
  }

  function world(index: number, key: keyof ServiceWorld, value: string) {
    setWorlds((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: value } : item));
  }

  const activeLabel = nav.find((item) => item.id === active)?.label || "Overview";

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <Link className="admin-logo" href="/" aria-label="Artimist home">
          <span>A.</span>
          <strong>ARTIMIST<small>CONTROL ROOM</small></strong>
        </Link>
        <nav className="admin-nav" aria-label="Admin sections">
          {nav.map((item) => (
            <button key={item.id} className={active === item.id ? "is-active" : ""} onClick={() => setActive(item.id)}>
              <span>{item.index}</span>{item.label}<i>→</i>
            </button>
          ))}
        </nav>
        <div className="admin-user">
          <span>{initials(props.user.name)}</span>
          <div><strong>{props.user.name}</strong><small>{props.user.email}</small></div>
        </div>
        <div className="admin-side-links">
          <Link href="/" target="_blank">Open live site <Arrow /></Link>
          <a href="/signout-with-chatgpt?return_to=%2F">Secure sign out</a>
        </div>
      </aside>

      <section className="admin-workspace">
        <header className="admin-topbar">
          <div><p>Studio intelligence / {activeLabel}</p><h1>{activeLabel}</h1></div>
          <div className="admin-live"><i /> System live</div>
        </header>

        {notice && <div className="admin-notice" role="status"><span>{notice}</span><button onClick={() => setNotice("")}>×</button></div>}

        {active === "overview" && (
          <div className="admin-panel admin-overview">
            <section className="admin-welcome">
              <div>
                <p className="admin-kicker">Good to have you here, {props.user.name.split(" ")[0]}.</p>
                <h2>Your studio,<br /><em>in one field of view.</em></h2>
              </div>
              <p>Manage the work, people, voices and conversations that shape the public Artimist site.</p>
            </section>
            <section className="admin-stat-grid">
              <button onClick={() => setActive("projects")}><span>Live projects</span><strong>{String(stats.liveProjects).padStart(2, "0")}</strong><small>{stats.hiddenProjects} held in private</small></button>
              <button onClick={() => setActive("testimonials")}><span>Reviews to curate</span><strong>{String(stats.pendingReviews).padStart(2, "0")}</strong><small>Nothing publishes without you</small></button>
              <button onClick={() => setActive("inquiries")}><span>New project briefs</span><strong>{String(stats.newInquiries).padStart(2, "0")}</strong><small>{inquiryRows.length} conversations total</small></button>
              <button onClick={() => setActive("visitors")}><span>Visitors (7 days)</span><strong>{String(props.visitors.visitors7d).padStart(2, "0")}</strong><small>{props.visitors.views7d} page views</small></button>
              <button onClick={() => setActive("team")}><span>Studio network</span><strong>{String(props.team.filter((person) => person.published).length).padStart(2, "0")}</strong><small>Visible collaborators</small></button>
            </section>
            <div className="admin-overview-grid">
              <section className="admin-surface">
                <div className="admin-surface-head"><div><span>Recent signals</span><h3>Project inquiries</h3></div><button onClick={() => setActive("inquiries")}>View all <Arrow /></button></div>
                <div className="admin-signal-list">
                  {inquiryRows.slice(0, 4).map((inquiry) => (
                    <button key={inquiry.id} onClick={() => setActive("inquiries")}>
                      <i className={`signal-dot is-${inquiry.status}`} />
                      <span><strong>{inquiry.name}</strong><small>{inquiry.projectType} · {prettyDate(inquiry.createdAt)}</small></span>
                      <b>{inquiry.status}</b>
                    </button>
                  ))}
                  {!inquiryRows.length && <p className="admin-empty">New website briefs will appear here.</p>}
                </div>
              </section>
              <section className="admin-surface admin-featured-panel">
                <div className="admin-surface-head"><div><span>Portfolio pulse</span><h3>Featured work</h3></div><button onClick={() => setActive("projects")}>Edit <Arrow /></button></div>
                {props.projects.find((project) => project.featured && project.published) ? (() => {
                  const project = props.projects.find((item) => item.featured && item.published)!;
                  return <div className="admin-featured-card"><img src={project.image} alt="" /><div><span>{project.category}</span><strong>{project.title}</strong><small>{project.location} · {project.year}</small></div></div>;
                })() : <p className="admin-empty">Choose a featured project to create the pulse.</p>}
              </section>
            </div>
          </div>
        )}

        {active === "projects" && (
          <div className="admin-panel">
            <div className="admin-section-intro"><div><p className="admin-kicker">Portfolio system</p><h2>Direct the work.</h2><p>Curate what the world sees, control sequence, project stories and every gallery frame.</p></div><button className="admin-primary" onClick={() => setProjectEditor("new")}>+ New project</button></div>
            <div className="admin-project-grid">
              {props.projects.map((project, index) => (
                <article className="admin-project-card" key={project.id}>
                  <button className="admin-project-image" onClick={() => setProjectEditor(project)}>
                    <img src={project.image} alt="" />
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <i>Edit project ↗</i>
                  </button>
                  <div className="admin-project-copy">
                    <div><small>{project.category}</small><h3>{project.title}</h3></div>
                    <div className="admin-badges">
                      <span className={project.published ? "is-live" : "is-private"}>{project.published ? "Live" : "Private"}</span>
                      {project.featured && <span>Featured</span>}
                      <span>Order {project.sortOrder}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {active === "team" && (
          <div className="admin-panel">
            <div className="admin-section-intro"><div><p className="admin-kicker">People system</p><h2>Shape the studio.</h2><p>Keep roles, profiles, portraits and the public team sequence accurate.</p></div><button className="admin-primary" onClick={() => setTeamEditor("new")}>+ Add person</button></div>
            <div className="admin-team-grid">
              {props.team.map((person) => (
                <article className="admin-person" key={person.id}>
                  <button className="admin-person-image" onClick={() => setTeamEditor(person)}>
                    {person.image ? <img src={person.image} alt="" /> : <span>{initials(person.name)}</span>}
                    <i>Edit profile</i>
                  </button>
                  <div><small>{person.role}</small><h3>{person.name}</h3><p>{person.bio}</p><span className={person.published ? "status-live" : "status-private"}>{person.published ? "Public" : "Private"} · Order {person.sortOrder}</span></div>
                </article>
              ))}
            </div>
          </div>
        )}

        {active === "testimonials" && (
          <div className="admin-panel">
            <div className="admin-section-intro"><div><p className="admin-kicker">Voice curation</p><h2>Approve every story.</h2><p>Submitted client reviews remain private until you choose to publish them.</p></div><div className="admin-count-pill">{stats.pendingReviews} awaiting review</div></div>
            <div className="admin-review-list">
              {reviewRows.map((review) => (
                <article key={review.id} className={`admin-review is-${review.status}`}>
                  <div className="admin-review-person">
                    {review.photoKey ? <img src={`/api/media/${review.photoKey}`} alt="" /> : <span>{initials(review.clientName)}</span>}
                    <div><strong>{review.clientName}</strong><small>{[review.role, review.company].filter(Boolean).join(" · ") || "Client"}</small><em>{prettyDate(review.createdAt)}</em></div>
                  </div>
                  <blockquote>“{review.quote}”</blockquote>
                  <div className="admin-review-foot">
                    <span className="admin-stars">{ratingDisplay(review.rating)} · {review.rating.toFixed(1)}</span>
                    <span className={`admin-status is-${review.status}`}>{review.status}</span>
                    <div>
                      <button disabled={busy !== ""} onClick={() => updateStatus("testimonial", review.id, "published")}>{review.status === "published" ? "Published" : "Approve"}</button>
                      <button disabled={busy !== ""} onClick={() => updateStatus("testimonial", review.id, "rejected")}>Keep private</button>
                    </div>
                    <form className="admin-review-photo" onSubmit={(event) => uploadReviewPhoto(event, review.id)}>
                      <label><input name="photo" type="file" accept="image/jpeg,image/png,image/webp" /><span>{review.photoKey ? "Replace client photo" : "Add real client photo"}</span></label>
                      <button type="submit" disabled={busy !== ""}>{busy === `review-photo-${review.id}` ? "Uploading…" : "Upload"}</button>
                    </form>
                  </div>
                </article>
              ))}
              {!reviewRows.length && <div className="admin-zero"><span>00</span><h3>No client stories yet.</h3><p>New submissions from the public testimonial form will wait here for your approval.</p></div>}
            </div>
          </div>
        )}

        {active === "inquiries" && (
          <div className="admin-panel">
            <div className="admin-section-intro"><div><p className="admin-kicker">Conversation pipeline</p><h2>Turn signals into work.</h2><p>Every project brief from the site, organized from first contact to close.</p></div><div className="admin-count-pill">{stats.newInquiries} new briefs</div></div>
            <div className="admin-inquiry-list">
              {inquiryRows.map((inquiry) => (
                <article className={`admin-inquiry is-${inquiry.status}`} key={inquiry.id}>
                  <header><div><span>{String(inquiry.id).padStart(3, "0")}</span><div><h3>{inquiry.name}</h3><p>{inquiry.company || "Independent"} · {inquiry.projectType}</p></div></div><time>{prettyDate(inquiry.createdAt)}</time></header>
                  <div className="admin-inquiry-body"><p>{inquiry.message}</p><dl><div><dt>Email</dt><dd><a href={`mailto:${inquiry.email}`}>{inquiry.email}</a></dd></div><div><dt>Budget</dt><dd>{inquiry.budget || "Not specified"}</dd></div><div><dt>Timeline</dt><dd>{inquiry.timeline || "Not specified"}</dd></div></dl></div>
                  <footer><span className={`admin-status is-${inquiry.status}`}>{inquiry.status}</span><div><button type="button" className="admin-reply-toggle" onClick={() => { setReplyFor(replyFor === inquiry.id ? null : inquiry.id); setReplyText(""); }}>{replyFor === inquiry.id ? "Cancel" : "Reply"}</button><a href={`mailto:${inquiry.email}?subject=${encodeURIComponent(`Artimist × ${inquiry.projectType}`)}`}>Open in mail ↗</a><select value={inquiry.status} onChange={(event) => updateStatus("inquiry", inquiry.id, event.target.value)} disabled={busy !== ""}><option value="new">New</option><option value="contacted">Contacted</option><option value="closed">Closed</option></select></div></footer>
                  {replyFor === inquiry.id && (
                    <div className="admin-reply">
                      <label htmlFor={`reply-${inquiry.id}`}>Reply to {inquiry.name} &middot; {inquiry.email}</label>
                      <textarea
                        id={`reply-${inquiry.id}`}
                        rows={7}
                        value={replyText}
                        onChange={(event) => setReplyText(event.target.value)}
                        placeholder={`Write your reply. It is sent from the studio address and threaded with the confirmation ${inquiry.name.split(" ")[0]} already received.`}
                      />
                      <div className="admin-reply-actions">
                        <small>{replyText.trim().length} characters</small>
                        <button type="button" onClick={() => sendReply(inquiry.id)} disabled={busy !== "" || replyText.trim().length < 2}>
                          {busy === `reply-${inquiry.id}` ? "Sending…" : "Send reply"}
                        </button>
                      </div>
                    </div>
                  )}
                </article>
              ))}
              {!inquiryRows.length && <div className="admin-zero"><span>00</span><h3>The pipeline is clear.</h3><p>New project briefs submitted through the public site will appear here.</p></div>}
            </div>
          </div>
        )}

        {active === "settings" && (
          <form className="admin-panel admin-settings" onSubmit={saveSettings}>
            <div className="admin-section-intro"><div><p className="admin-kicker">Experience system</p><h2>Control the atmosphere.</h2><p>Update the homepage voice, every service discipline and direct studio contact detail.</p></div><button className="admin-primary" type="submit" disabled={busy === "settings"}>{busy === "settings" ? "Saving…" : "Save site system"}</button></div>
            <section className="admin-settings-block">
              <div className="admin-settings-title"><span>01</span><div><h3>Hero signal</h3><p>The first words visitors meet in both day and night mode.</p></div></div>
              <div className="admin-field-grid">
                <label className="admin-field-wide"><span>Eyebrow</span><input value={settings.heroEyebrow || ""} onChange={(event) => setting("heroEyebrow", event.target.value)} /></label>
                <label className="admin-field-wide"><span>Main headline</span><textarea rows={2} value={settings.heroHeadline || ""} onChange={(event) => setting("heroHeadline", event.target.value)} /></label>
                <label className="admin-field-wide"><span>Supporting story</span><textarea rows={4} value={settings.heroBody || ""} onChange={(event) => setting("heroBody", event.target.value)} /></label>
                <label className="admin-field-wide"><span>Availability signal</span><input value={settings.availability || ""} onChange={(event) => setting("availability", event.target.value)} /></label>
              </div>
            </section>
            <section className="admin-settings-block">
              <div className="admin-settings-title"><span>02</span><div><h3>Service disciplines</h3><p>Edit the public capability system without touching layout or motion.</p></div></div>
              <div className="admin-world-editor">
                {worlds.map((item, index) => (
                  <article key={`${item.code}-${index}`}>
                    <label><span>Index</span><input value={item.code} onChange={(event) => world(index, "code", event.target.value)} /></label>
                    <label><span>World</span><input value={item.title} onChange={(event) => world(index, "title", event.target.value)} /></label>
                    <label><span>Subtitle</span><input value={item.subtitle} onChange={(event) => world(index, "subtitle", event.target.value)} /></label>
                    <label><span>Description</span><textarea rows={4} value={item.copy} onChange={(event) => world(index, "copy", event.target.value)} /></label>
                  </article>
                ))}
              </div>
            </section>
            <section className="admin-settings-block">
              <div className="admin-settings-title"><span>03</span><div><h3>Contact network</h3><p>Where project briefs and social paths lead.</p></div></div>
              <div className="admin-field-grid">
                <label><span>Faizan / project email</span><input type="email" value={settings.contactEmail || ""} onChange={(event) => setting("contactEmail", event.target.value)} /></label>
                <label><span>Studio team email</span><input type="email" value={settings.teamEmail || ""} onChange={(event) => setting("teamEmail", event.target.value)} /></label>
                <label><span>WhatsApp</span><input value={settings.whatsapp || ""} onChange={(event) => setting("whatsapp", event.target.value)} /></label>
                <label className="admin-field-wide"><span>Primary / legal address</span><input value={settings.address || ""} onChange={(event) => setting("address", event.target.value)} /></label>
                <label><span>Canada office</span><input value={settings.officeCanada || ""} onChange={(event) => setting("officeCanada", event.target.value)} /></label>
                <label><span>United States office</span><input value={settings.officeUsa || ""} onChange={(event) => setting("officeUsa", event.target.value)} /></label>
                <label><span>Sweden office</span><input value={settings.officeSweden || ""} onChange={(event) => setting("officeSweden", event.target.value)} /></label>
                <label><span>Lahore office</span><input value={settings.officePakistan || ""} onChange={(event) => setting("officePakistan", event.target.value)} /></label>
                <label><span>Instagram URL</span><input type="url" value={settings.instagram || ""} onChange={(event) => setting("instagram", event.target.value)} /></label>
                <label><span>LinkedIn URL</span><input type="url" value={settings.linkedin || ""} onChange={(event) => setting("linkedin", event.target.value)} /></label>
              </div>
            </section>
            <div className="admin-settings-save"><p>Changes publish to the living site immediately after saving.</p><button className="admin-primary" type="submit" disabled={busy === "settings"}>{busy === "settings" ? "Saving…" : "Save all changes"}</button></div>
          </form>
        )}
      </section>

      {projectEditor && (
        <div className="admin-editor-backdrop" role="dialog" aria-modal="true" aria-label="Project editor">
          <button className="admin-editor-dismiss" onClick={() => setProjectEditor(null)} aria-label="Close editor" />
          <form className="admin-editor" key={projectEditor === "new" ? "new-project" : projectEditor.id} onSubmit={(event) => saveForm(event, projectEditor === "new" ? "/api/admin/projects" : `/api/admin/projects/${projectEditor.id}`, projectEditor === "new" ? "POST" : "PATCH", projectEditor === "new" ? "Project" : projectEditor.title)}>
            <header><div><p>{projectEditor === "new" ? "Create project" : "Edit portfolio story"}</p><h2>{projectEditor === "new" ? "New project." : projectEditor.title}</h2></div><button type="button" onClick={() => setProjectEditor(null)}>×</button></header>
            <div className="admin-editor-fields">
              <label><span>Project title *</span><input name="title" required defaultValue={projectEditor === "new" ? "" : projectEditor.title} /></label>
              <label><span>URL slug</span><input name="slug" defaultValue={projectEditor === "new" ? "" : projectEditor.slug} placeholder="generated-from-title" /></label>
              <label><span>Category *</span><input name="category" required list="project-categories" defaultValue={projectEditor === "new" ? "" : projectEditor.category} /><datalist id="project-categories"><option>Space</option><option>Image</option><option>Identity</option><option>Digital</option><option>Technical</option><option>Lab</option></datalist></label>
              <label><span>Sequence</span><input name="sortOrder" type="number" defaultValue={projectEditor === "new" ? props.projects.length + 1 : projectEditor.sortOrder} /></label>
              <label className="admin-field-wide"><span>Card summary *</span><textarea name="summary" required rows={3} maxLength={500} defaultValue={projectEditor === "new" ? "" : projectEditor.summary} /></label>
              <label className="admin-field-wide"><span>Project description / full story</span><textarea name="description" rows={7} maxLength={4000} defaultValue={projectEditor === "new" ? "" : projectEditor.description} placeholder="Tell the story: brief, design intent, challenges, solution, materials, outcome..." /></label>
              <label><span>Year</span><input name="year" defaultValue={projectEditor === "new" ? new Date().getFullYear() : projectEditor.year} /></label>
              <label><span>Location</span><input name="location" defaultValue={projectEditor === "new" ? "" : projectEditor.location} /></label>
              <label className="admin-field-wide"><span>Services · comma separated</span><input name="services" defaultValue={projectEditor === "new" ? "" : safeList(projectEditor.services).join(", ")} /></label>
              <label className="admin-field-wide"><span>Upload portfolio gallery · multiple images</span><input name="galleryFiles" type="file" multiple accept="image/jpeg,image/png,image/webp" /><small>Upload up to 16 new project images at once. They are added to the project walkthrough automatically.</small></label>
              <label className="admin-field-wide"><span>Existing gallery paths · one per line</span><textarea name="gallery" rows={5} defaultValue={projectEditor === "new" ? "" : safeList(projectEditor.gallery).join("\n")} placeholder="/media/projects/example.webp" /></label>
              <label><span>New cover image</span><input name="image" type="file" accept="image/jpeg,image/png,image/webp" /><small>If blank on a new project, the first gallery image becomes the cover.</small></label>
              <label><span>Current cover path</span><input name="imagePath" defaultValue={projectEditor === "new" ? "" : projectEditor.image} /></label>
              {projectEditor !== "new" && <div className="admin-editor-preview"><img src={projectEditor.image} alt="Current project cover" /></div>}
              <div className="admin-checks admin-field-wide"><label><input name="published" type="checkbox" defaultChecked={projectEditor === "new" ? true : projectEditor.published} /> <span>Visible on public site</span></label><label><input name="featured" type="checkbox" defaultChecked={projectEditor === "new" ? false : projectEditor.featured} /> <span>Featured project</span></label></div><p className="admin-recent-note admin-field-wide">New published projects automatically enter the Recent Projects rail. Higher sequence numbers appear first there, while the main archive still follows your sequence control.</p>
            </div>
            <footer><p>{notice}</p><button className="admin-primary" disabled={busy !== ""}>{busy ? "Saving…" : "Save project"}</button></footer>
          </form>
        </div>
      )}

      {teamEditor && (
        <div className="admin-editor-backdrop" role="dialog" aria-modal="true" aria-label="Team editor">
          <button className="admin-editor-dismiss" onClick={() => setTeamEditor(null)} aria-label="Close editor" />
          <form className="admin-editor admin-editor-person" key={teamEditor === "new" ? "new-person" : teamEditor.id} onSubmit={(event) => saveForm(event, teamEditor === "new" ? "/api/admin/team" : `/api/admin/team/${teamEditor.id}`, teamEditor === "new" ? "POST" : "PATCH", teamEditor === "new" ? "Team member" : teamEditor.name)}>
            <header><div><p>{teamEditor === "new" ? "Add to the network" : "Edit studio profile"}</p><h2>{teamEditor === "new" ? "New person." : teamEditor.name}</h2></div><button type="button" onClick={() => setTeamEditor(null)}>×</button></header>
            <div className="admin-editor-fields">
              <label><span>Full name *</span><input name="name" required defaultValue={teamEditor === "new" ? "" : teamEditor.name} /></label>
              <label><span>Role *</span><input name="role" required defaultValue={teamEditor === "new" ? "" : teamEditor.role} /></label>
              <label className="admin-field-wide"><span>Profile story</span><textarea name="bio" rows={6} defaultValue={teamEditor === "new" ? "" : teamEditor.bio} /></label>
              <label><span>LinkedIn URL</span><input name="linkedin" type="url" defaultValue={teamEditor === "new" ? "" : teamEditor.linkedin} /></label>
              <label><span>Sequence</span><input name="sortOrder" type="number" defaultValue={teamEditor === "new" ? props.team.length + 1 : teamEditor.sortOrder} /></label>
              <label><span>New portrait</span><input name="image" type="file" accept="image/jpeg,image/png,image/webp" /></label>
              <label><span>Current portrait path</span><input name="imagePath" defaultValue={teamEditor === "new" ? "" : teamEditor.image} /></label>
              {teamEditor !== "new" && teamEditor.image && <div className="admin-editor-preview is-person"><img src={teamEditor.image} alt="Current portrait" /></div>}
              <div className="admin-checks admin-field-wide"><label><input name="published" type="checkbox" defaultChecked={teamEditor === "new" ? true : teamEditor.published} /> <span>Visible on public site</span></label></div>
            </div>
            <footer><p>{notice}</p><button className="admin-primary" disabled={busy !== ""}>{busy ? "Saving…" : "Save profile"}</button></footer>
          </form>
        </div>
      )}
    </main>
  );
}
