# ZamNexus Website: Phase 3 Content & Design

**Date:** 30 October 2026
**Builds on:** [Phase 1](phase-1-content-audit.md) and the approved [Phase 2 structure](phase-2-structure.md): Industries removed, services merged 8 → 6, lowercase URLs.
**Tone:** professional, plain and specific. British English, since Zamooq Limited is a UK company. Short sentences. Every claim is either a product capability already described on the current site or marked **[NEEDS CLIENT CONFIRMATION]**.

---

## Part A: Design direction

### A1. The design system is the code, not `CLAUDE.md`

`CLAUDE.md` and `AGENTS.md` describe a lime (#D0FF71) on #090b10 system. The live code (`app/globals.css`) actually uses **deep navy + electric blue**. This plan keeps the blue system that's already built and recommends updating both docs to match. Switching back to lime would mean restyling every page for no buyer benefit.

### A2. Colour palette

| Token | Hex | Use | Contrast on `#0A0F1E` |
|---|---|---|---|
| `--background` | `#0A0F1E` | Page background | — |
| `--surface-primary` | `#111827` | Cards, panels, navbar | — |
| `--surface-secondary` | `#1E293B` | Raised surfaces, input fill | — |
| `--foreground-strong` | `#F8FAFC` | Headings | 18.6:1 ✅ |
| `--foreground` | `#E2E8F0` | Body text | 15.5:1 ✅ |
| `--foreground-muted` | `#94A3B8` | Secondary text, captions | 7.5:1 ✅ |
| `--accent` | `#2563EB` | **Fills only**: buttons, focus rings, active tabs | 3.7:1 ❌ as text |
| `--accent-hover` | `#3B82F6` | Button hover; **accent text at ≥18px** | 5.2:1 ✅ |
| `--accent-text` *(new)* | `#60A5FA` | Accent text at any size: tags, links, labels | 7.5:1 ✅ |
| `--border-subtle` | `rgba(148,163,184,0.14)` | Card borders | — |
| `--border-strong` | `rgba(37,99,235,0.45)` | Hover/active borders | — |
| `--success` *(new)* | `#34D399` | Success states | 10.9:1 ✅ |
| `--danger` *(new)* | `#F87171` | Error states | 6.6:1 ✅ |

**Product accent colours** (one each, used only on that product's page and its card): ZNXERP `#F59E0B`, ZNXePOS `#F97316`, ZNXEdu `#8B5CF6`, ZNXCare `#F43F5E` [confirm these match the product logos].

**Accessibility fixes this palette requires:**
- `text-zinc-500` (3.9:1) and `text-zinc-600` (2.5:1) fail WCAG AA for small text. Replace them everywhere with `--foreground-muted` (7.5:1).
- White text on `#2563EB` buttons passes (5.2:1). Keep primary buttons white-on-blue.
- The emoji icons in sector and intent cards get `aria-hidden="true"` and are replaced by line icons (see A6).

### A3. Typography

| Role | Font | Size (mobile → desktop) | Weight | Notes |
|---|---|---|---|---|
| Display / H1 | **Sora** | 36 → 64px, line-height 1.08 | 700 | One per page, ≤ 12 words |
| H2 | Sora | 28 → 44px | 700 | Section titles |
| H3 | Inter | 20 → 24px | 600 | Card titles |
| Body | **Inter** | 16 → 17px, line-height 1.65 | 400 | Max 68 characters per line |
| Label / tag | Geist Mono | 12px, uppercase, tracking 0.12em | 600 | Uses `--accent-text` |
| Caption | Inter | 13px | 400 | Uses `--foreground-muted` |

That keeps the current three fonts, but **Geist Mono is limited to labels and code samples**. Today it's used for body copy and form fields, which hurts readability. If page weight becomes an issue, drop Geist Mono for Inter with `font-variant-numeric: tabular-nums`.

### A4. Spacing & layout

- Content width `max-w-6xl` (1152px), with articles at `max-w-3xl`.
- Section rhythm: `py-20 sm:py-24` (80/96px), using the existing `--space-*` 8px scale.
- Gutters: 16px under 640px, 24px above.
- Grids: 1 column under 640px, 2 columns from 640px, 3–4 columns from 1024px. Card gap 24px.
- Radius: cards 24px (`rounded-3xl`), inputs 12px, buttons full pill.
- Every section has **one** job and **one** heading. No section repeats on another page (see the Phase 1 duplication table).

### A5. Visual style

- Calm, engineered and dark. Depth comes from surface layers and borders, not glows.
- **Motion budget:** one hero effect per page at most, plus 250ms hover transitions. The 3D background stays on Home only, lazy-loaded and switched off under `prefers-reduced-motion`. The simulated consoles stay on product pages as the visual hero, but their numbers are labelled "Illustrative".
- Real photography only: product screenshots, office and team photos. No stock photos of handshakes or server rooms.

### A6. Imagery & icons

| Asset | Where | Spec |
|---|---|---|
| **Product screenshots** (2–3 per product: dashboard, a key workflow, mobile) | Product pages, Products hub | 1600×1000 WebP, sanitised demo data [NEEDS CLIENT CONFIRMATION: client supplies or approves] |
| **Team headshots** | About | 800×800, consistent background. `public/team/*` exists but is unused; use it only if those people are real staff [NEEDS CLIENT CONFIRMATION] |
| **Office photo** (Islamabad, Luton) | About, Contact | 1600×900 [NEEDS CLIENT CONFIRMATION] |
| **Client logos** (only with written permission) | Home, product pages | SVG, monochrome `#94A3B8`, full colour on hover |
| **Partner badges** (only those actually held) | Home, About, footer | Official SVGs |
| **Open Graph images** | 1 site-wide + 1 per product + 1 per article | 1200×630 PNG, brand navy, product name + one-line value proposition |
| **Icons** | Services, product modules, contact intents | One line-icon set (Lucide-style, 1.5px stroke, 24px) inlined as SVG to avoid a library. They replace every emoji |

### A7. Component system

All components use the tokens above. Most already exist in `components/` and only need restyling. New ones are marked *new*.

| Component | Spec | States |
|---|---|---|
| **Button: primary** | Pill, `#2563EB` fill, white 15px/600 label, 48px tall, 24px horizontal padding, trailing arrow | Hover `#3B82F6` + 1px lift; focus 2px `#60A5FA` ring with 2px offset; disabled 60% opacity; loading "Sending…" |
| **Button: secondary** | Pill, transparent, 1px `--border-subtle`, `#E2E8F0` label | Hover border `--border-strong` |
| **Text link** | `#60A5FA`, underline on hover | Focus ring as above |
| **Card** | `#111827`, 1px `--border-subtle`, radius 24px, padding 24/32px | Hover: border `--border-strong`, lift 4px (only when the whole card is a link) |
| **Product card** | Card + product accent top bar (2px) + logo + one-line purpose + 3 bullet outcomes + "See ZNXERP →" | Same as card |
| **Service section** *new* | Anchor id, icon, H2, 2-sentence outcome, "What you get" list (≤6), "Typical engagement" line, related product/article link | — |
| **Stat** | Number (Sora 40px) + label (13px muted). **Only verified figures** | Animated count only on first view, never on reduced motion |
| **Testimonial** *new* | Quote (18px, ≤40 words), name, role, company, optional logo | Shown only when supplied |
| **Case study card** *new* | Client/sector, problem (1 line), result (1 number + label), "Read case study" | — |
| **FAQ** *new* | Native `<details>`/`<summary>`, 1px dividers, plus/minus icon | Keyboard-operable by default. Feeds `FAQPage` schema |
| **Form field** | Visible `<label for>` above the input (13px, `--foreground`), input 48px tall, `#1E293B` fill, radius 12px | Focus: 2px `#3B82F6` border; error: `#F87171` border + message under the field with `aria-describedby`; required fields marked "(required)" in text, not just `*` |
| **Choice chips** (contact intents, timeline) | Existing `PillTab`, with `role="checkbox"`/`role="radio"` and `aria-checked` | Selected: accent fill |
| **Alert** | Inline, `role="alert"`, icon + text | Success `#34D399`, error `#F87171` |
| **Final CTA band** | Existing `FinalCTA`: H2 + one sentence + primary + secondary button | — |
| **Footer** | 4 columns (Phase 2 §2), then company number + address line | — |

---

## Part B: Page-by-page content

Character counts are checked in Part C. The order of the sections is the order on the page.

### 1. Home: `/`

**SEO title:** `ZamNexus | ERP, POS, EHR & Enterprise Software Engineering` (58)
**Meta description:** `Four ready-to-deploy business platforms, plus the engineers to build what you need next: AI, cloud, SaaS, Microsoft and Salesforce. Book a consultation.` (152)

| # | Section | Content |
|---|---|---|
| 1 | **Hero** | **Tag:** ZAMNEXUS · A ZAMOOQ LIMITED COMPANY<br>**H1:** Software that runs your operations, and the engineers who build the rest.<br>**Sub:** ZamNexus makes four business platforms for manufacturing, retail, education and healthcare, and delivers custom AI, cloud, Microsoft and Salesforce projects for organisations in the UK, Pakistan and the UAE.<br>**Primary:** Book a consultation · **Secondary:** See the products |
| 2 | **Proof strip** | Client logos with permission [NEEDS CLIENT CONFIRMATION]. If none are approved, show 3 verified facts instead, e.g. "Established 2009" · "Offices in Luton and Islamabad" · "4 production platforms" [NEEDS CLIENT CONFIRMATION for 2009]. |
| 3 | **Products** (H2: Four platforms, ready to deploy) | 4 product cards:<br>• **ZNXERP**: Finance, production, inventory and quality control in one system, for manufacturers and pharmaceutical plants.<br>• **ZNXePOS**: Fast checkout that keeps working offline, with stock synced across every branch.<br>• **ZNXEdu**: Admissions, fees, attendance, timetables and a parent app, for schools and multi-campus groups.<br>• **ZNXCare**: Patient records, lab machines, pharmacy and billing connected, for hospitals and clinics. |
| 4 | **Services** (H2: When you need something built) | 6 compact tiles (icon + name + one line) linking to `/services#…`:<br>AI & Automation: put AI to work inside your real processes, with guardrails.<br>SaaS Product Development: from architecture to a product customers pay for.<br>Cloud-Native Engineering: serverless AWS systems that scale and cost less to run.<br>Integration & Modernisation: connect your systems and retire legacy safely.<br>Microsoft Dynamics 365: implementation, customisation and Copilot.<br>Salesforce: Sales and Service Cloud, integrated with the rest of your stack. |
| 5 | **Who we work with** (H2: Built for regulated, high-volume operations) | 4 sector rows linked to their product (Manufacturing & pharma → ZNXERP, Retail & distribution → ZNXePOS, Education → ZNXEdu, Healthcare → ZNXCare). One line under them: "Financial services, professional services, property or public sector? Our engineering services cover you. **Talk to us →**" |
| 6 | **How we work** (H2: One accountable team from first call to go-live) | 3 points, replacing the 6-step diagram that's repeated on 3 pages:<br>**Senior people on your project:** the architects who scope it stay to deliver it.<br>**Fixed milestones:** discovery, build, go-live and support, each with a sign-off.<br>**Support after launch:** we run and improve what we ship.<br>Link: "See our full delivery process →" (`/services#process`) |
| 7 | **Testimonial** | 1 quote [NEEDS CLIENT CONFIRMATION]. Section hidden if none is supplied. |
| 8 | **Latest insight** | Featured article card + "All insights →" |
| 9 | **Final CTA** | **H2:** Tell us what you need to run better. **Sub:** We reply within one business day. **Primary:** Book a consultation **Secondary:** contact@zamnexus.com |

**Removed from Home:** the "Why Enterprises Partner" grid (now on About), the full 8-sector grid, the 6-step process, the integration diagram (moves to `/services#integration`) and the unverified client marquee.

---

### 2. Services: `/services`

**SEO title:** `Software Engineering Services | AI, Cloud, Dynamics 365` (55)
**Meta description:** `AI and automation, SaaS development, cloud-native engineering, systems integration, Microsoft Dynamics 365 and Salesforce. Senior teams, fixed milestones.` (154)

| # | Section | Content |
|---|---|---|
| 1 | **Hero** | **Tag:** SERVICES<br>**H1:** Engineering services for systems that can't fail.<br>**Sub:** Six services, one senior team. We scope, build, integrate and support, so you deal with the same people from first call to go-live.<br>**Jump links:** 6 anchor pills · **Primary:** Book a consultation |
| 2 | **AI & Automation** `#ai-automation` (aliases `#ai-intelligent`, `#intelligent-automation`, `#ai-powered-business`, `#ai-powered`, `#automation`) | **Outcome:** Put AI to work inside the processes you already run, such as approvals, document handling and customer service, with a person in control where it matters.<br>**What you get:** AI readiness assessment and use-case shortlist · copilots and assistants trained on your own documents (RAG) · document extraction and OCR · multi-step agents with approval checkpoints · process automation across ERP and CRM · guardrails, logging and audit trails<br>**Related:** Insight "Autonomous Multi-Agent AI in Regulated Supply Chains" |
| 3 | **SaaS Product Development** `#saas` (aliases `#saas-development`, `#saas-platforms`) | **Outcome:** Turn a product idea or an internal tool into a secure multi-tenant SaaS product that customers can sign up for and pay for.<br>**What you get:** product and technical architecture · multi-tenant design with data isolation · self-serve customer portals · subscription billing (Stripe, Paddle) · roles, permissions and audit logs · CI/CD with zero-downtime releases<br>**Related:** Insight "AWS Serverless vs Kubernetes" |
| 4 | **Cloud-Native Engineering** `#cloud` (aliases `#cloud-native`, `#cloud-native-solutions`) | **Outcome:** Back-end systems on AWS that scale up for peaks and down to save money, defined as code so they're repeatable and auditable.<br>**What you get:** serverless back ends (AWS Lambda, Step Functions) in Node.js/TypeScript · event-driven services (EventBridge, SQS) · infrastructure as code (Terraform, AWS CDK) · monitoring, tracing and alerting · zero-trust security reviews · cloud cost reviews |
| 5 | **Integration & Modernisation** `#integration` (aliases `#connected-enterprise`, `#digital-transformation`) | **Outcome:** Connect your ERP, CRM and line-of-business systems so data is entered once, and replace legacy software step by step without a risky "big bang" switch-over.<br>**What you get:** modernisation roadmap and technical due diligence · real-time ERP ↔ CRM sync · API layer for legacy systems (REST/GraphQL) · gradual migration using the strangler-fig pattern · data migration, cleansing and verification · Azure API Management or MuleSoft gateways<br>**Visual:** integration diagram (moved from Home)<br>**Related:** Insight "The Strangler Fig Pattern" |
| 6 | **Microsoft Dynamics 365 & Power Platform** `#microsoft` (aliases `#microsoft-solutions`, `#platforms`) | **Outcome:** Implement or rescue Dynamics 365 and Power Platform so your sales, service and finance teams work in one place.<br>**What you get:** Dynamics 365 Sales, Customer Service and Field Service · Power Apps and Power Automate · Azure integration · Copilot setup · data migration and training<br>**Partner status:** [NEEDS CLIENT CONFIRMATION: show the Microsoft partner badge only if held] |
| 7 | **Salesforce** `#salesforce` (alias `#salesforce-solutions`) | **Outcome:** Configure and integrate Salesforce so it reflects how you actually sell and serve, not how the default setup assumes you do.<br>**What you get:** Sales Cloud and Service Cloud setup · Agentforce and AI features · integration with ERP and finance systems · data migration and clean-up · admin training<br>**Partner status:** [NEEDS CLIENT CONFIRMATION] |
| 8 | **How an engagement runs** `#process` (the only copy of the process) | **H2:** How an engagement runs<br>1. **Discover** (1–2 weeks): we map your processes, systems and goals, and agree what success looks like.<br>2. **Design**: architecture, scope and a fixed milestone plan you sign off.<br>3. **Build**: working software every two weeks, demonstrated to you.<br>4. **Integrate & test**: connected to your systems, tested with your data.<br>5. **Go live**: a planned cut-over with a rollback plan.<br>6. **Support & improve**: monitoring, fixes and a roadmap after launch.<br>[NEEDS CLIENT CONFIRMATION: the discovery duration and 2-week sprint cadence] |
| 9 | **FAQ** | **Do you work with companies outside the UK?** Yes. We have teams in the UK and Pakistan and work with clients in the UK, Pakistan and the UAE.<br>**What size of project do you take on?** [NEEDS CLIENT CONFIRMATION: minimum engagement size]<br>**Can you take over an existing system another supplier built?** Yes. We start with a technical review, then agree a plan to stabilise and improve it.<br>**Who owns the code?** [NEEDS CLIENT CONFIRMATION: IP terms] |
| 10 | **Final CTA** | **H2:** Have a project in mind? **Sub:** Send a short brief. A senior engineer replies within one business day. **Primary:** Book a consultation |

---

### 3. Products hub: `/products`

**SEO title:** `Business Software Platforms: ERP, POS, School & Hospital` (56)
**Meta description:** `ZNXERP, ZNXePOS, ZNXEdu and ZNXCare: four platforms for manufacturing, retail, education and healthcare. Compare them and request a demo.` (137)

| # | Section | Content |
|---|---|---|
| 1 | **Hero** | **Tag:** PRODUCTS<br>**H1:** Four platforms, built for the way your sector works.<br>**Sub:** Each ZamNexus platform covers one industry end to end, so you're not stitching together generic tools. All four can be configured to your processes and integrated with what you already use.<br>**Primary:** Request a demo |
| 2 | **Product cards** | Same 4 cards as Home, with 3 bullet outcomes each and "See [product] →" |
| 3 | **Comparison table** (H2: Which platform is right for you?) | Columns: Platform · Built for · Core modules · Works offline · Deployment<br>ZNXERP · manufacturers, pharma, distributors · finance, HR & payroll, procurement, inventory, production, sales, QC, reporting · [NEEDS CLIENT CONFIRMATION] · [cloud / on-premises: NEEDS CLIENT CONFIRMATION]<br>ZNXePOS · supermarkets, retail chains, wholesalers · POS, multi-branch stock, loyalty, wholesale ledgers · Yes, tills keep trading offline and sync later · […]<br>ZNXEdu · schools, colleges, multi-campus groups · admissions, fees & bank link, attendance, exams, timetables, parent app · […] · […]<br>ZNXCare · hospitals, clinics, diagnostic labs · patient records, triage, OPD/IPD, lab (HL7), pharmacy, insurance claims · […] · […] |
| 4 | **Implementation** (H2: From kick-off to go-live) | 4 steps, shortened from 6: **Map** your processes and data → **Configure** modules and roles → **Migrate** your existing data and run in parallel → **Go live** with on-site training and support. [NEEDS CLIENT CONFIRMATION: typical timeline per product] |
| 5 | **Final CTA** | **H2:** See it with your own data. **Primary:** Request a demo (product picker in the form) |

**Removed:** the "Enterprise Platforms & Vertical Industries" teaser (that content now lives on Services) and the duplicate client marquee.

---

### 4. ZNXERP: `/products/znxerp`

**SEO title:** `ZNXERP | ERP for Manufacturing & Pharmaceutical Plants` (54)
**Meta description:** `One ERP for finance, production, inventory, procurement, HR and quality control, built for manufacturers and pharma plants. Request a ZNXERP demo.` (146)

| # | Section | Content |
|---|---|---|
| 1 | **Hero** | **Tag:** ZNXERP · ENTERPRISE RESOURCE PLANNING<br>**H1:** Run your whole plant on one system, from gate to general ledger.<br>**Sub:** ZNXERP connects procurement, quality control, production, warehousing, finance and HR for manufacturers, pharmaceutical plants and distributors, so every batch, stock movement and transaction is traceable.<br>**Primary:** Request a ZNXERP demo · **Secondary:** See how a batch flows ↓ |
| 2 | **Proof** | Verified stats only, e.g. "[N] plants live" · "8 integrated modules" · "Full audit trail". Client logos with permission. [NEEDS CLIENT CONFIRMATION: "5+ industrial plants"; Grays, Lotus, Panacea, Khyber] |
| 3 | **Who it's for** (H2: Built for operations that answer to auditors) | 3 cards: **Pharmaceutical manufacturers**: quarantine, QC sampling and batch traceability. **Textile and industrial plants**: production planning, yield and machine utilisation. **Distributors**: multi-warehouse stock, dispatch and receivables. |
| 4 | **How a batch flows** (keep the existing interactive lifecycle) | 1. Goods arrive and are matched to the purchase order; a GRN and bin labels are created. 2. Material is held in quarantine until QC releases it. 3. Production runs against approved formulations. 4. Finished goods are dispatched and every step posts to the ledger. |
| 5 | **Operations console** (keep, relabelled) | Caption: "Illustrative data. Book a demo to see it with yours." |
| 6 | **Modules** (H2: Eight modules, one database) | Finance & multi-currency ledgers · HR & payroll · Procurement & approvals · Inventory & warehouse · Production (MES) · Sales & CRM · Quality control · Management reporting. One line each, from the existing module copy |
| 7 | **Integrations & deployment** *(new copy)* | Banks, biometric devices, barcode and label printers, lab instruments, Microsoft Excel/Power BI export. Deployment: [NEEDS CLIENT CONFIRMATION: cloud, on-premises or both] |
| 8 | **FAQ** | **How long does implementation take?** [NEEDS CLIENT CONFIRMATION] · **Can we migrate from our current system?** Yes. We migrate masters, open balances and history, then run both systems in parallel before cut-over. · **Does it handle multiple companies and currencies?** Yes, with consolidated reporting. · **Is training included?** [NEEDS CLIENT CONFIRMATION] |
| 9 | **Demo form** | Existing `DemoRequestForm` (now working). H2: Request a ZNXERP demo. Sub: Tell us about your plant and we'll tailor the demo to your process. |

---

### 5. ZNXePOS: `/products/znxepos`

**SEO title:** `ZNXePOS | Multi-Branch Retail POS That Works Offline` (52)
**Meta description:** `Fast barcode checkout that keeps trading when the internet drops, with live stock across every branch and built-in wholesale ledgers. Request a demo.` (149)

| # | Section | Content |
|---|---|---|
| 1 | **Hero** | **Tag:** ZNXEPOS · RETAIL POINT OF SALE<br>**H1:** Checkout that never stops, and stock you can trust across every branch.<br>**Sub:** ZNXePOS runs the till, stock, promotions and wholesale accounts for supermarkets, retail chains and distributors. Tills keep trading when the internet drops and sync automatically when it's back.<br>**Primary:** Request a ZNXePOS demo |
| 2 | **Proof** | [NEEDS CLIENT CONFIRMATION: "750+ active stores", "142k+ SKUs"]. Show only the confirmed figures. |
| 3 | **Who it's for** | **Supermarkets & grocery**: fast scanning, weighed items, multi-buy deals. **Retail chains**: one stock view across branches and inter-branch transfers. **Wholesalers**: customer ledgers, credit limits and bulk pricing. |
| 4 | **How a sale flows** (keep the interactive pipeline) | Scan → split payment (cash/card) → receipt printed or sent on WhatsApp → shift closed with a blind cash count → sales post to the ledger. |
| 5 | **Offline by design** *(new section, the product's main differentiator)* | **H2:** Your tills keep selling when the connection doesn't. **Copy:** Each till keeps its own local database. Sales, returns and receipts carry on during an outage, and everything syncs to head office when the connection returns, without duplicate or lost transactions. Link: "How it works: The Zero-Downtime Retail Mesh →" |
| 6 | **Till simulator** (keep, labelled "Illustrative") | — |
| 7 | **Modules** | POS · Multi-branch stock · Offline sync · Promotions & loyalty · Wholesale ledgers · Purchasing · Cash control & shift audit · Sales & margin reports |
| 8 | **Hardware & deployment** *(new)* | Works with standard barcode scanners, weighing scales, ESC/POS thermal printers and cash drawers. [NEEDS CLIENT CONFIRMATION: supported hardware list, cloud/on-premises] |
| 9 | **FAQ** | What happens if the internet goes down? · Can we move stock between branches? · Does it support wholesale and retail in one system? · How is it priced? [NEEDS CLIENT CONFIRMATION] |
| 10 | **Demo form** | "Request a ZNXePOS demo: tell us how many branches and tills you run." |

---

### 6. ZNXEdu: `/products/znxedu`

**SEO title:** `ZNXEdu | School & Campus Management System` (42)
**Meta description:** `Admissions, fee collection with bank reconciliation, biometric attendance, exams, timetables and a parent app in one system for schools and campuses.` (149)

| # | Section | Content |
|---|---|---|
| 1 | **Hero** | **Tag:** ZNXEDU · CAMPUS MANAGEMENT<br>**H1:** One system for every campus, classroom and parent.<br>**Sub:** ZNXEdu brings admissions, fees, attendance, exams, timetables and parent communication together, so your staff stop reconciling spreadsheets and parents always know what's happening.<br>**Primary:** Request a ZNXEdu demo |
| 2 | **Proof** | [NEEDS CLIENT CONFIRMATION: "14k+ daily active users", "98.4% fee recovery"] |
| 3 | **Who it's for** | Private schools · college groups · multi-campus networks managed centrally |
| 4 | **The school year, connected** (keep the pipeline) | Online admission with document checks → clash-free timetable → attendance at the gate with an instant parent alert → fee vouchers and bank reconciliation → exams and report cards |
| 5 | **Modules** | Admissions · Fees & bank link · Attendance (biometric/RFID) · Timetabling · Exams & results · Parent mobile app · HR & payroll · Reports |
| 6 | **Parent app** *(new, short)* | What parents see: attendance alerts, fee status, results, school notices. [Screenshot: NEEDS CLIENT CONFIRMATION] |
| 7 | **FAQ** | Can it manage several campuses? · Which banks does fee reconciliation work with? [NEEDS CLIENT CONFIRMATION] · Is student data secure? (Encrypted, with role-based access. Remove the "FERPA compliant" claim unless confirmed; FERPA is US law and unlikely to apply.) |
| 8 | **Demo form** | "Request a ZNXEdu demo: tell us about your campuses and student numbers." |

---

### 7. ZNXCare: `/products/znxcare`

**SEO title:** `ZNXCare | Hospital Management & EHR Software` (44)
**Meta description:** `Patient records, emergency triage, HL7 lab integration, pharmacy dispensing and insurance claims in one system for hospitals and clinics. Request a demo.` (153)

| # | Section | Content |
|---|---|---|
| 1 | **Hero** | **Tag:** ZNXCARE · HOSPITAL MANAGEMENT & EHR<br>**H1:** The right patient record, in front of the right clinician, when it matters.<br>**Sub:** ZNXCare connects registration, emergency triage, OPD and IPD, lab machines, pharmacy and billing for hospitals, multi-specialty clinics and diagnostic labs, so information follows the patient.<br>**Primary:** Request a ZNXCare demo |
| 2 | **Proof** | [NEEDS CLIENT CONFIRMATION: "5+ specialist hospitals"] |
| 3 | **Who it's for** | Hospitals · multi-specialty clinics · diagnostic laboratories |
| 4 | **The patient journey** (keep the continuum) | Registration and medical record number → triage → doctor notes with drug-interaction checks → lab orders and results returned automatically (HL7) → pharmacy dispensing with barcode checks → discharge and billing |
| 5 | **Clinical console** (keep, labelled "Illustrative") | — |
| 6 | **Modules** | Patient registration · Emergency & triage · OPD & IPD · Clinical records · Laboratory (LIS, HL7) · Pharmacy · Billing & insurance · Reports |
| 7 | **Data protection** *(new, careful)* | Encrypted records, role-based access and a full audit trail. **Remove "HIPAA / ISO 27001 compliant"** unless certified [NEEDS CLIENT CONFIRMATION]. HIPAA is US law; for UK buyers the relevant standards are UK GDPR and NHS DSPT. |
| 8 | **FAQ** | Which lab analysers does it integrate with? [NEEDS CLIENT CONFIRMATION] · Can it handle insurance panels? · Is training included? |
| 9 | **Demo form** | "Request a ZNXCare demo: tell us about your facility and departments." |

---

### 8. Insights: `/insights`

**SEO title:** `Engineering Insights | ZamNexus` (31)
**Meta description:** `Practical articles on enterprise architecture: offline-first retail, real-time ERP ledgers, AI agents with guardrails, HL7 lab integration and legacy modernisation.` (164) → **trimmed:** `Practical engineering articles: offline-first retail, real-time ERP ledgers, AI agents with guardrails, hospital lab integration and legacy modernisation.` (154)

| # | Section | Content |
|---|---|---|
| 1 | **Hero** | **H1:** Engineering insights from the systems we build. **Sub:** What we've learned building ERP, retail, education and healthcare software, written for the engineers and IT leaders who will run it. |
| 2 | **Featured article** | Existing |
| 3 | **Article grid + category filter** | Existing. Each card: category, title, 1-line summary, date, read time, author |
| 4 | **Newsletter** (one line) | "Get new articles by email, about once a quarter." [email] [Subscribe] |

**Article template `/insights/[slug]`:**
- **Title pattern:** `{article title}` alone if ≤ 60 characters, otherwise a shortened version stored as `seoTitle`. Drop the "— ZamNexus Insights" suffix, which pushes every title past 60.
- **Description:** the article's existing subtitle, trimmed to ≤ 155.
- **Byline:** author name, role and photo, **only for real staff** [NEEDS CLIENT CONFIRMATION: Tariq Vance, Elena Rostova, Zayd Malik, Hamza Zamooq]. Otherwise the byline reads "ZamNexus Engineering".
- **End of article:** a "Related product/service" card + a Book-a-consultation band.
- **Schema:** `Article` + `BreadcrumbList`. Unknown slugs return a real 404.

---

### 9. About: `/about`

**SEO title:** `About ZamNexus | Zamooq Limited, Established 2009` (49) [2009 NEEDS CLIENT CONFIRMATION; if not confirmed, use `About ZamNexus | A Zamooq Limited Company` (41)]
**Meta description:** `ZamNexus is the technology brand of Zamooq Limited, with teams in the UK and Pakistan building business platforms and enterprise software since 2009.` (149)

| # | Section | Content |
|---|---|---|
| 1 | **Hero** | **H1:** About ZamNexus<br>**Sub:** We're the technology brand of Zamooq Limited. We build and run the software that manufacturers, retailers, schools and hospitals depend on every day. |
| 2 | **Our story** | 2 short paragraphs: when and why the company started, how it moved from projects to products, where it works today [NEEDS CLIENT CONFIRMATION: founding story, milestones] |
| 3 | **What we believe** (merged "why us" block, the only copy on the site) | 4 principles, each one line:<br>**Business first:** we start from the outcome you need, not the technology.<br>**Senior and accountable:** the people who design it deliver it.<br>**Built to be run:** security, monitoring and support are part of the build, not extras.<br>**Long-term:** we support what we ship for years, not weeks. |
| 4 | **Leadership** | **Mir Mujeeb Ul Hassan**, Founder & CEO: photo, 3-line bio, LinkedIn [NEEDS CLIENT CONFIRMATION: bio + photo]. Further team members only if real. |
| 5 | **Credentials** | Partner badges and certifications that are actually held [NEEDS CLIENT CONFIRMATION]. Section hidden if none. |
| 6 | **Offices** | Luton (34 Beaconsfield, LU2 0RW) · Islamabad (Suite 1, 2nd Floor, I-9 Markaz) · UAE ("Opening soon"; show only once there's an address). Remove the "London / Lahore" mentions unless there are offices there. |
| 7 | **Company details** | Zamooq Limited · registered in England & Wales · Company No. [NEEDS CLIENT CONFIRMATION] · registered office [NEEDS CLIENT CONFIRMATION] · ICO registration no. [NEEDS CLIENT CONFIRMATION]. Replaces "Verified on Enterprise SOW". |
| 8 | **Final CTA** | Book a consultation |

**Removed:** the "Six Core Engineering Capabilities" grid (a duplicate of Services) and the vision/mission boxes, which are reduced to the one-line sub in the hero.

---

### 10. Contact: `/contact`

**SEO title:** `Contact ZamNexus | Book a Consultation or Demo` (46)
**Meta description:** `Tell us about your project or request a product demo. A senior engineer replies within one business day. Offices in Luton, UK and Islamabad, Pakistan.` (150)

| # | Section | Content |
|---|---|---|
| 1 | **Hero** | **H1:** Tell us what you need. **Sub:** Send a short brief and a senior engineer will reply within one business day. Prefer email? contact@zamnexus.com |
| 2 | **Form** (left, 8 columns) | **1. What can we help with?** (choose any): the 6 services + 4 products, with line icons.<br>**2. When do you want to start?** Within a month · 1–3 months · 3–6 months · Just exploring<br>**3. Your details:** Full name (required) · Work email (required) · Company · Phone or WhatsApp<br>**4. Tell us about the project** (required): placeholder "What are you trying to achieve, and what systems do you use today?"<br>Privacy line: "We use these details only to reply to you. See our Privacy Policy."<br>**Button:** Send brief |
| 3 | **Success message** | **H2:** Thanks, {name}. We've got your brief. **Copy:** A senior engineer will reply to {email} within one business day. If it's urgent, email contact@zamnexus.com. Replaces "Transmission Confirmed · SLA Active". |
| 4 | **Direct channels** (right, 4 columns) | Email (copy button) · Phone/WhatsApp +44 7859 043361 [NEEDS CLIENT CONFIRMATION: is this the business line?] · reply-time promise. Remove the "Mutual non-disclosure terms pre-applied" claim unless an NDA is really in place on enquiry [NEEDS CLIENT CONFIRMATION]. |
| 5 | **Offices** | Same as About §6, with a map link per office |

The "Explore Technology Hubs" links (2 of which point to redirected URLs) are removed.

---

### 11. Case studies: `/case-studies` ⏸ (template, ready for when material arrives)

**SEO title:** `Case Studies | ZamNexus` (23) · **Meta:** written per study once content exists.
**Card:** sector · client (or "A pharmaceutical manufacturer in Lahore" if anonymised) · problem · one result figure.
**Detail page:** Challenge → What we did → Results (figures signed off by the client) → Quote → Related product/service → CTA.

---

### 12. Privacy & Terms: `/privacy`, `/terms`

- **Privacy**: title `Privacy Policy | ZamNexus` (25) · description `How ZamNexus and Zamooq Limited collect, use and protect personal data under UK GDPR and the Data Protection Act 2018, and your rights.` (135)
- **Terms**: title `Terms of Service | ZamNexus` (27) · description `The terms that govern use of the ZamNexus website, software products and services provided by Zamooq Limited, under the laws of England and Wales.` (146)

**Content change:** the Privacy Policy must now mention the lead pipeline: what the contact, demo, newsletter and chatbot forms collect, where it's sent (webhook provider), and how long it's kept. It also needs a solicitor's review [NEEDS CLIENT CONFIRMATION].

### 13. 404 page

**H1:** We couldn't find that page. **Copy:** It may have moved when we reorganised the site. **Links:** Home · Products · Services · Contact. Status 404, `noindex`.

---

## Part C: SEO metadata check

| Page | Title chars (≤60) | Description chars (≤155) |
|---|---|---|
| Home | 58 ✅ | 152 ✅ |
| Services | 55 ✅ | 154 ✅ |
| Products | 56 ✅ | 137 ✅ |
| ZNXERP | 54 ✅ | 146 ✅ |
| ZNXePOS | 52 ✅ | 149 ✅ |
| ZNXEdu | 42 ✅ | 149 ✅ |
| ZNXCare | 44 ✅ | 153 ✅ |
| Insights | 31 ✅ | 154 ✅ |
| About | 49 ✅ | 149 ✅ |
| Contact | 46 ✅ | 150 ✅ |
| Privacy | 25 ✅ | 135 ✅ |
| Terms | 27 ✅ | 146 ✅ |

Every title is unique, leads with what the buyer searches for, and puts the brand at the end. No title repeats the homepage, unlike today's `/products`.

### Site-wide technical SEO (built in Phase 4)

- `metadataBase: https://zamnexus.com` + a self-referencing `alternates.canonical` on every page.
- Open Graph + Twitter card with the images from A6.
- JSON-LD: `Organization` (existing; add `address` ×2, `sameAs` LinkedIn), `SoftwareApplication` ×4, `Article` ×7, `BreadcrumbList` on every inner page, `FAQPage` on pages with an FAQ.
- `sitemap.ts`: lowercase URLs, real `lastModified` dates (article dates; a fixed date per static page).
