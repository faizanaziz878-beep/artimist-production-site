import type { Metadata } from "next";
import Link from "next/link";
import styles from "./legal.module.css";

export const metadata: Metadata = {
  title: "Client Terms, NDA, Payments & Legal Conditions — Artimist Productions",
  description:
    "Artimist Productions client terms covering international services, permit documentation, payments, NDA and confidentiality, intellectual property, data handling, personnel protection and dispute resolution.",
  alternates: { canonical: "/legal" },
  openGraph: {
    title: "Client Terms & Legal Conditions — Artimist Productions",
    description:
      "Commercial terms for Artimist Productions international architecture support, BIM, visualization, design and creative production services.",
    url: "https://www.artimistproductions.com/legal",
    type: "website",
    images: [{ url: "/media/hero-night.webp", alt: "Artimist Productions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Client Terms & Legal Conditions — Artimist Productions",
    description: "Payments, NDA, IP, permit-documentation boundaries and international client terms.",
    images: ["/media/hero-night.webp"],
  },
};

type Clause = {
  id: string;
  number: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  emphasis?: string;
};

const clauses: Clause[] = [
  {
    id: "role",
    number: "01",
    title: "Artimist's role and professional boundaries",
    paragraphs: [
      "Artimist Productions (\"Artimist\", \"we\", \"us\" or \"our\") is an independent multidisciplinary design, drafting, BIM, visualization, documentation, digital and creative-production service provider. The Client engages Artimist only for the services expressly identified in the applicable proposal, quotation, Statement of Work, Change Order or other written agreement.",
      "Unless expressly stated in a separately signed agreement and legally permitted in the relevant jurisdiction, Artimist is not the Architect of Record, Engineer of Record, statutory building certifier, land surveyor, planning authority, permit authority, building official, contractor, construction manager or other locally regulated professional.",
    ],
    emphasis:
      "Artimist is the service provider and producer of the agreed work. Statutory professional responsibility remains with the locally authorized professional where local law requires one.",
  },
  {
    id: "stamps",
    number: "02",
    title: "No regional stamp, seal or statutory certification",
    paragraphs: [
      "Artimist does not provide a jurisdictional architectural or engineering stamp, seal, signature or professional certification merely because Artimist prepares the drawings or model. Where local law requires a registered architect, engineer or other Professional of Record, the Client must retain that professional unless a separate written agreement expressly provides otherwise.",
      "Artimist may prepare a permit-ready or permit-submission drawing package. The locally licensed professional must independently review the documents, exercise the professional judgment and responsible control required by local law, request any necessary modifications, assume the legally required professional responsibility, and stamp, seal, certify and/or submit the documents where required.",
    ],
    bullets: [
      "Artimist prepares and coordinates the agreed design/documentation package.",
      "The local licensed professional independently reviews and adopts the work as legally required.",
      "The local professional provides any legally required stamp, seal, signature or certification.",
      "The Client/local professional submits to the relevant authority unless submission is separately included in writing.",
      "Artimist does not request or support unlawful 'rubber stamping'.",
    ],
  },
  {
    id: "permits",
    number: "03",
    title: "Permit documentation and authority approvals",
    paragraphs: [
      "Terms such as 'permit drawings', 'permit set', 'permit package' or 'permit-ready drawings' mean documentation intended to support a permit submission within the agreed scope. They do not constitute a guarantee that any authority, architect, engineer, HOA, planning body or other reviewer will approve the project without comments, revisions or additional information.",
      "A correction notice, plan-check comment, request for information or authority-mandated revision does not by itself establish that Artimist breached the agreement. Work caused by changed regulations, changed Client instructions, third-party errors, missing information, engineering requirements, local-professional requirements or matters outside the original scope may be treated as additional services.",
    ],
  },
  {
    id: "client-information",
    number: "04",
    title: "Client information, surveys and third-party material",
    paragraphs: [
      "The Client must provide complete, accurate and timely information reasonably required for the project. Artimist is entitled to reasonably rely upon information supplied by the Client and third parties unless Artimist has expressly contracted to independently verify that information.",
      "Artimist is not responsible for errors or omissions originating in pre-existing CAD files, drawings, surveys, dimensions, BIM models, consultant information, engineering, previous permit sets, photographs, site records or other third-party material. Identifying an apparent issue as a professional courtesy does not transfer responsibility for the original error to Artimist.",
    ],
    bullets: [
      "Site dimensions must be field-verified before construction, fabrication or procurement unless Artimist expressly undertook the applicable survey.",
      "Reconstructing, correcting or redesigning defective third-party information is additional work unless expressly included.",
      "The Client must promptly notify Artimist if supplied information becomes inaccurate, incomplete or outdated.",
    ],
  },
  {
    id: "scope",
    number: "05",
    title: "Scope, change orders and revisions",
    paragraphs: [
      "Artimist is responsible only for the services expressly included in the accepted scope. A task does not automatically become Artimist's responsibility merely because another architect, consultant, permit specialist, contractor or Client representative later requests it or needs it to perform their own scope.",
      "Unless the applicable proposal states otherwise, Artimist includes up to three reasonable revision rounds relating to Artimist's original work. A revision round means one consolidated set of Client comments at a stage. Additional revision rounds are chargeable.",
    ],
    bullets: [
      "Complete redesign, new options after approval, reversal of previously approved decisions and material brief changes are additional services.",
      "Changes caused by inaccurate Client/third-party information, replacement consultants, new authority requirements or expanded deliverables may require a Change Order.",
      "Errors demonstrably created by Artimist within the agreed scope will be reasonably corrected and are not counted as paid Client-requested revisions.",
    ],
  },
  {
    id: "payments",
    number: "06",
    title: "Payment structure",
    paragraphs: [
      "Unless the project-specific agreement states otherwise, Artimist projects use an upfront mobilization payment plus continuing progress billing. The initial payment will normally be 20% to 40% of the contracted or estimated project fee. The remaining 60% to 80% is ordinarily invoiced through monthly progress invoices, agreed milestones, retainers or another billing schedule stated in the project agreement.",
      "Progress invoices may reflect work completed, percentage completion, professional time incurred, resources allocated, monthly retainers, milestones achieved or another agreed billing basis. A valid progress invoice is not deferred merely because later stages of the overall project remain incomplete.",
    ],
    emphasis: "20–40% upfront / 60–80% through monthly or progress billing unless the project agreement states otherwise.",
  },
  {
    id: "deposit",
    number: "07",
    title: "Non-refundable initial deposit",
    paragraphs: [
      "The initial payment is a non-refundable mobilization, capacity-reservation and commencement payment to the fullest extent permitted by applicable law. By paying it, the Client authorizes Artimist to reserve production capacity, allocate personnel, decline or postpone competing work, perform onboarding, review project material, establish project systems and commence production.",
      "Once Artimist has accepted the project and allocated or commenced resources, Client cancellation, a change of mind, consultant replacement, financing problems, a project pause, abandonment, change of location, decision to use another provider or failure to obtain local approval does not create a contractual right to recover the initial payment.",
    ],
    emphasis: "The initial deposit is not a trial payment or free-cancellation period.",
  },
  {
    id: "invoices",
    number: "08",
    title: "Invoices, late payment and suspension",
    paragraphs: [
      "Unless an invoice states otherwise, payment is due within seven calendar days of issuance in cleared funds. The Client is responsible for applicable transfer, payment-processing and banking charges except where law requires otherwise. Taxes may be added where legally required.",
      "If an invoice is overdue, Artimist may suspend services, stop allocating personnel, revise the production schedule, withhold draft or final deliverables, withhold editable/source files, postpone meetings, refuse additional revisions, require future payment in advance and pursue lawful collection remedies.",
      "Where lawful, overdue balances may accrue interest at the lower of 1.5% per month or the maximum rate permitted by applicable law, together with legally recoverable collection and enforcement costs.",
    ],
  },
  {
    id: "delays",
    number: "09",
    title: "Client-caused delay, hourly/daily charges and remobilization",
    paragraphs: [
      "Artimist schedules professional personnel and production capacity in reliance on timely Client information, approvals, feedback and payments. Where a Client-controlled delay prevents efficient continuation of work or causes Artimist to repeat, reserve, re-coordinate or remobilize resources, Artimist may charge additional fees on an hourly, daily, resource-reservation or remobilization basis.",
      "The applicable rates may be stated in the proposal, Change Order, invoice or Artimist professional-rate schedule. Artimist will charge only to the extent contractually permitted and reasonably attributable to the affected project.",
    ],
    bullets: [
      "Delayed approvals, feedback, payments, measurements, surveys or required project information.",
      "Repeated postponement of meetings or failure to consolidate revision comments.",
      "Waiting for Client-appointed architects, consultants, contractors or other third parties.",
      "Client-requested project holds, inactivity or becoming materially unresponsive.",
      "Re-familiarization, staffing and schedule recovery after a project has been paused.",
    ],
    emphasis:
      "Client-caused delay releases Artimist from the affected original schedule. Restart occurs according to then-current production availability; rush recovery may be separately chargeable.",
  },
  {
    id: "handover",
    number: "10",
    title: "Unpaid work, final handover and source files",
    paragraphs: [
      "Drafts supplied during production are supplied for review and do not create an unrestricted final-use right. To the fullest extent permitted by law, the Client must not construct from, submit, publish, reproduce, sell, distribute, commercially exploit or instruct another provider to continue from unpaid Artimist work without written authorization.",
      "Final handover occurs after all amounts due for the applicable project or milestone have been paid in cleared funds. Source files, native BIM/CAD files, working files, internal libraries, templates, scripts, plugins, test files, unused concepts and third-party licensed assets are not automatically included unless expressly listed in the scope.",
    ],
  },
  {
    id: "ip",
    number: "11",
    title: "Intellectual property and usage rights",
    paragraphs: [
      "Artimist retains its rights in Artimist-created work until the payment and licensing/transfer conditions in the applicable agreement are satisfied. Payment does not transfer Artimist's pre-existing methodologies, workflows, templates, BIM libraries, reusable details, scripts, automation, rendering systems, proprietary techniques or know-how.",
      "After full payment, the Client receives the ownership rights or usage license expressly stated in the project agreement. Where no copyright assignment is expressly stated, the default is a perpetual project-use license to the final approved Client-specific deliverables for the project for which they were commissioned, subject to third-party rights and applicable law.",
    ],
  },
  {
    id: "confidentiality",
    number: "12",
    title: "Confidentiality and NDA availability",
    paragraphs: [
      "Artimist treats Client confidential information as confidential regardless of payment status. Clients may request either a Mutual NDA, protecting qualifying confidential information disclosed by both parties, or a One-Way NDA, protecting qualifying information disclosed primarily by one party.",
      "Unless an executed NDA states otherwise, Artimist's standard confidentiality framework covers non-public drawings, plans, models, BIM/CAD files, designs, specifications, project locations, pricing, commercial information, customer information, credentials, technical material, software, source code, business plans, prototypes and other information a reasonable person would understand to be confidential.",
    ],
    bullets: [
      "Confidential information is used only for the engagement, legitimate administration, enforcement and legal compliance.",
      "Disclosure is limited to personnel, contractors, consultants and advisers who reasonably need access and are subject to appropriate obligations.",
      "Public information, independently developed information and lawfully obtained non-confidential information are excluded.",
      "Legally compelled disclosure may be made; reasonable prior notice will be given where law permits.",
      "Ordinary confidentiality obligations generally continue for five years after the last disclosure or project termination unless the executed NDA states otherwise.",
      "Qualifying trade secrets remain protected for as long as they retain trade-secret status under applicable law.",
    ],
  },
  {
    id: "data",
    number: "13",
    title: "Client data, privacy and retention",
    paragraphs: [
      "Client personal and confidential data remains protected according to applicable confidentiality and privacy obligations even when a commercial payment dispute exists. Personal information is not treated as collateral for an unpaid invoice. Artimist protects itself commercially by suspending services, withholding unpaid work product, restricting unpaid licenses and pursuing lawful debt recovery.",
      "Artimist may retain project records for legitimate purposes including performance of services, project history, accounting, taxation, legal claims, insurance, security, backup integrity and regulatory compliance. Personal information will not knowingly be retained indefinitely without a legitimate basis where applicable law requires deletion, minimization or a retention limit.",
    ],
    bullets: [
      "Artimist may use commercially reasonable cloud, collaboration and production systems to provide the services.",
      "Cross-border processing may occur where international team members or technology providers are reasonably required.",
      "The Client is responsible for maintaining its own permanent archive after final delivery; Artimist does not guarantee indefinite storage.",
    ],
  },
  {
    id: "personnel",
    number: "14",
    title: "Artimist personnel, official channels and authority",
    paragraphs: [
      "Artimist employees, consultants, specialists, subcontractors, freelancers and production personnel remain within Artimist's managed professional-delivery structure. The introduction of an Artimist team member to a Client does not create an independent commercial relationship between the Client and that individual.",
      "Commercial instructions and decisions concerning pricing, scope, additional work, payment, ownership, refunds, deadlines or separate engagement must be confirmed through Artimist-authorized channels or representatives. An unauthorized personal statement by an individual team member does not amend the Client agreement.",
    ],
    bullets: [
      "Project collaboration with team members is permitted; deliberate commercial circumvention is not.",
      "Project-related payments must not be made privately to individual Artimist personnel unless Artimist expressly authorizes that arrangement in writing.",
      "An unauthorized private payment does not automatically discharge the Client's payment obligation to Artimist.",
    ],
  },
  {
    id: "noncircumvention",
    number: "15",
    title: "Non-circumvention and non-solicitation",
    paragraphs: [
      "To the fullest extent permitted by applicable law, the Client must not intentionally use Artimist's introduction of a team member, specialist, subcontractor or consultant to obtain substantially similar services directly while excluding Artimist from the commercial relationship. The restriction applies only to relationships materially introduced through Artimist and is intended to protect legitimate recruitment, training, production-capacity and business-development investment.",
      "Subject to mandatory local law, this restriction applies during the engagement and for 12 months after completion or termination of the Client's last active Artimist engagement. General recruitment advertising not specifically targeted at Artimist personnel is not prohibited.",
    ],
    bullets: [
      "No secret side agreements, direct freelance arrangements or undisclosed project-related payments with Artimist personnel.",
      "No indirect circumvention through an affiliate, related entity, intermediary, director, contractor or other person acting substantially on the Client's behalf.",
      "Direct hiring may be permitted with prior written Artimist approval and an agreed recruitment, conversion, release or placement fee.",
    ],
  },
  {
    id: "remedies",
    number: "16",
    title: "Circumvention remedies and liquidated damages",
    paragraphs: [
      "Intentional circumvention, secret engagement of Artimist personnel, misuse of confidential information or diversion of Artimist work may constitute a material breach. Artimist may suspend the affected project and pursue lawful contractual, intellectual-property, confidentiality, injunctive and financial remedies.",
      "Where a project agreement specifies a conversion fee or liquidated-damages amount, the parties intend that amount to represent a reasonable estimate of anticipated commercial loss and administrative cost rather than an unlawful punishment. Any amount will apply only to the extent enforceable under the law applicable to the claim.",
    ],
    emphasis:
      "Artimist may seek actual damages, unpaid contractual fees, injunctive relief and legally recoverable enforcement costs. Artimist will not recover twice for the same loss.",
  },
  {
    id: "third-parties",
    number: "17",
    title: "Consultants, contractors, procurement and construction",
    paragraphs: [
      "Artimist is not responsible for the acts, omissions, delays, negligence, errors, professional decisions, insolvency or contractual performance of independent architects, engineers, permit specialists, contractors, suppliers, authorities or other third parties merely because Artimist communicates or coordinates with them.",
      "Contractors remain responsible for construction means, methods, sequencing, site safety, workmanship and field verification. Product suggestions and Bills of Materials may rely on third-party information; prices, availability, specifications and lead times must be confirmed before purchase.",
    ],
  },
  {
    id: "visualization",
    number: "18",
    title: "Visualizations, BIM and digital models",
    paragraphs: [
      "Renderings, animations and conceptual visualizations communicate design intent and are not photographs or guarantees of exact completed construction. Actual appearance may vary because of lighting, materials, manufacturing, workmanship, site conditions, supplier changes and construction tolerances.",
      "BIM and digital models may contain information at different levels of development. They must not be relied upon for purposes beyond the contractually agreed use or Level of Development. Fabrication, structural performance, quantities and critical construction decisions require the appropriate verification and professional responsibility.",
    ],
  },
  {
    id: "schedule",
    number: "19",
    title: "Approvals, schedules and project inactivity",
    paragraphs: [
      "Where the Client approves a design stage, drawing, model or deliverable, Artimist may rely on that approval for subsequent work. Changes after approval may affect both fees and schedule.",
      "Project schedules are estimates unless a specific deadline is expressly guaranteed in writing. Timelines depend on timely Client feedback, approvals, payments, consultant information and authority responses. Client or third-party delay entitles Artimist to a reasonable corresponding schedule adjustment.",
      "A project that remains materially inactive may be placed on hold, removed from active production and later restarted according to then-current availability. A reasonable remobilization fee may apply where substantial project resources must be restored or reassigned.",
    ],
  },
  {
    id: "termination",
    number: "20",
    title: "Cancellation and termination",
    paragraphs: [
      "If the Client terminates the engagement, the Client remains responsible for services performed to the termination date, approved expenses, committed third-party costs, completed additional work and other amounts already earned. The initial mobilization payment remains non-refundable to the fullest extent permitted by applicable law.",
      "Artimist may suspend or terminate an engagement for material non-payment, abusive or threatening conduct, unlawful instructions, repeated material breach, unauthorized use of unpaid work, intellectual-property misuse, serious confidentiality breach, fraudulent activity, sanctions restrictions or requests requiring unlawful or professionally improper activity.",
    ],
  },
  {
    id: "liability",
    number: "21",
    title: "Standard of care and limitation of liability",
    paragraphs: [
      "Artimist will use commercially reasonable skill and care appropriate to the services expressly undertaken. Where a correctable issue is reasonably attributable to Artimist's contracted service, Artimist should ordinarily be given a reasonable opportunity to correct the affected work before another provider is engaged to replace that work, except where immediate action is reasonably necessary.",
      "To the fullest extent permitted by applicable law, Artimist is not liable for indirect, incidental, special, exemplary, punitive or consequential loss, including lost profit, lost opportunity, loss of anticipated savings, financing loss or business interruption. To the fullest extent permitted by law, Artimist's aggregate liability arising from a particular project will not exceed the professional fees actually paid to Artimist for the service giving rise to the claim.",
    ],
    emphasis:
      "Nothing in these Terms excludes or limits liability that applicable law does not permit the parties to exclude or limit.",
  },
  {
    id: "indemnity",
    number: "22",
    title: "Client-caused loss, indemnity and force majeure",
    paragraphs: [
      "To the fullest extent permitted by law, Artimist is not responsible for loss primarily caused by incorrect Client information, inaccurate surveys, third-party drawings, defective construction, contractor/consultant errors, unauthorized modifications, use of preliminary documents, use outside the agreed purpose, changed regulations, hidden site conditions or force-majeure events.",
      "The Client will indemnify Artimist against third-party claims and reasonable costs arising from unlawful Client instructions, Client-provided material that infringes third-party rights, unauthorized use of Artimist work, material alteration of Artimist work by others, misuse of preliminary documents or use outside the agreed purpose, except to the extent applicable law requires Artimist to bear the liability itself.",
    ],
  },
  {
    id: "international",
    number: "23",
    title: "International services and multiple jurisdictions",
    paragraphs: [
      "Artimist may provide services internationally. A project can therefore involve the jurisdiction of the Artimist contracting entity, the Client's residence or incorporation, the physical project location, the arbitral seat, data-processing locations and jurisdictions in which enforcement is sought.",
      "There is no single universal body of 'international law' that automatically replaces national contract law. The governing law stated in the project-specific agreement will govern the commercial contract to the fullest extent permitted, while mandatory laws that legally cannot be excluded continue to apply where required.",
      "Architecture, engineering, planning, zoning, building-control and professional-licensing requirements remain jurisdiction-specific and are governed by the rules applicable to the physical project and the professionals performing regulated functions there.",
    ],
  },
  {
    id: "disputes",
    number: "24",
    title: "Negotiation, arbitration and cross-border enforcement",
    paragraphs: [
      "Before commencing formal proceedings, commercial parties should first provide written notice of the dispute and attempt good-faith management-level negotiation, unless urgent debt preservation, intellectual-property protection, confidentiality relief, evidence preservation, emergency injunctive relief or another immediate remedy is reasonably necessary.",
      "For international Business-to-Business engagements, the project agreement may provide for binding international arbitration, including ICC arbitration, with the seat, governing law, language and number of arbitrators stated in that agreement. Unless otherwise agreed, English should be the contractual and arbitration language.",
      "A valid arbitration award, judgment or settlement may be recognized and enforced wherever lawful enforcement is available, including a jurisdiction where the Client resides, conducts business or maintains assets. Artimist may seek appropriate interim or enforcement relief from a competent court without necessarily waiving an otherwise valid arbitration agreement.",
    ],
  },
  {
    id: "client-location",
    number: "25",
    title: "Client-location and mandatory local law",
    paragraphs: [
      "Where mandatory legislation in the Client's country, state, province or territory applies notwithstanding a contractual choice of law, the parties will comply with those compulsory requirements to the extent legally required. This does not mean the entirety of the Client's local law automatically replaces the agreed governing law.",
      "Where the Client is legally classified as a consumer rather than a business Client, mandatory consumer protections that cannot legally be waived remain applicable. These Terms are primarily designed for commercial and professional engagements.",
    ],
  },
  {
    id: "electronic",
    number: "26",
    title: "Electronic acceptance and project records",
    paragraphs: [
      "Subject to applicable law, an Artimist agreement may be accepted by electronic signature, signed PDF, accepted proposal, purchase order, payment of the initial deposit, written electronic acceptance or another legally recognizable electronic act demonstrating agreement.",
      "Emails, approved messaging records, project-platform approvals, invoices, payment records and meeting records may be retained as evidence of instructions, approvals and the commercial relationship. Project-specific signed documents and approved Change Orders take precedence over general website Terms where they expressly conflict.",
    ],
  },
  {
    id: "general",
    number: "27",
    title: "Severability, waiver and maximum lawful effect",
    paragraphs: [
      "Failure to enforce a contractual right immediately does not permanently waive that right. If a provision is invalid or unenforceable in a particular jurisdiction, it should be interpreted or modified to the minimum extent necessary to preserve its lawful commercial purpose where permitted; otherwise it will be severed without automatically invalidating the remainder of the agreement.",
      "Payment, confidentiality, intellectual property, data protection, indemnity, liability, dispute-resolution and other provisions that are intended by their nature to survive will continue after completion or termination.",
      "Every provision is intended to operate to the maximum extent permitted by applicable law. An unenforceable provision in one jurisdiction does not automatically invalidate another provision or the enforceability of the same provision in another jurisdiction where it is lawful.",
    ],
  },
];

const highlights = [
  ["20–40%", "Initial mobilization payment", "Non-refundable to the fullest extent permitted by applicable law."],
  ["60–80%", "Progress balance", "Normally billed monthly, by milestone or agreed progress schedule."],
  ["3", "Revision rounds", "Unless the project-specific proposal expressly states otherwise."],
  ["NDA", "Available", "Mutual or one-way confidentiality arrangements are available on request."],
] as const;

export default function LegalPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroInner}>
          <p className={styles.kicker}>ARTIMIST PRODUCTIONS / CLIENT FRAMEWORK</p>
          <h1>Clear terms.<br />Protected work.</h1>
          <p className={styles.lede}>
            International client terms for design, architecture support, permit documentation, BIM, visualization, interiors, animation, digital production and related professional services.
          </p>
          <div className={styles.heroActions}>
            <a href="#terms" className={styles.primaryAction}>Read the terms</a>
            <Link href="/contact" className={styles.secondaryAction}>Discuss a contract</Link>
          </div>
          <p className={styles.updated}>Last updated · 29 August 2026</p>
        </div>
      </section>

      <section className={styles.highlights} aria-label="Key commercial terms">
        {highlights.map(([value, label, note]) => (
          <article key={label} className={styles.highlightCard}>
            <strong>{value}</strong>
            <h2>{label}</h2>
            <p>{note}</p>
          </article>
        ))}
      </section>

      <section className={styles.notice}>
        <div>
          <span>IMPORTANT</span>
          <h2>Artimist prepares the work. Local professionals provide local statutory responsibility.</h2>
        </div>
        <p>
          Artimist does not automatically provide a jurisdictional architect/engineer stamp or act as the Architect or Engineer of Record. Where local law requires a licensed professional, that professional must independently review, assume the legally required responsibility, stamp/seal where appropriate and participate in submission as required.
        </p>
      </section>

      <div id="terms" className={styles.termsLayout}>
        <aside className={styles.toc}>
          <p>CONTENTS</p>
          <nav aria-label="Legal page contents">
            {clauses.map((clause) => (
              <a key={clause.id} href={`#${clause.id}`}>
                <span>{clause.number}</span>{clause.title}
              </a>
            ))}
          </nav>
        </aside>

        <div className={styles.clauses}>
          <header className={styles.termsHeader}>
            <p>CLIENT TERMS / PROFESSIONAL SERVICES / PAYMENT / NDA / IP / DATA</p>
            <h2>Standard Client Terms & Legal Conditions</h2>
            <p>
              These Terms form Artimist's standard commercial framework. A signed project-specific proposal, Statement of Work, NDA, Change Order or Client Agreement may add to or vary these Terms. Where a project-specific signed term expressly conflicts with this page, the project-specific written term controls for that issue.
            </p>
          </header>

          {clauses.map((clause) => (
            <article id={clause.id} key={clause.id} className={styles.clause}>
              <div className={styles.clauseNo}>{clause.number}</div>
              <div className={styles.clauseBody}>
                <h2>{clause.title}</h2>
                {clause.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {clause.bullets && (
                  <ul>
                    {clause.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                )}
                {clause.emphasis && <div className={styles.emphasis}>{clause.emphasis}</div>}
              </div>
            </article>
          ))}

          <section className={styles.acknowledgement}>
            <p>CLIENT ACKNOWLEDGEMENT</p>
            <h2>By engaging Artimist Productions, the Client acknowledges the commercial structure above.</h2>
            <div className={styles.ackGrid}>
              <p>Artimist performs only the scope expressly agreed in writing.</p>
              <p>Local professional stamps, seals and statutory certifications are not automatically included.</p>
              <p>The initial 20–40% mobilization payment is non-refundable to the fullest extent permitted by law.</p>
              <p>Remaining fees are normally payable through monthly or progress billing.</p>
              <p>Client-caused delays may result in hourly, daily, reservation or remobilization charges.</p>
              <p>Unpaid work and final/source-file handover remain subject to the payment and licensing terms.</p>
              <p>Three reasonable revision rounds apply unless the proposal states otherwise.</p>
              <p>NDA protection is available and Client personal/confidential data remains protected regardless of payment disputes.</p>
              <p>Deliberate off-channel commercial circumvention or targeted solicitation of Artimist personnel may be actionable to the extent permitted by law.</p>
              <p>Mandatory laws of the Client/project jurisdiction continue to apply where they cannot legally be excluded.</p>
            </div>
          </section>

          <section className={styles.legalNote}>
            <p>LEGAL NOTICE</p>
            <h2>Project-specific legal review may still be required.</h2>
            <p>
              These Terms are designed as Artimist Productions' international commercial framework and are not a representation that one contract can override every mandatory law, consumer rule, privacy requirement or professional-licensing regulation worldwide. For regulated, high-value or jurisdiction-specific engagements, Artimist may require a separate Client Agreement, NDA, Data Processing Agreement, IP agreement or other project-specific document.
            </p>
          </section>

          <footer className={styles.pageFooter}>
            <div>
              <strong>ARTIMIST PRODUCTIONS</strong>
              <span>Architecture · BIM · Interiors · Visualization · Creative Production</span>
            </div>
            <div className={styles.footerLinks}>
              <Link href="/contact">Project enquiries</Link>
              <a href="mailto:Faizan@artimistproductions.com">Contract / NDA enquiries</a>
            </div>
            <p>© 2026 Artimist Productions. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </main>
  );
}
