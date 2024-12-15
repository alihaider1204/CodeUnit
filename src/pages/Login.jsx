import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import BackgroundLogin from "../components/BackgroundLogin";
import LoginForm from "../components/LoginForm";

const clientId = "390493255667-qu0ipjj5d3207qnrrpvuf501q8c2it51.apps.googleusercontent.com";

const Login = () => {
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const token = response.credential; // Google ID Token
      const backendResponse = await axios.post("http://localhost:5000/api/users/google-login", {
        token,
      });

      const { role, message } = backendResponse.data;

      setSuccessMessage(message);

      // Redirect based on role
      if (role === "student") {
        window.location.href = "/studentdashboard";
      } else if (role === "developer") {
        window.location.href = "/developerdashboard";
      } else if (role === "admin") {
        window.location.href = "/admindashboard";
      } else {
        setError("Unknown role. Please contact support.");
      }
    } catch (err) {
      console.error("Error during Google login:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Google Login failed. Please try again.");
    }
  };

  const handleGoogleLoginError = () => {
    setError("Google Login failed. Please try again.");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="d-flex flex-column flex-md-row vh-100">
        {/* Left Section */}
        <BackgroundLogin />

        {/* Right Section */}
        <div
          className="col-12 col-md-6 d-flex justify-content-center align-items-center"
          style={{ paddingTop: "25px", paddingBottom: "50px" }}
        >
          <div
            className="w-75 p-4"
            style={{
              border: "2px solid black",
              borderRadius: "20px",
            }}
          >
            <LoginForm />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
