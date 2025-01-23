import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal, Button, Container } from "react-bootstrap";
import Calendar from "react-calendar";
import { format } from "date-fns-tz";
import { LoginContext } from "../App";
import LoadingSpinner from "../components/LoadingSpinner";

const ArtistUserProfile = () => {
  const { userId, setUserId, artistOrVenue, setArtistOrVenue } =
    useContext(LoginContext);

  const { profileId } = useParams();
  const navigate = useNavigate();

  const SERVER_BASE_URL = "http://localhost:8000/";
  const SERVER_BASE_URL_WITHOUT_TRAILING_SLASH = "http://localhost:8000";
  const PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH =
    "https://gigsweep-express.vercel.app/";

  const [artist, setArtist] = useState(null);
  const [unavailabilities, setUnavailabilities] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedUnavailability, setSelectedUnavailability] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch(
          `${PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH}/artists/${profileId}/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch artist data");
        }
        const data = await response.json();
        setArtist(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUnavailabilities = async () => {
      try {
        const response = await fetch(
          `${PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH}/unavailabilities/${profileId}/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch unavailabilities data");
        }
        const data = await response.json();
        setUnavailabilities(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchArtist(), fetchUnavailabilities()]);
      setLoading(false);
    };

    fetchData();
  }, [profileId]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleDateSelect = (date) => {
    const dateString = formatWithTimezone(date);
    const isDateUnavailable = unavailabilities.some(
      (u) => u.date === dateString
    );

    if (isDateUnavailable) {
      const unavailability = unavailabilities.find(
        (u) => u.date === dateString
      );
      setSelectedUnavailability(unavailability);
      setShowModal(true);
    } else {
      setSelectedUnavailability(null);
    }

    setSelectedDate(date);
  };

  const formatWithTimezone = (date) => {
    const tz = "Europe/London";
    return format(date, "yyyy-MM-dd", { timeZone: tz });
  };

  const renderProfileDetails = () => {
    if (!artist) {
      return <LoadingSpinner />;
    }

    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card bg-dark text-light shadow-lg">
              <div className="card-body">
                <div className="text-center">
                  <img
                    src={SERVER_BASE_URL_WITHOUT_TRAILING_SLASH + artist.image}
                    alt="Profile"
                    className="img-fluid rounded-circle border border-light"
                    style={{ width: 150, height: 150, objectFit: "cover" }}
                  />

                  <h2 className="mt-4">{artist.artist_name}</h2>
                  <p className="mt-4 lead">
                    <span style={{ fontWeight: "bold" }}>Genre: </span>
                    {artist.genre}
                  </p>
                  <p className="lead">
                    <span style={{ fontWeight: "bold" }}>Location: </span>{" "}
                    {artist.county}
                  </p>
                </div>

                {userId && artistOrVenue === "A" && (
                  <div className="text-center mt-5">
                    <Button
                      variant="outline-light"
                      onClick={() => navigate("/artistprofilesettings")}
                      className="mx-2"
                    >
                      Edit Profile
                    </Button>
                    <Button
                      variant="outline-light"
                      onClick={() => navigate("/mybookings")}
                      className="mx-2"
                    >
                      My Bookings
                    </Button>
                    <div className="text-center mt-4">
                      <Button
                        variant="outline-light"
                        onClick={() => navigate("/artistadvertisegig")}
                      >
                        Advertise Gig
                      </Button>
                    </div>
                  </div>
                )}

                {userId && artistOrVenue === "V" && (
                  <div className="text-center pt-4 mb-4">
                    <Button
                      variant="outline-light"
                      onClick={() =>
                        navigate(`/venuewritereview?artistId=${artist.id}`)
                      }
                    >
                      Leave Feedback
                    </Button>
                  </div>
                )}

                <div className="text-center mt-5">
                  <h4>About</h4>
                  <Container>
                    <p className="mt-4">{artist.bio}</p>
                  </Container>
                </div>

                <div className="text-center mt-5">
                  <h4 className="mb-4">Availability</h4>
                  <Calendar
                    className="mt-3"
                    value={selectedDate}
                    onChange={handleDateSelect}
                    tileClassName={({ date }) => {
                      const dateString = formatWithTimezone(date);
                      return unavailabilities.find((u) => u.date === dateString)
                        ? "unavailable-date"
                        : "available-date";
                    }}
                  />
                  {artistOrVenue === "A" && userId === profileId && (
                    <Button
                      variant="outline-light"
                      className="mt-4"
                      onClick={() =>
                        navigate(`/artisteditavailability/${profileId}`)
                      }
                    >
                      Edit Availability
                    </Button>
                  )}
                </div>

                <div className="text-center text-light mb-4">
                  <h4 className="pb-4 pt-5">Recent Photos</h4>
                  <div className="row">
                    <div className="col-lg-6 mb-3">
                      <img
                        src="https://images.unsplash.com/photo-1469594292607-7bd90f8d3ba4?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                        alt="Photo 1"
                        className="img-fluid rounded shadow-sm"
                      />
                    </div>
                    <div className="col-lg-6 mb-3">
                      <img
                        src="https://images.unsplash.com/photo-1493571716545-b559a19edd14?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                        alt="Photo 2"
                        className="img-fluid rounded shadow-sm"
                      />
                    </div>
                    <div className="col-lg-6 mb-3">
                      <img
                        src="https://images.unsplash.com/photo-1453791052107-5c843da62d97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                        alt="Photo 3"
                        className="img-fluid rounded shadow-sm"
                      />
                    </div>
                    <div className="col-lg-6 mb-3">
                      <img
                        src="https://images.unsplash.com/photo-1475724017904-b712052c192a?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                        alt="Photo 4"
                        className="img-fluid rounded shadow-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderUnavailabilityModal = () => {
    return (
      <Modal
        show={showModal}
        onHide={toggleModal}
        className="text-light bg-dark"
      >
        <Modal.Header closeButton>
          <Modal.Title>Unavailable Date</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUnavailability ? (
            <>
              <p>
                <strong>Date:</strong> {selectedUnavailability.date}
              </p>
              <p>
                <strong>Status:</strong> {selectedUnavailability.status}
              </p>
              <p>
                <strong>Reason:</strong> {selectedUnavailability.reason}
              </p>
            </>
          ) : (
            <p>No details available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <h1 className="text-center text-light mt-5 mb-4">My Profile</h1>
      {renderProfileDetails()}
      {renderUnavailabilityModal()}
    </>
  );
};

export default ArtistUserProfile;
