import React, { useState } from 'react';
import { Card, Table, Button, Row, Col } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import ComHeader from '../components/ComHeader';
import ComSidebar from '../components/ComSidebar';
import Messages from '../components/ComMessages';
import Notifications from '../components/ComNotifications';
import cardImage from '../assets/card.png';
import masterCardLogo from '../assets/mastercard.jpeg';
import visaLogo from '../assets/visa.jpeg';
import DiscussionForum from '../pages/DiscussionForum'; // Import DiscussionForum component

import { useNavigate } from "react-router-dom"; // Import useNavigate


const StudentDashboard = () => {
  const [selectedPage, setSelectedPage] = useState('home'); // Default page set to Home
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleSidebarSelection = (page) => {
    setSelectedPage(page); // Update selected page based on sidebar selection
  };

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Spending Overview',
        data: [50, 100, 150, 100, 200, 250, 200, 300, 400, 450, 350, 300],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const projects = [
    { name: 'Chakra Soft UI Version', budget: '$14,000', status: 'Working', completion: '60%' },
    { name: 'Add Progress Track', budget: '$3,000', status: 'Canceled', completion: '10%' },
    { name: 'Fix Platform Errors', budget: 'Not Set', status: 'Done', completion: '100%' },
    { name: 'Launch our Mobile App', budget: '$32,000', status: 'Done', completion: '100%' },
    { name: 'Add the New Pricing Page', budget: '$400', status: 'Working', completion: '25%' },
  ];

  const invoices = [
    { date: 'March 01, 2020', amount: '$130' },
    { date: 'April 12, 2020', amount: '$250' },
    { date: 'May 05, 2020', amount: '$320' },
    { date: 'June 21, 2020', amount: '$180' },
    { date: 'July 15, 2020', amount: '$500' },
    { date: 'August 30, 2020', amount: '$420' },
    { date: 'September 11, 2020', amount: '$700' },
    { date: 'October 10, 2020', amount: '$900' },
    { date: 'November 02, 2020', amount: '$130' },
    { date: 'December 13, 2020', amount: '$250' },
  ];

  const developers = [
    { name: 'Mahmoud Lito', role: 'Arabic/English Tutor', location: 'Egypt', languages: ['English', 'Arabic'], experience: '8.0 yr', rate: '$10/hour', status: 'Online' },
    { name: 'Mourya Chiranjeevi Mokamatla', role: 'React JS, JavaScript, HTML, CSS', location: 'India', languages: ['JavaScript', 'React', 'Next.js'], experience: '0.0 yr', rate: '$30/hour', status: 'Online' },
    { name: 'John Doe', role: 'Web Developer', location: 'USA', languages: ['JavaScript', 'Python', 'Django'], experience: '2.0 yr', rate: '$50/hour', status: 'Offline' },
    { name: 'Jane Smith', role: 'Full Stack Developer', location: 'Canada', languages: ['React', 'Node.js', 'MongoDB'], experience: '3.0 yr', rate: '$30/hour', status: 'Online' },
    { name: 'Ali Hasan', role: 'Backend Developer', location: 'Pakistan', languages: ['PHP', 'Laravel', 'MySQL'], experience: '5.0 yr', rate: '$150/hour', status: 'Offline' },
    { name: 'Sara Johnson', role: 'Frontend Developer', location: 'UK', languages: ['JavaScript', 'HTML', 'CSS'], experience: '6.0 yr', rate: '$25/hour', status: 'Online' },
    { name: 'Robert Fox', role: 'React.js Developer', location: 'Australia', languages: ['JavaScript', 'React', 'Redux'], experience: '4.0 yr', rate: '$45/hour', status: 'Online' },
    { name: 'Mona Ali', role: 'Mobile App Developer', location: 'Saudi Arabia', languages: ['Swift', 'Java', 'Kotlin'], experience: '3.5 yr', rate: '$18/hour', status: 'Offline' },
    { name: 'Ahmad Zayed', role: 'AI Engineer', location: 'UAE', languages: ['Python', 'TensorFlow', 'PyTorch'], experience: '7.0 yr', rate: '$70/hour', status: 'Online' },
  ];

  const handleBookClick = () => {
    navigate("/pay"); // Redirect to /pay
  };
  const handleShowMessages = () => {
    setSelectedPage("messages"); // Show Messages page
  };
  const renderContent = () => {
    if (selectedPage === 'messages') {
      return (
        <div className="message-container">
          <h5>Messages</h5>
          <Messages />
        </div>
      );
    } else if (selectedPage === 'notifications') {
      return (
        <div className="notification-container">
          <h5>Notifications</h5>
          <Notifications />
        </div>
      );
    } else if (selectedPage === 'forum') {
      // Add condition for Discussion Forum
      return (
        <div className="discussion-forum-container">
          <h5 className="text-center">Discussion Forum</h5>
          <DiscussionForum /> {/* Render the DiscussionForum component */}
        </div>
      );
    } else if (selectedPage === 'home') {
      return (
        <div>
          <h3>Available Developers</h3>
          <Row className="g-4">
            {developers.map((dev, index) => (
              <Col key={index} lg={4} md={6}>
                <Card className="shadow-sm d-flex flex-column" style={{ height: '100%' }}>
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex align-items-center">
                      <img
                        src="https://randomuser.me/api/portraits/men/1.jpg"
                        alt={dev.name}
                        className="rounded-circle me-3"
                        style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                      />
                      <div>
                        <h5>{dev.name}</h5>
                        <p>{dev.role}</p>
                        <p className="text-muted">{dev.location}</p>
                        <Button variant="outline-primary" size="sm">
                          {dev.status === 'Online' ? 'Online' : 'Offline'}
                        </Button>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p><strong>Languages:</strong> {dev.languages.join(', ')}</p>
                      <p><strong>Experience:</strong> {dev.experience}</p>
                      <p><strong>Rate:</strong> {dev.rate}</p>
                      <div className="d-flex justify-content-between mt-3">
                      <Button variant="success" onClick={handleBookClick}>
                          Book
                        </Button>
                        <Button variant="info" onClick={handleShowMessages}>
                          Message
                        </Button>
                        <Button variant="warning" onClick={handleShowMessages}>
                          Meet
                        </Button>
                      </div>                </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      );
    } else if (selectedPage === 'dashboard') {
      return (
        <div className="dashboard-content">
          {/* Spending Overview and Projects Section */}
          <div className="row g-4">
            <div className="col-lg-6">
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title className="mb-3">Spending Overview</Card.Title>
                  <div style={{ height: '300px' }}>
                    <Line data={data} options={{ maintainAspectRatio: false }} />
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div className="col-lg-6">
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title className="mb-3">Projects</Card.Title>
                  <div
                    style={{
                      height: '300px',
                      overflowY: 'auto',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                    }}
                  >
                    <Table striped bordered hover responsive>
                      <thead>
                        <tr>
                          <th>Company</th>
                          <th>Budget</th>
                          <th>Status</th>
                          <th>Completion</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projects.map((project, index) => (
                          <tr key={index}>
                            <td>{project.name}</td>
                            <td>{project.budget}</td>
                            <td>{project.status}</td>
                            <td>{project.completion}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>

          {/* Payment Method and Invoice Section */}
          <div className="row g-4 mt-4">
            <div className="col-lg-6">
              <Card className="shadow-sm">
                <img src={cardImage} alt="Payment Card" className="img-fluid p-3" />
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Payment Method</h5>
                    <Button variant="primary" className="btn-sm">
                      Add a New Card
                    </Button>
                  </div>
                  <div className="mt-3">
                    <div className="d-flex align-items-center mb-2">
                      <img
                        src={masterCardLogo}
                        alt="MasterCard"
                        className="me-2"
                        style={{ width: '50px' }}
                      />
                      <input
                        type="text"
                        placeholder="7812 2139 0823 XXXX"
                        className="form-control form-control-sm"
                        style={{ width: '200px' }}
                      />
                    </div>
                    <div className="d-flex align-items-center">
                      <img
                        src={visaLogo}
                        alt="Visa"
                        className="me-2"
                        style={{ width: '50px' }}
                      />
                      <input
                        type="text"
                        placeholder="7812 2139 0823 XXXX"
                        className="form-control form-control-sm"
                        style={{ width: '200px' }}
                      />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div className="col-lg-6">
              <Card className="shadow-sm">
                <Card.Body style={{ height: '390px', overflowY: 'auto' }}>
                  <Card.Title>Invoices</Card.Title>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>PDF</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map((invoice, index) => (
                        <tr key={index}>
                          <td>{invoice.date}</td>
                          <td>{invoice.amount}</td>
                          <td>
                            <Button variant="link" size="sm">
                              <FontAwesomeIcon icon={faFilePdf} className="text-danger" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </div>
          </div>

          {/* Rating Section */}
          <div className="row g-4 mt-4">
            <div className="col-lg-12">
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>Rating</Card.Title>
                  <div>
                    <span>⭐⭐⭐⭐⭐</span>
                  </div>
                  <p className="text-muted mt-2">
                    Want to become a developer? Give necessary information and get started.
                  </p>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      {/* Header */}
      <ComHeader />

      <div className="d-flex">
        {/* Sidebar */}
        <ComSidebar onSelectPage={handleSidebarSelection} />

        {/* Main Content */}
        <div className="container mt-4" style={{ flexGrow: 1, paddingBottom: '100px' }}>
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
