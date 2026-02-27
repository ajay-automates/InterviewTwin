<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,20,28&height=170&section=header&text=InterviewTwin&fontSize=52&fontAlignY=35&animation=twinkling&fontColor=ffffff&desc=AI-Powered%20Mock%20Interview%20Practice%20Platform&descAlignY=55&descSize=18" width="100%" />

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js&logoColor=white)](.)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](.)
[![AI Powered](https://img.shields.io/badge/AI-Powered-8B5CF6?style=for-the-badge&logo=openai&logoColor=white)](.)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](.)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

**Practice technical and behavioral interviews with an AI interviewer that adapts to your experience level.**

</div>

---

## What This Does

InterviewTwin simulates realistic job interviews using AI. Upload your resume and target job description — the AI generates role-specific questions, evaluates your responses in real-time, and provides structured feedback on content, delivery, and areas for improvement.

---

## Architecture

```
┌───────────────────────────────────────────────┐
│              Next.js 15 (App Router)           │
│                                                │
│  ┌──────────────┐  ┌──────────────────────┐   │
│  │  Resume +     │  │  Interview Session   │   │
│  │  Job Upload   │  │  • Question display  │   │
│  │  (context)    │  │  • Response capture  │   │
│  └──────┬───────┘  │  • Real-time feedback │   │
│         │          └──────────┬───────────┘   │
│         │                     │                │
│  ┌──────▼─────────────────────▼──────────┐    │
│  │          AI Interview Engine           │    │
│  │  • Dynamic question generation         │    │
│  │  • Response evaluation & scoring       │    │
│  │  • Adaptive difficulty adjustment      │    │
│  │  • Structured feedback generation      │    │
│  └────────────────────────────────────────┘    │
└────────────────────────────────────────────────┘
```

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Role-Specific Questions** | AI generates questions tailored to the target job description |
| **Resume Context** | Uses your resume to ask relevant follow-up questions |
| **Real-Time Evaluation** | Each response scored on relevance, depth, and communication |
| **Adaptive Difficulty** | Questions get harder or easier based on your performance |
| **Structured Feedback** | Actionable suggestions after each answer and full session summary |
| **Multiple Interview Types** | Technical, behavioral, system design, and situational questions |

---

## Quick Start

```bash
git clone https://github.com/ajay-automates/InterviewTwin.git
cd InterviewTwin
npm install
cp .env.example .env.local    # Add your API keys
npm run dev                    # http://localhost:3000
```

---

## Tech Stack

`Next.js 15` `React` `TypeScript` `Tailwind CSS` `AI/LLM APIs` `Geist Font` `App Router`

---

## Related Projects

| Project | Description |
|---------|-------------|
| [AI Interviewer](https://github.com/ajay-automates/AI-interviewer) | Alternative interview practice implementation |
| [Advanced Resume Analyzer](https://github.com/ajay-automates/advanced-resume-analyzer-qlora) | QLoRA fine-tuned Gemma 3 for resume-job fit |
| [EazyApply](https://github.com/ajay-automates/eazyapply) | Chrome extension for auto-filling job applications |

---

<div align="center">

**Built by [Ajay Kumar Reddy Nelavetla](https://github.com/ajay-automates)** · February 2026

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,20,28&height=100&section=footer" width="100%" />

</div>
