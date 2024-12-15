import React, { useState } from "react";
import ComHeader from "../components/ComHeader";
import ComSidebar from "../components/ComSidebar";
import "bootstrap/dist/css/bootstrap.min.css";

const ProfileCompleteness = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    degree: "",
    discipline: "",
    startDate: "",
    endDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Calculate completeness percentage
  const calculateCompleteness = () => {
    const fields = Object.values(profile);
    const filledFields = fields.filter((field) => field.trim() !== "").length;
    const totalFields = fields.length;
    return Math.round((filledFields / totalFields) * 100);
  };

  const completeness = calculateCompleteness();

  return (
    <>
      <ComHeader />
      <div className="d-flex">
        <ComSidebar />
        <div className="container mt-4" style={{ paddingBottom: "50px" }}> {/* Added padding-bottom */}
          <h1 className="text-center mb-4">Profile Completeness</h1>
          {/* Completeness Tracker */}
          <div className="progress mb-4" style={{ height: "20px" }}>
            <div
              className={`progress-bar ${
                completeness === 100 ? "bg-success" : "bg-primary"
              }`}
              role="progressbar"
              style={{ width: `${completeness}%` }}
              aria-valuenow={completeness}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {completeness}%
            </div>
          </div>

          {/* Profile Form */}
          <form>
            {/* First Name and Last Name */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="form-control"
                  value={profile.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="form-control"
                  value={profile.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={profile.email}
                onChange={handleInputChange}
              />
            </div>

            {/* Date of Birth */}
            <div className="mb-3">
              <label htmlFor="dateOfBirth" className="form-label">
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                className="form-control"
                value={profile.dateOfBirth}
                onChange={handleInputChange}
              />
            </div>

            {/* Degree Selection */}
            <div className="mb-3">
              <label htmlFor="degree" className="form-label">
                Degree
              </label>
              <select
                id="degree"
                name="degree"
                className="form-select"
                value={profile.degree}
                onChange={handleInputChange}
              >
                <option value="">Select Degree</option>
                <option value="Matric">Matric</option>
                <option value="Bachelors">Bachelors</option>
                <option value="Masters">Masters</option>
              </select>
            </div>

            {/* Discipline */}
            <div className="mb-3">
              <label htmlFor="discipline" className="form-label">
                Discipline of Degree
              </label>
              <input
                type="text"
                id="discipline"
                name="discipline"
                className="form-control"
                value={profile.discipline}
                onChange={handleInputChange}
              />
            </div>

            {/* Degree Start and End Dates */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="startDate" className="form-label">
                  Degree Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  className="form-control"
                  value={profile.startDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="endDate" className="form-label">
                  Degree End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  className="form-control"
                  value={profile.endDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="button"
                className="btn btn-primary"
                style={{ marginBottom: "20px" }}
                >
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileCompleteness;
