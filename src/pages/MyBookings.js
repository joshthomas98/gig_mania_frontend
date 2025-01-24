import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";
import axios from "axios";
import { Tab, Tabs, Table, Alert, Button } from "react-bootstrap";
import moment from "moment";
import DeleteArtistGigModal from "../components/modals/DeleteArtistGigModal";
import DeleteVenueGigModal from "../components/modals/DeleteVenueGigModal";
import UnadvertiseGigModal from "../components/modals/UnadvertiseGigModal";

const MyBookings = () => {
  const { userId, setUserId, artistOrVenue, setArtistOrVenue } =
    useContext(LoginContext);
  const navigate = useNavigate();
  const SERVER_BASE_URL = "http://localhost:8000/";
  const PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH =
    "https://gigsweep-express.vercel.app";

  const [artist, setArtist] = useState({});
  const [artistGigs, setArtistGigs] = useState([]);
  const [venueGigs, setVenueGigs] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedGig, setSelectedGig] = useState(null);
  const [activeTab, setActiveTab] = useState("confirmed");
  const [showUnadvertiseModal, setShowUnadvertiseModal] = useState(false);

  useEffect(() => {
    const userIdFromLocalStorage = localStorage.getItem("userId");
    const artistOrVenueFromLocalStorage = localStorage.getItem("artistOrVenue");

    if (!userIdFromLocalStorage || !artistOrVenueFromLocalStorage) {
      navigate("/signin");
    } else {
      setUserId(userIdFromLocalStorage);
      setArtistOrVenue(artistOrVenueFromLocalStorage);
    }
  }, [navigate, setUserId, setArtistOrVenue]);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch(
          `${PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH}/artists/${userId}/`
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

    fetchArtist();
  }, [userId]);

  useEffect(() => {
    const fetchGigsByUserId = async () => {
      if (userId) {
        try {
          const url =
            artistOrVenue === "A"
              ? `${PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH}/artists/${userId}/gigs/`
              : `${PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH}/venues/${userId}/gigs/`;

          const response = await fetch(url);
          if (!response.ok) {
            throw new Error("Failed to fetch gigs");
          }
          const data = await response.json();

          if (artistOrVenue === "A") {
            setArtistGigs(data);
          } else if (artistOrVenue === "V") {
            setVenueGigs(data);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchGigsByUserId();
  }, [userId, artistOrVenue]);

  const handleShowModal = (gig) => {
    setSelectedGig(gig);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedGig(null);
  };

  const handleShowUnadvertiseModal = (gig) => {
    setSelectedGig(gig);
    setShowUnadvertiseModal(true);
  };

  const handleCloseUnadvertiseModal = () => {
    setShowUnadvertiseModal(false);
    setSelectedGig(null);
  };

  const handleYesDeleteClick = async () => {
    try {
      if (selectedGig) {
        let response;
        if (artistOrVenue === "A") {
          response = await axios.delete(
            `${PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH}/artist_gigs/${selectedGig.id}/`
          );
          setArtistGigs((prevGigs) =>
            prevGigs.filter((gig) => gig.id !== selectedGig.id)
          );
        } else if (artistOrVenue === "V") {
          response = await axios.delete(
            `${PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH}/venue_gigs/${selectedGig.id}/`
          );
          setVenueGigs((prevGigs) =>
            prevGigs.filter((gig) => gig.id !== selectedGig.id)
          );
        }

        showAlert("Gig successfully deleted.");
        handleCloseModal();
      }
    } catch (error) {
      console.error("Error deleting gig", error);
      showAlert("Failed to delete gig.");
    }
  };

  // Function to unadvertise gig
  const handleConfirmUnadvertise = async () => {
    const data = {
      is_advertised: false,
      reason_for_advertising: null,
    };

    try {
      const response = await fetch(
        `${PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH}/artist_gigs/${selectedGig.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        // Update the gig in the state locally
        if (artistOrVenue === "A") {
          setArtistGigs((prevGigs) =>
            prevGigs.map((gig) =>
              gig.id === selectedGig.id ? { ...gig, is_advertised: false } : gig
            )
          );
        } else if (artistOrVenue === "V") {
          setVenueGigs((prevGigs) =>
            prevGigs.map((gig) =>
              gig.id === selectedGig.id ? { ...gig, is_advertised: false } : gig
            )
          );
        }

        // Close the modal
        handleCloseUnadvertiseModal();

        // Show alert for success
        showAlert(
          `Your gig has been successfully unadvertised and moved back to the "confirmed" gigs section.`
        );
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error("Error editing gig:", error);
    }
  };

  const showAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage(null);
    }, 5000);
  };

  const getFilteredGigs = (gigs) => {
    return {
      confirmed: gigs.filter((gig) => !gig.is_advertised),
      advertised: gigs.filter((gig) => gig.is_advertised),
    };
  };

  const filteredArtistGigs =
    artistOrVenue === "A"
      ? getFilteredGigs(artistGigs)
      : { confirmed: [], advertised: [] };
  const filteredVenueGigs =
    artistOrVenue === "V"
      ? getFilteredGigs(venueGigs)
      : { confirmed: [], advertised: [] };

  return (
    <>
      {alertMessage && (
        <Alert
          variant="success"
          onClose={() => setAlertMessage(null)}
          dismissible
        >
          {alertMessage}
        </Alert>
      )}

      <div>
        <h1 className="text-light text-center mb-4">My Bookings</h1>

        <div>
          <div className="d-flex flex-column mb-3">
            <div className="underline">
              <Tabs
                activeKey={activeTab}
                onSelect={(tab) => setActiveTab(tab)}
                id="tab-nav"
              >
                <Tab eventKey="confirmed" title="Confirmed Gigs">
                  {/* Content for Confirmed Gigs tab */}
                </Tab>
                <Tab eventKey="advertised" title="Advertised Gigs">
                  {/* Content for Advertised Gigs tab */}
                </Tab>
              </Tabs>
            </div>

            <div className="d-flex justify-content-end align-items-center mt-4 mb-2">
              <div className="mx-1">
                <Button
                  onClick={() => {
                    if (artistOrVenue === "A") {
                      navigate("/artiststorenewgig");
                    } else if (artistOrVenue === "V") {
                      navigate("/venuecreategig");
                    }
                  }}
                  className="d-flex align-items-center"
                  style={{ padding: "0.5rem 1rem", fontSize: "1rem" }}
                >
                  <div
                    className="plus-icon"
                    style={{
                      fontSize: "1.5rem",
                      marginRight: "0.5rem",
                    }}
                  >
                    +
                  </div>
                  Add Confirmed Gig
                </Button>
              </div>

              <div className="mx-1">
                <Button
                  onClick={() => {
                    if (artistOrVenue === "A") {
                      navigate("/artistadvertisegig");
                    } else if (artistOrVenue === "V") {
                      navigate("/venuecreategig");
                    }
                  }}
                  className="d-flex align-items-center"
                  style={{ padding: "0.5rem 1rem", fontSize: "1rem" }}
                >
                  <div
                    className="plus-icon"
                    style={{
                      fontSize: "1rem",
                      marginRight: "0.5rem",
                    }}
                  >
                    <i
                      className="bi bi-megaphone"
                      style={{ background: "transparent", color: "black" }}
                    ></i>
                  </div>
                  Advertise Your Gig
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Tab.Content>
          {activeTab === "confirmed" && (
            <>
              {artistOrVenue === "A" &&
                filteredArtistGigs.confirmed.length === 0 && (
                  <h2 className="text-light text-center pt-3">
                    No confirmed gigs to show yet
                  </h2>
                )}
              {artistOrVenue === "A" &&
                filteredArtistGigs.confirmed.length > 0 && (
                  <Table
                    striped
                    bordered
                    hover
                    variant="dark"
                    className="text-light"
                  >
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Venue</th>
                        <th>Time</th>
                        <th>Duration</th>
                        <th>Country</th>
                        <th>Type</th>
                        <th>Payment</th>
                        <th>Notes</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredArtistGigs.confirmed.map((gig, index) => (
                        <tr key={index}>
                          <td>
                            {moment(gig.date_of_gig).format("DD/MM/YYYY")}
                          </td>
                          <td>{gig.venue_name}</td>
                          <td>{gig.time_of_gig.slice(0, 5)}</td>
                          <td>{gig.duration_of_gig} minutes</td>
                          <td>{gig.country_of_venue}</td>
                          <td>{gig.type_of_gig}</td>
                          <td>£{gig.payment}</td>
                          <td>{gig.notes_about_gig}</td>
                          <td>
                            <div className="d-flex justify-content-center pt-2 bg-transparent">
                              <i
                                className="bi bi-trash h5 mx-1 bg-transparent"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleShowModal(gig)}
                              ></i>
                              <i
                                className="bi bi-pencil h5 mx-1 bg-transparent"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  navigate(`/artisteditgig/${gig.id}`)
                                }
                              ></i>
                              <i
                                className="bi bi-badge-ad h5 mx-1 bg-transparent"
                                style={{
                                  cursor: "pointer",
                                  color: gig.is_advertised
                                    ? "#66ff00"
                                    : "currentColor",
                                }}
                                onClick={() => {
                                  if (gig.is_advertised) {
                                    handleShowUnadvertiseModal(gig);
                                  } else {
                                    navigate(
                                      `/confirmgigadvertisement/${gig.id}`
                                    );
                                  }
                                }}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              {artistOrVenue === "V" &&
                filteredVenueGigs.confirmed.length === 0 && (
                  <h2 className="text-light text-center pt-3">
                    No confirmed gigs to show yet
                  </h2>
                )}
              {artistOrVenue === "V" &&
                filteredVenueGigs.confirmed.length > 0 && (
                  <Table
                    striped
                    bordered
                    hover
                    variant="dark"
                    className="text-light"
                  >
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Duration</th>
                        <th>Genre</th>
                        <th>Type</th>
                        <th>Artist Type</th>
                        <th>Payment</th>
                        <th>Description</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredVenueGigs.confirmed.map((gig, index) => (
                        <tr key={index}>
                          <td>
                            {moment(gig.date_of_gig).format("DD/MM/YYYY")}
                          </td>
                          <td>{gig.time_of_gig.slice(0, 5)}</td>
                          <td>{gig.duration_of_gig} minutes</td>
                          <td>{gig.genre}</td>
                          <td>{gig.type}</td>
                          <td>{gig.artist_type}</td>
                          <td>£{gig.payment}</td>
                          <td>{gig.description}</td>
                          <td>
                            <div className="d-flex justify-content-center pt-2 bg-transparent">
                              <i
                                className="bi bi-trash h5 mx-1 bg-transparent"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleShowModal(gig)}
                              ></i>
                              <i
                                className="bi bi-pencil h5 mx-1 bg-transparent"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  navigate(`/venueeditgig/${gig.id}`)
                                }
                              ></i>
                              <i
                                className="bi bi-badge-ad h5 mx-1 bg-transparent"
                                style={{
                                  cursor: "pointer",
                                  color: gig.is_advertised
                                    ? "#66ff00"
                                    : "currentColor",
                                }}
                                onClick={() =>
                                  navigate(`/confirmgigadvertisement/${gig.id}`)
                                }
                              ></i>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
            </>
          )}

          {activeTab === "advertised" && (
            <>
              {artistOrVenue === "A" &&
                filteredArtistGigs.advertised.length === 0 && (
                  <h2 className="text-light text-center pt-3">
                    No advertised gigs to show yet
                  </h2>
                )}
              {artistOrVenue === "A" &&
                filteredArtistGigs.advertised.length > 0 && (
                  <Table
                    striped
                    bordered
                    hover
                    variant="dark"
                    className="text-light"
                  >
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Venue</th>
                        <th>Time</th>
                        <th>Duration</th>
                        <th>Country</th>
                        <th>Type</th>
                        <th>Payment</th>
                        <th>Reason For Advertising</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredArtistGigs.advertised.map((gig, index) => (
                        <tr key={index}>
                          <td>
                            {moment(gig.date_of_gig).format("DD/MM/YYYY")}
                          </td>
                          <td>{gig.venue_name}</td>
                          <td>{gig.time_of_gig.slice(0, 5)}</td>
                          <td>{gig.duration_of_gig} minutes</td>
                          <td>{gig.country_of_venue}</td>
                          <td>{gig.type_of_gig}</td>
                          <td>£{gig.payment}</td>
                          <td>{gig.reason_for_advertising}</td>
                          <td>
                            <div className="d-flex justify-content-center pt-2 bg-transparent">
                              <i
                                className="bi bi-trash h5 mx-1 bg-transparent"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleShowModal(gig)}
                              ></i>
                              <i
                                className="bi bi-pencil h5 mx-1 bg-transparent"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  navigate(`/artisteditgig/${gig.id}`)
                                }
                              ></i>
                              <i
                                className="bi bi-badge-ad h5 mx-1 bg-transparent"
                                style={{
                                  cursor: "pointer",
                                  color: gig.is_advertised
                                    ? "#66ff00"
                                    : "currentColor",
                                }}
                                onClick={() => handleShowUnadvertiseModal(gig)}
                              ></i>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              {artistOrVenue === "V" &&
                filteredVenueGigs.advertised.length === 0 && (
                  <h2 className="text-light text-center pt-3">
                    No advertised gigs to show yet
                  </h2>
                )}
              {artistOrVenue === "V" &&
                filteredVenueGigs.advertised.length > 0 && (
                  <Table
                    striped
                    bordered
                    hover
                    variant="dark"
                    className="text-light"
                  >
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Duration</th>
                        <th>Genre</th>
                        <th>Type</th>
                        <th>Artist Type</th>
                        <th>Payment</th>
                        <th>Description</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredVenueGigs.advertised.map((gig, index) => (
                        <tr key={index}>
                          <td>
                            {moment(gig.date_of_gig).format("DD/MM/YYYY")}
                          </td>
                          <td>{gig.time_of_gig.slice(0, 5)}</td>
                          <td>{gig.duration_of_gig} minutes</td>
                          <td>{gig.genre}</td>
                          <td>{gig.type}</td>
                          <td>{gig.artist_type}</td>
                          <td>£{gig.payment}</td>
                          <td>{gig.description}</td>
                          <td>
                            <div className="d-flex justify-content-center pt-2 bg-transparent">
                              <i
                                className="bi bi-trash h5 mx-1 bg-transparent"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleShowModal(gig)}
                              ></i>
                              <i
                                className="bi bi-pencil h5 mx-1 bg-transparent"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  navigate(`/venueeditgig/${gig.id}`)
                                }
                              ></i>
                              <i
                                className="bi bi-badge-ad h5 mx-1 bg-transparent"
                                style={{
                                  cursor: "pointer",
                                  color: gig.is_advertised
                                    ? "#66ff00"
                                    : "currentColor",
                                }}
                                onClick={() =>
                                  navigate(`/confirmgigadvertisement/${gig.id}`)
                                }
                              ></i>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
            </>
          )}
        </Tab.Content>
      </div>

      <DeleteArtistGigModal
        show={showModal}
        onClose={handleCloseModal}
        onYesDelete={handleYesDeleteClick}
        gig={selectedGig}
      />

      <DeleteVenueGigModal
        show={showModal}
        onClose={handleCloseModal}
        onYesDelete={handleYesDeleteClick}
        gig={selectedGig}
      />

      <UnadvertiseGigModal
        show={showUnadvertiseModal}
        onClose={handleCloseUnadvertiseModal}
        onConfirm={handleConfirmUnadvertise}
        gig={selectedGig}
      />
    </>
  );
};

export default MyBookings;
