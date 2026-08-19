# 📝 Memos — AI-Powered Voice & Workspace Note Taking App

> A fast, minimalistic full-stack note-taking platform featuring AI speech-to-text dictation, instant multi-field search, hashtag organization, and secure OTP-verified authentication.

[![Live Demo](https://img.shields.io/badge/Demo-Live%20App-6366f1?style=for-the-badge&logo=vercel)](https://memos-frontend-pi.vercel.app/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

---

## 📸 Screenshots & Previews

| Desktop Workspace (Dark Mode) | Voice Dictation in Action |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/56d1327f-b563-4600-b7ff-6fdbdf5a8909" width="450" /> | <img src="https://github.com/user-attachments/assets/9fa0f512-0316-498c-a87e-04766122c1bf" width="450" /> |
| **Mobile Responsive Layout** | |
| <img src="https://github.com/user-attachments/assets/0faa4a48-45aa-4b85-9c30-cd1028154450" width="220" /> | |
 

---

## ✨ Key Features

* 🎙️ **AI Voice Dictation:** Record audio directly in the browser and convert spoken thoughts into clean text with sub-second latency using Groq Whisper API.
* ⚡ **Instant Multi-Field Search:** Real-time client-side indexing that filters through titles, note bodies, and custom `#tags` simultaneously.
* 🏷️ **Dynamic Tagging System:** Organize notes seamlessly with hashtags for quick categorization and filtering.
* 🎨 **Flexible UI/UX:** Toggle effortlessly between Grid and List views, with full Dark Mode and Light Mode support.
* 🔐 **Secure JWT Authentication:** User authentication featuring hashed passwords (`bcryptjs`), HTTP-only cookie support, and token isolation.
* 📧 **Email OTP Verification:** Automated email OTP delivery for account registration and self-serve password resets.
* ☁️ **Cloud Database Persistence:** Isolated, private workspaces backed by MongoDB Atlas and Mongoose schemas.

---

## 🛠️ Tech Stack

**Frontend:**
* React (Vite)
* Tailwind CSS
* Lucide Icons
* React Router DOM

**Backend:**
* Node.js & Express.js
* MongoDB Atlas & Mongoose
* JSON Web Tokens (JWT) & BcryptJS
* Nodemailer (Email OTP Service)
* Groq Cloud SDK (Whisper Speech-to-Text API)

**Deployment:**
* Vercel (Frontend SPA & Serverless REST API with proxy rewrites)

---

## 🚀 Getting Started Locally

Follow these instructions to clone and run the full-stack project locally on your machine.

### Prerequisites

* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* [Git](https://git-scm.com/)
* [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas connection string)
* [Groq API Key](https://console.groq.com/) (For voice transcription)

---

### 1. Clone the Repository

```bash
git clone [https://github.com/Neha-Shoaib/notes_app.git](https://github.com/Neha-Shoaib/notes_app.git)
cd memos
