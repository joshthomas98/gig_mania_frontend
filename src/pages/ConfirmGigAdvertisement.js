import React from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";

const ConfirmGigAdvertisement = () => {
  // Simulated gig details (in a real app, these would come from props or a state management solution)
  const gigDetails = {
    date: "2024-09-15",
    time: "19:00",
    venue: "The Music Hall",
    duration: "2 hours",
    country: "USA",
    type: "Original Music",
    payment: "$500",
    notes: "Looking for artists with an energetic stage presence.",
  };

  // Function to handle gig advertisement confirmation
  const handleConfirm = () => {
    // Logic to confirm and advertise the gig (e.g., API call)
    alert("Gig has been successfully advertised!");
  };

  // Function to handle cancellation or going back
  const handleCancel = () => {
    // Logic to go back or cancel the action (e.g., navigate to a different page)
    alert("Gig advertisement cancelled.");
  };

  return (
    <Container className="mt-5 text-light">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <h3 className="pb-3">Confirm Gig Advertisement</h3>

              <Alert variant="info">
                By advertising this gig, it will become publicly visible to
                other artists who can then apply to take over the gig. Once an
                artist is selected by the hosting venue, the gig will be
                transferred to them.
              </Alert>

              <h5 className="mt-4">Gig Details</h5>
              <ul className="list-unstyled">
                <li>
                  <strong>Date:</strong> {gigDetails.date}
                </li>
                <li>
                  <strong>Time:</strong> {gigDetails.time}
                </li>
                <li>
                  <strong>Venue:</strong> {gigDetails.venue}
                </li>
                <li>
                  <strong>Duration:</strong> {gigDetails.duration}
                </li>
                <li>
                  <strong>Country:</strong> {gigDetails.country}
                </li>
                <li>
                  <strong>Type:</strong> {gigDetails.type}
                </li>
                <li>
                  <strong>Payment:</strong> {gigDetails.payment}
                </li>
                <li>
                  <strong>Notes:</strong> {gigDetails.notes}
                </li>
              </ul>

              <div className="d-flex justify-content-end mt-4">
                <Button
                  variant="secondary"
                  className="me-3"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleConfirm}>
                  Confirm and Advertise Gig
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ConfirmGigAdvertisement;
