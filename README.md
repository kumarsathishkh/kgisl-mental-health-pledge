<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# KGiSL Mental Health Pledge - Full Stack Application

A React + TypeScript web application with Express.js backend enabling students from KGiSL institutions to pledge commitment to mental health and drug-free living.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas cloud)

### Run Locally

#### 1. **Start Backend**
```bash
# Terminal 1
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm start
# Expected: ✓ Server running on http://localhost:5000
```

#### 2. **Start Frontend**
```bash
# Terminal 2
npm install
npm run dev
# App opens at http://localhost:3010 (or next available port)
```

#### 3. **Environment Setup**
Create `.env.local` in root:
```
VITE_API_URL=http://localhost:5000/api
GEMINI_API_KEY=your_api_key
```

## 📋 Features

- ✅ **Student Pledge Form** - Multi-step form collecting institutional details
- ✅ **Dynamic Department Selection** - Based on college choice
- ✅ **Real-time Pledge Counter** - Live count from MongoDB
- ✅ **Certificate Generation** - Auto-generated with student name
- ✅ **PDF Download** - Download certificates as PNG (3x quality)
- ✅ **RESTful API** - Full backend API with MongoDB persistence
- ✅ **Stats & Analytics** - Pledges by college/department
- ✅ **Error Handling** - Duplicate prevention, validation
- ✅ **Responsive Design** - Mobile-first UI

## 🏗️ Architecture

### Frontend (React + TypeScript)
- **Single-page app** with 3 views: landing → form → certificate
- **Components:** `Header`, `PledgeForm`, `Certificate`
- **State management:** React hooks (useState, useEffect)
- **Styling:** Tailwind CSS with custom KGiSL colors
- **HTML to Canvas:** Certificate rendering via `html2canvas`

### Backend (Express.js + MongoDB)
- **REST API** with 7 endpoints
- **Database:** MongoDB with Pledge schema
- **Validation:** Server-side form validation
- **Stats:** Aggregation queries for analytics
- **CORS:** Enabled for frontend communication

### Data Flow
```
Frontend Form → API POST → MongoDB → Real-time Count Update
```

## 📚 Documentation

- [Backend Setup Guide](BACKEND_SETUP.md) - Full API reference and testing
- [Docker Setup](DOCKER_SETUP.md) - Run MongoDB with Docker
- [AI Coding Instructions](.github/copilot-instructions.md) - For developers/AI agents

## 🔌 API Endpoints

```
GET  /api/health                    - Health check
GET  /api/pledges/count             - Total pledge count
GET  /api/pledges/stats/by-college  - Stats grouped by college
GET  /api/pledges/stats/by-department - Stats grouped by department
POST /api/pledges                   - Create new pledge
GET  /api/pledges/:certificateId    - Get pledge details
GET  /api/pledges                   - List all pledges (with filters)
```

## 🛠️ Tech Stack

### Frontend
- React 19.2.3
- TypeScript 5.8
- Tailwind CSS
- html2canvas 1.4.1
- Vite 6.2

### Backend
- Node.js + Express 4.18
- MongoDB 8.0 (Mongoose ODM)
- CORS, dotenv

## 📦 Project Structure

```
├── App.tsx                    # Main app component with state management
├── components/
│   ├── Header.tsx            # Persistent header
│   ├── PledgeForm.tsx        # Multi-step form (form view)
│   └── Certificate.tsx       # Certificate display (certificate view)
├── types.ts                  # Interfaces & institution data
├── index.html                # Entry HTML
├── vite.config.ts            # Vite config with API proxy
├── server/
│   ├── index.js              # Express server & routes
│   ├── models/Pledge.js      # MongoDB Pledge schema
│   ├── .env                  # Backend env variables
│   └── package.json
├── .env.local                # Frontend env variables
├── BACKEND_SETUP.md          # Setup & API docs
└── .github/
    └── copilot-instructions.md # AI coding guide
```

## 🔄 Workflow

### User Journey
1. Land on home page → see pledge count
2. Click "Take the Pledge"
3. Fill form (name, email, college, department, etc.)
4. Submit → server validates → saves to MongoDB
5. Certificate generated with unique ID
6. Download certificate as PNG
7. Pledge count auto-increments

### Developer Workflow
```bash
npm run dev          # Frontend dev server (Vite)
npm start            # Backend server (Express)
npm run build        # Production build
npm run preview      # Preview production build
```

## ✅ Testing Checklist

- [ ] Backend starts without MongoDB error
- [ ] Frontend loads at http://localhost:3010
- [ ] API health check works: `curl http://localhost:5000/api/health`
- [ ] Pledge count displays (0 initially if DB is empty)
- [ ] Form submission saves to MongoDB
- [ ] Certificate generates with correct student name
- [ ] Certificate downloads as PNG
- [ ] Pledge count increments after submission
- [ ] Duplicate roll numbers are rejected
- [ ] Responsive design works on mobile

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Heroku/Railway/Render)
```bash
# Set environment variables in deployment platform
MONGODB_URI=your_mongodb_atlas_uri
PORT=5000

# Deploy server/ folder
```

### MongoDB (Atlas)
1. Create free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Get connection string
3. Add to `MONGODB_URI` in backend `.env`

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection error | Start MongoDB or check MONGODB_URI in .env |
| CORS error | Ensure backend is running on :5000 |
| Port already in use | Kill process: `lsof -i :3000` (macOS/Linux) |
| Pledge count not updating | Check browser console for API errors |
| Certificate not downloading | Enable pop-ups or check browser downloads |

## 📝 Environment Variables

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:5000/api
GEMINI_API_KEY=your_key
```

### Backend (server/.env)
```
MONGODB_URI=mongodb://localhost:27017/kgisl-pledges
PORT=5000
NODE_ENV=development
```

## 🤝 Contributing

For code changes, follow the patterns in [.github/copilot-instructions.md](.github/copilot-instructions.md):
- Keep component styling consistent (use `inputClass`, `labelClass`)
- Test form validation with empty fields
- Test certificate rendering after UI changes
- Run both frontend and backend before committing

## 📞 Support

For issues:
1. Check [BACKEND_SETUP.md](BACKEND_SETUP.md) for API debugging
2. Review browser console for frontend errors
3. Check server logs for backend errors
4. Verify MongoDB is running and accessible
