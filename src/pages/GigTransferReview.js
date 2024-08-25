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
import GigTransferModal from "../components/modals/GigTransferModal";

const GigTransferReview = () => {
  const { userId, setUserId, artistOrVenue, setArtistOrVenue } =
    useContext(LoginContext);
  const { gigId } = useParams();
  const navigate = useNavigate();
  const SERVER_BASE_URL = "http://localhost:8000/";

  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [gigDetails, setGigDetails] = useState(null);
  const [artistGigApplications, setArtistGigApplications] = useState([]);
  const [artistsDetails, setArtistsDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [expandedApplicationId, setExpandedApplicationId] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [fetchTrigger, setFetchTrigger] = useState(false);

  const handleShowModal = (application, action) => {
    const artist = artistsDetails[application.artist] || {
      id: application.artist,
    };
    setSelectedArtist(artist);
    setModalAction(action);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedArtist(null);
    setModalAction(null);
  };

  const showAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage(null);
    }, 5000);
  };

  const handleApproveYesClick = () => {
    if (selectedArtist && selectedArtist.id) {
      setIsLoading(true);

      // Prepare the payload object
      const payload = {
        artist: selectedArtist.id,
        description: null,
        // Include other fields as necessary
      };

      // Conditionally set type_of_artist if it's different
      if (selectedArtist.type_of_artist !== gigDetails.type_of_artist) {
        payload.type_of_artist = selectedArtist.type_of_artist;
      }

      fetch(`http://localhost:8000/artist_gigs/${gigId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (response.ok) {
            console.log("PUT request successful");
            navigate(
              `/gigtransferredtonewartistsuccessfully/${selectedArtist.id}`
            );
          } else {
            console.error("PUT request failed");
          }
        })
        .catch((error) => {
          console.error("Error occurred while processing PUT request:", error);
        })
        .finally(() => {
          setIsLoading(false);
          handleCloseModal();
        });
    }
  };

  const handleDeclineYesClick = () => {
    if (selectedArtist && selectedArtist.id) {
      setIsLoading(true);
      fetch(
        `http://localhost:8000/artistgigapplications/${selectedArtist.id}/`,
        {
          method: "DELETE",
        }
      )
        .then((response) => {
          if (response.ok) {
            console.log("DELETE request successful");
            showAlert("Application successfully deleted.");
            // Trigger re-fetch by toggling the fetchTrigger state
            setFetchTrigger((prev) => !prev);
          } else {
            console.error("DELETE request failed");
          }
        })
        .catch((error) => {
          console.error(
            "Error occurred while processing DELETE request:",
            error
          );
        })
        .finally(() => {
          setIsLoading(false);
          handleCloseModal();
        });
    }
  };

  useEffect(() => {
    const fetchArtistGigData = async () => {
      try {
        const response = await fetch(`${SERVER_BASE_URL}artist_gigs/${gigId}/`);
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
          `${SERVER_BASE_URL}artist_gigs/${gigId}/applications/`
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

    fetchArtistGigData();
  }, [gigId, fetchTrigger]);

  const handleChevronClick = (applicationId) => {
    setExpandedApplicationId((prevId) =>
      prevId === applicationId ? null : applicationId
    );
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (
    !gigDetails ||
    artistGigApplications.length === 0 ||
    Object.keys(artistsDetails).length === 0
  ) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {alertMessage && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          {alertMessage}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}

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
            <ListGroup className="list-group-flush">
              {artistGigApplications.map((application) => (
                <ListGroup.Item
                  key={application.id}
                  className="d-flex flex-column custom-list-group-item"
                >
                  <div className="d-flex justify-content-between align-items-center bg-white">
                    <span className="artist-name">
                      {artistsDetails[application.artist]?.artist_name ||
                        "Unknown"}
                    </span>
                    <div className="button-container">
                      <Button
                        variant="info"
                        className="rounded-pill text-light"
                        onClick={() =>
                          navigate(`/artistuserprofile/${application.artist}`)
                        }
                      >
                        View Profile
                      </Button>
                      <Button
                        variant="success"
                        className="ml-2 rounded-pill"
                        onClick={() => handleShowModal(application, "approve")}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="danger"
                        className="ml-2 rounded-pill"
                        onClick={() => handleShowModal(application, "decline")}
                      >
                        Decline
                      </Button>
                      <i
                        className={`bi ${
                          expandedApplicationId === application.id
                            ? "bi-chevron-up"
                            : "bi-chevron-down"
                        } chevron-icon`}
                        onClick={() => handleChevronClick(application.id)}
                      ></i>
                    </div>
                  </div>

                  {expandedApplicationId === application.id && (
                    <hr
                      style={{
                        borderTop: "2px solid black",
                        margin: 0,
                        marginTop: "10px",
                        marginBottom: "5px",
                      }}
                    />
                  )}

                  {expandedApplicationId === application.id && (
                    <div className="application-details">
                      <p className="bg-white text-dark">
                        <span
                          style={{ fontWeight: "bold", background: "white" }}
                        >
                          Message:
                        </span>{" "}
                        {application.message}
                      </p>
                      <p className="bg-white text-dark">
                        <span
                          style={{ fontWeight: "bold", background: "white" }}
                        >
                          Applied at:
                        </span>{" "}
                        {moment(application.applied_at).format(
                          "Do MMMM YYYY - HH:mm"
                        )}
                      </p>
                    </div>
                  )}
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
              artistsDetails[selectedArtist?.id]?.artist_name || "Unknown"
            }
            onApprove={handleApproveYesClick}
            onDecline={handleDeclineYesClick}
          />
        )}
      </Container>
    </>
  );
};

export default GigTransferReview;
