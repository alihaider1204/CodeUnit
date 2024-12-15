import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../assets/vector.png";
import LoginPic from "../assets/loginpic.jpg";
import SignupForm from "../components/SignupForm";
import SocialAuthButtons from "../components/SocialAuthButtons";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handles input change for the form fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Form submission with error handling and success redirection
  const handleSubmit = async () => {
    setError("");
    setSuccessMessage("");
  
    try {
      console.log("Sending Form Data:", formData); // Log the form data
  
      const response = await axios.post("http://localhost:5000/api/users/signup", formData); // Send full formData
  
      console.log("Signup Response:", response); // Log the backend response
  
      setSuccessMessage(response.data.message || "Signup successful!");
      setTimeout(() => {
        window.location.href = "/studentdashboard";
      }, 2000);
    } catch (err) {
      console.error("Signup Error:", err.response?.data || err.message); // Log detailed error
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };
  
  return (
    <div className="d-flex flex-column flex-md-row vh-100">
      {/* Left Side with Image */}
      <div
        className="col-md-6 d-none d-md-flex justify-content-center align-items-center position-relative"
        style={{
          backgroundImage: `url(${LoginPic})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Signup Text */}
        <div
          className="position-absolute"
          style={{
            bottom: "20px",
            left: "20px",
            textAlign: "left",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: "1.8rem",
              fontWeight: "bold",
              textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)",
            }}
          >
            SIGN UP TO
          </div>
          <div
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              background: "linear-gradient(to right, #ffffff, #800080)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            CODE UNITY!
          </div>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
        <div
          className="w-75 p-4"
          style={{
            border: "2px solid black",
            borderRadius: "20px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            backgroundColor: "white",
          }}
        >
          {/* Logo */}
          <div className="text-center mb-4">
            <img src={Logo} alt="Logo" className="img-fluid" style={{ maxWidth: "50px" }} />
          </div>

          {/* Title */}
          <div className="text-center mb-4">
            <h2 className="mb-2" style={{ fontSize: "2rem", color: "#000000" }}>
              Signup
            </h2>
            <p style={{ fontSize: "1rem", color: "#6c757d" }}>Just some details to get you in!</p>
          </div>

          {/* Error and Success Messages */}
          {error && <p className="text-danger text-center">{error}</p>}
          {successMessage && <p className="text-success text-center">{successMessage}</p>}

          {/* Signup Form */}
          <SignupForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
          />

{/* Divider */}
<div className="d-flex align-items-center justify-content-center my-3">
  <hr style={{ width: "30%", borderTop: "1px solid #000", margin: "0" }} />
  <span style={{ margin: "0 10px", color: "#000", fontWeight: "bold" }}>Or</span>
  <hr style={{ width: "30%", borderTop: "1px solid #000", margin: "0" }} />
</div>

          {/* Social Auth Buttons */}
          <SocialAuthButtons />
        </div>
      </div>
    </div>
  );
};

export default Signup;
