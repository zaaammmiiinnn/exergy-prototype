# Exergy Solutions — Industrial Energy Efficiency Platform

[![Live Production](https://img.shields.io/badge/Production-Live-30a66a?style=flat&logo=cloudflare)](https://exergy-solutions.neuralwaves.workers.dev)
[![Next.js 14](https://img.shields.io/badge/Next.js-14.2.35-black?style=flat&logo=next.js)](https://nextjs.org/)
[![Cloudflare Workers](https://img.shields.io/badge/Deployed%20on-Cloudflare%20Workers-f38020?style=flat&logo=cloudflare)](https://workers.cloudflare.com/)
[![Supabase](https://img.shields.io/badge/Database-Supabase%20PostgreSQL-3ecf8e?style=flat&logo=supabase)](https://supabase.com/)
[![TypeScript Strict](https://img.shields.io/badge/TypeScript-Strict%205.6-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)

An enterprise-grade, multi-page marketing platform, interactive thermodynamic assessment system, deterministic chatbot, and role-based administrative operations portal for **Exergy Solutions** (Dubai, UAE) — an industrial consultancy specializing in Second-Law thermodynamic optimization, waste heat recovery, pinch analysis, and district cooling efficiency.

Deployed natively to **Cloudflare Workers** via `@opennextjs/cloudflare`.

---

## 🌐 Live Deployments & URLs

- **Production URL**: [https://exergy-solutions.neuralwaves.workers.dev](https://exergy-solutions.neuralwaves.workers.dev)
- **Admin Console**: [https://exergy-solutions.neuralwaves.workers.dev/admin](https://exergy-solutions.neuralwaves.workers.dev/admin)
- **Assessment Wizard**: [https://exergy-solutions.neuralwaves.workers.dev/assessment](https://exergy-solutions.neuralwaves.workers.dev/assessment)
- **Client Portal**: [https://exergy-solutions.neuralwaves.workers.dev/portal](https://exergy-solutions.neuralwaves.workers.dev/portal)
- **Health Check Endpoint**: [https://exergy-solutions.neuralwaves.workers.dev/healthz](https://exergy-solutions.neuralwaves.workers.dev/healthz)

---

## ⚡ Key Highlights & Architecture

### 1. High-Performance Marketing Frontend
- **Design System**: Tailored light palette inspired by industrial clean-tech leaders (Deep Petrol `#0c758d`, Eco Emerald `#30a66a`, Thermodynamic Amber `#F0A431`, Crisp Slate `#F4F8F8`).
- **Typography**: Google Font **Sora** (headings & display), **Inter** (body), and **JetBrains Mono** (technical data and metrics).
- **Interactive Showcases**:
  - 6 Deep Engineering Service Blueprints with Second-Law thermodynamic analyses ($T_0 \dot{S}_{gen}$, Carnot COP) and video walkthrough players.
  - 6 Specialized Industrial Applications (District Cooling, Continuous Processing, Food & Beverage, Paper & Pulp, Petrochemical, Manufacturing).
  - Floating WhatsApp contact launcher (`#25D366`) and interactive quick-navigation widgets.

### 2. Thermodynamic Assessment & Automated Lead Scoring
- **Multi-Step Wizard** (`/assessment`): Captures utility bills, operating hours, baseline electrical/thermal demands, and facility equipment profiles.
- **Dynamic Lead Scoring Algorithm** (`lib/leads/scoring.ts`): Evaluates thermal load, cooling tonnage, boiler operating efficiency, and urgency to assign a quantitative exergy score (0–100) and qualification tier (`hot`, `warm`, `cold`).
- **Real-Time Notification Pipeline** (`lib/email/resend.ts`): Instantly alerts engineering leads (`neuralwaves.official@gmail.com` and `support@neuralwaves.in`) via Resend while dispatching branded client assessment confirmations.

### 3. Pure Deterministic Chatbot Engine
- **No External LLM Dependencies**: Pure decision-tree and keyword matching engine (`lib/chatbot/engine.ts`). Guaranteed zero hallucinations, 100% auditable thermodynamic answers, and sub-millisecond response latency.
- **Tree Navigation & Q&A Bank**: Quick-reply numbers, whole-word boundary matching, source citation tracking, and automated 2-stage fallback escalation to human engineers.
- **Tested & Verified**: Comprehensive unit test suite covering every branch, boundary condition, and edge case.

### 4. Role-Based Operations Console (`/admin`)
- **Granular RBAC**: Strict permissions matrix for three access tiers:
  - `founder` — Unrestricted access (full pipeline, chatbot editor, services/industries CMS, password administration, site settings).
  - `admin` — Operational oversight (lead qualification, task delegation, team directives, chat inbox).
  - `employee` — Operational execution (viewing assigned tasks, status updates, client records; restricted from settings, chatbot tuning, and self-service password mutations).
- **Engineering Task Delegation & Queue**:
  - Live PostgreSQL synchronization via Supabase service role.
  - Multi-employee assignment with support for 100+ engineering specialists across departments (Pinch Analysis, District Cooling, Steam Systems, Waste Heat Recovery, Water & Effluent).
  - Custom employee selection (assign to any staff name/ID), assignee badges on cards, filter by employee, and instant task reassignment.
- **Security & Password Management**:
  - Administrative password control: Only administrators/founders can reset credentials.
  - Employee password protection modal directing staff to contact system administrators.
  - Cloudflare Workers-compatible PBKDF2 Web Crypto password hashing.

---

## 🛠️ Technology Stack

| Layer | Technology | Details |
|---|---|---|
| **Framework** | Next.js 14.2 (App Router) | React Server Components, Server Actions, Route Handlers |
| **Language** | TypeScript 5.6 (Strict Mode) | Full type-safety, zero unchecked `any` |
| **Styling** | Tailwind CSS 3.4 + shadcn/ui | Vanilla CSS variables, responsive bento grids, glassmorphism |
| **Edge Runtime** | Cloudflare Workers | Built with `@opennextjs/cloudflare` and `wrangler` |
| **Database** | Supabase (PostgreSQL 15) | Row-Level Security (RLS), real-time sync, typed RPCs |
| **Transactional Email** | Resend API / Nodemailer | Multi-recipient alerting, automated client auto-replies |
| **Form Validation** | Zod + React Hook Form | Single source of truth for client and server validation |
| **Animations** | Framer Motion | Accessible micro-animations, respect for `prefers-reduced-motion` |

---

## 📂 Project Structure

```
exergy-prototype/
├── app/                           # Next.js 14 App Router
│   ├── (marketing)/               # Public marketing routes
│   │   ├── page.tsx               # Homepage
│   │   ├── about/                 # Executive philosophy & team
│   │   ├── services/              # Core engineering services & video showcase
│   │   │   └── [slug]/            # Deep thermodynamic blueprints
│   │   ├── industries/            # Target sector case studies
│   │   ├── approach/              # Audit methodology & timeline
│   │   ├── benefits/              # Turnkey financial & ESG returns
│   │   ├── applications/          # Facility deployment profiles
│   │   └── contact/               # Direct inquiry & location map
│   ├── actions/                   # Server Actions
│   │   ├── admin-auth.ts          # Session management & PBKDF2 hashing
│   │   ├── admin-leads.ts         # Supabase lead synchronization
│   │   ├── admin-tasks.ts         # Task assignment & team roster management
│   │   └── submit-assessment.ts   # Assessment processing & email dispatch
│   ├── admin/                     # Role-Based Operations Console
│   │   ├── page.tsx               # Dashboard, metrics & task queue
│   │   ├── leads/                 # Lead pipeline table
│   │   ├── chats/                 # Chatbot session history & visitor transcripts
│   │   ├── services/              # Services CMS
│   │   ├── industries/            # Industries CMS
│   │   └── settings/              # System settings & configuration
│   ├── assessment/                # Interactive facility assessment wizard
│   ├── portal/                    # Client project portal & status viewer
│   ├── healthz/                   # Automated uptime health check route
│   └── api/                       # Edge route handlers
├── components/
│   ├── admin/                     # Admin components (tasks section, modals, nav)
│   ├── chat/                      # Deterministic chatbot widget & quick replies
│   ├── site/                      # Marketing UI components (Hero, Navbar, Footer, Bento)
│   └── ui/                        # Reusable shadcn/ui primitives
├── content/                       # Content verification & Old Site crawl data
│   ├── crawl/                     # Raw extraction logs (exergy_crawl.json)
│   └── content-map.md             # Traceability mapping for all copy & metrics
├── docs/                          # Architectural specifications & phase plans
│   ├── IMPLEMENTATION_PLAN.md     # Master project blueprint & phases
│   ├── PROGRESS.md                # Task tracking & delivery logs
│   └── DECISIONS.md               # Architectural decision records (ADRs)
├── lib/                           # Core utilities
│   ├── chatbot/                   # Deterministic matcher & Q&A retrieval engine
│   ├── email/                     # Resend API integration
│   ├── leads/                     # Exergy lead scoring algorithm
│   └── supabase/                  # Supabase browser, server, and service clients
├── supabase/                      # Database schema & seeds
│   └── migrations/                # SQL migrations with strict RLS policies
├── open-next.config.ts            # OpenNext Cloudflare Workers build configuration
└── wrangler.jsonc                 # Cloudflare Wrangler worker definition
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18.17.0` or later (tested on Node 20)
- **Package Manager**: `npm`
- **Cloudflare Wrangler CLI**: For previewing and deploying workers

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/zaaammmiiinnn/exergy-prototype.git
cd exergy-prototype
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local` for local development and to `.dev.vars` for local Wrangler preview:

```bash
cp .env.example .env.local
cp .env.example .dev.vars
```

Ensure the following variables are defined:

```ini
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://<project-ref>.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="<your-anon-key>"
SUPABASE_SERVICE_ROLE_KEY="<your-service-role-key>"

# Resend Email Integration
RESEND_API_KEY="re_<your-resend-key>"
RESEND_FROM_EMAIL="contact@exergy-solutions.com"
ADMIN_NOTIFY_EMAILS="neuralwaves.official@gmail.com,support@neuralwaves.in"

# Site URL
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 3. Run Locally in Development Mode

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing & Validation

### Run Unit Tests
The project includes a pure deterministic test suite covering chatbot routing, keyword boundaries, human escalation, and RBAC authorization matrices:

```bash
npm test
```

### Type Checking & Linting
Validate strict TypeScript compilation across the entire application:

```bash
npx tsc --noEmit
npm run lint
```

---

## ☁️ Cloudflare Workers Deployment

This project uses `@opennextjs/cloudflare` to compile Next.js into Cloudflare Workers bundles.

### Build the Worker Bundle
```bash
npm run cf-build
```
*Compiles the Next.js App Router, optimizes static assets, and outputs `.open-next/worker.js`.*

### Deploy to Cloudflare Workers
```bash
npm run cf-deploy
```
*Uploads new static assets to Cloudflare KV/R2 and deploys the latest Worker trigger.*

---

## 🔒 Security & Data Integrity

1. **No Invented Content**: All marketing statements, sector statistics, and thermodynamic claims are cross-referenced with `content/content-map.md`.
2. **Server-Only Secrets**: `SUPABASE_SERVICE_ROLE_KEY` and `RESEND_API_KEY` are never bundled into client-side JavaScript.
3. **Strict Row-Level Security**: Unauthenticated visitors (`anon`) have zero write access to administrative tables. Submissions are processed exclusively through validated Server Actions.
4. **Deterministic Auditing**: All chatbot interactions are pure and logged without third-party AI exposure.

---

## 📄 License & Attribution

Designed and developed for **Exergy Solutions** (Dubai, UAE).  
Engineering architecture by **NeuralWaves** (`neuralwaves.official@gmail.com`).
