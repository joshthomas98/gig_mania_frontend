import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import SuccessAnimation from "../components/SuccessAnimation";

const NewsletterThankYou = () => {
  return (
    <Container className="text-center text-light py-5">
      <Row>
        <Col>
          <h1 className="mb-3">
            Thank you for signing up to our monthly newsletter!
          </h1>
          <h3 className="mb-4" style={{ fontSize: "1.25rem" }}>
            You'll now receive the best of GigSweep every month, straight to
            your inbox!
          </h3>

          <div className="mb-4">
            <SuccessAnimation />
          </div>

          <Button href="/" variant="primary" className="mt-3">
            Back to home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NewsletterThankYou;
