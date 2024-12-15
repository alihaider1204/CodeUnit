const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
require('./config/passportConfig');
const developerRoutes = require("./routes/developerRoutes");


const app = express();

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:5174', // Frontend URL
  credentials: true, // Allow credentials (cookies, headers, etc.)
};
app.use(cors(corsOptions)); // Enable CORS middleware

// Middleware for parsing JSON and URL-encoded data
app.use(express.json()); // MUST be placed before routes
app.use(express.urlencoded({ extended: true })); // For handling form submissions

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Session Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'E9F9C4A62A8D73C30D4F8A5B16F9E16E2F21F0D83DB8C41A9F1D91B02F83C3EF', // Replace with a strong secret
    resave: false,
    saveUninitialized: true,
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session()); // Enable session support for OAuth

// Enhanced Debugging Middleware
app.use((req, res, next) => {
  console.log(`📥 Incoming Request: ${req.method} ${req.url}`);
  if (Object.keys(req.body).length > 0) {
    console.log(`📦 Request Body:`, req.body);
  }
  next();
});

// Routes
app.use('/api/users', authRoutes); // Mount your authRoutes
// Routes
app.use('/auth', authRoutes); // Mount /auth routes (Google, LinkedIn, GitHub OAuth)
app.use("/api/developers", developerRoutes);




// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message || err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// Fallback Route for Undefined Endpoints
app.use((req, res) => {
  console.warn(`⚠️ Undefined Route Accessed: ${req.method} ${req.url}`);
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
