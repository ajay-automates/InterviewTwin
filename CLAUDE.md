# InterviewTwin — Project Specification

## What is InterviewTwin?

A simple web app with two modes:
1. **Give Interview** — AI avatar interviews YOU (asks questions, you answer)
2. **Take Interview** — AI avatar IS YOU (you ask questions, avatar answers using your resume)

Powered entirely by Tavus CVI. No complex RAG pipeline needed — Tavus handles avatar, voice, conversation, and knowledge base.

## Pages

### Page 1: Landing Page (`/`)
- Header with "InterviewTwin" logo
- Two large cards side by side:

**Card 1: "Give Interview"**
- Description: "AI interviewer asks you tough questions and gives feedback"
- Button: "Start Interviewing" → routes to `/interview/give`

**Card 2: "Take Interview"**  
- Description: "Watch AI answer as YOU using your resume and experience"
- Button: "Practice Now" → routes to `/interview/take`

### Page 2: Setup Page (`/interview/give` or `/interview/take`)
- Upload resume (PDF)
- Paste job description (text area)
- Button: "Start Interview"
- On click → creates Tavus conversation with appropriate persona → routes to interview room

### Page 3: Interview Room (`/interview/room`)
- Full screen Zoom-like layout
- Tavus CVI iframe/embed (the avatar video)
- Live transcript below
- End Interview button

## How It Works

### Give Interview Mode:
1. User uploads resume + JD
2. System creates Tavus persona: "You are a hiring manager interviewing a candidate for [role]. Ask tough but fair questions based on this job description. After each answer, give brief feedback."
3. Tavus knowledge base gets the JD
4. User enters interview room
5. Avatar asks questions, user answers verbally
6. Avatar gives feedback after each answer

### Take Interview Mode:
1. User uploads resume + JD  
2. System creates Tavus persona: "You are [user name]. You are in a job interview. Answer every question in first person using the resume provided. Tailor answers to the job description. Use STAR method. Be confident. Include specific metrics and project names."
3. Tavus knowledge base gets the resume + JD
4. User enters interview room
5. User asks questions verbally (as interviewer)
6. Avatar answers AS the user with their real experience

## Tech Stack

- **Next.js** — Frontend (landing page, setup page, interview room)
- **Tavus CVI API** — Avatar, voice, conversation, knowledge base
- **Tailwind CSS** — Styling
- **Railway or Vercel** — Deployment

That's it. No backend server. No database. No LangChain. No vector store. Tavus does the heavy lifting.

## Tavus API Integration

### Create a Persona (for each mode)
```
POST https://tavusapi.com/v2/personas
{
  "persona_name": "InterviewTwin - Take Interview",
  "system_prompt": "You are [name]. Answer as them using their resume...",
  "context": "Resume text + JD text here"
}
```

### Upload Knowledge Base to Persona
```
POST https://tavusapi.com/v2/personas/{persona_id}/knowledge-base
- Upload resume PDF
- Upload JD text
```

### Create a Conversation
```
POST https://tavusapi.com/v2/conversations
{
  "replica_id": "user's replica or stock replica",
  "persona_id": "the persona we just created",
  "conversation_name": "Interview Session"
}
→ Returns conversation_url (Daily.co room)
```

### Embed in Frontend
```html
<iframe src="{conversation_url}" allow="camera; microphone" />
```

## Project Structure

```
interviewtwin/
├── app/
│   ├── page.tsx                # Landing page (two cards)
│   ├── interview/
│   │   ├── give/page.tsx       # Setup page for Give Interview mode
│   │   ├── take/page.tsx       # Setup page for Take Interview mode
│   │   └── room/page.tsx       # Interview room (Tavus embed)
│   ├── layout.tsx              # Root layout with header
│   └── globals.css             # Global styles
├── components/
│   ├── InterviewCard.tsx       # Reusable card for landing page
│   ├── FileUpload.tsx          # Resume upload component
│   ├── InterviewRoom.tsx       # Tavus iframe wrapper
│   └── Navbar.tsx              # Header with logo
├── lib/
│   └── tavus.ts                # Tavus API helper functions
├── public/
│   ├── give-interview.png      # Card image
│   └── take-interview.png      # Card image
├── package.json
├── tailwind.config.ts
├── next.config.js
├── CLAUDE.md
└── README.md
```

Total: ~15 files. That's the entire product.

## Environment Variables

```bash
TAVUS_API_KEY=your_tavus_api_key
TAVUS_REPLICA_ID=your_replica_id  # Your face clone
```

## Build Order

### Step 1: Create Next.js app
```bash
npx create-next-app@latest interviewtwin --typescript --tailwind --app
```

### Step 2: Build landing page with two cards

### Step 3: Build setup pages (upload resume, paste JD)

### Step 4: Create Tavus API helper (lib/tavus.ts)
- Function to create persona with system prompt
- Function to upload knowledge base
- Function to create conversation
- Function to get conversation URL

### Step 5: Build interview room page
- Embed Tavus conversation iframe
- Add transcript display
- Add end interview button

### Step 6: Connect everything
- Setup page → creates persona + uploads docs → creates conversation → redirects to room
- Room page → loads Tavus iframe with conversation URL

### Step 7: Deploy to Vercel
```bash
vercel deploy
```

### Step 8: Get live URL and share

## What This Looks Like on Resume

"Built InterviewTwin, an AI-powered interview preparation platform with two modes: AI-as-interviewer for practice, and AI-as-you for learning perfect answers. Features real-time avatar conversations using Tavus CVI, document-aware responses via RAG knowledge base, and a Zoom-like interview interface. Deployed at interviewtwin.com. Tech: Next.js, Tavus CVI API, Tailwind CSS."
