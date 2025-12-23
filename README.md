🚀 **AI Task Manager – Backend**

A scalable Node.js + Express backend for an AI-powered Task Manager application.
This backend handles authentication, task management, AI task creation, AI assistant chat, and cloud image uploads.

✨ **Key Features**

🔐 JWT Authentication (Login / Register)

👤 User Profile Management

🧠 AI-powered Task Creation using Google Gemini API

💬 ChatGPT-like AI Assistant (Task-related only)

📝 CRUD Operations for Tasks

📊 User Task Statistics

☁️ Cloudinary Image Upload (Profile Picture)

🧾 AI Chat History stored in MongoDB

🧩 Modular MVC Architecture

🐳 Docker-ready backend

🌱 Environment-based configuration

🧠 **AI Capabilities**

1. AI Task Generator

User can send a raw task like:

finish backend api and test


AI automatically generates:

.Title

.Description

.Priority

.Steps

.Time Estimate

.Due Date

.Completion Status

2. AI Assistant (ChatGPT-like)

.Answers ONLY task management related queries

Can:

    Analyze user tasks

    Suggest productivity improvements

    Create tasks directly from chat

.Stores chat history in database

🛠️ Tech Stack

.Node.js

.Express.js

.MongoDB + Mongoose

.JWT Authentication

.Google Gemini API

.Cloudinary

.Multer

.Docker

.dotenv

▶️** Run Locally**

git clone https://github.com/sahillll0/Ai-Task-Manager-server

cd Ai-Task-Manager-server

npm install

npm run dev

🔗** API Highlights**

.POST /auth/register

.POST /auth/login

.POST /task/create

.POST /task/ai-create

.GET /task/getTask

.DELETE /task/:id

.POST /ai-assistant

.POST /user/upload-profile

🌐 Frontend Integration

Frontend deployed here:

👉 https://ai-task-manager-delta.vercel.app/

Backend serves APIs consumed by React frontend.

⭐ **Final Note**

This backend is built with real-world scalability and AI integration mindset, not just CRUD.

🤝** Author & Acknowledgements**

Made with ❤️ by **sahillll0**

If this project helped you, please ⭐ star the repo — it motivates me to build more cool stuff.

“Keep learning, keep building.” — **Sahillll0**
