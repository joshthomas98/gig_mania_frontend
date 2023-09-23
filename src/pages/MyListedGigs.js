import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import DeleteListedGig from "../components/DeleteListedGigModal";

const MyListedGigs = () => {
  const navigate = useNavigate();

  const storedUserId = localStorage.getItem("userId");
  const storedUserType = localStorage.getItem("artistOrVenue");

  const [artistGigs, setArtistGigs] = useState("");
  const [venueGigs, setVenueGigs] = useState("");

  const [selectedGigId, setSelectedGigId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  //   useEffect(() => {
  //     if user with userId(id) > 0 gigs then display gigs else display no gigs
  //   })

  useEffect(() => {
    if (storedUserType === "A") {
      fetch(`http://localhost:8000/artists/${storedUserId}/listed_gigs/`)
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
      fetch(`http://localhost:8000/artist_listed_gigs/${selectedGigId}/`, {
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

  console.log(artistGigs);

  return (
    <div className="text-light">
      <div className="row">
        <div className="col-md-6">
          {artistGigs.length + venueGigs.length === 1 ? (
            <h2 className="px-4">You currently have 1 gig listed:</h2>
          ) : (
            <h2 className="px-4">
              You currently have {artistGigs.length + venueGigs.length} gigs
              listed:
            </h2>
          )}
        </div>
        <div className="col-md-6 text-center">
          <Button variant="secondary" onClick={artistOrVenueAdvertiseGig}>
            List a new gig
          </Button>
        </div>
      </div>

      <ul className="px-5">
        {storedUserType === "A" ? (
          artistGigs.length > 0 ? (
            artistGigs.map((gig, index) => (
              <li className="py-4" key={index}>
                <strong>Venue Name:</strong> {gig.venue_name}
                <br />
                <strong>Country of Venue:</strong> {gig.country_of_venue}
                <br />
                <strong>Date of Gig:</strong> {gig.date_of_gig}
                <br />
                <strong>Genre of Gig:</strong> {gig.genre_of_gig}
                <br />
                <strong>Type of Gig:</strong> {gig.type_of_gig}
                <br />
                <strong>Payment:</strong> {gig.payment}
                <br />
                <strong>Number of applications:</strong> {gig.num_applications}
                <br />
                <Button
                  variant="secondary"
                  className="mt-4"
                  onClick={() => handleEditGig(gig.id)}
                >
                  Edit this gig
                </Button>
                <h4 className="pt-3">
                  <i
                    onClick={() => handleTrashIconClick(gig.id)}
                    className="bi bi-trash"
                    style={{ cursor: "pointer" }}
                  ></i>
                </h4>
              </li>
            ))
          ) : (
            <li>No gigs listed</li>
          )
        ) : // Venue User
        venueGigs.length > 0 ? (
          venueGigs.map((gig, index) => (
            <li className="py-4" key={index}>
              <strong>Venue Name:</strong> {gig.venue}
              <br />
              <strong>Date of Gig:</strong> {gig.date_of_gig}
              <br />
              <strong>Country of Venue:</strong> {gig.country_of_venue}
              <br />
              <strong>Genre of Gig:</strong> {gig.genre_of_gig}
              <br />
              <strong>Type of Gig:</strong> {gig.type_of_gig}
              <br />
              <strong>Artist Type:</strong> {gig.artist_type}
              <br />
              <strong>Payment:</strong> {gig.payment}
              <br />
              <Button
                variant="secondary"
                className="mt-4"
                onClick={() => handleEditGig(gig.id)}
              >
                Edit this gig
              </Button>
              <h4 className="pt-3">
                <i
                  onClick={() => handleTrashIconClick(gig.id)}
                  className="bi bi-trash"
                  style={{ cursor: "pointer" }}
                ></i>
              </h4>
            </li>
          ))
        ) : (
          <li>No gigs listed</li>
        )}
      </ul>

      {/* Conditionally render the DeleteListedGig component based on showModal state */}
      <DeleteListedGig
        show={showModal}
        handleClose={handleCloseModal}
        gigId={selectedGigId}
        handleDeleteGig={handleDeleteGig}
      />
    </div>
  );
};

export default MyListedGigs;
