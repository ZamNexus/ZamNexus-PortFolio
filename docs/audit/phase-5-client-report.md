# ZamNexus Website Audit & Relaunch Report

30 October 2026 · Copy of the shared doc: https://claude.ai/artifact/DMeBdX2mraTADZVedj7Mhc (the doc is the live version; status updates happen there)

## Summary

The old site was losing every enquiry: its contact, demo and newsletter forms showed a thank-you message but sent nothing. That is now fixed, and the rebuilt site is ready to launch once you confirm the items in *What we need from you*.

- **What was wrong:** broken forms, the same content repeated on up to five pages, claims nobody could back up, and search basics missing (no canonical tags, no link previews, nine descriptions cut off in Google).
- **What we changed:** 11 focused pages instead of 13 plus 3 hidden duplicates, one clear call to action per page, working forms, and every page set up properly for search and social sharing.
- **What it means for you:** a visitor can now tell in seconds what ZamNexus sells and who it is for, every enquiry reaches your team, and nothing on the site can embarrass you in a buyer's due diligence.

The new site is built and tested but not yet live. Launch needs the forms connected to your inbox or CRM and the checklist below ticked off.

## Key findings

The ten problems below are ranked by how much they cost you in lost or weakened enquiries. All ten are fixed in the new site, except where the fix needs facts from you.

| # | Problem | Why it mattered | Status |
| --- | --- | --- | --- |
| 1 | Every form discarded what visitors typed | Each enquiry for a large project was silently lost | Fixed. Needs your inbox or CRM connected |
| 2 | Client names and figures nobody had confirmed, including a government body | Legal and credibility risk exactly when buyers check you out | Hidden until you confirm each one |
| 3 | No case studies, testimonials or certifications | Enterprise buyers look for proof before they call | Space ready. Needs your material |
| 4 | The services list appeared on 5 pages, the process on 3 | Pages felt padded and competed with each other in Google | Each now appears once |
| 5 | The homepage did not say what you sell or to whom | Visitors left without understanding the offer | Rewritten around the 4 products and 6 services |
| 6 | No canonical tags, and web addresses that change with capital letters | Google could index the same page twice | Fixed, with lowercase addresses and redirects |
| 7 | Heavy animation code loaded on every page | Slow on mid-range phones | 3D effect now loads last; unused libraries removed |
| 8 | Product pages of about 450 words, mostly dashboard labels | Too thin to appear for searches like "pharmaceutical ERP" | Each now explains who it is for and answers common questions |
| 9 | No preview image when a link is shared | LinkedIn and WhatsApp posts showed a blank card | Every page now has a branded preview |
| 10 | Old duplicate pages, unused images and dead links | Confusing paths and 3.7 MB of wasted files | Removed, with old links redirected |

The audit also found grey caption text too faint to meet accessibility standards and form fields screen readers could not identify. Both are fixed.

## Before and after

| Measure | Before | After |
| --- | --- | --- |
| Pages | 13 live + 3 hidden duplicates | 11 (+ case studies when ready) |
| Articles | 7 | 7 |
| Services shown | 8 overlapping, repeated on 5 pages | 6, on one page |
| Header links | 16 | 5 + a "Book a consultation" button |
| Footer links | 26 (4 duplicates, 2 through redirects) | 15, all direct |
| Call-to-action wordings | 8+ | 2: "Book a consultation", "Request a demo" |
| Forms that deliver enquiries | 0 of 3 | 3 of 3 (once connected) |
| Pages with a unique title and description | 11 of 13 (Products copied the homepage) | 13 of 13 |
| Descriptions cut off in Google | 9 | 0 |
| Pages with a canonical tag | 0 | All |
| Pages with a link-preview image | 0 | All |
| Unknown article links | Showed a "coming soon" page | Proper "page not found" |
| Unused files | 3.7 MB | 0 |

Old web addresses, including any already shared or bookmarked, redirect to their new pages in a single step.

## New site structure

| Page | Address | What it is for | Main button |
| --- | --- | --- | --- |
| Home | / | Say what ZamNexus builds and for whom, then route visitors to a product or service | Book a consultation |
| Services | /services | The 6 services, how an engagement runs, common questions | Book a consultation |
| Products | /products | Help a buyer pick one of the four platforms | Request a demo |
| ZNXERP | /products/znxerp | ERP for manufacturers and pharmaceutical plants | Request a ZNXERP demo |
| ZNXePOS | /products/znxepos | Retail point of sale that keeps working offline | Request a ZNXePOS demo |
| ZNXEdu | /products/znxedu | School and campus management | Request a ZNXEdu demo |
| ZNXCare | /products/znxcare | Hospital management and patient records | Request a ZNXCare demo |
| Insights | /insights | Technical articles that show depth to the engineers on a buyer's team | Read the featured article |
| About | /about | Show the real company and people behind the work | Get in touch |
| Contact | /contact | Collect a short project brief | Send brief |
| Privacy, Terms | /privacy, /terms | Legal | None |
| Case studies | /case-studies | Real results, approved by the clients named | Launches once 2 approved studies exist |

**Removed and redirected:** the Industries page and two near-identical Platforms pages (now the Microsoft and Salesforce sections of Services).

**Services, merged from 8 to 6:** AI & Automation, SaaS Product Development, Cloud-Native Engineering, Integration & Modernisation, Microsoft Dynamics 365 & Power Platform, and Salesforce.

## What we need from you

Two items block launch: where enquiries should go, and the updated Privacy Policy. Everything else switches on the moment you confirm it (in `lib/siteFacts.ts`); until then it stays hidden.

| # | What we need | Blocks launch |
| --- | --- | --- |
| 1 | Where enquiries should go: an email inbox, Slack channel or CRM | Yes |
| 2 | An updated Privacy Policy, reviewed by your solicitor, covering the forms and chat assistant | Yes |
| 3 | Written permission to name clients: Grays Pharmaceutical, Lotus Pharmaceuticals, Panacea Pharmaceuticals, Khyber Textile Mills, National Tariff Commission | No |
| 4 | Confirmation of product figures: 750+ stores, 142k+ SKUs, 14k+ daily users, 98.4% fee recovery, 5+ plants, 5+ hospitals, ledger and intake times | No |
| 5 | Founding year (the old site said 2009 and "15+ years") | No |
| 6 | Zamooq Limited company number and ICO registration number | No |
| 7 | Whether the four article authors are real staff, with photos and roles | No |
| 8 | CEO bio, photo and LinkedIn link | No |
| 9 | At least 2 case studies with results the client has approved | No |
| 10 | 2 to 4 client testimonials (quote, name, role, company) | No |
| 11 | Partner badges and certifications you actually hold | No |
| 12 | 2 to 3 screenshots per product, with demo data | No |
| 13 | Product facts: cloud or on-premises, implementation time, supported hardware, banks and lab analysers, pricing model | No |
| 14 | Office photos, the UAE office address, and confirmation that +44 7859 043361 is the business line | No |

## Pre-launch checklist

**Forms and leads**
- [ ] Connect enquiries to your inbox, Slack or CRM (`LEAD_WEBHOOK_URL` on Vercel)
- [ ] Send one real test from the Contact page, a product demo form, the newsletter box and the chat assistant, and confirm all four arrive
- [x] Forms reject missing fields and invalid emails, and block simple spam bots

**Redirects and addresses**
- [x] All 24 old and mixed-case addresses tested: each lands on the right page in one step, with no loops
- [x] Unknown pages and articles return a proper "page not found"
- [ ] Confirm zamnexus.com and www.zamnexus.com both resolve, with one redirecting to the other
- [ ] Confirm HTTPS works on both

**Search and sharing**
- [x] Every page has a unique title (60 characters or fewer) and description (155 or fewer)
- [x] Canonical tags, sitemap.xml and robots.txt are in place
- [x] Structured data for the company, products, articles, FAQs and breadcrumbs
- [ ] After launch, check two pages in Google's Rich Results Test
- [ ] Add the site to Google Search Console and Bing Webmaster Tools, and submit sitemap.xml
- [ ] Share one product page on LinkedIn to check the preview image

**Quality**
- [x] Production build completes with no errors
- [x] No page scrolls sideways on a 375px phone screen
- [x] Caption text meets the WCAG AA contrast standard
- [ ] Run Google PageSpeed Insights on the live homepage and one product page (target: green Core Web Vitals on mobile)
- [ ] Click through every page on a real phone and in Safari

**Legal and analytics**
- [ ] Publish the updated Privacy Policy
- [ ] Decide on analytics. If it uses cookies, add a consent banner before switching it on

**Safety net**
- [ ] Note the current live version on Vercel, so you can roll back in one click if needed

## After launch

| When | What to do | Who |
| --- | --- | --- |
| Weekly | Check that enquiries are arriving and being answered within one business day | Sales lead |
| Monthly | Review Search Console for errors, pages dropping out of Google, and searches you appear for but rarely get clicked | Developer |
| Monthly | Update packages and run the build, so security fixes are not left waiting | Developer |
| Quarterly | Publish at least one new article tied to a product or service | Engineering team |
| Quarterly | Add new client permissions, figures, case studies or testimonials as they come in (each is one switch in `lib/siteFacts.ts`) | Marketing, then developer |
| Quarterly | Run PageSpeed Insights on the homepage and one product page | Developer |
| Yearly | Review the Privacy Policy and Terms, and the dates in the sitemap | Solicitor, developer |

When a page moves or is removed, add its old address to the `MOVED` map in `proxy.ts`, so old links and search rankings carry over.
