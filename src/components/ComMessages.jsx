import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaArrowLeft, FaVideo } from "react-icons/fa"; // Importing icons
import { useLocation } from "react-router-dom"; // Importing useLocation hook



const messagesData = [
  {
    name: 'Bessie Cooper',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    lastMessage: 'Hi, Robert. I’m facing some chall...',
    time: 'Online',
  },
  {
    name: 'Thomas Baker',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    lastMessage: 'I have a job interview coming up ...',
    time: '10:24 AM',
  },
  {
    name: 'Daniel Brown',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
    lastMessage: 'Not much, just planning to relax ...',
    time: 'Yesterday',
  },
  {
    name: 'Ronald Richards',
    image: 'https://randomuser.me/api/portraits/men/4.jpg',
    lastMessage: 'I’m stuck on this bug in the code...',
    time: 'Yesterday',
  },
  {
    name: 'Emily Johnson',
    image: 'https://randomuser.me/api/portraits/women/5.jpg',
    lastMessage: 'Can we discuss the project updates?',
    time: '9:15 AM',
  },
  {
    name: 'Michael Smith',
    image: 'https://randomuser.me/api/portraits/men/6.jpg',
    lastMessage: 'I’ll send you the files in a bit.',
    time: 'Yesterday',
  },
  {
    name: 'Sophia Garcia',
    image: 'https://randomuser.me/api/portraits/women/7.jpg',
    lastMessage: 'Good morning! How’s your day going?',
    time: '7:30 AM',
  },
];

const ComMessages = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  const isDeveloperDashboard = location.pathname === "/developerdashboard";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024); // Adjust for iPad Pro screen size
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelectChat = (user) => {
    setSelectedChat(user);
  };

  const handleBackToMessages = () => {
    setSelectedChat(null);
  };

  if (isMobile) {
    return (
      <div className="d-flex flex-column" style={{ height: "80vh" }}>
        {selectedChat ? (
          <div className="flex-grow-1 bg-light d-flex flex-column p-3">
            {/* Chat Header */}
            <div className="d-flex align-items-center mb-3">
              <button
                className="btn btn-light me-3 d-flex align-items-center justify-content-center"
                onClick={handleBackToMessages}
                style={{
                  fontSize: "1.25rem",
                  padding: "8px",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                }}
              >
                <FaArrowLeft />
              </button>
              <img
                src={selectedChat.image}
                alt={selectedChat.name}
                className="rounded-circle me-3"
                style={{ width: "50px", height: "50px", objectFit: "cover" }}
              />
              <div>
                <h5 className="mb-0">{selectedChat.name}</h5>
                <small className="text-muted">{selectedChat.time}</small>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-grow-1 overflow-auto mb-3">
              <p className="text-muted">Start chatting with {selectedChat.name}...</p>
            </div>

            {/* Input Box */}
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Type a message..."
                aria-label="Type a message"
              />
              {isDeveloperDashboard && (
                <button className="btn btn-secondary" type="button" title="Start Video Call">
                  <FaVideo />
                </button>
              )}
              <button className="btn btn-primary" type="button">
                Send
              </button>
            </div>
          </div>
        ) : (
          <div
            className="d-flex flex-column bg-white border-end overflow-auto"
            style={{ padding: "10px", height: "100%" }}
          >
            {messagesData.map((user, index) => (
              <div
                key={index}
                className="d-flex align-items-center bg-light border rounded mb-2 p-2 shadow-sm"
                style={{ cursor: "pointer", transition: "background-color 0.2s ease-in-out" }}
                onClick={() => handleSelectChat(user)}
              >
                <img
                  src={user.image}
                  alt={user.name}
                  className="rounded-circle me-3"
                  style={{
                    width: "45px",
                    height: "45px",
                    objectFit: "cover",
                  }}
                />
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between">
                    <h6 className="mb-0">{user.name}</h6>
                    <span className="text-muted">{user.time}</span>
                  </div>
                  <p className="text-muted mb-0">{user.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Desktop View
  return (
    <div className="d-flex" style={{ height: "80vh" }}>
      {/* Messages List */}
      <div
        className="d-flex flex-column bg-white border-end overflow-auto"
        style={{ padding: "10px", width: "300px", height: "100%" }}
      >
        {messagesData.map((user, index) => (
          <div
            key={index}
            className="d-flex align-items-center bg-light border rounded mb-2 p-2 shadow-sm"
            style={{ cursor: "pointer", transition: "background-color 0.2s ease-in-out" }}
            onClick={() => handleSelectChat(user)}
          >
            <img
              src={user.image}
              alt={user.name}
              className="rounded-circle me-3"
              style={{
                width: "45px",
                height: "45px",
                objectFit: "cover",
              }}
            />
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between">
                <h6 className="mb-0">{user.name}</h6>
                <span className="text-muted">{user.time}</span>
              </div>
              <p className="text-muted mb-0">{user.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div className="flex-grow-1 bg-light d-flex flex-column p-3">
        {selectedChat ? (
          <>
            <div className="d-flex align-items-center mb-3">
              <img
                src={selectedChat.image}
                alt={selectedChat.name}
                className="rounded-circle me-3"
                style={{ width: "50px", height: "50px", objectFit: "cover" }}
              />
              <div>
                <h5 className="mb-0">{selectedChat.name}</h5>
                <small className="text-muted">{selectedChat.time}</small>
              </div>
            </div>

            <div className="flex-grow-1 overflow-auto mb-3">
              <p className="text-muted">Start chatting with {selectedChat.name}...</p>
            </div>

            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Type a message..."
                aria-label="Type a message"
              />
              {isDeveloperDashboard && (
                <button className="btn btn-secondary" type="button" title="Start Video Call">
                  <FaVideo />
                </button>
              )}
              <button className="btn btn-primary" type="button">
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-muted flex-grow-1 d-flex align-items-center justify-content-center">
            <p>Select a message to start a conversation.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComMessages;