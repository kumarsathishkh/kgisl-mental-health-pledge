# Backend Integration Setup Guide

## Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB local instance or MongoDB Atlas cloud account
- Two terminal windows

### Step 1: Set Up MongoDB

#### Option A: Local MongoDB
```bash
# Install MongoDB Community Edition (if not installed)
# Windows: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
# macOS: brew install mongodb-community
# Linux: https://docs.mongodb.com/manual/installation/

# Start MongoDB
mongod
```

#### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster (Free tier available)
4. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/kgisl-pledges`

### Step 2: Configure Backend

```bash
# Navigate to server directory
cd server

# Create .env file (copy from .env.example)
cp .env.example .env

# Edit .env and set your MongoDB URI
# For local: MONGODB_URI=mongodb://localhost:27017/kgisl-pledges
# For Atlas: MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/kgisl-pledges?retryWrites=true&w=majority
```

### Step 3: Start Backend Server

**Terminal 1:**
```bash
cd server
npm run dev
```

Expected output:
```
✓ Connected to MongoDB
✓ Server running on http://localhost:5000
```

### Step 4: Start Frontend

**Terminal 2:**
```bash
# Root directory
npm run dev
```

Access the app at: **http://localhost:3000**

---

## API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. **Health Check**
```
GET /api/health
Response: { status: "Server is running", timestamp: "..." }
```

#### 2. **Get Total Pledge Count**
```
GET /api/pledges/count
Response: { count: 42, timestamp: "..." }
```

#### 3. **Get Stats by College**
```
GET /api/pledges/stats/by-college
Response: [
  { _id: "KGiSL Institute of Technology", count: 15 },
  { _id: "KG College of Arts and Science", count: 10 }
]
```

#### 4. **Get Stats by Department**
```
GET /api/pledges/stats/by-department
Response: [
  { _id: { college: "...", department: "..." }, count: 5 }
]
```

#### 5. **Create New Pledge**
```
POST /api/pledges
Content-Type: application/json

{
  "fullName": "NANDHAKUMAR M",
  "email": "student@kgisl.ac.in",
  "college": "KGiSL Institute of Technology (KiTE)",
  "department": "B.Tech Information Technology",
  "rollNumber": "KT001234",
  "yearOfStudy": "1st Year",
  "gender": "Male"
}

Response: {
  "message": "Pledge submitted successfully",
  "certificateId": "KGiSL-1706262400000-ABC123XYZ",
  "pledge": { ...pledge data... }
}
```

#### 6. **Get Single Pledge by Certificate ID**
```
GET /api/pledges/:certificateId
Response: { ...pledge data... }
```

#### 7. **Get All Pledges (with filters)**
```
GET /api/pledges?college=KGiSL%20Institute&limit=50&skip=0
Response: {
  "pledges": [...],
  "total": 100,
  "limit": 50,
  "skip": 0
}
```

---

## Testing the Integration

### 1. Test Backend API with curl or Postman

```bash
# Test health check
curl http://localhost:5000/api/health

# Get pledge count
curl http://localhost:5000/api/pledges/count

# Create a pledge
curl -X POST http://localhost:5000/api/pledges \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test Student",
    "email": "test@kgisl.ac.in",
    "college": "KGiSL Institute of Technology (KiTE)",
    "department": "B.Tech Information Technology",
    "rollNumber": "TEST001",
    "yearOfStudy": "1st Year",
    "gender": "Male"
  }'
```

### 2. Test Frontend Integration

1. Open http://localhost:3000
2. Click "Take the Pledge"
3. Fill the form
4. Submit
5. Verify:
   - No errors appear
   - Certificate is generated
   - Certificate ID is displayed
   - Pledge count increments

### 3. Verify Data in MongoDB

```bash
# Connect to MongoDB
mongosh  # or mongo for older versions

# Select database
use kgisl-pledges

# View pledges
db.pledges.find()

# Count pledges
db.pledges.countDocuments()
```

---

## Error Handling

### Common Errors & Solutions

#### 1. "Cannot connect to MongoDB"
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Start MongoDB service or check MONGODB_URI in .env

#### 2. "Roll number already pledged"
```
Error: This roll number has already taken the pledge
```
**Solution:** Use a unique roll number for each test

#### 3. "CORS error in console"
```
Cross-Origin Request Blocked
```
**Solution:** Ensure backend is running on http://localhost:5000

#### 4. "API URL undefined"
```
error: Cannot read property 'count' of undefined
```
**Solution:** Check VITE_API_URL in .env.local is set correctly

---

## Next Steps (Future Features)

1. **Email Verification**
   - Send OTP to college email
   - Prevent duplicate pledges

2. **Admin Panel**
   - View all pledges
   - Export reports
   - Analytics dashboard

3. **Authentication**
   - JWT tokens
   - User sessions
   - Admin access control

4. **Deployment**
   - Deploy frontend to Vercel/Netlify
   - Deploy backend to Heroku/Railway/Render
   - Set up MongoDB Atlas for production

---

## Useful Commands

```bash
# Frontend
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Build for production
npm run preview      # Preview production build

# Backend
npm run dev          # Start server with watch mode
npm start            # Start server in production

# MongoDB
mongosh              # Connect to local MongoDB
show dbs             # List all databases
use kgisl-pledges   # Select database
db.pledges.find()   # View all pledges
db.pledges.drop()   # Clear all pledges
```

---

## Support

For issues:
1. Check both terminals for error messages
2. Verify MongoDB is running
3. Ensure ports 3000 and 5000 are available
4. Check browser console for frontend errors
5. Check terminal for backend errors

