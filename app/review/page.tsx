import type { Metadata } from "next";
import Link from "next/link";
import { ReviewForm } from "./review-form";

export const metadata: Metadata = {
  title: "Leave a Client Review | Artimist Productions",
  description: "Existing Artimist Productions clients can submit genuine feedback with explicit publication permission for review before publication.",
  alternates: { canonical: "/review" },
  robots: { index: false, follow: true },
};

const CSS = `
.review{min-height:100vh;background:#090809;color:#eee8e3;padding-top:84px;font-family:Arial,Helvetica,sans-serif;line-height:1.6}.review *{box-sizing:border-box}.review a{color:inherit}.review-wrap{width:min(1120px,calc(100% - 40px));margin:0 auto}.review-crumb{padding:26px 0 18px;color:#938983;font-size:12px}.review-crumb a{text-decoration:none}.review-hero{padding:46px 0 42px;display:grid;grid-template-columns:.9fr 1.1fr;gap:54px;align-items:center}.review-hero-copy{min-width:0}.review-hero-visual{position:relative;margin:0;overflow:hidden;aspect-ratio:4/3;border:1px solid rgba(255,255,255,.12)}.review-hero-visual img{width:100%;height:100%;object-fit:cover;display:block}.review-hero-visual:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 55%,rgba(8,8,8,.76))}.review-hero-visual figcaption{position:absolute;z-index:1;left:16px;bottom:14px;color:#eee8e3;font-size:9px;letter-spacing:.14em;text-transform:uppercase}.review-kicker{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#cf5267;font-weight:700}.review h1{font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:clamp(48px,7vw,82px);line-height:.96;letter-spacing:-.045em;margin:14px 0 22px}.review-lead{font-size:18px;color:#b8ada7;max-width:65ch}.review-trust{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:30px 0 42px}.review-trust article{padding:18px 0;border-top:1px solid rgba(255,255,255,.14);background:transparent}.review-trust b{display:block;color:#cf5267;font-size:9px;letter-spacing:.14em;text-transform:uppercase;margin-bottom:6px}.review-trust p{display:none}.review-form{padding:36px;border:1px solid rgba(255,255,255,.11);background:#100e0f;margin-bottom:120px}.review-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}.review-form label{display:block}.review-form label>span{display:block;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#aaa09a;margin-bottom:8px}.review-form input,.review-form select,.review-form textarea{width:100%;border:1px solid rgba(255,255,255,.14);border-radius:10px;background:#0a0909;color:#eee8e3;padding:13px 14px;font:inherit;outline:none}.review-form input:focus,.review-form select:focus,.review-form textarea:focus{border-color:#a8384c}.review-wide{margin-top:16px}.review-wide small{display:block;margin-top:7px;color:#776d68;font-size:11px}.review-permission{display:flex!important;align-items:flex-start;gap:10px;margin-top:20px;padding:16px;border:1px solid rgba(255,255,255,.09);border-radius:10px}.review-permission input{width:18px!important;height:18px;margin-top:2px}.review-permission span{margin:0!important;text-transform:none!important;letter-spacing:0!important;line-height:1.5!important}.review-submit-row{display:flex;align-items:center;gap:16px;margin-top:20px}.review-submit-row button{border:0;border-radius:999px;background:#992636;color:white;padding:14px 22px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;cursor:pointer}.review-submit-row button:disabled{opacity:.6;cursor:wait}.review-submit-row small{color:#817771;max-width:42ch}.review-status{padding:14px 16px;border-radius:10px;margin:18px 0 0;font-size:13px}.review-status.is-sent{background:rgba(70,130,85,.16);border:1px solid rgba(90,160,105,.28)}.review-status.is-error{background:rgba(153,38,54,.15);border:1px solid rgba(207,82,103,.28)}
@media(max-width:700px){.review{padding-top:72px}.review-hero{grid-template-columns:1fr;gap:24px}.review-hero-visual{aspect-ratio:4/3}.review-wrap{width:min(100% - 28px,920px)}.review-trust,.review-grid{grid-template-columns:1fr}.review-form{padding:22px;margin-bottom:140px}.review-submit-row{align-items:flex-start;flex-direction:column}.review h1{font-size:50px}}
`;

export default function ReviewPage() {
  return (
    <main className="review">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="review-wrap">
        <nav className="review-crumb" aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href="/proof">Proof</Link> / Client review</nav>
        <section className="review-hero"><div className="review-hero-copy"><div className="review-kicker">For existing clients</div><h1>Share the experience as it was.</h1><p className="review-lead">Genuine feedback only. Every submission is reviewed before publication.</p></div><figure className="review-hero-visual"><img src="/media/projects/bowl-stroke.webp" alt="Published Artimist Productions hospitality project" width="1400" height="1050" fetchPriority="high" /><figcaption>Published project / Artimist Productions</figcaption></figure></section>
        <div className="review-trust">
          <article><b>Permission</b><p>You explicitly control whether the feedback may be considered for publication.</p></article>
          <article><b>Moderation</b><p>Every submission enters a pending review state before it can appear on the website.</p></article>
          <article><b>Authenticity</b><p>Artimist may confirm the client relationship before publishing a testimonial.</p></article>
        </div>
        <ReviewForm />
      </div>
    </main>
  );
}
