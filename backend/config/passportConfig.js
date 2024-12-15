// Dependencies
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const axios = require('axios'); // For fetching LinkedIn userinfo data

// Function to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

// Function to determine redirect URL based on role
const getRedirectUrl = (role) => {
  switch (role) {
    case "student":
      return "/studentdashboard";
    case "developer":
      return "/developerdashboard";
    case "admin":
      return "/admindashboard";
    default:
      return "/"; // Default fallback
  }
};

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            role: "developer", // Default role for Google sign-up
            profilePicture: profile.photos[0]?.value || null,
          });
        }

        const token = generateToken(user);
        const redirectUrl = getRedirectUrl(user.role);
        return done(null, { user, token, redirectUrl });
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// LinkedIn OAuth Strategy
passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: '/auth/linkedin/callback',
      scope: ['openid', 'profile', 'email'], // Scopes specified by LinkedIn Sign-In product
      state: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Fetch detailed user info from LinkedIn's userinfo endpoint
        const userInfoResponse = await axios.get('https://api.linkedin.com/v2/userinfo', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const userInfo = userInfoResponse.data;

        // Extract necessary information
        const { sub, name, email, picture } = userInfo;

        // Check if user already exists in the database
        let user = await User.findOne({ linkedInId: sub });

        if (!user) {
          user = await User.create({
            linkedInId: sub,
            username: name || profile.displayName, // Fallback to profile.displayName
            email: email || null, // Handle missing email gracefully
            profilePicture: picture || null, // Optional picture URL
          });
        }

        const token = generateToken(user);
        const redirectUrl = getRedirectUrl(user.role);
        return done(null, { user, token, redirectUrl });
      } catch (error) {
        console.error('Error fetching LinkedIn user info:', error);
        return done(error, null);
      }
    }
  )
);

// GitHub OAuth Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({
          $or: [
            { githubId: profile.id },
            { email: profile.emails?.[0]?.value },
          ],
        });

        if (user) {
          if (!user.githubId) {
            user.githubId = profile.id;
            await user.save();
          }
        } else {
          user = await User.create({
            githubId: profile.id,
            username: profile.username,
            email: profile.emails?.[0]?.value || `${profile.id}@github.com`,
            role: "developer", // Default role for GitHub sign-up
          });
        }

        const token = generateToken(user);
        const redirectUrl = getRedirectUrl(user.role);
        return done(null, { user, token, redirectUrl });
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((data, done) => {
  done(null, data);
});

passport.deserializeUser((data, done) => {
  done(null, data);
});

module.exports = passport;
