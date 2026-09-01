"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { UiIcon } from "./ui-icon";

type SearchRoute = {
  title: string;
  path: string;
  category: string;
  reason: string;
};

type SearchResult = {
  answer: string;
  intent: string;
  confidence: "high" | "medium" | "low";
  routes: SearchRoute[];
  followUp?: string;
  leadReady: boolean;
};

const EXAMPLES = [
  "Turn my sketch into a floor plan",
  "I need Revit drafting",
  "Can you design an ADU?",
  "How much does a rendering cost?",
  "Do you stamp permit drawings?",
];

function track(name: string, params: Record<string, string>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...a: unknown[]) => void };
  if (typeof w.gtag === "function") w.gtag("event", name, params);
}

export function AskBot() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [result, setResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onOpen = (event: Event) => {
      const detail = (event as CustomEvent<{ query?: string }>).detail;
      setOpen(true);
      if (detail?.query) setQuery(detail.query);
      window.setTimeout(() => inputRef.current?.focus(), 60);
    };
    window.addEventListener("artimist:ask-open", onOpen as EventListener);
    return () => window.removeEventListener("artimist:ask-open", onOpen as EventListener);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("artimist-ask-open", open);
    if (!open) return () => document.body.classList.remove("artimist-ask-open");
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.setTimeout(() => inputRef.current?.focus(), 80);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("artimist-ask-open");
    };
  }, [open]);

  if (pathname.startsWith("/admin")) return null;

  async function ask(value: string) {
    const clean = value.trim();
    if (!clean || loading) return;
    setLoading(true);
    setError("");
    setSubmittedQuery(clean);
    track("artimist_search", { query: clean.slice(0, 90), source: pathname });

    try {
      const response = await fetch("/api/artimist-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: clean }),
      });
      if (!response.ok) throw new Error("Search failed");
      const data = await response.json() as SearchResult;
      setResult(data);
      track("artimist_search_result", { intent: data.intent, confidence: data.confidence, source: pathname });
    } catch {
      setError("I couldn’t search the studio knowledge just now. You can still browse the FAQs or send the project brief.");
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void ask(query);
  }

  function reset() {
    setQuery("");
    setSubmittedQuery("");
    setResult(null);
    setError("");
    window.setTimeout(() => inputRef.current?.focus(), 30);
  }

  function openSearch(trigger: string) {
    setOpen(true);
    track("artimist_search_open", { source: pathname, trigger });
    window.setTimeout(() => inputRef.current?.focus(), 60);
  }

  return (
    <>
      {!open && (
        <button type="button" className="askbot-top-search" onClick={() => openSearch("top_search_bar")} aria-label="Open Artimist AI search">
          <UiIcon name="search" size={17} />
          <span><strong>Hello, I’m Artimist. How can I help you?</strong><small>Ask about your house, drawings, BIM, Revit, rendering or project.</small></span>
          <b>Ask me a question</b>
        </button>
      )}

      <button
        type="button"
        className="askbot-launch"
        aria-expanded={open}
        aria-controls="askbot-panel"
        onClick={() => {
          const next = !open;
          setOpen(next);
          if (next) openSearch("floating");
        }}
      >
        <span>{open ? "Close Artimist" : "Ask Artimist"}</span>
        <UiIcon name={open ? "close" : "search"} size={15} />
      </button>

      {open && (
        <div className="askbot-panel" id="askbot-panel" role="dialog" aria-modal="false" aria-label="Ask Artimist a question">
          <div className="askbot-head">
            <div>
              <span className="askbot-status"><i /> ARTIMIST / STUDIO SEARCH</span>
              <strong>Hello, I’m Artimist.<br />How can I help you?</strong>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close Artimist search"><UiIcon name="close" size={17} /></button>
          </div>

          <form className="askbot-search" onSubmit={submit}>
            <div className="askbot-input-wrap">
              <UiIcon name="search" size={16} />
              <input
                ref={inputRef}
                type="search"
                value={query}
                placeholder="Ask about your house, drawings, BIM or rendering…"
                aria-label="Ask Artimist a question"
                autoComplete="off"
                onChange={(event) => setQuery(event.target.value)}
              />
              <button type="submit" disabled={!query.trim() || loading} aria-label="Search Artimist">
                {loading ? <span className="askbot-loader" aria-hidden="true" /> : <UiIcon name="arrow" size={16} />}
              </button>
            </div>
          </form>

          <div className="askbot-body">
            {!submittedQuery && !result && !error && (
              <div className="askbot-welcome">
                <p>Describe the problem in normal language. I’ll answer from Artimist’s verified services, FAQs and working boundaries, then take you to the right page.</p>
                <div className="askbot-prompts" aria-label="Example questions">
                  {EXAMPLES.map((example) => (
                    <button key={example} type="button" onClick={() => { setQuery(example); void ask(example); }}>{example}</button>
                  ))}
                </div>
                <div className="askbot-guardrail"><span>Verified studio knowledge</span><span>No invented prices</span><span>No false permit promises</span></div>
              </div>
            )}

            {loading && (
              <div className="askbot-thinking">
                <span className="askbot-loader" aria-hidden="true" />
                <p>Finding the right Artimist route…</p>
              </div>
            )}

            {!loading && error && (
              <div className="askbot-answer">
                <span className="askbot-label">Search unavailable</span>
                <p>{error}</p>
                <div className="askbot-actions"><Link href="/faqs">Browse FAQs</Link><Link href="/contact">Start a project</Link></div>
              </div>
            )}

            {!loading && result && (
              <div className="askbot-answer">
                <div className="askbot-answer-top">
                  <span className="askbot-label">Artimist answer</span>
                  <button type="button" onClick={reset}>New question</button>
                </div>
                <p className="askbot-query">“{submittedQuery}”</p>
                <p className="askbot-response">{result.answer}</p>
                {result.followUp && <p className="askbot-follow"><strong>Useful next detail:</strong> {result.followUp}</p>}

                {result.routes.length > 0 && (
                  <div className="askbot-routes">
                    <span className="askbot-label">Recommended pages</span>
                    {result.routes.map((route) => (
                      <Link key={`${route.path}-${route.title}`} href={route.path} onClick={() => track("artimist_search_route", { route: route.path, intent: result.intent })}>
                        <div><small>{route.category}</small><strong>{route.title}</strong><p>{route.reason}</p></div>
                        <UiIcon name="arrow" size={15} />
                      </Link>
                    ))}
                  </div>
                )}

                <div className="askbot-actions">
                  <Link href="/contact">Show us the project</Link>
                  <Link href="/faqs" className="quiet">Browse all FAQs</Link>
                </div>
              </div>
            )}
          </div>

          <div className="askbot-foot">
            <span>Answers are guidance, not local professional certification.</span>
            <Link href="/legal">Boundaries →</Link>
          </div>
        </div>
      )}
    </>
  );
}