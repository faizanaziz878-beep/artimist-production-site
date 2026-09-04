"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { UiIcon } from "./ui-icon";

type Faq = { q: string; keywords: string[]; a: string };

const FAQS: Faq[] = [
  {
    q: "What does Artimist actually do?",
    keywords: ["service", "services", "do", "offer", "what", "help", "work"],
    a: "Architecture, interiors, BIM, drafting and visualization. That includes custom house design, plan development, Revit and BIM production, CAD drafting, permit and construction documentation support, 3D rendering, animation and real-time Unreal Engine experiences.",
  },
  {
    q: "Do you work internationally?",
    keywords: ["us", "usa", "united", "states", "america", "american", "canada", "uk", "sweden", "country", "where", "international", "remote"],
    a: "Yes. Artimist Productions works remotely with homeowners, architects, developers, builders and brands across multiple markets. The project scope, deliverables, communication rhythm and file handover are agreed before production starts.",
  },
  {
    q: "Can you produce permit or construction drawings?",
    keywords: ["permit", "permits", "planning", "approval", "submission", "council", "city", "code", "construction", "drawing", "drawings"],
    a: "Yes. Permit-support and construction-documentation production are part of the studio's work. Send sketches, CAD, PDF, a survey or model for review. Artimist does not supply a regional architectural or engineering stamp or guarantee permit approval; any required stamp or certification must come from the appropriately licensed local professional.",
  },
  {
    q: "Do you do Revit, BIM or CAD drafting?",
    keywords: ["revit", "bim", "cad", "autocad", "draft", "drafting", "model", "modeling", "modelling", "lod"],
    a: "Yes. Revit drafting, BIM modeling, CAD drafting, CAD-to-Revit and PDF-to-CAD production, as-built documentation and coordinated drawing support are core technical services. Deliverables are defined in the quotation before work begins.",
  },
  {
    q: "Can you work from my existing drawings or a point cloud?",
    keywords: ["existing", "convert", "conversion", "pdf", "dwg", "scan", "point", "cloud", "survey", "as-built", "asbuilt", "sketch", "file", "files", "format", "formats"],
    a: "Usually yes. The studio can review Revit, CAD/DWG, SketchUp, PDF sets, hand sketches, surveys and point-cloud data. If a source file is incomplete or unsuitable, that is identified during review instead of being hidden inside production.",
  },
  {
    q: "Do you do 3D rendering and animation?",
    keywords: ["render", "rendering", "3d", "visual", "visualization", "visualisation", "animation", "walkthrough", "image", "cgi", "interior", "exterior"],
    a: "Yes. Exterior and interior stills, daylight and dusk variants, aerial/context views, architectural animation, walkthroughs and real-time experiences are all part of the visualization offer.",
  },
  {
    q: "How are revisions handled?",
    keywords: ["revision", "revisions", "change", "changes", "feedback", "round", "rounds", "edit", "edits"],
    a: "The included revision allowance is written into the project quotation. Additional rounds, new directions or requests outside the agreed brief are treated as additional scope so the project remains clear for both sides.",
  },
  {
    q: "Can you work under an NDA?",
    keywords: ["nda", "confidential", "confidentiality", "private", "privacy", "secure", "secret", "sensitive"],
    a: "Yes. NDA-based and confidential workflows are available. If the project is sensitive, request the NDA before sharing confidential drawings, links or source material.",
  },
  {
    q: "What files do I receive at the end?",
    keywords: ["handover", "deliver", "delivery", "source", "sources", "file", "files", "dwg", "rvt", "pdf", "image", "animation"],
    a: "The handover is defined in the agreed scope. Depending on the project this may include PDFs, DWGs, RVTs, image files, animation outputs or agreed source files. Source-file delivery is included only where the quotation says so.",
  },
  {
    q: "How do payment and project start work?",
    keywords: ["cost", "price", "pricing", "budget", "fee", "rate", "charge", "payment", "deposit", "start", "quote", "quotation"],
    a: "The studio reviews the brief, source files, deliverables and deadline before issuing a project-specific quotation. Scope, payment milestones and the production start point are agreed before work begins, rather than relying on a generic price that may not fit the project.",
  },
  {
    q: "How do I start a project?",
    keywords: ["start", "begin", "brief", "quote", "quotation", "enquiry", "inquiry", "contact", "process", "next", "step"],
    a: "Use the project intake page and send the project as it stands today—a finished brief, rough idea, drawings or a difficult technical question. A real studio team member reviews project-specific enquiries and takes over when a quote, file review or decision is needed.",
  },
];

const WHATSAPP_FALLBACK = "+1 (807) 808-4181";

function track(name: string, params: Record<string, string>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...a: unknown[]) => void };
  if (typeof w.gtag === "function") w.gtag("event", name, params);
}

export function AskBot({ whatsapp = WHATSAPP_FALLBACK }: { whatsapp?: string }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [picked, setPicked] = useState<Faq | null>(null);
  const launchRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const waHref = useMemo(() => `https://wa.me/${whatsapp.replace(/\D/g, "")}`, [whatsapp]);

  const matches = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return FAQS;
    const words = term.split(/\s+/).filter((word) => word.length > 2);
    return FAQS.map((faq) => {
      const haystack = `${faq.q} ${faq.keywords.join(" ")}`.toLowerCase();
      let score = haystack.includes(term) ? 5 : 0;
      for (const word of words) if (haystack.includes(word)) score += 2;
      for (const keyword of faq.keywords) if (words.includes(keyword)) score += 3;
      return { faq, score };
    }).filter((entry) => entry.score > 0).sort((a, b) => b.score - a.score).map((entry) => entry.faq);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    document.body.classList.add("artimist-ask-open");
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLInputElement>("input")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "Tab") {
        const elements = panelRef.current?.querySelectorAll<HTMLElement>('button, input, a[href]');
        if (!elements?.length) return;
        const first = elements[0], last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("artimist-ask-open");
      document.body.style.overflow = previousOverflow;
      launchRef.current?.focus();
    };
  }, [open]);

  const unanswered = query.trim().length > 2 && matches.length === 0;

  return (
    <>
      <button
        ref={launchRef}
        type="button"
        className="askbot-launch"
        aria-expanded={open}
        aria-controls="askbot-panel"
        onClick={() => {
          const next = !open;
          setOpen(next);
          if (next) track("faq_open", { source: window.location.pathname });
        }}
      >
        <span className="askbot-label">{open ? "Close" : "Ask Artimist"}</span>
        <UiIcon name={open ? "close" : "search"} size={15} />
      </button>

      {open && createPortal(
        <div ref={panelRef} className="askbot-panel" id="askbot-panel" role="dialog" aria-modal="true" aria-label="Ask Artimist a question">
          <div className="askbot-head">
            <span>Ask Artimist Productions</span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close Ask the Studio"><UiIcon name="close" size={17} /></button>
          </div>

          <div className="askbot-search">
            <input
              type="text"
              value={query}
              placeholder="What do you need help with?"
              aria-label="Ask the studio a question"
              onChange={(event) => {
                setQuery(event.target.value);
                setPicked(null);
              }}
            />
          </div>

          <div className="askbot-body">
            {picked ? (
              <div className="askbot-answer">
                <button type="button" className="askbot-back" onClick={() => setPicked(null)}><UiIcon name="chevron" size={12} /> All questions</button>
                <h4>{picked.q}</h4>
                <p>{picked.a}</p>
                <a className="askbot-wa" href={waHref} target="_blank" rel="noopener noreferrer">Continue with the studio on WhatsApp</a>
              </div>
            ) : unanswered ? (
              <div className="askbot-answer">
                <h4>That needs a project-specific answer.</h4>
                <p>A real studio team member should review that rather than giving you a generic answer. Send the project details or continue directly on WhatsApp.</p>
                <Link className="askbot-wa" href="/contact" onClick={() => setOpen(false)}>Start project intake</Link>
                <a className="askbot-wa askbot-wa-quiet" href={waHref} target="_blank" rel="noopener noreferrer">Continue on WhatsApp</a>
              </div>
            ) : (
              <>
                <ul className="askbot-list">
                  {matches.map((faq) => (
                    <li key={faq.q}>
                      <button type="button" onClick={() => { setPicked(faq); track("faq_question", { question: faq.q.slice(0, 90) }); }}>{faq.q}</button>
                    </li>
                  ))}
                </ul>
                <Link className="askbot-wa askbot-wa-quiet" href="/contact" onClick={() => setOpen(false)}>Have a project? Start the brief</Link>
              </>
            )}
          </div>
        </div>, document.body
      )}
    </>
  );
}
