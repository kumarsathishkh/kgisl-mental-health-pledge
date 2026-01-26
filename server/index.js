import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Pledge from './models/Pledge.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/kgisl-pledges';

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
let mongoConnected = false;
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✓ Connected to MongoDB');
    mongoConnected = true;
  })
  .catch(err => {
    console.warn('⚠ MongoDB connection failed - running in mock mode:', err.message);
    mongoConnected = false;
  });

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Get total pledge count
app.get('/api/pledges/count', async (req, res) => {
  try {
    if (mongoConnected) {
      const count = await Pledge.countDocuments();
      res.json({ count, timestamp: new Date().toISOString() });
    } else {
      // Mock data when DB is not connected
      res.json({ count: 15742, timestamp: new Date().toISOString(), mode: 'mock' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get pledges by institution
app.get('/api/pledges/stats/by-college', async (req, res) => {
  try {
    const stats = await Pledge.aggregate([
      {
        $group: {
          _id: '$college',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get pledges by department
app.get('/api/pledges/stats/by-department', async (req, res) => {
  try {
    const stats = await Pledge.aggregate([
      {
        $group: {
          _id: {
            college: '$college',
            department: '$department'
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new pledge
app.post('/api/pledges', async (req, res) => {
  try {
    const { fullName, email, college, department, rollNumber, yearOfStudy, gender } = req.body;

    // Validation
    if (!fullName || !email || !college || !department || !rollNumber || !yearOfStudy || !gender) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Generate certificate ID
    const certificateId = `KGiSL-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    if (mongoConnected) {
      // Check if roll number already pledged (only if DB is connected)
      const existingPledge = await Pledge.findOne({ rollNumber });
      if (existingPledge) {
        return res.status(409).json({ error: 'This roll number has already taken the pledge' });
      }

      const pledge = new Pledge({
        fullName,
        email,
        college,
        department,
        rollNumber,
        yearOfStudy,
        gender,
        certificateId
      });

      const savedPledge = await pledge.save();
      return res.status(201).json({
        message: 'Pledge submitted successfully',
        certificateId: savedPledge.certificateId,
        pledge: savedPledge
      });
    } else {
      // Mock mode - no database persistence
      return res.status(201).json({
        message: 'Pledge submitted successfully (mock mode)',
        certificateId: certificateId,
        pledge: {
          fullName,
          email,
          college,
          department,
          rollNumber,
          yearOfStudy,
          gender,
          certificateId,
          createdAt: new Date().toISOString()
        }
      });
    }
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: 'This email or roll number has already taken the pledge' });
    }
    res.status(500).json({ error: error.message });
  }
});

// Get single pledge by certificate ID
app.get('/api/pledges/:certificateId', async (req, res) => {
  try {
    const pledge = await Pledge.findOne({ certificateId: req.params.certificateId });
    if (!pledge) {
      return res.status(404).json({ error: 'Pledge not found' });
    }
    res.json(pledge);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all pledges (admin only - add authentication in production)
app.get('/api/pledges', async (req, res) => {
  try {
    const { college, department, limit = 100, skip = 0 } = req.query;
    
    const filter = {};
    if (college) filter.college = college;
    if (department) filter.department = department;

    const pledges = await Pledge.find(filter)
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .sort({ createdAt: -1 });

    const total = await Pledge.countDocuments(filter);

    res.json({
      pledges,
      total,
      limit: parseInt(limit),
      skip: parseInt(skip)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n✓ Server running on http://localhost:${PORT}`);
  console.log(`✓ MongoDB: ${MONGODB_URI}\n`);
});
