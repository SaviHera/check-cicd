# Project Context: React + Firebase CI/CD Pipeline

> **Last Updated:** December 4, 2025
> **Project:** check-cicd
> **Repo:** https://github.com/SaviHera/check-cicd

---

## 🎯 Project Overview

A React + Vite frontend with Firebase Functions backend, deployed via GitHub Actions CI/CD pipeline.

### Tech Stack
- **Frontend:** React 18 + Vite 5
- **Backend:** Firebase Cloud Functions (Node.js 22 + Express)
- **Hosting:** Firebase Hosting
- **CI/CD:** GitHub Actions
- **Deployment:** Automatic on push/merge to `main`

---

## 📁 Project Structure

```
check-cicd/
├── .github/workflows/
│   └── firebase-deploy.yml    # CI/CD workflow
├── functions/                  # Backend (Firebase Functions)
│   ├── package.json
│   └── index.js               # Express API endpoints
├── src/                       # Frontend (React)
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── firebase.json              # Firebase config (hosting + functions)
├── .firebaserc                # Firebase project ID
├── vite.config.js             # Vite config with proxy for local dev
├── package.json               # Frontend dependencies
└── PROJECT_CONTEXT.md         # This file
```

---

## 🔌 API Endpoints (Backend)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/users` | Get all users (mock data) |
| `GET` | `/api/users/:id` | Get user by ID |
| `POST` | `/api/messages` | Create a message |
| `GET` | `/api/info` | API information |

---

## 🔑 GitHub Secrets Required

| Secret Name | Description | How to Get |
|-------------|-------------|------------|
| `FIREBASE_TOKEN` | Firebase CLI token | Run `firebase login:ci` |
| `FIREBASE_SERVICE_ACCOUNT` | Service account JSON | Firebase Console → Project Settings → Service Accounts → Generate New Private Key |

---

## 🚀 Deployment Flow

### On Push to `main`:
1. ✅ Build frontend (Vite)
2. ✅ Install functions dependencies
3. ✅ Deploy hosting + functions to Firebase

### On Pull Request:
1. ✅ Build frontend
2. ✅ Deploy preview URL (hosting only)
3. ✅ Comment preview URL on PR

### Production URLs (after deployment):
- **Frontend:** `https://check-cicd.web.app`
- **API:** `https://check-cicd.web.app/api/*`

---

## ⚠️ PENDING: Firebase Blaze Plan Required

**Firebase Functions requires Blaze (pay-as-you-go) plan.**

### To Fix:
1. Go to: https://console.firebase.google.com/project/check-cicd/usage/details
2. Click "Upgrade" → Select "Blaze (pay-as-you-go)"
3. Add payment method
4. Re-run failed GitHub Actions workflow

### Free Tier Limits (Blaze):
- 2 million function invocations/month
- 400,000 GB-seconds compute time
- 5 GB outbound networking

**You likely won't be charged for a small project!**

---

## 🧪 Local Development

### Start Backend (Terminal 1):
```bash
cd functions
npm install
firebase emulators:start --only functions
```

### Start Frontend (Terminal 2):
```bash
npm install
npm run dev
```

### Local URLs:
- **Frontend:** http://localhost:5173
- **API (via proxy):** http://localhost:5173/api/*
- **Emulator UI:** http://127.0.0.1:4002

---

## 📋 Key Configuration Files

### `firebase.json`
```json
{
  "hosting": {
    "public": "dist",
    "rewrites": [
      { "source": "/api/**", "function": "api" },
      { "source": "**", "destination": "/index.html" }
    ]
  },
  "functions": {
    "source": "functions"
  },
  "emulators": {
    "functions": { "port": 5002 },
    "ui": { "enabled": true, "port": 4002 }
  }
}
```

### `vite.config.js` (for local dev proxy)
```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:5002',
      changeOrigin: true,
      rewrite: (path) => `/check-cicd/us-central1${path}`
    }
  }
}
```

### GitHub Actions Workflow Trigger
```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
```

---

## 🔄 Common Commands

```bash
# Deploy manually (if needed)
firebase deploy --only hosting
firebase deploy --only functions
firebase deploy --only hosting,functions

# View logs
firebase functions:log

# Run emulators locally
firebase emulators:start --only functions

# Generate new Firebase token
firebase login:ci
```

---

## 📝 What Was Completed

- [x] React + Vite frontend setup
- [x] Firebase Hosting configuration
- [x] GitHub Actions CI/CD workflow
- [x] PR preview deployments
- [x] Firebase Functions backend with Express API
- [x] Local development proxy configuration
- [x] GitHub Secrets setup (FIREBASE_TOKEN, FIREBASE_SERVICE_ACCOUNT)
- [x] Workflow permissions for PR comments

---

## ❌ What's Pending

- [ ] **Upgrade Firebase to Blaze plan** (required for Functions deployment)
- [ ] First successful production deployment with Functions
- [ ] Test API endpoints in production

---

## 🆘 Troubleshooting

### Error: "Blaze plan required"
- Upgrade Firebase project to Blaze (pay-as-you-go)
- Free tier is generous, you likely won't be charged

### Error: "Resource not accessible by integration"
- Workflow needs permissions. Add to workflow:
```yaml
permissions:
  checks: write
  contents: read
  pull-requests: write
```

### Local API returns 404 or HTML
- Make sure Firebase emulator is running on port 5002
- Restart Vite after changing vite.config.js
- Both terminals must be running simultaneously

### Port already in use
- Kill existing node processes: `Get-Process -Name "node" | Stop-Process -Force`
- Or use different port in firebase.json emulators config

---

## 📞 Resume Instructions

To continue this project in a new conversation:

1. Share this file with the AI
2. Mention the current status:
   - "Firebase Functions deployment failed - need to upgrade to Blaze plan"
   - Or describe any new issues
3. The AI will have full context to continue helping

---

## 🔗 Important Links

- **GitHub Repo:** https://github.com/SaviHera/check-cicd
- **Firebase Console:** https://console.firebase.google.com/project/check-cicd
- **GitHub Actions:** https://github.com/SaviHera/check-cicd/actions
- **Production Site:** https://check-cicd.web.app (after deployment)



