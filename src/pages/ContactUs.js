import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Image,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

function ContactUs() {
  const SERVER_BASE_URL = "http://localhost:8000/";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}contactqueries/`,
        formData
      );
      console.log("Form submitted successfully:", response.data);
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setIsLoading(false);
      navigate("/thanksforreview");
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  return (
    <>
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backdropFilter: "blur(5px)",
            zIndex: 1,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <LoadingSpinner />
          </div>
        </div>
      )}

      <div className="contact3 px-5 text-light">
        <Container>
          <Row>
            <Col lg={6} className="pt-3 px-3">
              <div className="card-shadow">
                <Image src="../../images/gigsweep_logo.png" fluid />
              </div>
            </Col>
            <Col lg={6} className="px-3">
              <div>
                <h1 className="font-weight-light">Contact GigSweep Support</h1>
                <Form className="mt-4" onSubmit={handleSubmit}>
                  <Form.Group controlId="name" className="my-2">
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="email" className="my-2">
                    <Form.Control
                      type="email"
                      placeholder="Email address"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="phone" className="my-2">
                    <Form.Control
                      type="text"
                      placeholder="Phone (optional)"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="message" className="mt-2">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    className="btn btn-danger-gradiant mt-3 text-white border-0 px-3 py-2"
                  >
                    Submit
                  </Button>
                </Form>
              </div>
            </Col>
            <Col lg={12}>
              <Card className="mt-4 border-0 mb-4">
                <Row>
                  <Col lg={4} md={4}>
                    <Card.Body className="d-flex align-items-center c-detail pl-0">
                      <div className="mr-3 align-self-center">
                        <Image src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon1.png" />
                      </div>
                      <div className="mx-3 pt-3">
                        <h6 className="font-weight-medium">Address</h6>
                        <p>
                          100 Callaghan Square
                          <br /> CF10 5BT Cardiff, UK
                        </p>
                      </div>
                    </Card.Body>
                  </Col>
                  <Col lg={4} md={4}>
                    <Card.Body className="d-flex align-items-center c-detail">
                      <div className="mr-3 align-self-center">
                        <Image src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon2.png" />
                      </div>
                      <div className="mx-3 pt-3">
                        <h6 className="font-weight-medium">Phone</h6>
                        <p>
                          +44 3500 546 944
                          <br /> +44 7923 885 368
                        </p>
                      </div>
                    </Card.Body>
                  </Col>
                  <Col lg={4} md={4}>
                    <Card.Body className="d-flex align-items-center c-detail">
                      <div className="mr-3 align-self-center">
                        <Image src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon3.png" />
                      </div>
                      <div className="mx-3 pt-3">
                        <h6 className="font-weight-medium">Email</h6>
                        <p>
                          info@gigsweep.com
                          <br /> support@gigsweep.com
                        </p>
                      </div>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default ContactUs;
