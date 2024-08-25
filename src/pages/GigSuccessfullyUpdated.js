import React, { useContext } from "react";
import SuccessAnimation from "../components/SuccessAnimation";
import { Button, Container, Row, Col } from "react-bootstrap";
import { LoginContext } from "../App";

const GigSuccessfullyUpdated = () => {
  const { userId, setUserId, artistOrVenue, setArtistOrVenue } =
    useContext(LoginContext);

  return (
    <div className="text-light text-center">
      <div className="pb-5" style={{ position: "relative" }}>
        <SuccessAnimation />
      </div>

      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={7}>
            <h2 className="pb-5">Your gig has been successfully updated!</h2>

            <p className="lead pb-4">
              Your gig details have been successfully updated. We have saved the
              changes you made, and your updated gig information is now live.{" "}
              You'll receive a confirmation email with the updated details
              shortly.
            </p>

            <p className="pb-3">Thank you for using GigSweep!</p>
          </Col>
        </Row>
      </Container>

      <div className="pt-3">
        <Button
          variant="primary"
          href={
            artistOrVenue === "A"
              ? `artistuserprofile/${userId}`
              : `venueuserprofile/${userId}`
          }
        >
          Back to my profile
        </Button>
      </div>
    </div>
  );
};

export default GigSuccessfullyUpdated;
