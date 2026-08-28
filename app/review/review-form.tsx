"use client";

import { FormEvent, useState } from "react";

export function ReviewForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setState("sending");
    setMessage("");
    try {
      const response = await fetch("/api/testimonials", { method: "POST", body: data });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload?.error || "We could not submit the review.");
      form.reset();
      setState("sent");
      setMessage("Thank you. Your feedback has been submitted for review. It will not be published automatically.");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "We could not submit the review. Please try again.");
    }
  }

  return (
    <form className="review-form" onSubmit={submit} encType="multipart/form-data">
      <div className="review-grid">
        <label><span>Your name *</span><input name="clientName" maxLength={80} required autoComplete="name" /></label>
        <label><span>Role / title</span><input name="role" maxLength={100} autoComplete="organization-title" /></label>
        <label><span>Company / project</span><input name="company" maxLength={100} autoComplete="organization" /></label>
        <label><span>Rating *</span><select name="rating" defaultValue="5" required><option value="5">5 — Excellent</option><option value="4">4 — Very good</option><option value="3">3 — Good</option><option value="2">2 — Could be better</option><option value="1">1 — Poor</option></select></label>
      </div>
      <label className="review-wide"><span>Your feedback *</span><textarea name="quote" minLength={20} maxLength={1200} rows={7} required placeholder="What did Artimist work on, what was the experience like, and what stood out?" /></label>
      <label className="review-wide"><span>Photo (optional)</span><input type="file" name="photo" accept="image/jpeg,image/png,image/webp" /><small>JPG, PNG or WebP. Maximum 4 MB. A photo is never required for a review.</small></label>
      <label className="review-permission"><input type="checkbox" name="permission" value="yes" required /><span>I confirm this is my own genuine feedback and I give Artimist Productions permission to review and, if accepted, publish it on its website. *</span></label>
      <div className="review-submit-row"><button type="submit" disabled={state === "sending"}>{state === "sending" ? "Submitting…" : "Submit genuine review"}</button><small>Submission does not guarantee publication. Artimist may verify the relationship before publishing.</small></div>
      {message ? <p className={`review-status is-${state}`} role="status">{message}</p> : null}
    </form>
  );
}
