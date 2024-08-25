import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import DeleteListedGig from "../components/modals/DeleteArtistGigModal";

const MyListedGigs = () => {
  const navigate = useNavigate();

  const storedUserId = localStorage.getItem("userId");
  const storedUserType = localStorage.getItem("artistOrVenue");

  const [artistGigs, setArtistGigs] = useState("");
  const [venueGigs, setVenueGigs] = useState("");

  const [selectedGigId, setSelectedGigId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (storedUserType === "A") {
      fetch(`http://localhost:8000/artists/${storedUserId}/gigs/`)
        .then((response) => response.json())
        .then((data) => {
          setArtistGigs(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (storedUserType === "V") {
      fetch(`http://localhost:8000/venues/${storedUserId}/listed_gigs/`)
        .then((response) => response.json())
        .then((data) => {
          setVenueGigs(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (storedUserType !== "A" && storedUserType !== "V") {
      navigate("/signin");
    }
  }, [storedUserType, storedUserId]);

  const artistOrVenueAdvertiseGig = () => {
    if (storedUserId && storedUserType === "A") {
      navigate("/artistadvertisegig");
    } else if (storedUserId && storedUserType === "V") {
      navigate("/venueadvertisegig");
    } else {
      navigate("/signin");
    }
  };

  const handleEditGig = (gigId) => {
    if (storedUserType === "A") {
      navigate(`/artisteditgig/${gigId}`); // Navigates to the ArtistEditGig component with the gigId in the URL
    } else if (storedUserType === "V") {
      navigate(`/venueeditgig/${gigId}`); // Navigates to the VenueEditGig component with the gigId in the URL
    } else {
      navigate("/signin");
    }
  };

  const handleTrashIconClick = (gigId) => {
    setSelectedGigId(gigId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDeleteGig = () => {
    if (storedUserType === "A") {
      fetch(`http://localhost:8000/artist_gigs/${selectedGigId}/`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            console.log("DELETE request successful");
            // Page reloads after the DELETE request is successful
            window.location.reload();
          } else {
            console.error("DELETE request failed");
          }
        })
        .catch((error) => {
          console.error(
            "Error occurred while processing DELETE request:",
            error
          );
        });
    } else if (storedUserType === "V") {
      fetch(`http://localhost:8000/venue_listed_gigs/${selectedGigId}/`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            console.log("DELETE request successful");
            // Page reloads after the DELETE request is successful
            window.location.reload();
          } else {
            console.error("DELETE request failed");
          }
        })
        .catch((error) => {
          console.error(
            "Error occurred while processing DELETE request:",
            error
          );
        });
    }
    setShowModal(false); // Close the modal after handling the DELETE request
  };

  useEffect(() => {
    console.log(showModal);
  }, [showModal]);

  return (
    <div className="text-light">
      <div className="d-flex row pb-4 text-left">
        <div className="col-md-6">
          {artistGigs.length + venueGigs.length === 1 ? (
            <h2 className="px-4">You currently have 1 gig advertised:</h2>
          ) : (
            <h2 className="px-4">
              You currently have {artistGigs.length + venueGigs.length} gigs
              advertised:
            </h2>
          )}
        </div>
        <div className="col-md-6 d-flex justify-content-end">
          {" "}
          {/* Apply justify-content-end here */}
          <button className="add-button" onClick={artistOrVenueAdvertiseGig}>
            <div className="plus-icon">+</div>
            Add
          </button>
        </div>
      </div>

      <table className="table table-bordered text-light">
        <thead>
          <tr>
            <th>Venue Name</th>
            <th>Country of Venue</th>
            <th>Date of Gig</th>
            <th>Genre of Gig</th>
            <th>Type of Gig</th>
            <th>Payment</th>
            <th>Applications</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {storedUserType === "A" ? (
            artistGigs.length > 0 ? (
              artistGigs.map((gig, index) => (
                <tr key={index}>
                  <td>{gig.venue_name}</td>
                  <td>{gig.country_of_venue}</td>
                  <td>{gig.date_of_gig}</td>
                  <td>{gig.genre_of_gig}</td>
                  <td>{gig.type_of_gig}</td>
                  <td>{gig.payment}</td>
                  <td>{gig.num_applications}</td>
                  <td>
                    <button
                      className="text-light"
                      onClick={() => handleEditGig(gig.id)}
                    >
                      Edit
                    </button>
                    <i
                      onClick={() => handleTrashIconClick(gig.id)}
                      className="bi bi-trash h5"
                      style={{ cursor: "pointer" }}
                    ></i>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No gigs listed</td>
              </tr>
            )
          ) : venueGigs.length > 0 ? (
            venueGigs.map((gig, index) => (
              <tr key={index}>
                <td>{gig.venue}</td>
                <td>{gig.country_of_venue}</td>
                <td>{gig.date_of_gig}</td>
                <td>{gig.genre_of_gig}</td>
                <td>{gig.type_of_gig}</td>
                <td>{gig.payment}</td>
                <td>{gig.artist_type}</td>
                <td>
                  <Button
                    variant="secondary"
                    onClick={() => handleEditGig(gig.id)}
                  >
                    Edit
                  </Button>
                  <i
                    onClick={() => handleTrashIconClick(gig.id)}
                    className="bi bi-trash"
                    style={{ cursor: "pointer" }}
                  ></i>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No gigs listed</td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && (
        <DeleteListedGig
          show={showModal}
          handleClose={handleCloseModal}
          gigId={selectedGigId}
          handleDeleteGig={handleDeleteGig}
        />
      )}
    </div>
  );
};

export default MyListedGigs;
