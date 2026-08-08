# TalentScan AI

TalentScan AI is an AI-powered resume analysis platform that helps users evaluate, optimize, and improve their resumes using intelligent match scoring and recruiter-focused insights.

Built with a modern full-stack architecture, the platform analyzes resumes, identifies strengths and weaknesses, and provides actionable recommendations to increase interview chances and ATS compatibility.

---

## Features

- AI-Powered Resume Analysis
- Resume Match Scoring
- Skill & Profile Evaluation
- Detailed Resume Feedback
- Modern Responsive UI
- Fast & Interactive Experience
- Authentication System
<!-- - Dynamic Report Generation -->

---

## Tech Stack

### Frontend
- React.js
- TypeScript
- Tailwind CSS
- React Router DOM
- Context API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### AI Integration
- Google Gemini API

### Deployment
- Docker
- Render (containerized deployment)

---

## Live Demo

**Link:** https://interview-talentscan-ai.onrender.com

---

## Deployment

The application is containerized using Docker and deployed on Render. The Docker image packages the backend server along with its dependencies, allowing for a consistent and reproducible deployment environment independent of the host system.

---

## Run Locally

**To run this project locally**

Navigate to the backend directory and install dependencies:

```bash
cd ./backend/ && npm install
```

Run the project:

```bash
npm run start
```

---

## Project Structure

```bash
TalentScan-AI/
│
├── frontend/
│   ├── features/       # Feature-based modules (resume upload, report view, etc.)
│   ├── context/         # Global state via React Context API
│   ├── hooks/            # Custom React hooks
│   ├── styles/            # Tailwind/global CSS styles
│   ├── services/         # API calls to backend
│   └── types/              # TypeScript type definitions
│
├── backend/
│   ├── controllers/    # Request handlers / business logic entry points
│   ├── services/         # Core logic (Gemini API calls, report generation)
│   ├── routes/            # Express route definitions
│   ├── models/           # Mongoose schemas
│   ├── middleware/    # Auth, error handling, validation
│   ├── exceptions/    # Custom error classes
│   ├── types/              # TypeScript type definitions
│   ├── config/            # Env/config setup
│   ├── app.ts              # Express app setup
│   └── server.ts          # Server entry point
│
├── Dockerfile
└── README.md
```

---

## How It Works

1. Client sends:
   - Resume
   - Self Description
   - Job Description
2. Server forwards the data to the Gemini AI Model.
3. Gemini generates a structured interview report containing:
   - Technical Questions
   - Behavioral Questions
   - Skill Gaps
   - Personalized Preparation Plan
   - Match Analysis
4. Generated report is stored in the database.
5. Server sends the final report response back to the client.

---

## What I Learned

- How to use Docker to containerize the application for consistent, reproducible deployment
- How to use the hooks layer to manage staged flows — e.g. handling the initial API call and then transitioning through loading states
- How to use the Context API (React) as a global state layer across the frontend
- How to use the Gemini API in a backend service file, including how it handles prompts
- How to describe and validate prompt/response structures using Zod schemas
- How to implement JWT authentication for securing routes
- How to use error-handling middleware in Express for consistent, centralized error responses

---

## Future Improvements

- AI Resume Suggestions
- Resume Templates
- Export Reports as PDF
- Light Theme functionality
- Real-Time ATS Scoring

---

## Support

If you like this project, consider giving it a star on GitHub!