import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import Calendar from "react-calendar";
import { format } from "date-fns-tz";
import { LoginContext } from "../App";

const ArtistUserProfile = () => {
  const { userId, artistOrVenue } = useContext(LoginContext);
  const { profileId } = useParams();
  const navigate = useNavigate();

  const SERVER_BASE_URL = "http://localhost:8000/";

  const [artist, setArtist] = useState(null);
  const [unavailabilities, setUnavailabilities] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedUnavailability, setSelectedUnavailability] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch(`${SERVER_BASE_URL}artists/${profileId}/`);
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
          `${SERVER_BASE_URL}unavailabilities/${profileId}/`
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

    fetchArtist();
    fetchUnavailabilities();
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
      return null;
    }

    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="text-center mb-4">
                  <img
                    src={SERVER_BASE_URL + artist.image}
                    alt="Profile"
                    className="img-fluid rounded-circle mt-3"
                    style={{ width: 150, height: 150, objectFit: "cover" }}
                  />
                  <h2 className="mt-3 text-light">{artist.artist_name}</h2>
                  <p className="text-light mt-3 lead">{artist.genre}</p>
                  <p className="text-light lead">{artist.county}</p>
                </div>

                <div className="row justify-content-center mb-5 pt-3 text-light">
                  {userId === profileId && (
                    <>
                      <div className="col-auto">
                        <Button
                          variant="primary"
                          onClick={() => navigate("/artistprofilesettings")}
                        >
                          Edit Profile
                        </Button>
                      </div>
                      <div className="col-auto">
                        <Button
                          variant="primary"
                          onClick={() => navigate("/mybookings")}
                        >
                          My Bookings
                        </Button>
                      </div>
                    </>
                  )}
                </div>

                <div className="text-center mb-4">
                  <h4 className="text-light pb-3 pt-3">About</h4>
                  <p className="text-light">{artist.bio}</p>
                </div>

                <div className="text-center mb-4">
                  <h4>Availability</h4>
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
                      variant="outline-dark"
                      className="mt-3"
                      onClick={() =>
                        navigate(`/artisteditavailability/${profileId}`)
                      }
                    >
                      Edit Availability
                    </Button>
                  )}
                </div>

                <div className="text-center text-light mb-4">
                  <h4 className="pb-4">Recent Photos</h4>
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
      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Unavailable Date</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUnavailability && (
            <>
              <p>Date: {selectedUnavailability.date}</p>
              <p>Status: {selectedUnavailability.status}</p>
              <p>Reason: {selectedUnavailability.reason}</p>
            </>
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

  return (
    <>
      <h1 className="text-center text-light mt-5 mb-4">My Profile</h1>
      {renderProfileDetails()}
      {renderUnavailabilityModal()}
    </>
  );
};

export default ArtistUserProfile;
