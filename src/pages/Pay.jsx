import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import ComHeader from "../components/ComHeader";
import ComSidebar from "../components/ComSidebar";
import mastercardLogo from "../assets/mastercard.jpeg";
import visaLogo from "../assets/visa.jpeg";
import "bootstrap/dist/css/bootstrap.min.css";

const Pay = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    nameOnCard: "",
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvv: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      {/* Header */}
      <ComHeader />

      <Container fluid>
        <Row>
          {/* Sidebar */}
          <Col lg={3} md={4}>
            <ComSidebar />
          </Col>

          {/* Main Content */}
          <Col lg={9} md={8} className="py-5">
            <Container>
              <Form>
                <Row className="g-4">
                  {/* Billing Address Section */}
                  <Col lg={6}>
                    <h3 className="mb-3">Billing Address</h3>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="fullName"
                        placeholder="Jacob Aiden"
                        value={formData.fullName}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="example@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        placeholder="Room - Street - Locality"
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        placeholder="Berlin"
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Row className="g-2">
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>State</Form.Label>
                          <Form.Control
                            type="text"
                            name="state"
                            placeholder="Germany"
                            value={formData.state}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Zip Code</Form.Label>
                          <Form.Control
                            type="text"
                            name="zipCode"
                            placeholder="123 456"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>

                  {/* Payment Section */}
                  <Col lg={6}>
                    <h3 className="mb-3">Payment</h3>
                    <Form.Group className="mb-3">
                      <Form.Label>Cards Accepted</Form.Label>
                      <div className="d-flex align-items-center">
                        <Image
                          src={mastercardLogo}
                          alt="MasterCard"
                          width="50"
                          height="30"
                          className="me-2"
                        />
                        <Image
                          src={visaLogo}
                          alt="Visa"
                          width="50"
                          height="30"
                          className="me-2"
                        />
                      </div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Name On Card</Form.Label>
                      <Form.Control
                        type="text"
                        name="nameOnCard"
                        placeholder="Mr. Jacob Aiden"
                        value={formData.nameOnCard}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Credit Card Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="cardNumber"
                        placeholder="1111 2222 3333 4444"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Exp. Month</Form.Label>
                      <Form.Control
                        type="text"
                        name="expMonth"
                        placeholder="August"
                        value={formData.expMonth}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Row className="g-2">
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Exp. Year</Form.Label>
                          <Form.Control
                            type="text"
                            name="expYear"
                            placeholder="2025"
                            value={formData.expYear}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>CVV</Form.Label>
                          <Form.Control
                            type="text"
                            name="cvv"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                {/* Submit Button */}
                <div className="mt-4 text-center">
                  <Button type="submit" className="btn btn-primary w-50">
                    Submit
                  </Button>
                </div>
              </Form>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Pay;
