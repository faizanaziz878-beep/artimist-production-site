import { inquiries } from "../../../db/schema";
import { publicContactEmail, sendNotification, sendReceiptConfirmation } from "../../../lib/notify";

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function makeReference() {
  const stamp = Date.now().toString(36).toUpperCase();
  const salt = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `AP-${stamp}-${salt}`;
}

async function confirmReceipt(
  email: string,
  fields: {
    reference: string;
    name: string;
    company: string;
    projectType: string;
    projectLocation: string;
    projectStage: string;
    budget: string;
    timeline: string;
    preferredContact: string;
    sourceLinks: string;
    message: string;
  },
) {
  try {
    await sendReceiptConfirmation(email, fields);
  } catch {
    // The lead is already stored/notified, so confirmation must never block it.
  }
}

export async function POST(request: Request) {
  let payload: {
    name: string;
    email: string;
    company: string;
    projectType: string;
    projectLocation: string;
    projectStage: string;
    budget: string;
    timeline: string;
    preferredContact: string;
    sourceLinks: string;
    message: string;
    utmSource: string;
    utmMedium: string;
    utmCampaign: string;
    utmTerm: string;
    utmContent: string;
    gclid: string;
    msclkid: string;
    fbclid: string;
    landingPage: string;
    referrer: string;
    firstLandingPage: string;
    firstReferrer: string;
    firstTouchAt: string;
  };

  try {
    const body = (await request.json()) as Record<string, unknown>;
    payload = {
      name: clean(body.name, 80),
      email: clean(body.email, 160),
      company: clean(body.company, 120),
      projectType: clean(body.projectType, 120),
      projectLocation: clean(body.projectLocation, 140),
      projectStage: clean(body.projectStage, 100),
      budget: clean(body.budget, 80),
      timeline: clean(body.timeline, 100),
      preferredContact: clean(body.preferredContact, 40),
      sourceLinks: clean(body.sourceLinks, 1200),
      message: clean(body.message, 4000),
      utmSource: clean(body.utm_source, 240),
      utmMedium: clean(body.utm_medium, 240),
      utmCampaign: clean(body.utm_campaign, 240),
      utmTerm: clean(body.utm_term, 240),
      utmContent: clean(body.utm_content, 240),
      gclid: clean(body.gclid, 240),
      msclkid: clean(body.msclkid, 240),
      fbclid: clean(body.fbclid, 240),
      landingPage: clean(body.landing_page, 500),
      referrer: clean(body.referrer, 500),
      firstLandingPage: clean(body.first_landing_page, 500),
      firstReferrer: clean(body.first_referrer, 500),
      firstTouchAt: clean(body.first_touch_at, 80),
    };
  } catch {
    return Response.json({ error: "That submission could not be read. Please try again." }, { status: 400 });
  }

  const { name, email, company, projectType, projectLocation, projectStage, budget, timeline, preferredContact, sourceLinks, message } = payload;
  if (!name || !/^\S+@\S+\.\S+$/.test(email) || !projectType || message.length < 20) {
    return Response.json(
      { error: "Please complete your name, email, project type and a short project brief." },
      { status: 400 },
    );
  }

  const reference = makeReference();
  const storedMessage = [
    `Reference: ${reference}`,
    projectLocation ? `Project location: ${projectLocation}` : "",
    projectStage ? `Project stage: ${projectStage}` : "",
    preferredContact ? `Preferred contact: ${preferredContact}` : "",
    sourceLinks ? `Source files / share link: ${sourceLinks}` : "",
    "",
    message,
  ].filter(Boolean).join("\n");

  let stored = false;
  try {
    const { getDb } = await import("../../../db");
    await getDb().insert(inquiries).values({ name, email, company, projectType, budget, timeline, message: storedMessage });
    stored = true;
  } catch {
    // No database binding on this host — the email copy below remains the record.
  }

  const emailed = await sendNotification(
    `New studio enquiry ${reference} — ${name}`,
    {
      Reference: reference,
      Name: name,
      Email: email,
      Company: company,
      "Project type": projectType,
      "Project location": projectLocation,
      "Project stage": projectStage,
      Budget: budget,
      Timeline: timeline,
      "Preferred contact": preferredContact,
      "Source files / share link": sourceLinks,
      Brief: message,
      "UTM source": payload.utmSource,
      "UTM medium": payload.utmMedium,
      "UTM campaign": payload.utmCampaign,
      "UTM term": payload.utmTerm,
      "UTM content": payload.utmContent,
      "Google click ID": payload.gclid,
      "Microsoft click ID": payload.msclkid,
      "Meta click ID": payload.fbclid,
      "Current landing page": payload.landingPage,
      "Current referrer": payload.referrer,
      "First landing page": payload.firstLandingPage,
      "First referrer": payload.firstReferrer,
      "First touch": payload.firstTouchAt,
    },
    email,
  );

  if (stored || emailed) {
    await confirmReceipt(email, { reference, name, company, projectType, projectLocation, projectStage, budget, timeline, preferredContact, sourceLinks, message });
    return Response.json({ ok: true, reference }, { status: 201 });
  }

  return Response.json(
    {
      error: `The studio inbox is temporarily unavailable. Please email us directly at ${publicContactEmail()} and we will reply as soon as possible.`,
    },
    { status: 503 },
  );
}
