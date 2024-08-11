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
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import LoadingSpinner from "../components/LoadingSpinner";
import GigTransferModal from "../components/GigTransferModal";

const GigTransferReview = () => {
  const { userId, setUserId, artistOrVenue, setArtistOrVenue } =
    useContext(LoginContext);
  const { gigId } = useParams();
  const navigate = useNavigate();
  const SERVER_BASE_URL = "http://localhost:8000/";

  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState(null); // State to store the action type (approve/decline)
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [gigDetails, setGigDetails] = useState(null);
  const [artistGigApplications, setArtistGigApplications] = useState([]);
  const [artistsDetails, setArtistsDetails] = useState({});

  const handleShowModal = (artist, action) => {
    setSelectedArtist(artist);
    setModalAction(action);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedArtist(null);
    setModalAction(null);
  };

  useEffect(() => {
    const fetchArtistListedGigData = async () => {
      try {
        const response = await fetch(
          `${SERVER_BASE_URL}artist_listed_gigs/${gigId}/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch gig data");
        }
        const data = await response.json();
        setGigDetails(data);
        fetchApplications(gigId);
      } catch (error) {
        console.error("Error fetching gig data:", error);
      }
    };

    const fetchApplications = async (gigId) => {
      try {
        const response = await fetch(
          `${SERVER_BASE_URL}artist_listed_gigs/${gigId}/applications/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch applications");
        }
        const data = await response.json();
        setArtistGigApplications(data);
        fetchArtistNames(data.map((app) => app.artist));
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    const fetchArtistNames = async (artistIds) => {
      try {
        const artistDetails = {};
        for (const artistId of artistIds) {
          const response = await fetch(
            `${SERVER_BASE_URL}artists/${artistId}/`
          );
          if (!response.ok) {
            throw new Error(`Failed to fetch artist with id ${artistId}`);
          }
          const data = await response.json();
          artistDetails[artistId] = data;
        }
        setArtistsDetails(artistDetails);
      } catch (error) {
        console.error("Error fetching artist names:", error);
      }
    };

    fetchArtistListedGigData();
  }, [gigId]);

  console.log("AGA", artistGigApplications);
  console.log("Artist Details", artistsDetails);

  if (
    !gigDetails ||
    artistGigApplications.length === 0 ||
    Object.keys(artistsDetails).length === 0
  ) {
    return <LoadingSpinner />;
  }

  return (
    <Container className="text-light">
      <Row className="mb-4">
        <Col>
          <h2>Review Artist Transfer for {gigDetails.artist_name}'s Gig</h2>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Gig Details</Card.Title>
          <Card.Text>
            <strong>Date:</strong>{" "}
            {moment(gigDetails.date_of_gig).format("DD/MM/YYYY")}
            <br />
            <strong>Original Artist:</strong> {gigDetails.artist_name}
            <br />
            <strong>Reason for Advertising:</strong> {gigDetails.description}
          </Card.Text>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Title className="pb-2">Applicants</Card.Title>
          <ListGroup>
            {artistGigApplications.map((application) => (
              <ListGroup.Item
                key={application.id}
                className="d-flex justify-content-between align-items-center"
              >
                {artistsDetails[application.artist]?.artist_name ||
                  application.artist}
                <div>
                  <Button
                    variant="info"
                    onClick={() =>
                      navigate(`/artistuserprofile/${application.artist}`)
                    }
                  >
                    View Profile
                  </Button>
                  <Button
                    variant="success"
                    className="ml-2"
                    onClick={() => handleShowModal(application, "approve")}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="danger"
                    className="ml-2"
                    onClick={() => handleShowModal(application, "decline")}
                  >
                    Decline
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>

      {showModal && (
        <GigTransferModal
          show={showModal}
          handleClose={handleCloseModal}
          action={modalAction}
          artist={selectedArtist}
          artistName={
            artistsDetails[selectedArtist.artist]?.artist_name || "Unknown"
          }
        />
      )}
    </Container>
  );
};

export default GigTransferReview;
