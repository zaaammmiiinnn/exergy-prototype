# Exergy Solutions — Energy & Water Efficiency Consulting

A full-stack corporate web application and executive management platform for **Exergy Solutions**, an engineering consultancy specializing in industrial and commercial energy/water optimization.

---

## 🛠️ Technology Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, React Router DOM
- **Backend API**: Python 3, Flask, Flask-CORS, Flask-Bcrypt, PyJWT, SQLAlchemy
- **Database**: SQLite (`backend/exergy.db`)
- **AI Intelligence**: Custom RAG Knowledge Engine (thermodynamic capabilities, methodology, FAQs, and low-confidence human escalation)

---

## 🚀 Key Features

### 1. Public-Facing Responsive Website
- **Homepage**: Modern hero section with thermodynamic value proposition, live efficiency statistics, 6 services teaser, methodology overview, industries served, and inquiry CTA.
- **Services Page**: Comprehensive engineering breakdowns of all 6 core services:
  1. *Cooling optimization* (VPF, Delta-T syndrome mitigation, chilled water reset)
  2. *Heating & steam* (steam trap auditing, blowdown heat recovery, pressurized condensate return)
  3. *Drying processes* (exhaust air recuperation, psychrometric tuning, moisture control)
  4. *Water quality* (high-recovery RO, cooling tower cycle optimization, Zero Liquid Discharge)
  5. *Waste-heat recovery* (condensing economizers, heat pumps, Organic Rankine Cycle ORC)
  6. *Process integration* (Pinch Analysis, Composite Curves, Heat Exchanger Network synthesis)
- **About Us Page**: First Law vs. Second Law of Thermodynamics (Energy vs. Exergy), interactive 4-stage methodology (**Diagnose, Model, Design, Implement**), and UAE Net Zero 2050 commitment.
- **Industries Page**: Detailed engineering interventions across Paper & Pulp, Processing (Chemical/F&B), Petroleum & Refineries, Commercial Buildings, Hospitality, and Healthcare.
- **Contact Us Page**: Complete lead capture form (Name, Mobile, Email, Reason for connecting dropdown, Facility notes) with instant API submission and reference lead ID tracking.
- **Social Media Integration**: Direct links to Twitter/X, TikTok, Instagram, and LinkedIn in the footer.
- **WhatsApp Integration**: Floating button with animated pulse linking to the WhatsApp chatbot (`+971 50 123 4567`) with pre-filled greeting message.

### 2. AI Customer Chatbot (RAG Engine)
- Floating widget on the bottom-right corner.
- Powered by a knowledge base indexed with Exergy services, methodology, and FAQs.
- Features prompt suggestions, topic tracking, and an automated **"Connect to Agent"** escalation workflow that directly registers high-priority leads into the database.

### 3. Secure Admin Panel
- **Authentication**: Bcrypt password hashing and signed JWT authorization.
  - Default Admin Credentials: `admin@exergy.com` / `admin123` (with a one-click quick-fill demo button).
- **Analytics Dashboard**: Live metrics tracking total leads, new leads, AI chat sessions, agent escalations, lead sources, and technology breakdown.
- **Lead Management Table**: Real-time table view of all leads captured from both the contact form and chatbot, complete with status filtering, search, CSV export, and a full inspection modal to update pipeline status (`New`, `In Review`, `Contacted`, `Qualified`, `Closed`) and engineering notes.
- **AI Lead & Project Opportunity Agent (Future)**: Autonomous intelligence preview scanning UAE public registries (Etihad ESCO, DEWA, MoIAT, KEZAD, JAFZA) with matched commercial opportunities, fit scores, and tender values in AED.

---

## 🏃 Running the Application

### 1. Flask Backend API
```bash
cd backend
source venv/bin/activate
# Optional: Seed initial database
python seed.py
# Run API server (port 5001)
python app.py
```

### 2. React Frontend
```bash
cd frontend
npm install
npm run dev
```
The application will be accessible at: `http://localhost:5173`
Admin portal login is at: `http://localhost:5173/admin/login`
