import React from "react";
import { Bar, Doughnut } from "react-chartjs-2"; // Chart.js components
import "chart.js/auto";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; // Leaflet components
import "leaflet/dist/leaflet.css";
import ComHeader from "../components/ComHeader"; // Use ComHeader instead of AdminHeader
import "bootstrap/dist/css/bootstrap.min.css";

const AdminDashboard = () => {
  const revenueData = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ],
    datasets: [
      {
        label: "Income",
        backgroundColor: "#4caf50",
        data: [
          12000, 15000, 20000, 18000, 22000, 47000, 43000, 31000, 27000, 23000,
          19000, 25000,
        ],
      },
      {
        label: "Expense",
        backgroundColor: "#f44336",
        data: [
          5000, 10000, 7000, 9000, 12000, 27000, 16000, 17000, 22000, 12000,
          11000, 14000,
        ],
      },
    ],
  };

  const userData = {
    labels: ["Developers", "Students"],
    datasets: [
      {
        label: "User Types",
        backgroundColor: ["#4caf50", "#8e44ad"],
        data: [82.3, 17.7],
      },
    ],
  };

  const developers = [
    { name: "Ana Black", email: "ana@gmail.com" },
    { name: "George Litz", email: "georgelitz@gmail.com" },
    { name: "John Miller", email: "jmiller@gmail.com" },
    { name: "Jane Johnson", email: "jj@gmail.com" },
    { name: "Mezei Ágnes", email: "fefekartika@gmail.com" },
    { name: "Katona Beatrix", email: "edobram@gmail.com" },
    { name: "Halász Emese", email: "jiloputri@yahoo.com" },
  ];

  const allUsers = [
    {
      name: "Jane Cooper",
      type: "Developer",
      phone: "(225) 555-0118",
      email: "jane@microsoft.com",
      status: "Active",
    },
    {
      name: "Floyd Miles",
      type: "Student",
      phone: "(205) 555-0100",
      email: "floyd@yahoo.com",
      status: "Inactive",
    },
    {
      name: "Ronald Richards",
      type: "Student",
      phone: "(302) 555-0107",
      email: "ronald@adobe.com",
      status: "Inactive",
    },
    {
      name: "Marvin McKinney",
      type: "Developer",
      phone: "(252) 555-0126",
      email: "marvin@tesla.com",
      status: "Active",
    },
  ];

  return (
    <>
      <ComHeader />
      <div className="container-fluid mt-3 pb-5"> {/* Reduced the margin-top */}
        <h1 className="text-center my-3">Admin's Dashboard</h1> {/* Adjusted margin */}
        {/* Responsive Cards */}
        <div className="row text-center mb-5">
          {[
            { label: "Total Revenue", value: "$37,193.00" },
            { label: "Total Users", value: "1,349" },
            { label: "Total Invoices", value: "3,500" },
            { label: "Total Projects", value: "345" },
          ].map((card, idx) => (
            <div className="col-sm-6 col-md-3 mb-3" key={idx}>
              <div className="card shadow-sm p-3">
                <h5>{card.label}</h5>
                <p className="text-primary">{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="row mb-5">
          <div className="col-lg-6 col-12 mb-3">
            <div className="card shadow-sm p-3 h-100">
              <h5>Revenue</h5>
              <div style={{ height: "300px" }}>
                <Bar data={revenueData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-12 mb-3">
            <div className="card shadow-sm p-3 h-100">
              <h5>Users</h5>
              <div style={{ height: "300px" }}>
                <Doughnut data={userData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
          </div>
        </div>

        {/* Map and Developer List */}
        <div className="row mb-5">
          <div className="col-lg-7 col-12 mb-3">
            <div className="card shadow-sm p-3 h-100">
              <h5>User Map</h5>
              <MapContainer
                center={[37.7749, -122.4194]}
                zoom={10}
                style={{ height: "300px" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[37.7749, -122.4194]}>
                  <Popup>
                    San Francisco, CA <br /> 201 Users
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
          <div className="col-lg-5 col-12">
            <div className="card shadow-sm p-3 h-100 overflow-auto">
              <h5>Developer Forms</h5>
              <ul className="list-group">
                {developers.map((dev, idx) => (
                  <li
                    key={idx}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span>
                      <strong>{dev.name}</strong> <br />
                      <small>{dev.email}</small>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="card shadow-sm p-3">
          <h5>All Users</h5>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Type</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map((user, idx) => (
                  <tr key={idx}>
                    <td>{user.name}</td>
                    <td>{user.type}</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td>
                      <span
                        className={`badge ${
                          user.status === "Active" ? "bg-success" : "bg-danger"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
