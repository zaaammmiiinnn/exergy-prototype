# Exergy Solutions: Implementation Plan

**Client:** Exergy Solutions, Dubai, UAE  
**Positioning:** Thermodynamics and exergy analysis to cut capex and opex of energy- and water-intensive operations, delivered as guaranteed, turnkey implementation.  
**Core message:** "Turn wasted energy and water into profit"  
**Duration:** 6 weeks, firm on our side, with a written client-turnaround SLA  
**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind · shadcn/ui · Framer Motion · Supabase · Resend · Cloudflare Workers via `@opennextjs/cloudflare`

> **Status flag.** The live site is a client-rendered React app, so its copy could not be pulled automatically. Phase 0 (below) extracts it. Until the crawl exists, every copy block, description, statistic and image in this plan is marked `SOURCE: CRAWL` or `OPEN QUESTION`. Nothing is invented.

---

## 1. Overview

### Scope (signed)

1. Multi-page animated website (15 routes), responsive, working forms
2. Assessment and lead capture (forms, database, email notifications)
3. Rule-based chatbot with knowledge base (deterministic, no LLM)
4. Admin dashboard (secure login, lead management, chat inbox, analytics)
5. Backend, database, integrations
6. QA, deployment, handover and team training

### Out of scope (Phase 2 candidates)

Arabic/RTL, CRM integration, AI chatbot, WhatsApp automation, blog/CMS, new case-study production, full rebrand.

### Success criteria

| # | Criterion | Verified by |
|---|---|---|
| 1 | All 15 routes live; every copy block traces to the content map | Content-map audit |
| 2 | Assessment submit → `leads` row → admin email + visitor auto-reply in under 30 s | Integration test |
| 3 | Chatbot: every node reachable, every fallback tested, no dead ends | Branch matrix (§10) |
| 4 | Admin edits a chatbot node and it is live in under 60 s, no redeploy | Timed manual test |
| 5 | Lighthouse ≥ 90 on Home, Services, Assessment (mobile) | Lighthouse CI |
| 6 | RLS holds: anon cannot read or write leads or chats; `viewer` cannot write | Policy tests |
| 7 | Client trained, handover delivered, 30-day support active | Sign-off |

### Top risks

| Risk | Mitigation |
|---|---|
| OpenNext/Workers friction | Full day budgeted (Week 2, Day 1); optional 1-hour spike on Week 1, Day 5 |
| Old site is a JS SPA | Playwright crawl (`scripts/crawl_exergy.py`) in Phase 0 |
| Late client assets/approvals | Written SLA and slip rule (§12) |
| Email lands in spam | SPF/DKIM/DMARC on the client domain in Week 3 |
| Scope creep | Change-request protocol (§12) |

Full register in §13.

---

## 2. Content Audit and Mapping

### Phase 0: extraction (about half a day, before Week 1 Day 2)

1. Run `python scripts/crawl_exergy.py`. Output lands in `content/crawl/`.
2. Have the agent build `content/content-map.md` (one table per page: route, title, headings, numbered copy blocks `P-01…`, CTAs, images, stats, all verbatim).
3. Resolve the open questions in §2.4 with the client at kickoff.

If the crawl returns one page, the site uses in-page sections; treat each nav section as a page.

### Per-page inventory template

| Field | Capture |
|---|---|
| URL | |
| `<title>` and meta description | |
| H1–H3 | verbatim |
| Copy blocks | verbatim, numbered |
| CTAs (label → target) | |
| Images | filename, alt, role. **OPEN QUESTION: original file available?** |
| Statistics | verbatim, with location |

### Sitemap and old → new mapping

| New URL | Old source | Action |
|---|---|---|
| `/` | Home | Restructure |
| `/about` | About | OPEN QUESTION: page or section? |
| `/approach` | Methodology | Restructure |
| `/services` | Services overview | Restructure |
| `/services/cooling` | Cooling optimization | Split out |
| `/services/heating` | Heating & steam | Split out |
| `/services/water` | Water quality | Split out |
| `/services/process` | Process integration | Split out |
| `/applications` | Applications | Restructure |
| `/industries` | Industries served | Restructure |
| `/benefits` | Benefits / why Exergy | Restructure |
| `/assessment` | Assessment request | Rebuild as multi-step |
| `/assessment/thank-you` | None | New (noindex) |
| `/contact` | Contact | Rebuild, add map |
| `/privacy`, `/terms` | Likely missing | New; **legal text needs client/counsel approval** |
| `/admin/*` | None | New (noindex) |

Old-URL redirects are generated from the crawl and implemented in `next.config.js`.

### 2.4 Open questions for the content phase

- Industry count: the brief says six but names five (oil & gas, power, manufacturing, paper, food & beverage). What is the sixth?
- Do case studies, testimonials, client logos, certifications or statistics exist on the old site? If not, those sections stay hidden. No placeholders ship.
- Business hours, exact address and map pin, full phone/email list.
- What fields does the current assessment form collect?

### Content gaps and new content (all need client approval)

| Item | Note |
|---|---|
| Privacy Policy, Terms | Client or counsel; UAE PDPL position is the client's call |
| Per-service pages | Expand only with client-approved material |
| Chatbot answers with no source | Flagged `NEW – APPROVAL` |
| Meta descriptions, alt text, email wording, form microcopy | Functional copy, drafted by us |
| Exergy diagrams | Labels from the Approach copy; anything else `NEW – APPROVAL` |

---

## 3. Architecture

```
Browser ─▶ Cloudflare (DNS, CDN, WAF, Turnstile)
              │
              ▼
   Cloudflare Worker: Next.js 14 via OpenNext
     • RSC pages (static / ISR)     • Server Actions
     • /api/chat (bot engine)       • /api/webhooks/*
     • middleware (admin session)
        │              │                │
   R2 (ISR cache)   Supabase          Resend
   D1/DO (tag       Postgres · Auth · Storage
   cache, if needed) Realtime · RLS
```

### Cloudflare / OpenNext decisions

| Item | Decision |
|---|---|
| Adapter | `@opennextjs/cloudflare`; `open-next.config.ts` with `defineCloudflareConfig()` |
| Build / deploy | `npx opennextjs-cloudflare build` / `npx opennextjs-cloudflare deploy` |
| Runtime | Everything runs in Workers under `nodejs_compat`. Do not use `runtime = 'edge'`. **Verify on Week 2, Day 1** |
| Node APIs | No `fs`, `path`, Node `crypto`. Use Web Crypto |
| Images | `images.unoptimized = true`; assets pre-optimized to WebP/AVIF with explicit dimensions |
| ISR | R2 incremental cache. `revalidatePath`/`revalidateTag` may also need a tag cache (D1 or Durable Object). Confirm Week 2, Day 1; fallback is `revalidate = 300` |
| Env vars | `NEXT_PUBLIC_*` at build time; server secrets in Workers secrets, `.dev.vars`, and CI |
| Bundle size | Plan for the Workers Paid plan |
| Next version | Pin 14.2.x; confirm adapter support Day 1 |

### Data flows

**Form submission.** Client validates with Zod and attaches a Turnstile token → Server Action `submitAssessment` → verify Turnstile → re-validate → rate-limit by IP hash → insert into `leads` (service role) → compute score/priority → `Promise.allSettled` for admin email and auto-reply → record `email_status` → redirect to thank-you. Email failure never blocks the lead.

**Chatbot conversation.** Widget calls `POST /api/chat/session` and stores an opaque token → each tap or message calls `POST /api/chat/message` → engine loads session, parses input, resolves the next node → inserts visitor and bot rows → returns messages and quick replies. Capture and handoff nodes create or update a lead and email the admins.

**Admin reply.** Admin opens a conversation (Realtime on `chat_messages`) → reply goes through a role-checked Server Action → visitor widget polls `GET /api/chat/poll` every 5 s while status is `needs_human` or `human_active`. Polling was chosen over anonymous Realtime to avoid RLS complexity; Broadcast channels are the Phase 2 upgrade.

### Environment variables

| Variable | Scope |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | build + runtime |
| `SUPABASE_SERVICE_ROLE_KEY` | secret, server only |
| `RESEND_API_KEY` | secret |
| `RESEND_FROM_EMAIL` | var (client domain; OPEN QUESTION) |
| `ADMIN_NOTIFY_EMAILS` | var (mirrors `site_settings`) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | build+runtime / secret |
| `NEXT_PUBLIC_SITE_URL` | build + runtime |
| `CHAT_SESSION_SALT` | secret |
| `NEXT_PUBLIC_MAPS_EMBED_URL` | build |
| `NEXT_PUBLIC_GA_ID` | build (OPEN QUESTION: analytics choice) |

### Third-party services (approximate; verify current pricing)

| Service | Plan | Monthly |
|---|---|---|
| Cloudflare Workers | Paid | ~$5 |
| R2 / D1 | Free tier | $0 |
| Supabase | Pro (backups, no pausing) | ~$25 |
| Resend | Free (3k/mo), Pro if needed | $0–20 |
| Turnstile | Free | $0 |
| Domain | Client-owned | n/a |
| **Total** | | **~$30–50** |

Who pays is an OPEN QUESTION; client-owned accounts are cleaner for handover.

---

## 4. Database

Conventions: `uuid` PKs (`gen_random_uuid()`), `timestamptz`, an `updated_at` trigger on mutable tables, and `locale text default 'en'` on translatable content (Arabic hook for Phase 2).

### Roles and helpers

```sql
create type admin_role as enum ('founder','admin','ops','viewer');

create table admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text,
  role admin_role not null default 'viewer',
  is_active boolean not null default true,
  created_at timestamptz default now()
);

create function public.admin_role_of() returns admin_role
language sql stable security definer set search_path = public as $$
  select role from admins where user_id = auth.uid() and is_active
$$;

create function public.is_staff(roles admin_role[]) returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce(admin_role_of() = any(roles), false)
$$;
```

A trigger prevents deleting or demoting the last active founder.

### Tables

| Table | Key columns | Constraints and indexes |
|---|---|---|
| `leads` | `id`, `short_id` (unique, `EX-YYYY-NNNN`), `source` (`assessment`/`contact`/`chatbot`/`handoff`), `status` (`new`/`contacted`/`qualified`/`proposal`/`won`/`lost`), `full_name`, `email`, `phone`, `company`, `job_title`, `country`, `sector`, `service_interest text[]`, `facility_type`, `main_challenge`, `timeline`, `message`, `score int`, `priority` (`hot`/`warm`/`cold`), `assigned_to`, `lost_reason`, `utm jsonb`, `referrer`, `page_url`, `ip_hash`, `consent_at not null`, `email_status jsonb`, `chat_session_id`, timestamps | Indexes: `(status, created_at desc)`, `(assigned_to)`, `(lower(email))`, `(source)`, `(priority)`, GIN on `service_interest`. Check constraints on `source`, `status`, email format |
| `lead_notes` | `id`, `lead_id` FK cascade, `author`, `body`, `created_at` | Index `(lead_id, created_at)` |
| `lead_events` | `id`, `lead_id`, `type`, `from_value`, `to_value`, `actor`, `created_at` | Feeds funnel analytics |
| `chat_sessions` | `id`, `token_hash` (unique), `status` (`bot`/`needs_human`/`human_active`/`closed`), `current_node`, `mode` (`menu`/`capture_name`/`capture_email`/`qa`), `captured jsonb`, `visitor_name`, `visitor_email`, `fallback_count`, `page_url`, `ip_hash`, `user_agent`, `lead_id`, `assigned_to`, `last_message_at`, `created_at` | Indexes `(status, last_message_at desc)`, `(token_hash)` |
| `chat_messages` | `id`, `session_id` FK cascade, `sender` (`visitor`/`bot`/`admin`), `body`, `node_key`, `meta jsonb`, `read_by_admin`, `created_at` | Index `(session_id, created_at)` |
| `chat_menu_items` | `id`, `node_key`, `parent_key` (FK to `node_key`), `depth` (check 0–2), `position`, `label`, `kind` (`menu`/`answer`/`action`), `action` (`start_assessment`/`handoff`/`capture_lead`/`link`/`faq_list`), `action_target`, `body`, `keywords text[]`, `is_active`, `locale`, `updated_by` | `unique (node_key, locale)`; trigger rejects depth > 2 and cycles |
| `chat_qa_bank` | `id`, `question`, `answer`, `keywords text[]`, `synonyms text[]`, `category`, `priority`, `is_active`, `source_page`, `locale`, `hit_count` | GIN on `keywords`; trigram index on `question` (`pg_trgm`) |
| `services` | `id`, `slug` (unique), `title`, `summary`, `body_md`, `highlights jsonb`, `hero_image`, `icon`, `position`, `is_published`, `locale`, `seo_title`, `seo_description` | |
| `industries` | `id`, `slug`, `name`, `summary`, `body_md`, `challenges jsonb`, `hero_image`, `position`, `is_published`, `locale` | |
| `applications` | `id`, `slug`, `title`, `summary`, `body_md`, `service_ids uuid[]`, `industry_ids uuid[]`, `image`, `position`, `is_published`, `locale` | |
| `testimonials` | `id`, `quote`, `person`, `role`, `company`, `logo`, `is_published`, `position` | Section hidden when empty |
| `faqs` | `id`, `question`, `answer`, `category`, `position`, `is_published`, `locale` | |
| `site_settings` | `key` (PK), `value jsonb`, `updated_by`, `updated_at` | Keys: `contact`, `notify_emails`, `social`, `hours`, `chatbot`, `lead_routing`, `seo_defaults` |
| `admins` | see above | |

### RLS matrix

| Table | anon | founder / admin | ops | viewer |
|---|---|---|---|---|
| `leads`, `lead_notes`, `lead_events` | none (server inserts via service role) | all | read; update status/notes/assignment | read |
| `chat_sessions`, `chat_messages` | none (widget uses server routes) | all | read; insert admin messages | read |
| `chat_menu_items`, `chat_qa_bank` | none (read by server) | all | read | read |
| `services`, `industries`, `applications`, `faqs`, `testimonials` | `select where is_published` | all | read | read |
| `site_settings` | public-safe keys via a view | all (`notify_emails`: founder only) | read | read |
| `admins` | none | read; founder writes | self-read | self-read |

Pattern:

```sql
alter table leads enable row level security;
create policy leads_staff_read on leads for select
  using (is_staff(array['founder','admin','ops','viewer']::admin_role[]));
create policy leads_staff_update on leads for update
  using (is_staff(array['founder','admin','ops']::admin_role[]));
create policy leads_admin_delete on leads for delete
  using (is_staff(array['founder','admin']::admin_role[]));
```

No anon `insert` policy on `leads`: the Server Action is the only write path, so spam control lives in one place.

### Seed data

| Set | Content | Source |
|---|---|---|
| Services (4) | `cooling`, `heating`, `water`, `process`: Cooling Optimization, Heating & Steam, Water Quality, Process Integration | Titles from brief; descriptions `SOURCE: CRAWL` |
| Industries (6) | Oil & Gas, Power, Manufacturing, Paper, Food & Beverage, plus a sixth (**OPEN QUESTION**) | Descriptions `SOURCE: CRAWL` |
| Applications | All items on the old site | `SOURCE: CRAWL` |
| Q&A bank | 26 entries below | Answers from crawl; unsourced ones flagged `NEW – APPROVAL` |
| Menu tree | See §7 | |

**Q&A bank (answers filled from the content map; none are written until a source exists)**

| # | Question | Keywords | Source |
|---|---|---|---|
| 1 | What does Exergy Solutions do? | what, do, company, about | Home / About |
| 2 | What is exergy analysis? | exergy, analysis, thermodynamics | Approach (NEW if absent) |
| 3 | How is this different from a normal energy audit? | audit, different | Approach / Benefits |
| 4 | What does "guaranteed, turnkey" mean? | guarantee, turnkey | Home / Benefits |
| 5 | What services do you offer? | services, offer | Services |
| 6 | What is cooling optimization? | cooling, chiller, tower | Services / Cooling |
| 7 | What is heating & steam optimization? | heating, steam, boiler | Services / Heating |
| 8 | What does water quality include? | water, quality, treatment | Services / Water |
| 9 | What is process integration? | process, integration | Services / Process |
| 10 | Which industries do you serve? | industries, sectors | Industries |
| 11 | Do you work with oil & gas? | oil, gas | Industries |
| 12 | Do you work with power plants? | power, utility | Industries |
| 13 | Do you work with manufacturing? | manufacturing, factory | Industries |
| 14 | Do you work with paper mills? | paper, pulp, mill | Industries |
| 15 | Do you work with food & beverage? | food, beverage | Industries |
| 16 | What are the benefits? | benefits, why | Benefits |
| 17 | How much can I save? | save, savings, cost | Benefits (never invent figures) |
| 18 | How do I request an assessment? | assessment, request | Assessment |
| 19 | What happens after I submit? | after, next | NEW – APPROVAL |
| 20 | How long does a project take? | long, duration | NEW – APPROVAL |
| 21 | Where are you located? | where, location, dubai | Contact |
| 22 | Do you work outside the UAE? | outside, international | NEW – APPROVAL |
| 23 | What's your phone or email? | phone, email, call | Contact |
| 24 | What are your working hours? | hours, open | Contact (NEW if absent) |
| 25 | Do you handle implementation or only advice? | implementation, install | Approach |
| 26 | Can I speak to a person? | human, agent, person | Handoff action |

---

## 5. Website Blueprint

### Design direction

Corporate, technical, trust-heavy. Keep the client's logo and existing blue/teal. Refresh the type scale, spacing and secondary palette toward a deep-blue/teal engineering look. References: engineering consultancies, Siemens Energy, Schneider Electric.

- **Tokens:** `navy-950` for hero/footer, `blue-700` primary, `teal-500` accent, slate neutrals, one amber signal color for stat highlights only.
- **Type:** technical sans for headings, readable body sans, mono for numeric callouts. Final pairing decided Week 1, Day 3.
- **Photography:** real facility and equipment images only, from originals the client supplies. **OPEN QUESTION on every page: which assets exist?** Fallback is a diagram or dark gradient. No stock imagery without client approval.
- **Diagrams (inline SVG):** energy vs exergy quality, exergy-destruction flow, four-step method, and a simple per-service schematic. Labels come from site copy.
- **Trust elements:** statistics, logos, testimonials, certifications: only what the old site actually contains.

### Animation vocabulary

Fade-up on `whileInView` (once, 24 px, 400 ms) · staggered card reveal (60 ms) · count-up statistics · slow SVG line-flow in hero · `pathLength` line-draw on diagrams · subtle card hover lift. `prefers-reduced-motion` disables everything except opacity. Framer is lazy-loaded below the fold.

### Mobile rules

Single column; sticky bottom "Request assessment" bar on service/industry pages; chat launcher offset above it; tables collapse to stacked cards; art-directed 4:5 hero crop.

### Pages

Meta descriptions are drafts for approval. `H1: SOURCE: CRAWL` means use the verbatim old-site heading.

| Route | Title | Hero | Sections (in order) | CTAs | Animation | Internal links |
|---|---|---|---|---|---|---|
| `/` | Exergy Solutions \| Turn Wasted Energy and Water into Profit | H1 "Turn wasted energy and water into profit"; subhead from old site; background: navy with animated flow lines | Stat strip → Why exergy (diagram) → 4 service cards → Approach in 4 steps → Industries grid → Benefits → Testimonials/logos (if any) → CTA band | Hero, after services, final band, mobile sticky | Flow lines, count-up, card stagger, step line-draw | Cards → service pages; industries → `/industries#slug`; approach → `/approach` |
| `/about` | About Exergy Solutions \| Dubai Energy Efficiency Consultancy | H1 `SOURCE: CRAWL` | Story → positioning → expertise → team (if sourced) → location → CTA band | Single "Request an assessment" | Fade-up, light parallax | `/approach`, `/services`, `/contact` |
| `/approach` | Our Approach \| Exergy Analysis & Turnkey Delivery | H1 `SOURCE: CRAWL` | What exergy is (diagram) → why it finds more than an energy audit → method steps → capex/opex message → CTA | Request an assessment | Scroll-driven step draw, Sankey reveal | Each service; `/benefits` |
| `/services` | Services \| Cooling, Heating & Steam, Water, Process Integration | H1 `SOURCE: CRAWL` | Intro → 4 alternating split cards → "How we deliver" → industries teaser → CTA | Request an assessment | Card stagger | `/services/[slug]` |
| `/services/[cooling\|heating\|water\|process]` | `{Service} \| Exergy Solutions` | H1 = service title; subhead = old-site description; image OPEN QUESTION | What it is → where waste occurs → what we do → benefits → applicable industries → related applications → FAQ → CTA | Assessment (prefilled `?service=`), talk to us | Per-service SVG reveal | Sibling services, `/applications`, `/assessment?service=` |
| `/applications` | Applications \| Where Exergy Solutions Delivers Savings | H1 `SOURCE: CRAWL` | Filterable grid (service/industry) → detail drawer → CTA | Request an assessment | Layout animation on filter | Service and industry pages |
| `/industries` | Industries Served \| Oil & Gas, Power, Manufacturing, Paper, Food & Beverage | H1 `SOURCE: CRAWL` | Tiles → one section per industry (challenge, services, applications) → CTA | Request an assessment | Tile hover, scroll-spy anchors | Relevant services |
| `/benefits` | Why Exergy Solutions \| Benefits & Guarantee | H1 `SOURCE: CRAWL` | Benefit blocks → guaranteed turnkey → comparison table (only if sourced) → stats → testimonials → CTA | Request an assessment | Count-up, row reveal | Services, assessment |
| `/assessment` | Request an Assessment \| Exergy Solutions | Two columns: reassurance copy + multi-step form | Form (§6) with privacy note | Submit | Step slide/fade, progress bar | `/privacy`; prefill from query params |
| `/contact` | Contact \| Exergy Solutions, Dubai | H1 `SOURCE: CRAWL` | Details + short form → map → assessment link → FAQ | Submit; tap-to-call | Minimal | `/assessment` |
| `/privacy`, `/terms` | Privacy Policy / Terms of Service | Title only | Client-approved legal text. Structure supplied: data collected (form, chat, hashed IP, cookies), processors (Supabase, Resend, Cloudflare), retention, contact for requests | n/a | None | Footer |

---

## 6. Assessment and Lead Capture

### Form fields

Compare against the current form from the crawl. Proposed:

| Step | Fields | Required |
|---|---|---|
| 1 Contact | name, work email, phone, company, job title | name, email, company |
| 2 Facility | sector (from `industries`), country, facility type | sector |
| 3 Needs | services (multi-select from `services`), main challenge, timeline (this quarter / 6 months / exploring), cost band (optional) | at least one service |
| 4 Review | summary, consent checkbox → `/privacy`, Turnstile | consent |

Improvements: progress bar, per-step validation, `sessionStorage` autosave (try/catch), prefill from query params, `aria-live` errors.

### Logic

`react-hook-form` + Zod per step, merged server schema. Nothing is sent until step 4. Back/next preserves state. "Other" sector reveals a text field. Enter advances a step and never submits early.

### Scoring and routing (tunable in `site_settings.lead_routing`)

| Signal | Points |
|---|---|
| Timeline this quarter | +30 |
| Timeline 6 months | +15 |
| Sector in target five | +20 |
| Phone provided | +10 |
| Company email domain | +15 |
| Multiple services | +10 |
| Challenge text over 80 chars | +10 |
| Chatbot handoff | +15 |

`hot` ≥ 60, `warm` 35–59, `cold` < 35. Hot leads trigger an immediate `[HOT]` email to all notify addresses. Assignment by sector is optional (OPEN QUESTION: multiple salespeople?).

### Follow-up automation (no CRM)

1. Instant auto-reply with a reference ID.
2. Admin notification with a deep link to the lead.
3. Optional daily reminder for `new` leads older than 24 h (pg_cron → Resend); cut first if time is tight.
4. Status changes logged to `lead_events`.

### Thank-you page

Confirmation, reference ID, "what happens next" (client-approved copy), link to Services, `noindex`, conversion event fired once.

---

## 7. Rule-Based Chatbot

**Deterministic only. No LLM calls.**

### Menu tree (max three levels)

```
main (depth 0): welcome + numbered options
├─ 1 Services
│   ├─ 1 Cooling Optimization    [answer + CTA: Request assessment | View page]
│   ├─ 2 Heating & Steam
│   ├─ 3 Water Quality
│   └─ 4 Process Integration
├─ 2 Industries
│   ├─ Oil & Gas   [answer + case study if one exists + CTA]
│   ├─ Power · Manufacturing · Paper · Food & Beverage
│   └─ (sixth industry, OPEN QUESTION)
├─ 3 Request an Assessment       action: start_assessment
├─ 4 FAQs                        top Q&A as buttons; free text falls through to Q&A match
├─ 5 About Exergy
└─ 6 Talk to a Human             action: handoff
```

Every bot message carries persistent **Main menu** and **Talk to a human** buttons, injected by the engine.

### Engine algorithm

```
handle(session, input):
  1. node_key supplied (button tap)        → go(node_key)
  2. session.mode is a capture mode        → handle capture first
  3. normalize: lowercase, trim, strip punctuation, collapse spaces
  4. globals: "menu"|"main"|"0"|"start over" → main
              "human"|"agent"|"person"       → handoff
              "back"|"9"                     → parent
  5. number                                → child at that position, if it exists
  6. keyword route over children + root     → go() if one clear winner (threshold + margin)
  7. Q&A match (keyword overlap + trigram)  → answer + "Was this helpful?" + menu buttons
  8. fallback: fallback_count++ ; "I didn't catch that, here's the menu again." + current menu
               if fallback_count ≥ 2 → also offer "Talk to a human"
```

Ties go to menu nodes over Q&A. Nothing fuzzy except trigram on Q&A. Thresholds live in `site_settings.chatbot`. `fallback_count` resets on any successful route.

### Lead capture

Triggered by `start_assessment` (offer form link or in-chat capture) and by intent words ("quote", "price", "assessment", "call me"). Flow: name → email (validated, 2 retries then back to menu) → optional phone/company → upsert `leads (source='chatbot')`, link the session, notify admin. A consent line shows before email.

### Human handoff

If no contact details yet, capture first. Then create or update the lead (`source='handoff'`, priority bumped), set `status='needs_human'`, email admins with a transcript link, and tell the visitor "Thanks, we'll be in touch" plus business hours.

### Persistence

`localStorage` token (guarded), restore the last 30 messages on reload, auto-close after 24 h idle, IP stored only as a salted hash.

### Admin editing without redeploy

`/admin/chatbot`: tree editor (reorder, add/disable, depth limit enforced in UI and DB), body editor with live widget preview, keyword tags, Q&A table with CSV import/export, fallback log (top unmatched phrases → new Q&A), settings (welcome text, offline message, thresholds). The engine caches the tree for 60 seconds per isolate; **Publish** bumps `site_settings.chatbot.version`.

---

## 8. Admin Dashboard

### Auth and roles

Supabase Auth, invite-only (no public sign-up), `@supabase/ssr` cookie sessions, middleware for refresh only. Every Server Action and page re-checks the role. Optional TOTP for founder/admin.

| Capability | founder | admin | ops | viewer |
|---|---|---|---|---|
| View dashboard, leads, chats | ✓ | ✓ | ✓ | ✓ |
| Change lead status, notes, assignment | ✓ | ✓ | ✓ | |
| Delete leads, CSV export | ✓ | ✓ | | |
| Reply to chats | ✓ | ✓ | ✓ | |
| Edit chatbot tree and Q&A | ✓ | ✓ | | |
| Edit content | ✓ | ✓ | | |
| Site settings | ✓ | ✓ (not notify emails) | | |
| Manage admins | ✓ | | | |

### Pages

| Route | Contents |
|---|---|
| `/admin` | KPI cards (leads this week/month, open chats, hot leads, median time to first contact), leads-over-time, source breakdown, funnel, recent activity |
| `/admin/leads` | Table and kanban toggle; filters (status, priority, source, sector, date, assignee); search; bulk status; CSV export; **lead drawer** (details, notes, event timeline, linked transcript, assign, status) |
| `/admin/chats` | Inbox (needs-human first, unread badges via Realtime), conversation view, reply, convert to lead, close |
| `/admin/chatbot` | Tree editor, Q&A bank, fallback log, preview, settings |
| `/admin/content` | Tabs for services, industries, applications, testimonials, FAQs; markdown editor; Storage uploads; publish toggle; revalidate |
| `/admin/settings` | Contact details, notify emails, social, hours, routing weights, admin users (founder) |

### Pipeline

`new → contacted → qualified → proposal → won / lost`. Lost requires a reason. Every change writes `lead_events`.

### Analytics

Leads this week vs last, by source, by sector, funnel conversion, conversion rate (won ÷ total), chatbot sessions/handoffs/fallback rate/top Q&A, median time to first contact. Computed from Postgres views (`v_leads_daily`, `v_funnel`, `v_chat_stats`); no third-party analytics needed.

---

## 9. Build Phases

**Standing rules:** client SLA is feedback within 2 business days and all assets (logo, images, copy approvals) by end of Week 1. Every client delay moves delivery by the same number of working days, confirmed in writing the same day.

### Phase 0: pre-project (about half a day)

Run the crawl, build the content map, send the asset/DNS requests (§12).

### Week 1: Planning and UI/UX

| Day | Tasks | Deliverable | Client input |
|---|---|---|---|
| 1 | Kickoff; review crawl; fill content map; confirm sitemap and industry count | Signed-off sitemap + content map v1 | Confirm sitemap; supply original assets |
| 2 | Wireframes (Home, Services, service page, Assessment, Contact); chatbot flow diagram | Wireframes + bot tree | |
| 3 | Design system: tokens, type, components, motion spec, diagram style | Style guide | |
| 4 | Hi-fi: Home, Services, a service page, Industries, Assessment, Contact (desktop + mobile) | Hi-fi screens | Review within 2 days |
| 5 | Remaining pages, admin screens (adapted from NeuralWaves); optional 1-hour OpenNext hello-world spike | Full design pack | **Design approval; all assets and copy approvals due; DNS/email-domain access confirmed** |

### Week 2: Website development

| Day | Tasks | Deliverable |
|---|---|---|
| 1 | **Cloudflare-specific setup, full day.** Repo and Next 14.2 scaffold; Tailwind/shadcn; `open-next.config.ts`; `wrangler.jsonc`; remove edge-runtime exports; `images.unoptimized`; env wiring; build/deploy scripts; CI; ISR/R2 and tag-cache decision; `.dev.vars`; smoke test of a route and a Server Action on the deployed Worker | Hello-world with a working Server Action on `*.workers.dev` |
| 2 | Layout, nav, footer, tokens in code, motion primitives, Home | Home on preview |
| 3 | `/about`, `/approach` with SVG diagrams | Two pages |
| 4 | `/services` and four service pages | Five pages |
| 5 | `/applications`, `/industries`, `/benefits`, `/contact` shell, `/privacy`, `/terms` structure | All 15 routes render. **Milestone 1** |

### Week 3: Assessment and lead system

| Day | Tasks | Deliverable |
|---|---|---|
| 1 | Supabase project, migrations, RLS, helpers, seeds; content pages read from DB | Schema, seeds, policy tests passing |
| 2 | Multi-step UI, Zod, prefill, autosave, a11y | `/assessment` UI |
| 3 | Server Action → Turnstile → Supabase → Resend; rate limit; error states | End-to-end submit on preview |
| 4 | Scoring/routing, email templates (reused), contact form, thank-you, `lead_events` | Lead system complete |
| 5 | Resend DNS (SPF/DKIM/DMARC) on client domain; deliverability test; integration tests | **Milestone 2** |

### Week 4: Chatbot and knowledge base

| Day | Tasks | Deliverable |
|---|---|---|
| 1 | Engine core: normalize, parse, number/keyword/Q&A routing, fallback, unit tests | Engine passing tests |
| 2 | Seed tree and Q&A from content map; widget UI (reused, add quick replies and numbered menu) | All branches answer |
| 3 | Sessions/messages, restore, expiry, lead capture | Capture creates leads |
| 4 | Handoff, admin notification, polling for replies, fallback logging | Handoff end to end |
| 5 | Full branch matrix, copy approvals, threshold tuning | **Milestone 3** |

### Week 5: Admin dashboard and analytics

| Day | Tasks | Deliverable |
|---|---|---|
| 1 | Shell (reused), auth, invites, roles, guards | Secure login |
| 2 | Leads table, filters, drawer, notes, kanban, CSV | Pipeline |
| 3 | Chat inbox and replies; chatbot editor and Q&A bank | Chat and bot editing |
| 4 | Content CRUD, uploads, revalidate; settings | Content editable |
| 5 | Dashboard views and widgets; permission tests | **Milestone 4** |

### Week 6: Testing, deployment, handover

| Day | Tasks | Deliverable |
|---|---|---|
| 1 | Functional QA (§10), fixes | No open P1/P2 bugs |
| 2 | Performance, accessibility, cross-browser, responsive | Lighthouse and axe reports |
| 3 | Security checklist, RLS audit, backup drill; staging UAT with client | UAT sign-off |
| 4 | Production deploy, DNS cutover, monitoring, redirects, sitemap/robots | **Live** |
| 5 | Training sessions (recorded), guides, handover package, start 30-day support | Handover sign-off |

---

## 10. Testing Plan

**Forms, database, email**
- [ ] Valid submit creates a `leads` row with all fields, score, `consent_at`, `email_status`
- [ ] Server rejects invalid/missing fields even when client validation is bypassed
- [ ] Turnstile failure, rate limit (6th submit in an hour), honeypot
- [ ] Resend failure doesn't lose the lead
- [ ] Both emails reach Gmail and Outlook, not spam; SPF/DKIM pass
- [ ] Duplicate email creates a new row, linked by email in admin
- [ ] Prefill via `?service=` and `?sector=`
- [ ] Unicode, long input, XSS payloads stored inert and rendered escaped

**Chatbot (node × input matrix)**
- [ ] Every node reachable by button, number and keyword
- [ ] Every answer node's CTA works (link, assessment, handoff)
- [ ] Main menu and Talk to a human on every message
- [ ] Inputs: `0`, `menu`, `back`, `9`, out-of-range and negative numbers, whitespace, emoji, 2000 characters, HTML/SQL strings, mixed case, punctuation
- [ ] Fallback ×1 and ×2; counter resets after success
- [ ] Keyword ties, ambiguous input, Q&A below threshold
- [ ] Capture: invalid email ×3, abandon mid-flow, "menu" mid-flow
- [ ] Handoff with and without prior capture; admin email arrives; lead created once
- [ ] Session restore after reload and after 24 h expiry, with `localStorage` blocked
- [ ] Disabled node disappears after publish; depth-3 insert rejected by the DB
- [ ] Admin reply reaches visitor within 5–10 s

**Admin**
- [ ] Unauthenticated access to every `/admin/*` route redirects; direct Server Action calls are rejected
- [ ] Each role against the permission matrix (one test user per role)
- [ ] Last founder cannot be removed or demoted; deactivated admin loses access
- [ ] CRUD for every content type; upload size/type limits; publish toggle reflects on the public site
- [ ] Status transitions; lost reason required; CSV escapes formula prefixes (`=`, `+`, `-`, `@`)

**Responsive:** 375 / 768 / 1440 for every route; admin at 768 / 1440; chat launcher vs sticky CTA overlap.  
**Browsers:** Chrome, Safari (macOS and iOS), Firefox, Edge.  
**Performance:** Lighthouse ≥ 90 mobile on Home, Services, Assessment; LCP < 2.5 s, CLS < 0.1, INP < 200 ms; image/SVG hero, no video; self-hosted fonts with `font-display: swap`; lazy Framer; check Worker cold starts.  
**Security:** policy tests per table and role; service-role key absent from the client bundle (grep build output); secrets never logged; CSP, HSTS, X-Frame-Options, Referrer-Policy; input length limits; rate limits on chat and forms; Turnstile verified server-side; storage bucket policies; dependency audit; cookie flags.  
**Accessibility (WCAG 2.1 AA):** axe plus manual keyboard pass; contrast on navy/teal; multi-step focus order; `aria-live` errors; chat widget focus trap and labels; reduced motion; alt text; text alternatives for diagrams.

---

## 11. Deployment and Handover

### Deploy steps

1. Production Supabase project (Pro); run migrations and seeds; create the founder user.
2. Cloudflare Worker, R2 bucket (and D1 if the tag cache needs it); bindings in `wrangler.jsonc`.
3. Secrets in Workers settings **and** CI; build-time `NEXT_PUBLIC_*` in CI.
4. CI runs `npx opennextjs-cloudflare build`, then `npx opennextjs-cloudflare deploy` on `main`.
5. Smoke test on `*.workers.dev`: pages, form, bot, admin login.
6. Attach the custom domain; set `NEXT_PUBLIC_SITE_URL`; rebuild.
7. Old-URL redirects, `sitemap.xml`, `robots.txt` (admin and thank-you `noindex`), Search Console.

### DNS and domain

The domain stays with the client. Option A: client moves nameservers to Cloudflare (simplest for Workers). Option B: client keeps DNS elsewhere and adds the records we provide. Resend SPF/DKIM/DMARC go in either way. Lower the TTL 24 h before cutover, keep the old site up until verified, and roll back by reverting DNS. **OPEN QUESTION: who controls DNS and the registrar?**

### Backups and monitoring

Supabase daily backups plus a weekly `pg_dump` to R2; one restore drill before launch. Uptime checks on `/` and `/api/health`; Cloudflare logs; Resend bounce/complaint webhook into `leads.email_status`; error tracking (OPEN QUESTION).

### Handover package

- Recorded walkthroughs (20–30 min): admin tour, leads, chat inbox, editing the chatbot, content CRUD, adding an admin.
- Written: admin guide, chatbot editing guide (tree, keywords, Q&A, fallback log, Publish), runbook (env vars, deploy, rollback, restore).
- Credentials transfer checklist (Cloudflare, Supabase, Resend, GitHub) to client-owned accounts.
- Architecture one-pager.

### 30-day support

Defects against signed scope fixed at no charge; response within one business day; check-ins on day 7 and day 30; a chatbot tuning session at two weeks using real fallback data; anything new goes through change request.

---

## 12. Client Communication

| When | Send | Ask for |
|---|---|---|
| Kickoff (W1D1) | Plan summary, sitemap, SLA doc | One approver; original logo/images; DNS and registrar owner; sending domain; notification emails; legal text owner; sixth industry |
| W1D5 | Design pack | Design approval, all assets and copy approvals |
| W2D5 (M1) | Preview URL + short video walkthrough | Copy accuracy review |
| W3D5 (M2) | Form → DB → email demo | Email wording approval; recipients; DNS records applied |
| W4D5 (M3) | Chatbot demo + `NEW – APPROVAL` list | Bot copy approval |
| W5D5 (M4) | Admin walkthrough, test accounts | Admin users and roles |
| W6D3 | UAT checklist | Sign-off |
| W6D5 | Handover package | Final acceptance |

**Slip notice (send the same day):** "Feedback was due {date} and arrived {date}. Delivery moves {n} working days to {date}."

**Scope creep:** acknowledge → check against signed scope → classify (in scope / clarification / change) → for changes send a mini change request (what, effort, date impact, price) → proceed only on written yes → park nice-to-haves on a visible Phase 2 list.

**Professional delivery standards (for this client and for referrals):**
- A short written status every Friday: done, next, blocked, decisions needed.
- Every milestone ships with a live preview link, not screenshots.
- One shared decision log (`docs/DECISIONS.md`) so nothing depends on memory.
- Admin and chatbot guides written so the client's team never needs to message you for routine edits.
- Ask for a short testimonial and an intro to relevant contacts at the day-30 check-in, once the site has delivered visible results.

**Phase 2 talking points**
- **AI chatbot upgrade:** use the real fallback log as the business case; keep the rule-based flow for capture and add retrieval over approved content.
- **WhatsApp automation:** reuse the same decision tree on a channel the region uses heavily.
- **CRM integration:** push `leads` by webhook once volume justifies it.
- **Arabic site:** the locale-ready structure makes it translation plus RTL QA.
- **Retainer:** content updates, bot tuning, monitoring, quarterly review.

**Growing the relationship (startups in the client's network).** The stack here, a marketing site with lead capture, a deterministic bot and an admin panel, is a repeatable package. After launch, write a one-page case study (with the client's permission), document the build as a reusable starter, and offer a fixed-scope "launch site + lead system" package for early-stage companies. Pricing and positioning for that are your call.

---

## 13. Risk Register

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| 1 | OpenNext/Workers breaks a Next feature (middleware, ISR, Server Actions) | Med | High | Week 2 Day 1 setup; optional Week 1 spike; stay on 14.2.x; time-based revalidation fallback |
| 2 | Edge-runtime assumption wrong | High | Low | All routes treated as Workers runtime; verify Day 1 |
| 3 | Content extraction harder than expected | High | High | Playwright crawl; manual fallback; content map with IDs |
| 4 | Late client assets/approvals | High | High | Written SLA and slip rule; asset checklist |
| 5 | No original or low-resolution images | Med | Med | Request originals Day 1; diagram/gradient fallbacks |
| 6 | DNS access slow or missing | Med | High | Ask at kickoff; temporary sending domain; lowered TTL |
| 7 | Emails land in spam | Med | High | SPF/DKIM/DMARC; test sends; plain-text alternative; lead stored regardless |
| 8 | Spam submissions | Med | Med | Turnstile, honeypot, rate limit, mark-as-spam |
| 9 | Chatbot gives unsourced answers | Med | High | `source_page` on every answer; client approval |
| 10 | Unrecognized inputs frustrate users | High | Med | Fallback ladder, human option, weekly fallback-log review |
| 11 | RLS misconfiguration exposes leads | Low | Critical | No anon policies on sensitive tables; automated policy tests; service role server-only |
| 12 | Scope creep | High | High | Change-request protocol; Phase 2 list |
| 13 | Legal pages missing or unapproved | Med | Med | Client counsel; structure supplied; timestamped consent |
| 14 | Worker bundle size / cold starts | Med | Med | Paid plan; bundle analysis; lazy Framer; light dependencies |
| 15 | Supabase free tier pausing / no backups | Med | High | Pro plan; backup drill |
| 16 | Solo-developer bottleneck | Low | High | Daily commits, docs, buffer from reuse savings |
| 17 | Chat replies missed | Low | Med | Polling fallback; optional visitor email |
| 18 | Animation hurts performance | Med | Med | Lazy motion; reduced-motion; Lighthouse CI gate |
| 19 | Account ownership dispute at handover | Low | Med | Client-owned accounts from day 1 where possible |
| 20 | Week 2 Day 1 overrun cascades | Med | High | Content in typed files until Week 3 Day 1; take buffer from Week 5 polish |

---

## 14. Reuse from NeuralWaves

Based on your description of that codebase; re-baseline the hours on Week 1, Day 5.

| Reuse | Adaptation | Est. hours saved |
|---|---|---|
| Supabase clients (browser, server, service) | Env names; Workers-safe check | 3 |
| Auth, middleware, admin guard | Four-role enum, `admins` table | 6 |
| RLS patterns and helper functions | New tables and roles | 5 |
| Admin layout, navigation, tables | New routes and labels | 8 |
| Lead drawer and status pipeline | New statuses/fields; kanban toggle | 8 |
| Chat widget UI | Quick replies, numbered menu, persistent shortcuts, restore | 8 |
| Chat session/message plumbing and inbox | `needs_human` states, polling endpoint | 8 |
| Resend email templates | Rebrand, Exergy copy | 4 |
| Form patterns, Zod, Turnstile, rate limit | Multi-step assessment | 5 |
| Cloudflare/OpenNext config | Re-verify versions (setup day still budgeted) | 2 |
| shadcn/ui and Tailwind setup | New tokens | 3 |
| **Total** | | **≈ 60 h** |

**New work (no reuse):** rule-based engine, tree editor UI, exergy diagrams, marketing page templates, content crawl and seeding, scoring logic, analytics views.

Treat the saved time as buffer for Cloudflare surprises and approval delays, not as scope to promise back to the client.

---

## Open Questions (consolidated)

1. Crawl output needed to complete the content map, seeds and page copy.
2. The sixth industry.
3. Image originals per page.
4. Fields on the current assessment form.
5. Do case studies, testimonials, logos, certifications, statistics exist on the old site?
6. Business hours, exact address and map pin, phone/email list.
7. DNS/registrar owner; sending domain for Resend.
8. Notification recipients; lead-routing owners.
9. Legal text owner; UAE PDPL position; analytics and cookie choice.
10. Who pays for Cloudflare, Supabase and Resend.
11. Adapter facts to verify Week 2, Day 1: Next 14.2.x support, edge-runtime handling, tag-cache requirement for `revalidatePath`.
