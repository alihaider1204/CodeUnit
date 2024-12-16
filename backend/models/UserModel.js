const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: function () {
      return !this.googleId && !this.linkedInId && !this.githubId;
    },
  },
  role: {
    type: String,
    enum: ["student", "developer", "admin"],
    default: "student",
  },
  token: {
    type: String,
    required: true,
  },
  googleId: { type: String, unique: true, sparse: true },
  linkedInId: { type: String, unique: true, sparse: true },
  githubId: { type: String, unique: true, sparse: true },
  profilePicture: { type: String, default: null }, // New field for profile picture
  createdAt: { type: Date, default: Date.now },
});

// Ensure password is required when no social ID is present
userSchema.path("password").required(function () {
  return !this.googleId && !this.linkedInId && !this.githubId;
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
