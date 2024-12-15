import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import logo from "../assets/vector.png";
import "bootstrap/dist/css/bootstrap.min.css";

const ComHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("bg-dark", "text-light");
      document.body.classList.remove("bg-light", "text-dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.add("bg-light", "text-dark");
      document.body.classList.remove("bg-dark", "text-light");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleUpdateProfile = () => {
    navigate("/profilecompleteness");
  };

  const handleApplyForDeveloper = () => {
    navigate("/applydeveloper");
  };

  const isUpdateProfileVisible =
    location.pathname === "/developerdashboard" ||
    location.pathname === "/studentdashboard";

  const isApplyForDeveloperVisible = location.pathname === "/studentdashboard";

  return (
    <header className={`sticky-top py-2 ${isDarkMode ? "bg-dark" : "bg-light"}`}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Left Section: Logo and Text */}
        <div className="d-flex align-items-center">
          <img src={logo} alt="Logo" className="me-2" style={{ width: "40px" }} />
          <span className={`fs-4 fw-bold ${isDarkMode ? "text-light" : "text-dark"}`}>
            CodeUnity
          </span>
        </div>

        {/* Center Section: Search Bar */}
        <div className="d-none d-md-flex align-items-center flex-grow-1 justify-content-center">
          <div
            className={`d-flex align-items-center border rounded-pill px-3 ${
              isDarkMode ? "bg-secondary text-light" : "bg-light text-dark"
            }`}
            style={{
              width: "50%",
              height: "40px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <FontAwesomeIcon
              icon={faSearch}
              className={`me-2 ${isDarkMode ? "text-light" : "text-muted"}`}
            />
            <input
              type="text"
              className={`form-control border-0 bg-transparent ${
                isDarkMode ? "text-light" : "text-dark"
              }`}
              placeholder="Search..."
              style={{ boxShadow: "none" }}
            />
          </div>
        </div>

        {/* Right Section: Logout Button and User Icon with Dropdown */}
        <div className="d-flex align-items-center">
          <button className={`btn me-2 ${isDarkMode ? "btn-light" : "btn-primary"}`}>
            Logout
          </button>
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="link"
              className="p-0 border-0 text-decoration-none"
            >
              <FontAwesomeIcon
                icon={faUser}
                className={`fs-4 ${isDarkMode ? "text-light" : "text-secondary"}`}
              />
            </Dropdown.Toggle>
            <Dropdown.Menu className={`${isDarkMode ? "bg-dark text-light" : ""}`}>
              {isUpdateProfileVisible && (
                <Dropdown.Item onClick={handleUpdateProfile}>
                  Update Profile
                </Dropdown.Item>
              )}
              {isApplyForDeveloperVisible && (
                <Dropdown.Item onClick={handleApplyForDeveloper}>
                  Apply for Developer
                </Dropdown.Item>
              )}
              <Dropdown.Item onClick={toggleDarkMode}>
                {isDarkMode ? "Disable Dark Mode" : "Enable Dark Mode"}
              </Dropdown.Item>
              <Dropdown.Item href="/settings">Settings</Dropdown.Item>
              <Dropdown.Item href="/logout">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default ComHeader;
