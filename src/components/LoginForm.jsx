import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/vector.png";
import SocialAuthButtons from "./SocialAuthButtons"; // Assuming this is the social auth buttons component

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(""); // For displaying error/success messages
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      // Check user role and navigate accordingly
      const userRole = response.data.user.role;

      if (userRole === "student") {
        navigate("/studentdashboard");
      } else if (userRole === "developer") {
        navigate("/developerdashboard");
      } else if (userRole === "admin") {
        navigate("/admindashboard");
      } else {
        setMessage("Unknown role. Please contact support.");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const token = response.credential; // Google ID Token
      const backendResponse = await axios.post("http://localhost:5000/api/users/google-login", {
        token,
      });

      const { role, message } = backendResponse.data;

      setMessage(message);

      // Redirect based on role
      if (role === "student") {
        navigate("/studentdashboard");
      } else if (role === "developer") {
        navigate("/developerdashboard");
      } else if (role === "admin") {
        navigate("/admindashboard");
      } else {
        setMessage("Unknown role. Please contact support.");
      }
    } catch (err) {
      console.error("Google login error:", err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Google Login failed. Please try again.");
    }
  };

  const handleGoogleLoginError = () => {
    setMessage("Google Login failed. Please try again.");
  };

  const handleForgotPassword = () => {
    navigate("/forgotpass");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <>
      {/* Logo */}
      <div className="text-center mb-4">
        <img
          src={Logo}
          alt="Logo"
          className="img-fluid"
          style={{ maxWidth: "50px" }}
        />
      </div>

      {/* Welcome Text */}
      <div className="text-center mb-4">
        <h2 className="mb-2" style={{ fontSize: "3rem" }}>Welcome back!</h2>
        <p className="text-muted" style={{ fontSize: "1.5rem" }}>Please enter your details</p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleLogin}>
        {/* Email Input */}
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-3 position-relative">
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="position-absolute"
            style={{
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Options */}
        <div
          className="d-flex justify-content-between align-items-center mb-4 flex-column flex-md-row gap-2"
          style={{ fontSize: "1.3rem" }}
        >
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="remember-checkbox"
            />
            <label className="form-check-label" htmlFor="remember-checkbox">
              Remember me
            </label>
          </div>
          <button
            type="button"
            className="btn btn-link p-0 text-decoration-none"
            onClick={handleForgotPassword}
          >
            Forgot password?
          </button>
        </div>

        {/* Buttons */}
        <div className="d-grid gap-3">
          {/* Log In Button */}
          <button
            type="submit"
            className="btn"
            style={{
              background: "linear-gradient(to right, #800080, #5ba0d6)",
              color: "white",
              borderRadius: "20px",
              fontWeight: "bold",
              padding: "10px 20px",
              border: "none",
            }}
          >
            Log In
          </button>
        </div>
      </form>
{/* Divider */}
<div className="d-flex align-items-center justify-content-center my-3">
  <hr style={{ width: "30%", borderTop: "1px solid #000", margin: "0" }} />
  <span style={{ margin: "0 10px", color: "#000", fontWeight: "bold" }}>Or</span>
  <hr style={{ width: "30%", borderTop: "1px solid #000", margin: "0" }} />
</div>

      {/* Social Auth Buttons */}
      <div className="mt-3">
        <SocialAuthButtons />
      </div>

      {/* Error/Success Message */}
      {message && <div className="alert alert-info mt-3">{message}</div>}

      {/* Sign Up Link */}
      <p className="text-center mt-4">
        Don't have an account?{" "}
        <button
          type="button"
          className="btn btn-link text-decoration-none"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
      </p>
    </>
  );
};

export default LoginForm;
