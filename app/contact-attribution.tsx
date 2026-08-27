"use client";

import { useEffect } from "react";

const FIELDS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "msclkid", "fbclid"] as const;
const STORAGE_KEY = "artimist_first_touch";

type Attribution = Record<string, string>;

function readStored(): Attribution {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) as Attribution : {};
  } catch {
    return {};
  }
}

function saveStored(value: Attribution) {
  try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value)); } catch {}
}

export function ContactAttribution() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const existing = readStored();
    const current: Attribution = {};
    FIELDS.forEach((field) => {
      const value = params.get(field);
      if (value) current[field] = value.slice(0, 240);
    });

    const firstTouch: Attribution = Object.keys(existing).length ? existing : {
      ...current,
      first_landing_page: `${window.location.pathname}${window.location.search}`.slice(0, 500),
      first_referrer: document.referrer.slice(0, 500),
      first_touch_at: new Date().toISOString(),
    };
    if (!Object.keys(existing).length) saveStored(firstTouch);

    const combined: Attribution = {
      ...firstTouch,
      ...current,
      landing_page: `${window.location.pathname}${window.location.search}`.slice(0, 500),
      referrer: document.referrer.slice(0, 500),
    };

    const form = document.querySelector<HTMLFormElement>(".sp-contact-page form") || document.querySelector<HTMLFormElement>("form");
    if (!form) return;

    Object.entries(combined).forEach(([name, value]) => {
      if (!value) return;
      let input = form.querySelector<HTMLInputElement>(`input[name="${name}"]`);
      if (!input) {
        input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        form.appendChild(input);
      }
      input.value = value;
    });
  }, []);

  return null;
}
