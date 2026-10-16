# Architecture & Engineering Decisions Log

This document records architectural, technical, and operational decisions made during the Exergy Solutions project.

---

## Decision 001: Clean Workspace & Implementation Plan Setup
- **Date:** 2026-10-16
- **Context:** Project repository contained legacy/unrelated prototype code. The client signed off on the 6-week firm scope implementation plan.
- **Decision:** Removed all obsolete files (`backend/`, `frontend/`, `vercel.json`, root `package.json`). Initialized `AGENTS.md`, `docs/IMPLEMENTATION_PLAN.md`, crawler script (`scripts/crawl_exergy.py`), and documentation infrastructure.
- **Consequences:** Clean slate aligned with Cloudflare Workers + OpenNext Next.js 14 stack and zero placeholder / zero invented copy rules.

---

## Decision 002: Live Content Crawl & Content Map Extraction (Phase 0)
- **Date:** 2026-10-16
- **Context:** `https://exergy-solutions.com` is a client-rendered Vite Single Page Application. Automated raw HTTP extraction was insufficient.
- **Decision:** Installed Playwright Chromium via `uv` and executed `scripts/crawl_exergy.py` against `https://exergy-solutions.com`.
- **Findings & Resolutions:**
  1. **6 Industries Identified:** Found 6 actual target sectors in the live site (Paper, Processing, Petroleum, Buildings, Hospitality, Healthcare), resolving the brief's ambiguity.
  2. **6 Services Identified:** Found 6 core services (Cooling optimization, Heating & steam, Drying processes, Water quality, Waste-heat recovery, Process integration).
  3. **Verbatim Statistics:** Confirmed `5–10%` reduction from well-designed systems and `25–30%` typical resource cut.
  4. **Company Information:** Physical address `334/6D Al Wasl Street DM199 Al Satwa, Dubai UAE` and primary contact `sarfraz@exergy-solutions.com`.
- **Artifact:** Compiled all verbatim headings, paragraphs `P-01` to `P-33`, and statistics into `content/content-map.md`.

---

## Decision 003: Administrative & Notification Contact
- **Date:** 2026-10-16
- **Context:** User mandate: "every thing should be working with the neuralwaves.official@gmail.com" and testing support email `support@neuralwaves.in`.
- **Decision:** Formally wired `neuralwaves.official@gmail.com` and `support@neuralwaves.in` as:
  1. Founder and Support accounts in admin header, seeds, and lead pipeline table.
  2. Multi-recipient alerts in environment variables (`ADMIN_NOTIFY_EMAILS=neuralwaves.official@gmail.com,support@neuralwaves.in`).
  3. Form submission recipient and chatbot human handoff email dispatch target.
  4. Legal privacy officer in `app/privacy/page.tsx` and public contact page card.

---

## Decision 004: Next.js 14.2 & @opennextjs/cloudflare Adapter Compatibility
- **Date:** 2026-10-16
- **Context:** OpenNext Cloudflare v1.x series dropped Next 14 support and made Next 15+ a peer dependency. Next.js was pinned to 14.2.x per `AGENTS.md`.
- **Decision:** Pinned `@opennextjs/cloudflare` to `^0.6.6` with `wrangler: "^3.114.1"`. Configured `open-next.config.ts` using `dummy` in-memory incremental cache to eliminate external R2 setup hurdles during initial deployment.
- **Consequences:** `npx opennextjs-cloudflare build` compiles cleanly into `.open-next/worker.js` and deploys seamlessly via `npx opennextjs-cloudflare deploy`.

---

## Decision 005: Cloudflare Workers Deployment & GitHub Synchronization
- **Date:** 2026-10-16
- **Context:** Deploy application to Cloudflare Workers and sync repository to GitHub.
- **Decision:** Pushed all production Next.js 14 code to `https://github.com/zaaammmiiinnn/exergy-prototype.git` on branch `main`. Deployed worker `exergy-solutions` to Cloudflare under account `exergy-solutions` (`a4fc344a969016e89b2f026b0bc87840`) at `https://exergy-solutions.exergy-solutions.workers.dev`.
