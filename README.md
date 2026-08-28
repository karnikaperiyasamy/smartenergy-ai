# SmartEnergy AI — Energy Waste Detective for     s

**           — Energy Efficiency Track**

> A frontend-only   that walks judges through the full journey from raw energy data to a concrete, costed optimization plan — in under five minutes.

---

## Problem

Small manufacturing units (    s) often pay for energy they don't need to use. A compressor left running through a lull in production, an HVAC unit that outlasts office hours, lighting left at full brightness in quiet aisles — none of this shows up as a fault. It just shows up as a slightly higher bill every month, with no clear culprit and no easy fix.

Most     s don't have the budget for a full industrial IoT retrofit just to find out where that waste is happening.

## Solution

SmartEnergy AI is a lightweight, AI-assisted energy efficiency platform aimed at     s. It takes energy readings (from smart meters, in a real deployment), compares them against expected baselines per equipment, and turns any abnormal pattern into something a plant manager can act on the same day:

**Energy Data → AI Analysis → Waste Detected → Equipment Identified → AI Explanation → AI Recommendation → Optimization → Estimated Savings → Cost Savings → CO2 Reduction**

## Innovation

Most energy dashboards stop at "here's your consumption chart." SmartEnergy AI's Energy Waste Detective goes further: it names the equipment responsible, estimates the monthly cost of the waste, offers a plain-language possible cause, and generates a specific scheduling recommendation — then lets the user simulate applying it and see the projected before/after impact.

## Features

- **Dashboard** — facility-wide snapshot: consumption, demand, waste, savings, CO2, efficiency score
- **Energy Monitoring** — hourly/daily/weekly charts, filterable by equipment type
- **AI Energy Analysis** — animated run-through of the detection pipeline with a worked example
- **Energy Waste Detective** — the core feature: flagged issues with severity, cause, and cost, with an "Investigate" drill-down
- **Equipment Health** — per-equipment health score, efficiency, and status
- **AI Recommendations** — expandable, prioritized action cards with problem/reason/action/impact
- **Optimization Center** — apply a recommended schedule and see a confirmation flow
- **Savings & Impact** — before/after charts and a savings projection
- **AI Assistant** — a rule-based chatbot that answers questions from the demo dataset
- **Demo Mode** — a scripted, judge-facing walkthrough of the entire flow in nine steps

## Technology

- React 18 + Vite
- Tailwind CSS (custom design tokens — see `tailwind.config.js`)
- Recharts (charts)
- Lucide React (icons)
- React Router (navigation)

No backend, no database, no IoT hardware, and no external API key are required. Every number in the app comes from `src/data/demoData.js` and is processed by a small, transparent rule engine in `src/services/aiSimulation.js`.

## Demo Workflow (for judges)

1. **Login** with the demo credentials shown on screen.
2. **Dashboard** — orient on the facility's current numbers.
3. **Energy Waste Detective** — open "Investigate" on Compressor 02 to see the possible cause.
4. **AI Recommendations** — expand the top recommendation to see the specific fix.
5. **Optimization Center** — click "Apply Optimization" and confirm.
6. **Savings & Impact** — see the projected before/after result.
7. **Demo Mode** — for a guided, self-running version of the same story, click "Start Demo."

## How to Run

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (typically `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

### Enable Groq AI

Create a `.env.local` file in the project root:

```bash
VITE_GROQ_API_KEY=your_groq_api_key
VITE_GROQ_MODEL=openai/gpt-oss-20b
```

Restart Vite after changing environment variables. The chatbot will use Groq for questions, and the Recommendations page will enable **Generate with Groq**. Without a key, the app keeps its local demo responder and recommendations. This direct browser integration is suitable for a demo only; production should proxy Groq through a backend so the API key is never exposed to users.

### Enable Real Authentication

Create a project in Supabase, enable the Email provider under Authentication, and add these values to `.env.local`:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Restart Vite. The login screen will then provide real sign-in and registration, all application routes will require a valid Supabase session, and logout will invalidate that session. If email confirmation is enabled in Supabase, new users must confirm their email before signing in. Without these values, only the original demo credentials work.

## Project Structure

```
smartenergy-ai/
├── src/
│   ├── components/       Layout, shared UI primitives, flow diagram
│   ├── pages/             All 11 pages (Login, Dashboard, ...)
│   ├── data/
│   │   └── demoData.js    Centralized simulated dataset
│   ├── services/
│   │   └── aiSimulation.js  Rule-based "AI" engine (analyze/detect/recommend/predict)
│   ├── App.jsx             Route definitions
│   ├── main.jsx             Entry point
│   └── index.css            Design tokens, base styles
├── public/
├── package.json
└── README.md
```

## What Is (and Isn't) Simulated

Everything in this build is demo data, clearly labeled throughout the UI with a **     ** badge. Specifically:

- No IoT sensors or smart meters are connected.
- No physical equipment is being controlled — the Optimization Center only updates the plan shown inside this  .
- The "AI" is a small, explainable, rule-based engine running in the browser — not a trained machine learning model, and not connected to any external LLM API.
- Predictions are labeled **"  Prediction"** and use a simple frontend calculation over the demo dataset, not a forecasting model.

## Future Development

- **IoT sensors & smart meters** for real per-equipment readings
- **Real ML models** (e.g. anomaly detection, load forecasting) trained on facility history
- **Cloud backend** for multi-site data storage, auth, and historical trend analysis
- **Real-time equipment control** via BMS/SCADA integration, with human approval gates
- **Alerting** via SMS/WhatsApp for plant managers without dashboard access
- **Multi-tenant support** so an      cluster or industrial park can be monitored from one platform

---

Built for            — Energy Efficiency theme.
