<div align="center">

# FinAI Planner 🇮🇳  
**Your 15-Minute Journey to Financial Freedom**

<img src="./public/demo/dashboard-preview.png" alt="FinAI Planner Dashboard" width="100%"/>

**An AI-powered personal finance web app that generates a fully personalized, India-specific investment plan in just 8 simple steps.**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-v3.4-38BDF8?logo=tailwind-css)](https://tailwindcss.com)

</div>

## 🚀 The Problem We Solved

> 90% of Indians want to invest… but have zero clue where to put their money.  
> Bank says “FD”, Instagram says “100% equity”, parents say “Gold hi best hai”.

**FinAI Planner** fixes exactly that – in 10-15 minutes you answer simple questions → AI gives you a clear, trustworthy, India-first allocation:
- Exactly kitna % Large-cap / Mid-cap / Small-cap
- Kitna % Debt funds
- Kitna % Gold ETFs / SGBs
- Thoda sa Crypto (optional)

No advisor fees · No jargon · No US-centric nonsense

## ✨ Features

- 8-step intuitive wizard with progress tracker
- Beautiful mobile-first white-themed UI (Tailwind + Framer Motion)
- Local data persistence (IndexedDB) – no data loss
- Interactive dashboard with Recharts (Net Worth, Expense pie, Equity-Debt meter)
- AI-generated personalized investment plan (India-specific)
- Behind-the-scenes: Ollama (Llama-3.1-8B) + N8N workflows + Telegram PDF bot
- 100% offline capable · Zero paid APIs

## 🛠 Tech Stack

| Layer         | Technology                                      |
|-------------|-------------------------------------------------|
| Frontend     | React 18 + TypeScript + Vite + Tailwind CSS    |
| State        | Zustand + React Hook Form + Yup                |
| Charts       | Recharts + Framer Motion                       |
| Persistence  | localforage (IndexedDB)                        |
| AI Engine    | Ollama (Llama-3.1-8B) + Lovable.dev            |
| Orchestration| Self-hosted N8N (4 workflows, 22+ nodes)       |
| Monitoring   | Sentry                                         |
| Dev Tool     | Cursor AI (3100+ LOC in <48 hrs)               |

## 🎬 Demo Video
[Watch 3-min demo](https://youtu.be/your-link-here) ← coming right after submission!

## 🚀 Quick Start (when open-sourced)

```bash
git clone https://github.com/Mehar59/FinAI-Planner.git
cd FinAI-Planner
npm install
npm run dev
