"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Faq = { q: string; keywords: string[]; a: string };

/**
 * Ask-a-question widget.
 *
 * Deliberately not an AI chatbot: it answers from a fixed, factual FAQ set that
 * matches what the studio actually does, and hands anything it does not cover
 * straight to WhatsApp rather than guessing. Every answer offers WhatsApp as the
 * next step.
 */
const FAQS: Faq[] = [
  {
    q: "What does Artimist actually do?",
    keywords: ["service", "services", "do", "offer", "what", "help", "work"],
    a: "Architecture, BIM and visualization. That covers architectural design support, Revit and BIM production, CAD drafting, permit and construction documentation, interiors, 3D rendering and animation, and real-time Unreal Engine experiences.",
  },
  {
    q: "Do you work with clients in the United States?",
    keywords: ["us", "usa", "united", "states", "america", "american", "ohio", "country", "where", "international", "remote"],
    a: "Yes. We work with US architects, developers, builders and property owners, and we have a US presence in Ohio alongside studios in Vancouver, Stockholm and Lahore. Where a project needs a locally licensed professional to stamp drawings, we work alongside yours.",
  },
  {
    q: "Can you produce permit drawings?",
    keywords: ["permit", "permits", "planning", "approval", "submission", "council", "city", "code"],
    a: "Yes — permit and construction documentation is core work for us. Send what you have, whether that is a sketch, a CAD file, a PDF set or a survey, and we will tell you what is missing to reach a submittable set.",
  },
  {
    q: "Do you do Revit, BIM or CAD drafting?",
    keywords: ["revit", "bim", "cad", "autocad", "draft", "drafting", "model", "modeling", "modelling", "lod"],
    a: "Yes. Revit drafting, BIM modeling, CAD drafting, CAD to Revit and PDF to CAD conversions, and as-built drawings. We work to your template and standards rather than imposing ours.",
  },
  {
    q: "Can you work from my existing drawings or a point cloud?",
    keywords: ["existing", "convert", "conversion", "pdf", "dwg", "scan", "point", "cloud", "survey", "as-built", "asbuilt", "sketch", "file", "files", "format", "formats"],
    a: "Usually yes. We accept Revit, CAD/DWG, SketchUp, PDF sets, hand sketches and point cloud data for Scan to BIM. If a file is not usable we will say so before you commit to anything.",
  },
  {
    q: "Do you do 3D rendering and animation?",
    keywords: ["render", "rendering", "3d", "visual", "visualization", "visualisation", "animation", "walkthrough", "image", "cgi", "interior", "exterior"],
    a: "Yes. Exterior and interior stills, dusk and daylight variants, aerial and context views, architectural animation and 3D walkthroughs — for planning submissions, investor decks and pre-construction sales.",
  },
  {
    q: "What do you use Unreal Engine for?",
    keywords: ["unreal", "engine", "real-time", "realtime", "interactive", "vr", "virtual", "immersive", "game"],
    a: "Real-time and interactive work: walkthroughs a client can control themselves, sales-suite experiences, cinematic environments and virtual tours. It suits developments where people need to explore a space rather than look at a fixed image.",
  },
  {
    q: "How do I start a project?",
    keywords: ["start", "begin", "brief", "quote", "quotation", "enquiry", "inquiry", "contact", "process", "next", "step"],
    a: "Send the project as it stands today — a finished brief, a rough idea or a difficult question all work. Share drawings, scope and your deadline, and we will come back with what we would do and what it takes.",
  },
  {
    q: "What does it cost, and how long does it take?",
    keywords: ["cost", "price", "pricing", "budget", "fee", "rate", "charge", "expensive", "cheap", "long", "time", "timeline", "deadline", "fast", "turnaround", "when"],
    a: "It depends entirely on scope, drawing count and level of detail, so any number quoted before seeing your project would be invented. Send the drawings and the deadline and you will get a specific answer rather than a range.",
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
  const panelRef = useRef<HTMLDivElement | null>(null);

  const waHref = useMemo(() => {
    const digits = whatsapp.replace(/\D/g, "");
    return `https://wa.me/${digits}`;
  }, [whatsapp]);

  const matches = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return FAQS;
    const words = term.split(/\s+/).filter((word) => word.length > 2);
    const scored = FAQS.map((faq) => {
      const haystack = `${faq.q} ${faq.keywords.join(" ")}`.toLowerCase();
      let score = 0;
      if (haystack.includes(term)) score += 5;
      for (const word of words) if (haystack.includes(word)) score += 2;
      for (const keyword of faq.keywords) if (words.includes(keyword)) score += 3;
      return { faq, score };
    })
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score);
    return scored.map((entry) => entry.faq);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const unanswered = query.trim().length > 2 && matches.length === 0;

  return (
    <>
      <button
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
        {open ? "Close" : "Ask a question"}
      </button>

      {open && (
        <div className="askbot-panel" id="askbot-panel" ref={panelRef} role="dialog" aria-label="Ask Artimist a question">
          <div className="askbot-head">
            <span>Ask Artimist</span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close">&times;</button>
          </div>

          <div className="askbot-search">
            <input
              type="text"
              value={query}
              placeholder="Type your question…"
              aria-label="Type your question"
              onChange={(event) => {
                setQuery(event.target.value);
                setPicked(null);
              }}
            />
          </div>

          <div className="askbot-body">
            {picked ? (
              <div className="askbot-answer">
                <button type="button" className="askbot-back" onClick={() => setPicked(null)}>&larr; All questions</button>
                <h4>{picked.q}</h4>
                <p>{picked.a}</p>
                <a className="askbot-wa" href={waHref} target="_blank" rel="noopener noreferrer">
                  Contact us on WhatsApp for further assistance
                </a>
              </div>
            ) : unanswered ? (
              <div className="askbot-answer">
                <h4>That one needs a person.</h4>
                <p>
                  We would rather answer it properly than guess. Message the studio on WhatsApp and someone will
                  come back to you directly.
                </p>
                <a className="askbot-wa" href={waHref} target="_blank" rel="noopener noreferrer">
                  Contact us on WhatsApp for further assistance
                </a>
              </div>
            ) : (
              <>
                <ul className="askbot-list">
                  {matches.map((faq) => (
                    <li key={faq.q}>
                      <button
                        type="button"
                        onClick={() => {
                          setPicked(faq);
                          track("faq_question", { question: faq.q.slice(0, 90) });
                        }}
                      >
                        {faq.q}
                      </button>
                    </li>
                  ))}
                </ul>
                <a className="askbot-wa askbot-wa-quiet" href={waHref} target="_blank" rel="noopener noreferrer">
                  Not listed? Contact us on WhatsApp
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
