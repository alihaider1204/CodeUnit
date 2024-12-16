const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { generateOtp } = require('../utils/generateOtp');
const { sendEmail } = require('../utils/sendEmail');

// Utility function to generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
};



const sendOtp = async (user) => {
  const otp = generateOtp();
  user.otp = otp;
  user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry
  await user.save();

  await sendEmail(user.email, 'Your OTP Code', `Your OTP is ${otp}`);
};


// Signup Controller
const signup = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  console.log("📥 Signup Request Body:", req.body);

  // Validate input
  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: "student", // Default role
    });

    // Save the user to the database
    await newUser.save();
    console.log(`✅ User Registered: ${email}`);

    // Generate token for the user
    const token = generateToken(newUser);

    // Save the token in the user document
    newUser.token = token;
    await newUser.save();

    // Respond with the token
    res.status(201).json({
      message: "Signup successful! Welcome to Code Unity.",
      token, // Send the token to the client
    });
  } catch (error) {
    console.error("❌ Error during signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Login Controller
const login = async (req, res) => {
  const { email, password } = req.body;

  console.log("📥 Login Request Body:", req.body);

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const token = generateToken(user);

    console.log(`✅ User Authenticated: ${email}`);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("❌ Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Google OAuth Controller
const googleOAuthCallback = (req, res) => {
  const { user, token } = req.user;
  console.log(`✅ Google OAuth Successful for: ${user.email}`);
  res.redirect(`/dashboard?token=${token}`);
};

// LinkedIn OAuth Controller
const linkedInOAuthCallback = (req, res) => {
  const { user, token } = req.user;
  console.log(`✅ LinkedIn OAuth Successful for: ${user.email}`);
  res.redirect(`/dashboard?token=${token}`);
};

// GitHub OAuth Controller
const githubOAuthCallback = (req, res) => {
  const { user, token } = req.user;
  console.log(`✅ GitHub OAuth Successful for: ${user.email}`);
  res.redirect(`/dashboard?token=${token}`);
};

// Logout Controller
const logout = (req, res) => {
  console.log("🔓 User Logged Out");
  res.json({ message: "Logged out successfully. Discard the token on the client." });
};



const twoFAlogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  await sendOtp(user);

  res.status(200).json({ message: 'OTP sent to your email', userId: user._id });
};

const verifyOtp = async (req, res) => {
  const { userId, otp } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  if (user.otp !== otp || user.otpExpiry < Date.now()) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  user.otp = null;
  user.otpExpiry = null;
  await user.save();

  res.status(200).json({ message: 'OTP verified successfully' });
};


module.exports = {
  signup,
  login,
  googleOAuthCallback,
  linkedInOAuthCallback,
  githubOAuthCallback,
  logout,
  twoFAlogin,
  verifyOtp,
};
