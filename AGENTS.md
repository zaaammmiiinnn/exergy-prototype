# AGENTS.md — Exergy Solutions build

Read this file and `docs/IMPLEMENTATION_PLAN.md` before doing any work. This file holds the rules. The plan holds the what and the when.

## Project in one paragraph

Multi-page, animated marketing site for Exergy Solutions (Dubai, energy-efficiency consulting) with an assessment/lead system, a rule-based chatbot (no LLM), and a role-based admin dashboard. Next.js 14 App Router + TypeScript, Tailwind + shadcn/ui, Framer Motion, Supabase, Resend, deployed on Cloudflare Workers via `@opennextjs/cloudflare`.

## Non-negotiables

1. **No invented content.** Every marketing sentence, statistic, service/industry description and chatbot answer must come from `content/crawl/exergy_crawl.json` (the old site) or be flagged `NEW – APPROVAL` in `content/content-map.md`. If you can't find a source, stop and ask. Never fill in placeholder marketing copy, fake testimonials, fake logos, or stock claims.
2. **The chatbot is deterministic.** No OpenAI/Anthropic/Gemini calls anywhere in the product. Decision tree + keyword matching + Q&A bank only.
3. **Stack is fixed.** Do not swap frameworks, add a CMS, or add a UI library beyond shadcn/ui.
4. **Secrets never reach the client.** `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY` are server-only. Only `NEXT_PUBLIC_*` values are inlined into the bundle.
5. **All lead and chat writes go through server code** (Server Actions or route handlers). The anon role gets no write policy on `leads`, `chat_sessions`, or `chat_messages`.
6. **Authorization is checked in every Server Action and admin page**, not only in middleware.
7. **Stay in scope.** English only at launch (locale-ready structure, no Arabic). No CRM integration. No full rebrand. Anything else goes in `docs/PHASE2.md`, not the code.

## Cloudflare / OpenNext rules

- Build: `npx opennextjs-cloudflare build`. Deploy: `npx opennextjs-cloudflare deploy`. Do not use bare `wrangler deploy`.
- `open-next.config.ts` at the repo root using `defineCloudflareConfig()`; R2 incremental cache.
- `wrangler.jsonc`: `nodejs_compat` flag, a recent `compatibility_date`, R2 binding, assets binding.
- Do **not** add `export const runtime = 'edge'`. Everything runs in the Workers runtime. (Verify against current adapter docs on Week 2 Day 1 and record the result in `docs/DECISIONS.md`.)
- No `fs`, `path`, or Node `crypto` in app code. Use Web Crypto (`crypto.subtle`, `crypto.randomUUID()`).
- Images: `images.unoptimized = true`; pre-optimize assets to WebP/AVIF; always set `width`/`height`.
- `NEXT_PUBLIC_*` vars must be present at build time. Server secrets live in Workers secrets, `.dev.vars` locally, and CI secrets.
- Pin Next to 14.2.x. Don't upgrade dependencies mid-project without a note in `docs/DECISIONS.md`.

## Code conventions

- TypeScript `strict: true`. No `any` without a comment explaining why.
- Zod schema is the single source of truth for each form; the same schema runs on client and server.
- Content pages read from Supabase (ISR). Until the DB exists (Week 3 Day 1), content lives in typed files under `content/seed/` that mirror the DB columns, so migration is a script, not a rewrite.
- Components: `components/ui` (shadcn), `components/site` (marketing), `components/admin`, `components/chat`.
- Server logic: `lib/supabase/{browser,server,service}.ts`, `lib/email/`, `lib/leads/`, `lib/chatbot/`. The chatbot engine (`lib/chatbot/engine.ts`) is pure: no I/O inside the matcher, so it unit-tests without mocks.
- Animations: Framer Motion only, via shared primitives in `components/site/motion.tsx`. Always honor `prefers-reduced-motion`. Lazy-load below-the-fold motion.
- Accessibility: semantic HTML, labelled controls, visible focus, `aria-live` for form errors, text alternatives for diagrams.
- Wrap every `localStorage`/`sessionStorage` access in try/catch and render correctly when storage is empty or blocked.
- Commits: conventional commits (`feat:`, `fix:`, `chore:`), small and frequent. One branch per day-task, merged via PR to `main`.

## Definition of done (every task)

- [ ] Typechecks and lints clean
- [ ] Works on the deployed Cloudflare preview, not only locally
- [ ] Checked at 375 / 768 / 1440
- [ ] Copy traces to a source in the content map
- [ ] Tests added where the plan says so
- [ ] `docs/PROGRESS.md` updated (what was done, what's next, open questions)

## When to stop and ask

- Content has no source in the crawl.
- A requirement conflicts with this file or the plan.
- An adapter limitation forces a design change.
- A task would touch scope listed under "Out of scope" in the plan.

## Phase prompts (paste into the agent, one per work block)

**Phase 0: content extraction**
> Read `AGENTS.md` and `docs/IMPLEMENTATION_PLAN.md` §2. Load `content/crawl/exergy_crawl.json`. Build `content/content-map.md`: one table per page with route, title, headings, numbered copy blocks (`P-01…`), CTAs, images, stats, all verbatim. List contradictions and gaps. Do not rewrite any copy. Output the list of open questions at the end.

**Phase 1: Cloudflare setup (Week 2, Day 1)**
> Scaffold Next 14.2 + TypeScript + Tailwind + shadcn/ui. Add `@opennextjs/cloudflare`, `open-next.config.ts`, `wrangler.jsonc` per `AGENTS.md`. Create a `/healthz` route and a trivial Server Action. Deploy with `npx opennextjs-cloudflare deploy` and prove both work on the `*.workers.dev` URL. Record every adapter limitation you hit in `docs/DECISIONS.md`. Do not start page work until this passes.

**Phase 2: pages**
> Build the routes in `docs/IMPLEMENTATION_PLAN.md` §5 using content from the content map. Use shared components (`Hero`, `SectionHeader`, `ServiceCard`, `StatStrip`, `ProcessSteps`, `CTABand`, `FAQAccordion`). Hide any section whose data is empty. Output the list of images still needed.

**Phase 3: database and lead system**
> Write Supabase migrations for every table in §4 with RLS exactly as specified. Add policy tests (one per role). Seed from the content map. Then build the assessment flow in §6: Zod, multi-step UI, Server Action with Turnstile + rate limit → insert → score → Resend (admin + auto-reply) → thank-you page.

**Phase 4: chatbot**
> Implement `lib/chatbot/engine.ts` per §7.2 with unit tests covering every branch in §10. Seed the tree and Q&A bank from the content map; every answer needs `source_page`. Build the widget (quick replies, numbered text, persistent Main menu / Talk to a human, session restore), capture flow, handoff, and polling for admin replies.

**Phase 5: admin**
> Build `/admin/*` per §8 with the four roles and the permission matrix. Reuse patterns from the NeuralWaves admin where they fit; adapt, don't paste blindly. Add permission tests for each role.

**Phase 6: hardening and handover**
> Run the §10 test plan, fix findings, produce Lighthouse/axe reports, run the security checklist, then write the handover docs in §11.
