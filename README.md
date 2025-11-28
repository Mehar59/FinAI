<div align="center">

# FinAI Planner 🇮🇳

**Your 15-Minute Journey from Confused Indian → Confident Investor**  
AI-powered personal finance web app that gives you a 100% **India-specific** investment plan (Equity • Debt • Gold • Crypto) in just 8 simple steps.
<br/>
**Built in 15 Daya • College Hackathon November 2025 • Open-source soon!**

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38BDF8?logo=tailwind-css)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

## 🎯 The Problem We Solved

> **90% Indians want to invest... but don't know WHERE to put their money.**  
> - Bank: "FD kar lo, safe hai"  
> - Instagram: "100% equity, YOLO!"  
> - Parents: "Gold hi best option hai"  

**Result?** Zero investing or wrong investing → lost money.

**FinAI Planner** solves this in **10-15 minutes**:  
Answer simple questions about income, expenses, goals, risk → AI gives you a **clear, personalized, India-first** roadmap:
- Exactly kitna % Large-cap / Mid-cap / Small-cap  
- Kitna % Debt funds (FDs, Bonds)  
- Kitna % Gold ETFs / Sovereign Gold Bonds  
- Thoda sa Crypto (optional, risk-based)

**No advisor fees • No jargon • No US-centric nonsense**

## ✨ Key Features

- **8-Step Wizard** – Intuitive progress tracker with back/next navigation  
- **Complete Financial Profile** – Cash flow, net worth, goals, risk assessment  
- **Beautiful Mobile-First UI** – Clean white theme, responsive everywhere  
- **Interactive Dashboard** – Net worth trends, expense pies, equity-debt meters  
- **AI-Powered Recommendations** – Instant personalized allocation (powered by local LLM)  
- **100% Offline** – Zero data leaves your device, local storage only  
- **Telegram Bot Bonus** – Get your full plan as PDF in 2 seconds!  
- **Production-Ready** – Error monitoring with Sentry, fully tested

## 🛠 Tech Stack (48-Hour Beast Mode)

| Layer            | Technology                                           |
|------------------|------------------------------------------------------|
| **Frontend**     | React 18 + TypeScript + Vite + Tailwind CSS         |
| **State & Forms**| Zustand + React Hook Form + Yup validation          |
| **Charts & Anim**| Recharts + Framer Motion (smooth micro-interactions)|
| **Storage**      | IndexedDB via localforage – zero data loss          |
| **AI Engine**    | Ollama (Llama-3.1-8B local) + Lovable.dev           |
| **Orchestration**| Self-hosted N8N (4 workflows, 22+ nodes)            |
| **Monitoring**   | Sentry (15+ demo errors triggered)                  |
| **Dev Tools**    | Cursor AI (3100+ LOC in <48 hours)                  |

## 🎬 Live Demo
[Watch our 3-min demo video](https://youtu.be/your-video-link-here) ← Coming soon after hackathon submission!

## 🚀 Quick Setup (When Open-Sourced)

```bash
# Clone the repo
git clone https://github.com/Mehar59/FinAI-Planner.git
cd FinAI-Planner

# Install dependencies
npm install

# Run in development
npm run dev

# Open http://localhost:5173
