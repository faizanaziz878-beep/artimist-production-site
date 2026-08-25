"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Records one visit per page view for the studio control room.
 *
 * The visitor id is random, lives in this tab's own sessionStorage and is never
 * linked to anything identifying — it exists only so repeat views by one person
 * are not counted as separate visitors. Never blocks or delays the page.
 */
export function VisitorTracker() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || lastPath.current === pathname) return;
    lastPath.current = pathname;

    let visitorId = "";
    try {
      visitorId = sessionStorage.getItem("artimist_v") || "";
      if (!visitorId) {
        visitorId = Math.random().toString(36).slice(2) + Date.now().toString(36);
        sessionStorage.setItem("artimist_v", visitorId);
      }
    } catch {
      // Private mode or blocked storage: the view still counts, anonymously.
    }

    const body = JSON.stringify({
      path: pathname,
      referrer: document.referrer || "",
      visitorId,
    });

    // keepalive so the write survives an immediate navigation away.
    fetch("/api/track", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  return null;
}
