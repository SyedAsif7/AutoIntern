# 🚀 Step-by-Step Deployment Guide for AutoIntern

This guide will walk you through deploying the **AutoIntern** platform from scratch. We will use **Render** for the Backend and **Vercel** for the Frontend.

---

## 🏗 Phase 1: Prerequisites & Database Setup

### 1. MongoDB Atlas (Database)
1.  Sign in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2.  Create a new project named **AutoIntern**.
3.  Deploy a **Free Tier (Shared)** cluster.
4.  In **Network Access**, click "Add IP Address" and select **Allow Access from Anywhere (0.0.0.0/0)**.
5.  In **Database Access**, create a user with a username and password.
6.  Click **Connect** -> **Drivers** -> Copy the `MONGODB_URI` (looks like `mongodb+srv://...`).

### 2. Firebase (Authentication)
1.  Go to [Firebase Console](https://console.firebase.google.com/).
2.  Create a project named **AutoIntern**.
3.  Enable **Authentication** and turn on **Email/Password** and **Google** providers.
4.  Go to **Project Settings** -> **General** -> Under "Your apps", click the `</>` icon to create a Web App.
5.  Copy the `firebaseConfig` keys for the Frontend.
6.  Go to **Service Accounts** -> **Generate New Private Key**. Save this JSON file; you will need its contents for the Backend.

---

## 🌐 Phase 2: Backend Deployment (Render)

1.  Push your code to a **GitHub Repository**.
2.  Sign in to [Render](https://render.com/).
3.  Click **New +** -> **Web Service**.
4.  Connect your GitHub repository.
5.  Configure the service:
    - **Name:** `autointern-backend`
    - **Root Directory:** `server`
    - **Runtime:** `Node`
    - **Build Command:** `npm install`
    - **Start Command:** `npm start`
6.  Click **Advanced** -> **Add Environment Variable**:
    | Key | Value |
    | :--- | :--- |
    | `PORT` | `5001` |
    | `MONGODB_URI` | *Your MongoDB Atlas URI* |
    | `GEMINI_API_KEY` | *Your Google AI API Key* |
    | `JWT_SECRET` | *Any long random string* |
    | `CLIENT_URL` | *Your Vercel URL (Update this later)* |
    | `FIREBASE_SERVICE_ACCOUNT_JSON` | *Paste the entire content of your Firebase JSON key* |
7.  Click **Create Web Service**. Copy the service URL (e.g., `https://autointern-backend.onrender.com`).

---

## 🎨 Phase 3: Frontend Deployment (Vercel)

1.  Sign in to [Vercel](https://vercel.com/).
2.  Click **Add New** -> **Project**.
3.  Import your GitHub repository.
4.  Configure the project:
    - **Framework Preset:** `Vite`
    - **Root Directory:** `client`
5.  Open **Environment Variables** and add:
    | Key | Value |
    | :--- | :--- |
    | `VITE_API_URL` | *Your Render Backend URL* |
    | `VITE_FIREBASE_API_KEY` | *From Firebase config* |
    | `VITE_FIREBASE_AUTH_DOMAIN` | *From Firebase config* |
    | `VITE_FIREBASE_PROJECT_ID` | *From Firebase config* |
    | `VITE_FIREBASE_MESSAGING_SENDER_ID` | *From Firebase config* |
    | `VITE_FIREBASE_APP_ID` | *From Firebase config* |
6.  Click **Deploy**.
7.  Once deployed, copy your Vercel URL (e.g., `https://autointern.vercel.app`).

---

## 🔄 Phase 4: Final Sync

1.  Go back to your **Render Backend** settings.
2.  Update the `CLIENT_URL` environment variable to your new Vercel URL.
3.  Render will automatically re-deploy with the correct CORS settings.
4.  **Populate Data:** Run the seed script locally pointing to your production database, or use a tool like Postman to hit your `/api/seed` endpoint if available.

---

## ✅ Verification Checklist
- [ ] Login/Register works (Firebase Auth).
- [ ] Dashboard displays mock stats.
- [ ] AI Roadmap generates (Gemini API).
- [ ] Resume Analysis works (PDF parsing).
- [ ] Internship Kanban cards can be dragged.
- [ ] Certificate downloads as PDF.

---
**Need Help?** Contact Team HACKIT via the [README.md](file:///c:/Users/as/Desktop/Intern/autointern/README.md).
