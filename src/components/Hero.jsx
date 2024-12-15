import React from "react";
import Homebg from "../assets/Homebg.jpg";
// import { useNavigate } from 'react-router-dom';

const Hero = () => {
  //   const navigate = useNavigate();

  //   // Function to handle the redirect to the SignUp page
  //   const handleRedirectToSignup = (platform) => {
  //     navigate('/SignUp', { state: { platform } });
  //   };

  return (
    <div
      className="container-fluid hero-section d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: `url(${Homebg})`, // Corrected the syntax for background image
        backgroundSize: "cover",
        height: "100vh",
        backgroundPosition: "center",
      }}
    >
      {/* Centered Box Section */}
      <div
        className="d-flex justify-content-center align-items-center w-100"
        style={{
          margin: "0 20px",
          maxWidth: "400px",
        }}
      >
        <div className="signup-box p-4 bg-white rounded shadow-lg w-100">
          <h2 className="text-center mb-3">Sign in to your account</h2>
          <p className="text-center mb-4">
            Don’t have an account? <a href="#">Join now</a>
          </p>

          {/* Sign-up options */}
          <div className="d-flex flex-column gap-3">
            <button
              className="btn btn-primary d-flex align-items-center justify-content-center gap-2"
              onClick={() => handleRedirectToSignup("Google")}
            >
              <i className="fab fa-google"></i> Sign up with Google
            </button>
            <button
              className="btn btn-primary d-flex align-items-center justify-content-center gap-2"
              onClick={() => handleRedirectToSignup("LinkedIn")}
            >
              <i className="fab fa-linkedin"></i> Sign up with LinkedIn
            </button>
            <button
              className="btn btn-dark d-flex align-items-center justify-content-center gap-2"
              onClick={() => handleRedirectToSignup("GitHub")}
            >
              <i className="fab fa-github"></i> Sign up with GitHub
            </button>
          </div>
        </div>
      </div>

      {/* Mobile-specific styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .hero-section {
            background: none; /* Remove background image on mobile */
            height: auto; /* Adjust height for content */
            padding: 20px 0; /* Add padding */
          }

          .signup-box {
            margin: 0 auto; /* Center the box */
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;