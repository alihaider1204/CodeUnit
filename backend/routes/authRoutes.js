const express = require("express");
const passport = require("passport");
const express = require('express');
const { twoFAlogin, verifyOtp } = require('../controllers/authController');


const router = express.Router();

// Common function to handle OAuth callbacks
const handleOAuthCallback = (req, res) => {
  const { user, token } = req.user;

  // Frontend base URL
  const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL || "http://localhost:5174";

  // Set token securely in HTTP-only cookies
  res.cookie("token", token, {
    httpOnly: true, // Prevent JavaScript access
    secure: process.env.NODE_ENV === "production", // Use HTTPS in production
    sameSite: "Strict", // Protect against CSRF
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  // Redirect user to their dashboard
  let redirectUrl;
  switch (user.role) {
    case "student":
      redirectUrl = `${FRONTEND_BASE_URL}/studentdashboard`;
      break;
    case "developer":
      redirectUrl = `${FRONTEND_BASE_URL}/developerdashboard`;
      break;
    case "admin":
      redirectUrl = `${FRONTEND_BASE_URL}/admindashboard`;
      break;
    default:
      redirectUrl = `${FRONTEND_BASE_URL}/`; // Default redirect
  }

  console.log(`🔗 Redirecting to: ${redirectUrl}`);
  res.redirect(redirectUrl);
};

// Google OAuth Routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { session: false }), handleOAuthCallback);

// LinkedIn OAuth Routes
router.get("/linkedin", passport.authenticate("linkedin"));
router.get("/linkedin/callback", passport.authenticate("linkedin", { session: false }), handleOAuthCallback);

// GitHub OAuth Routes
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/github/callback", passport.authenticate("github", { session: false }), handleOAuthCallback);



router.post('/two-fa-login', twoFAlogin);
router.post('/verify-otp', verifyOtp);


module.exports = router;
