import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Button,
  Modal,
} from "react-bootstrap";
import { LoginContext } from "../App";
import { useParams } from "react-router-dom";
import moment from "moment";

const GigTransferReview = () => {
  const { userId, setUserId, artistOrVenue, setArtistOrVenue } =
    useContext(LoginContext);

  const { gigId } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState(null);

  const [gigDetails, setGigDetails] = useState(null);
  const [artistGigApplications, setArtistGigApplications] = useState(null);

  useEffect(() => {
    const fetchArtistListedGigData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/artist_listed_gigs/${gigId}/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch gig data");
        }
        const data = await response.json();
        setGigDetails(data);

        // Fetch applications after fetching gig details
        fetchApplications(gigId);
      } catch (error) {
        console.error("Error fetching gig data:", error);
      }
    };

    const fetchApplications = async (gigId) => {
      try {
        const response = await fetch(
          `http://localhost:8000/artist_listed_gigs/${gigId}/applications/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch applications");
        }
        const data = await response.json();
        setArtistGigApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchArtistListedGigData();
  }, [gigId]);

  if (!gigDetails || artistGigApplications === null) {
    return <div>Loading...</div>; // Add loading indicator or handle while fetching data
  }

  const handleShowModal = (artist) => {
    setSelectedArtist(artist);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedArtist(null);
  };

  const application =
    artistGigApplications.length > 0 ? artistGigApplications[0] : null;

  return (
    <Container className="text-light">
      <Row className="mb-4">
        <Col>
          <h2>Review Artist Transfer for {application.artist_gig}</h2>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Gig Details</Card.Title>
          <Card.Text>
            <strong>Date:</strong>{" "}
            {moment(gigDetails.date_of_gig).format("DD/MM/YYYY")}
            <br />
            <strong>Original Artist:</strong>{" "}
            {application.original_artist.artist_name}
            <br />
            <strong>Reason for Advertising:</strong> {gigDetails.description}
          </Card.Text>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Title>Applicants</Card.Title>
          <ListGroup>
            {artistGigApplications.map((artist) => (
              <ListGroup.Item
                key={artist.id}
                className="d-flex justify-content-between align-items-center"
              >
                {artist.artist.artist_name}
                <div>
                  <Button
                    variant="info"
                    onClick={() => handleShowModal(artist)}
                  >
                    View Profile
                  </Button>
                  <Button variant="success" className="ml-2">
                    Approve
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedArtist ? selectedArtist.artist.artist_name : ""} Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Here you would display the selected artist's details */}
          <p>
            Profile details for{" "}
            {selectedArtist ? selectedArtist.artist.artist_name : ""}...
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default GigTransferReview;
