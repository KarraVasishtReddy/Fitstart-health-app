# FitStart — Health & Antioxidant Tracker

A fully integrated health tracker combining **FitStart** (meals + activity + AI coaching) with **Belly Balance Dashboard** (antioxidant scoring + Firebase).

## Features
- 🍽️ **Meal Tracker** — log meals by type with calories
- 🏃 **Activity Logger** — track workouts and movement
- 🫐 **Belly Balance** — antioxidant scoring with 45+ foods, 4 portion sizes, 3 health modes (balanced/dieting/digestion) — synced to Firestore
- 📊 **Summary** — live calorie balance, antioxidant score, deficit/surplus
- ✨ **AI Coach** — Claude-powered personalized daily health insights
- 🔐 **Google OAuth** — secure sign-in, data persisted per user

## Setup

```bash
npm install
cp .env.example .env.local
# Add your GEMINI_API_KEY to .env.local
npm run dev
```

## Deploy

```bash
# Vercel (recommended)
npm i -g vercel && vercel --prod

# Or Firebase
firebase deploy

# Or Netlify
netlify deploy --prod --dir=dist
```

## Tech Stack
React 19 · TypeScript · Vite · Tailwind CSS · Firebase · Firestore · Claude AI API
