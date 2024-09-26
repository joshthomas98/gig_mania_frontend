import React, { useContext } from "react";
import SuccessAnimation from "../components/SuccessAnimation";
import { Button, Container, Row, Col } from "react-bootstrap";
import { LoginContext } from "../App";

const GigAdvertised = () => {
  const { userId, artistOrVenue } = useContext(LoginContext);

  return (
    <div className="text-light text-center">
      <div className="pb-5" style={{ position: "relative" }}>
        <SuccessAnimation />
      </div>

      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={7}>
            <h2 className="pb-4">Your gig has been successfully advertised!</h2>

            <p className="lead pb-4">
              Congratulations! Your gig is now live and visible to other
              artists. It is available for search and application, and other
              artists can apply to take over this gig. We will notify you if
              there are any updates or changes regarding your gig.
            </p>

            <p className="pb-3">Thank you for using GigSweep!</p>
          </Col>
        </Row>
      </Container>

      <div className="pt-3">
        <Button variant="primary" href="/mybookings">
          Back to my bookings
        </Button>
      </div>
    </div>
  );
};

export default GigAdvertised;
