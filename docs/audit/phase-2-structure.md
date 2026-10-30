# ZamNexus Website: Phase 2 New Structure

**Date:** 30 October 2026
**Builds on:** [Phase 1 audit](phase-1-content-audit.md), assumptions A1–A5.
**New assumption A6:** URLs move to lowercase (`/services`, `/products/znxerp`), with 301 redirects from every current address. That's the standard convention, and it's cheapest to do now, before the site has backlinks.

> **No keyword data.** There's no Search Console or keyword tool access, so the "target search" for each page below is a hypothesis based on what the page sells. Check it against Search Console after launch.

---

## 1. New sitemap

The site goes from **13 core pages + 3 dead duplicates** to **11 core pages**, plus 1 page that only goes live when real material exists. The 7 articles stay.

```
/                          Home
├── /services              Services hub (6 services, anchored sections)
├── /products              Product suite hub
│   ├── /products/znxerp   ERP
│   ├── /products/znxepos  Retail POS
│   ├── /products/znxedu   Education management
│   └── /products/znxcare  Hospital / EHR
├── /case-studies          ⏸ ONLY when ≥2 approved case studies exist
├── /insights              Article index
│   └── /insights/[slug]   7 articles (unknown slugs → real 404)
├── /about                 Company, leadership, offices, company details
├── /contact               Brief form + direct channels
├── /privacy               Legal
└── /terms                 Legal
```

### Why these pages, and why not more

| Decision | Reason to show the client |
|---|---|
| **Industries page removed**, merged into Home and the product pages | Only 4 of its 8 sectors have a product or any proof behind them. Those 4 sectors are already covered better by the 4 product pages. The other 4 sectors (finance, professional services, property, public sector) are claims without evidence. A short "Who we work with" strip on Home covers them honestly. |
| **Platforms pages deleted** (2 near-identical files) | They're already redirected and never shown. Their Microsoft and Salesforce content becomes two sections of `/services`. |
| **Services stays one page** (not 6 separate pages) | Six thin service pages would each be weaker than one strong hub. A service gets its own page later only once it has a case study and enough depth (≥800 words) to rank, most likely Microsoft Dynamics 365 first. |
| **Case Studies page is new but on hold** | It's the most important missing trust signal. An empty or invented case study page is worse than none, so it launches only with real, approved material. |
| **Newsletter kept, but quiet** | It now collects real sign-ups. It stays as one line at the foot of `/insights`, not a feature on its own. |

### Services: 8 → 6

| New service (anchor) | Merges | Reason |
|---|---|---|
| AI & Automation (`#ai-automation`) | AI & Intelligent Solutions + Intelligent Automation | Buyers don't separate "AI" from "automating a process with AI". Two cards were saying the same thing. |
| SaaS Product Development (`#saas`) | unchanged | Distinct buyer: founders and product teams. |
| Cloud-Native Engineering (`#cloud`) | unchanged | Distinct buyer: CTOs and platform teams. |
| Integration & Modernisation (`#integration`) | Connected Enterprise + Digital Transformation & Modernization | Both were "connect and modernise your legacy systems". |
| Microsoft Dynamics 365 & Power Platform (`#microsoft`) | Microsoft Business Solutions + the deleted Platforms pages | Has clear search demand on its own. |
| Salesforce (`#salesforce`) | Salesforce Solutions + the deleted Platforms pages | Same reason. |

Every old anchor id stays on the page as an alias (the `legacyIds` pattern already in `app/Services/page.tsx`). Browsers never send `#fragments` to the server, so old deep links can only keep working this way.

---

## 2. Primary navigation

**5 items + 1 CTA button** (currently 6 items + 10 dropdown links):

| # | Item | Dropdown |
|---|---|---|
| 1 | Services | The 6 services above (anchors) |
| 2 | Products | ZNXERP · ZNXePOS · ZNXEdu · ZNXCare, each with a one-line description |
| 3 | Insights | — |
| 4 | About | — |
| 5 | Contact | — |
| CTA | **Book a consultation** (pill button) | — |

"Case Studies" becomes item 3 once that page is live.

**Footer:** from 26 links (4 duplicates, 2 going through redirects) to **15 direct links**:

| Services | Products | Company | Legal |
|---|---|---|---|
| AI & Automation | ZNXERP | About | Privacy Policy |
| SaaS Development | ZNXePOS | Insights | Terms of Service |
| Cloud-Native | ZNXEdu | Contact | |
| Integration | ZNXCare | | |
| Microsoft | | | |
| Salesforce | | | |

Below the link grid: the email address, Zamooq Limited's company number [NEEDS CLIENT CONFIRMATION] and the registered office address.

---

## 3. Purpose and primary CTA per page

| Page | Purpose (one sentence) | Primary CTA | Secondary CTA | Target search (hypothesis) |
|---|---|---|---|---|
| `/` | In ten seconds, tell an enterprise buyer what ZamNexus builds, for whom, and why to trust it, then send them to the right product or service. | Book a consultation | See the products | "enterprise software development company", brand searches |
| `/services` | Show the 6 services as concrete outcomes and deliverables, plus how an engagement runs. | Book a consultation | Read an insight | "Dynamics 365 consultancy", "SaaS development company" |
| `/products` | Help a buyer pick the right one of the four products in under a minute. | Request a demo (picks a product) | Compare products | "ERP POS school hospital software" |
| `/products/znxerp` | Convince manufacturing/pharma operations leads that ZNXERP handles their production and compliance. | Request a ZNXERP demo | Download the overview [NEEDS CLIENT CONFIRMATION] | "ERP for pharmaceutical manufacturing", "textile ERP" |
| `/products/znxepos` | Convince multi-branch retailers that checkout keeps working offline and stock stays in sync. | Request a ZNXePOS demo | — | "multi-branch POS system", "offline POS software" |
| `/products/znxedu` | Convince school and college administrators that admissions, fees and attendance run in one system. | Request a ZNXEdu demo | — | "school management system", "campus management software" |
| `/products/znxcare` | Convince hospital administrators that records, lab, pharmacy and billing are connected. | Request a ZNXCare demo | — | "hospital management system", "EHR software" |
| `/case-studies` ⏸ | Show real outcomes, with client and figures approved. | Book a consultation | — | brand + "case study" |
| `/insights` | Show technical depth to the engineers who influence the purchase. | Read the featured article | Subscribe | long-tail technical queries |
| `/insights/[slug]` | Answer one technical question well, then point to the product or service it relates to. | Contextual product/service link | Book a consultation | per article |
| `/about` | Show there are real, accountable people and a registered company behind the work. | Book a consultation | Contact an office | "Zamooq", "ZamNexus" |
| `/contact` | Capture a qualified brief with as little effort as possible. | Send brief | Email / phone directly | "contact ZamNexus" |
| `/privacy`, `/terms` | Legal compliance. | — | — | — |

**One CTA wording, site-wide:** "Book a consultation" for services, "Request a [product] demo" for products. This replaces the current mix of "Transmit Project Brief", "Start a conversation", "Let's architect your solution" and others.

---

## 4. 301 redirect map

Every old URL gets **one hop** straight to its final address. The existing redirects in `next.config.ts` are rewritten to point at the new lowercase targets, so there are no redirect chains.

| Old URL | New URL | Note |
|---|---|---|
| `/Services` | `/services` | |
| `/Products` | `/products` | |
| `/Products/znxerp` | `/products/znxerp` | same for `znxepos`, `znxedu`, `znxcare` |
| `/Industries` | `/` | Content merged into Home and the product pages |
| `/Products/Industries` | `/` | Currently → `/Industries`; retargeted to avoid a chain |
| `/Platforms` | `/services#microsoft` | Currently → `/Services#platforms`, an anchor that doesn't exist |
| `/Products/Platforms` | `/services#microsoft` | same |
| `/Insights` | `/insights` | |
| `/Insights/:slug` | `/insights/:slug` | all 7 articles |
| `/About` | `/about` | |
| `/Contact` | `/contact` | |
| `/Privacy` | `/privacy` | |
| `/Terms` | `/terms` | |
| `/Solutions`, `/Solutions/:path*` | `/services` | existing legacy rules, retargeted |
| `/Solutions/ai-powered-business`, `/Solutions/ai-powered`, `/Solutions/intelligent-automation` | `/services#ai-automation` | |
| `/Solutions/saas-platforms`, `/Solutions/saas-development` | `/services#saas` | |
| `/Solutions/cloud-native-solutions`, `/Solutions/cloud-native` | `/services#cloud` | |
| `/Solutions/connected-enterprise`, `/Solutions/digital-transformation` | `/services#integration` | |
| `/privacy-policy` | `/privacy` | |
| `/terms-of-service`, `/terms-and-conditions` | `/terms` | |
| `/industries`, `/platforms` (lowercase) | `/`, `/services#microsoft` | catches people who type it |

**Build risk to check in Phase 4:** this redirect only makes sense if Next.js matches URLs case-sensitively. If it matched case-insensitively, `/Services → /services` would redirect to itself forever. Phase 4 will test every row with `curl -I` before anything ships. If matching turns out to be case-insensitive, the fallback is a proxy rule that only redirects when the path isn't already lowercase. Renaming the folders also needs a two-step `git mv` on Windows, because the filesystem ignores case.

---

## 5. Content that must be newly written

| # | Content | Page | Why it's needed | Who supplies it |
|---|---|---|---|---|
| 1 | **Home hero + value proposition**: one sentence saying who you serve and what you deliver, without slogans | `/` | The current H1 ("autonomous enterprise") doesn't say what you sell | Me, for your approval |
| 2 | **"Who we work with" strip**: 4 proven sectors linked to products, and the other sectors linked to services | `/` | Replaces the Industries page | Me |
| 3 | **6 merged service sections**: outcome, deliverables, typical engagement, related product/article | `/services` | Replaces 8 overlapping cards shown twice | Me |
| 4 | **Product page expansions** (+400–600 words each): who it's for, problems solved, modules, integrations, deployment (cloud or on-premises), implementation timeline, FAQ | 4 product pages | ~450 words of mostly UI labels can't rank or answer a buyer's questions | Me, plus your facts on deployment, pricing model and integrations [NEEDS CLIENT CONFIRMATION] |
| 5 | **Product comparison block** | `/products` | Helps a visitor pick the right product | Me |
| 6 | **About page rewrite**: real story, CEO bio, real team, offices, company details | `/about` | Its capability list is a third copy of Services | You supply the facts, I write it |
| 7 | **Case studies (≥2)**: client (or an anonymised description), problem, solution, measurable result, with written approval | `/case-studies` | The biggest trust gap on the site | You |
| 8 | **Testimonials (2–4)**: quote, name, role, company, with permission | Home, products | No social proof exists | You |
| 9 | **Partner and certification badges**: Microsoft, Salesforce, ISO, Cyber Essentials, only those actually held | Home, About, footer | Enterprise buyers screen for these | You |
| 10 | **Company number + registered office** | Footer, About, Privacy | About currently says "Verified on Enterprise SOW" with no number | You |
| 11 | **Social preview images** (1 site-wide + 1 per product) | All pages | No link previews on LinkedIn, Slack or WhatsApp | Me (generated from the brand system) |
| 12 | **Product and article structured data** (`SoftwareApplication`, `Article`, `BreadcrumbList`) | Products, articles | Richer search results | Me |
| 13 | **New titles and meta descriptions**, all ≤60 / ≤155 characters | All pages | 9 of 13 descriptions currently overrun | Me (Phase 3) |
| 14 | **Calmer form success messages** | Contact, demo | "Transmission Confirmed · SLA Active" and "routed to our Principal Architecture team" over-promise | Me |
| 15 | **Real 404 for unknown article URLs** | `/insights/[slug]` | Currently a soft 404 returning 200 | Me (Phase 4) |

---

## 6. Before / after

| | Before | After |
|---|---|---|
| Core pages | 13 live + 3 dead files | 11 (+1 on hold) |
| Articles | 7 | 7 |
| Services shown | 8, overlapping, on 5 pages | 6, on 1 page |
| Header links | 16 | 5 + CTA + 10 dropdown entries |
| Footer links | 26 | 15 |
| CTA wordings | 8+ | 2 |
| Redirect chains | 2 (`/Products/Industries`, `/Platforms` → missing anchor) | 0 |

---

## 7. Decisions for you before Phase 3

1. **Approve removing `/Industries`?** The alternative is keeping it, rewritten around the 4 proven sectors only.
2. **Approve merging services 8 → 6?**
3. **Approve lowercase URLs?** (assumption A6)
4. Can you supply any of items **6–10** (about facts, case studies, testimonials, certifications, company number)? Without them, Phase 3 will leave clearly marked `[NEEDS CLIENT CONFIRMATION]` slots rather than invent anything.
