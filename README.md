# TalentScan AI 🚀

**TalentScan AI** is an AI-powered resume analysis platform that helps users evaluate, optimize, and improve their resumes using intelligent match scoring and recruiter-focused insights.

Built with a modern full-stack architecture, the platform analyzes resumes, identifies strengths and weaknesses, and provides actionable recommendations to increase interview chances and ATS compatibility.

---

## ✨ Features

- 🤖 AI-Powered Resume Analysis
- 📊 Resume Match Scoring
- 📈 Skill & Profile Evaluation
- 🔍 Detailed Resume Feedback
- 🌙 Modern Responsive UI
- ⚡ Fast & Interactive Experience
- 🔐 Authentication System
- 📄 Dynamic Report Generation

---

## 🛠️ Tech Stack

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

---

## Live Demo

**Click here 👉** https://interview-ai-app.onrender.com

---

## Run Locally

**To run this project locally**

Navigate to backend directory & install node dependencies

```bash
cd ./backend/ && npm install
```
---

Run the project

```bash
npm run start
```

---

## 📂 Project Structure

```bash
TalentScan-AI/
│
├── frontend/
│   ├── features/
│   ├── context/
│   ├── hooks/
│   ├── styles/
│   ├── services/
│   └── types/
│
├── backend/
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── exceptions/
│   ├── types/
│   └── config/
│
└── README.md
```

---

## ⚙️ How It Works

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

## 🎯 Future Improvements

- AI Resume Suggestions
- Resume Templates
- Export Reports as PDF
- Light Theme functionality
- Real-Time ATS Scoring

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!