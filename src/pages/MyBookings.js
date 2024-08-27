import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";
import axios from "axios";
import DeleteArtistGigModal from "../components/modals/DeleteArtistGigModal";
import DeleteVenueGigModal from "../components/modals/DeleteVenueGigModal";
import moment from "moment";

const MyBookings = () => {
  const { userId, setUserId, artistOrVenue, setArtistOrVenue } =
    useContext(LoginContext);

  const navigate = useNavigate();

  const SERVER_BASE_URL = "http://localhost:8000/";

  const [artist, setArtist] = useState({});
  const [artistGigs, setArtistGigs] = useState([]);
  const [venueGigs, setVenueGigs] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedGig, setSelectedGig] = useState(null);

  useEffect(() => {
    const userIdFromLocalStorage = localStorage.getItem("userId");
    const artistOrVenueFromLocalStorage = localStorage.getItem("artistOrVenue");

    if (!userIdFromLocalStorage || !artistOrVenueFromLocalStorage) {
      navigate("/signin");
    } else {
      setUserId(userIdFromLocalStorage);
      setArtistOrVenue(artistOrVenueFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch(`${SERVER_BASE_URL}artists/${userId}/`);
        if (!response.ok) {
          throw new Error("Failed to fetch artist data");
        }
        const data = await response.json();
        console.log(data);
        setArtist(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchArtist();
  }, [userId]);

  useEffect(() => {
    const fetchGigsByUserId = async () => {
      if (userId && artistOrVenue === "A") {
        try {
          const response = await fetch(
            `${SERVER_BASE_URL}artists/${userId}/gigs/`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch gigs for this artist");
          }
          const data = await response.json();
          console.log(data);
          setArtistGigs(data);
        } catch (error) {
          console.log(error);
        }
      } else if (userId && artistOrVenue === "V") {
        try {
          const response = await fetch(
            `${SERVER_BASE_URL}venues/${userId}/gigs/`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch gigs for this venue");
          }
          const data = await response.json();
          console.log(data);
          setVenueGigs(data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchGigsByUserId(); // Call the function inside useEffect
  }, [userId, artistOrVenue]); // Add a dependency array to ensure useEffect runs when userId or artistOrVenue changes

  const showAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage(null);
    }, 5000);
  };

  const handleShowModal = (gig) => {
    setSelectedGig(gig);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedGig(null);
  };

  const handleYesClick = async () => {
    try {
      if (selectedGig) {
        let response;
        if (artistOrVenue === "A") {
          response = await axios.delete(
            `${SERVER_BASE_URL}artist_gigs/${selectedGig.id}/`
          );
        } else if (artistOrVenue === "V") {
          response = await axios.delete(
            `${SERVER_BASE_URL}venue_gigs/${selectedGig.id}/`
          );
        }

        console.log("Gig deleted successfully:", response.data);

        // Update the state based on artistOrVenue
        if (artistOrVenue === "A") {
          setArtistGigs((prevGigs) =>
            prevGigs.filter((gig) => gig.id !== selectedGig.id)
          );
        } else if (artistOrVenue === "V") {
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

  console.log(selectedGig);

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

      <div>
        <h1 className="text-light text-center">My Bookings</h1>
        <button
          className="add-button mt-3"
          onClick={() => {
            if (artistOrVenue === "A") {
              navigate("/artiststorenewgig");
            } else if (artistOrVenue === "V") {
              navigate("/");
            }
          }}
        >
          <div className="plus-icon">+</div>
          Add
        </button>
        {userId && artistOrVenue === "A" && artistGigs.length === 0 && (
          <h2 className="text-light">No gigs to show yet</h2>
        )}
        :
        {userId && artistOrVenue === "A" && artistGigs.length > 0 && (
          <table className="table table-bordered mb-5 text-light">
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
                <th></th> {/* Empty header for the action buttons */}
              </tr>
            </thead>
            <tbody>
              {userId &&
                artistOrVenue === "A" &&
                artistGigs.map((gig, index) => (
                  <tr key={index}>
                    <td>{moment(gig.date_of_gig).format("DD/MM/YYYY")}</td>
                    <td>{gig.venue_name}</td>
                    <td>{gig.time_of_gig.slice(0, 5)}</td>
                    <td>{gig.duration_of_gig} minutes</td>
                    <td>{gig.country_of_venue}</td>
                    <td>{gig.type_of_gig}</td>
                    <td>£{gig.payment}</td>
                    <td>{gig.notes_about_gig}</td>
                    <td>
                      <div className="d-flex justify-content-center pt-2">
                        <i
                          className="bi bi-trash h5 mx-1"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleShowModal(gig)}
                        ></i>

                        <i
                          className="bi bi-pencil h5 mx-1"
                          style={{ cursor: "pointer" }}
                          onClick={() => navigate(`/artisteditgig/${gig.id}`)}
                        ></i>

                        {gig.is_advertised === true ? (
                          <i
                            className="bi bi-badge-ad h5 mx-1"
                            style={{ cursor: "pointer", color: "#66ff00" }}
                            onClick={() =>
                              navigate(`/confirmgigadvertisement/${gig.id}`)
                            }
                          ></i>
                        ) : (
                          <i
                            className="bi bi-badge-ad h5 mx-1"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              navigate(`/confirmgigadvertisement/${gig.id}`)
                            }
                          ></i>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
        :{" "}
        {userId && artistOrVenue === "V" && venueGigs.length === 0 && (
          <h2 className="text-light">No gigs to show yet</h2>
        )}
        :
        {userId && artistOrVenue === "V" && venueGigs.length > 0 && (
          <table className="table table-bordered mb-5 text-light">
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
                <th></th> {/* Empty header for the action buttons */}
              </tr>
            </thead>
            <tbody>
              {userId &&
                artistOrVenue === "V" &&
                venueGigs.map((gig, index) => (
                  <tr key={index}>
                    <td>{moment(gig.date_of_gig).format("DD/MM/YYYY")}</td>
                    <td>{gig.time_of_gig.slice(0, 5)}</td>
                    <td>{gig.duration_of_gig} minutes</td>
                    <td>{gig.genre_of_gig}</td>
                    <td>{gig.type_of_gig}</td>
                    <td>{gig.artist_type}</td>
                    <td>£{gig.payment}</td>
                    <td>{gig.description}</td>
                    <td>
                      <div className="d-flex justify-content-center pt-2">
                        <i
                          className="bi bi-trash h5 mx-1"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleShowModal(gig)}
                        ></i>

                        <i
                          className="bi bi-pencil h5 mx-1"
                          style={{ cursor: "pointer" }}
                          onClick={() => navigate(`/venueeditgig/${gig.id}`)}
                        ></i>

                        {gig.is_advertised === true ? (
                          <i
                            className="bi bi-badge-ad h5 mx-1"
                            style={{ cursor: "pointer", color: "#66ff00" }}
                            onClick={() =>
                              navigate(`/confirmgigadvertisement/${gig.id}`)
                            }
                          ></i>
                        ) : (
                          <i
                            className="bi bi-badge-ad h5 mx-1"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              navigate(`/confirmgigadvertisement/${gig.id}`)
                            }
                          ></i>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
        {artistOrVenue === "A" && showModal && selectedGig && (
          <DeleteArtistGigModal
            show={showModal}
            handleClose={handleCloseModal}
            gig={selectedGig}
            onYesDelete={handleYesClick}
            onNoDoNotDelete={handleCloseModal}
          />
        )}
        :
        {artistOrVenue === "V" && showModal && selectedGig && (
          <DeleteVenueGigModal
            show={showModal}
            handleClose={handleCloseModal}
            gig={selectedGig}
            onYesDelete={handleYesClick}
            onNoDoNotDelete={handleCloseModal}
          />
        )}
        <p className="text-light text-center">
          <span style={{ fontWeight: "bold" }}>Note:</span> If the{" "}
          <span>
            <i
              className="bi bi-badge-ad h4 mx-1"
              style={{ cursor: "pointer", color: "#ffffff" }}
            ></i>
          </span>{" "}
          button is green it means that the gig has been advertised.
        </p>
      </div>
    </>
  );
};

export default MyBookings;
