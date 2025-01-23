import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Alert,
  Form,
  FormControl,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

const ConfirmGigAdvertisement = () => {
  const { gigId } = useParams();
  const navigate = useNavigate();

  const PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH =
    "https://gigsweep-express.vercel.app/";

  const [gigDetails, setGigDetails] = useState("");

  const [reasonForAdvertising, setReasonForAdvertising] = useState("");

  const fetchGigDetailsByParam = () => {
    fetch(`${PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH}/artist_gigs/${gigId}/`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setGigDetails(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchGigDetailsByParam();
  }, []);

  // Function to handle gig advertisement confirmation
  const handleConfirm = () => {
    const data = {
      is_advertised: true,
      reason_for_advertising: reasonForAdvertising,
    };

    fetch(
      `${PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH}/artist_gigs/${gigId}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        if (response.ok) {
          navigate("/gigadvertised");
        } else {
          console.error("Error editing gig:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error editing gig:", error);
      });
  };

  // Function to handle cancellation or going back
  const handleCancel = () => {
    navigate("/mybookings");
  };

  console.log(gigDetails);

  console.log(reasonForAdvertising);

  return (
    <Container className="mt-2 text-light">
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
                  <strong>Date:</strong> {gigDetails.date_of_gig}
                </li>
                <li>
                  <strong>Time:</strong>{" "}
                  {gigDetails.time_of_gig
                    ? moment(gigDetails.time_of_gig, "HH:mm:ss").format("HH:mm")
                    : ""}
                </li>
                <li>
                  <strong>Venue:</strong> {gigDetails.venue_name}
                </li>
                <li>
                  <strong>Duration:</strong> {gigDetails.duration_of_gig}
                </li>
                <li>
                  <strong>Country:</strong> {gigDetails.country_of_venue}
                </li>
                <li>
                  <strong>Type:</strong> {gigDetails.type_of_gig}
                </li>
                <li>
                  <strong>Payment:</strong> {gigDetails.payment}
                </li>
                <li>
                  <strong>Notes:</strong> {gigDetails.notes_about_gig}
                </li>
              </ul>

              <Row className="justify-content-center">
                <Col md={8}>
                  <Form.Group className="p-3 text-center position-relative">
                    <Form.Label className="text-white">
                      Reason For Advertising:
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5} // Adjust the number of rows to control the height
                      placeholder="Enter the reason you can no longer perform"
                      value={reasonForAdvertising}
                      onChange={(e) => setReasonForAdvertising(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

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
