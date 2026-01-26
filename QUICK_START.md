# 🚀 Quick Reference Card

## Start Backend
```bash
cd server && npm start
# Need: MongoDB running on :27017
# Shows: ✓ Connected to MongoDB
#        ✓ Server running on http://localhost:5000
```

## Start Frontend
```bash
npm run dev
# Opens: http://localhost:3010 (or next available port)
# Backend must be running for full integration
```

## API Endpoints (localhost:5000/api)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `GET` | `/health` | Check if server is running |
| `GET` | `/pledges/count` | Get total pledges |
| `POST` | `/pledges` | Submit new pledge |
| `GET` | `/pledges/:certificateId` | Get pledge by ID |
| `GET` | `/pledges/stats/by-college` | Analytics by college |
| `GET` | `/pledges/stats/by-department` | Analytics by department |
| `GET` | `/pledges` | List all pledges |

## Test with curl

```bash
# Health check
curl http://localhost:5000/api/health

# Get count
curl http://localhost:5000/api/pledges/count

# Create pledge
curl -X POST http://localhost:5000/api/pledges \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test",
    "email": "test@kgisl.ac.in",
    "college": "KGiSL Institute of Technology (KiTE)",
    "department": "B.Tech Information Technology",
    "rollNumber": "TEST001",
    "yearOfStudy": "1st Year",
    "gender": "Male"
  }'
```

## Environment Setup

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:5000/api
GEMINI_API_KEY=your_key_here
```

### Backend (server/.env)
```
MONGODB_URI=mongodb://localhost:27017/kgisl-pledges
PORT=5000
NODE_ENV=development
```

## MongoDB Setup (Choose One)

### Local Install
```bash
# macOS
brew install mongodb-community
mongod

# Windows
# Download: https://www.mongodb.com/try/download/community
mongod

# Linux
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

### Docker
```bash
docker run --name kgisl-mongo -d -p 27017:27017 mongo:latest
docker stop kgisl-mongo    # Stop
docker start kgisl-mongo   # Resume
```

### Cloud (MongoDB Atlas)
1. Create account: https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get URI: `mongodb+srv://user:pass@cluster.mongodb.net/kgisl-pledges`
4. Add to `server/.env`: `MONGODB_URI=...`

## Common Commands

```bash
# Frontend
npm install              # Install packages
npm run dev             # Dev server (:3010)
npm run build           # Production build
npm run preview         # Preview build locally

# Backend
cd server
npm install             # Install packages
npm start               # Start server (:5000)
npm run dev             # Start with watch mode

# MongoDB (if installed locally)
mongosh                 # Connect to MongoDB
use kgisl-pledges      # Select database
db.pledges.find()      # View all pledges
db.pledges.countDocuments()  # Count pledges
db.pledges.drop()      # Clear all data
```

## Troubleshooting

| Issue | Check | Fix |
|-------|-------|-----|
| Backend can't find MongoDB | Terminal 1: Is mongod running? | `mongod` or `docker start kgisl-mongo` |
| CORS error in console | Terminal 2: Backend running? | Start backend: `cd server && npm start` |
| Port already in use | Which process? | Windows: `netstat -ano \| find ":5000"` |
| API returns 500 error | Server logs | Check terminal 2 for error message |
| Pledge count is 0 | Database empty? | Submit a test pledge first |
| Frontend shows blank | Check console | Ensure VITE_API_URL is set in .env.local |

## Files You Modified/Created

### New Backend
- `server/index.js` - Express app
- `server/models/Pledge.js` - MongoDB schema
- `server/.env` - Configuration
- `server/package.json` - Dependencies

### New Documentation
- `INTEGRATION_SUMMARY.md` - You are here!
- `BACKEND_SETUP.md` - Detailed setup guide
- `DOCKER_SETUP.md` - Docker instructions

### Updated
- `App.tsx` - Added API integration
- `README.md` - Full project guide
- `.env.local` - Added VITE_API_URL
- `vite.config.ts` - Added API proxy
- `.github/copilot-instructions.md` - Fixed paths

## Running Everything Together

```bash
# Terminal 1: Start MongoDB
mongod

# Terminal 2: Start Backend
cd server && npm start

# Terminal 3: Start Frontend
npm run dev
```

Then visit: **http://localhost:3010** ✨

## Feature Checklist

- [x] Real-time pledge counter from database
- [x] API endpoints for form submission
- [x] Duplicate prevention (roll number validation)
- [x] Error handling and user feedback
- [x] Certificate generation with unique ID
- [x] Stats and analytics endpoints
- [x] Auto-increment pledge count on submit
- [x] Responsive design
- [ ] Admin dashboard (future)
- [ ] Email verification (future)
- [ ] Advanced analytics (future)

---

**Status:** ✅ Backend integration complete! Install MongoDB and you're ready to roll. 🎯

