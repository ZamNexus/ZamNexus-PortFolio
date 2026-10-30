# ZamNexus website

Marketing site for ZamNexus Limited. Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS 4.

## Run it locally

Requires Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev                  # http://localhost:3000
```

Production build, run locally:

```bash
npm run build
npm run start
```

Checks before every push: `npm run lint` and `npm run build`, both with no errors.

## Environment variables

| Variable | Needed for | Without it |
| --- | --- | --- |
| `OPENROUTER_API_KEY` | The chat assistant | The chat replies "Chat is unavailable right now" |
| `OPENROUTER_MODEL` | Optional: the chat model (default `anthropic/claude-haiku-4.5`) | Default model is used |
| `LEAD_WEBHOOK_URL` | Delivering contact, demo, newsletter and chat leads (Slack incoming webhook, Zapier/Make hook, Power Automate trigger or CRM inbound URL) | Locally, leads go to `.leads.jsonl`. **On Vercel they only reach the function logs, so set this before going live.** |

Set the same variables in Vercel under Project → Settings → Environment Variables.

## Where things live

| Path | What it is |
| --- | --- |
| `app/` | Pages. Route folders are lowercase (`/services`, `/products/znxerp`) |
| `proxy.ts` | Redirects old and mixed-case URLs in one hop. Add a moved page to its `MOVED` map |
| `lib/catalog.ts` | Product and service copy shared by Home, Products and Services |
| `lib/siteFacts.ts` | Client figures, client names, founding year, company number. Each shows on the site only when `confirmed: true` |
| `lib/seo.ts` | `pageMetadata()` for titles, descriptions, canonicals and social tags |
| `lib/leads.ts`, `app/api/lead` | Lead delivery for the forms |
| `docs/audit/` | The 2026 site audit, new structure, content plan and client report |

See `CLAUDE.md` and `AGENTS.md` for coding conventions.

## Deploy

Vercel builds the `main` branch. Before the first deploy of this version, work through the pre-launch checklist in `docs/audit/phase-5-client-report.md`.
