import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MyListedGigs = () => {
  const navigate = useNavigate();
  const storedUserId = localStorage.getItem("userId");
  const storedUserType = localStorage.getItem("artistOrVenue");

  const [artistGigs, setArtistGigs] = useState("");
  const [venueGigs, setVenueGigs] = useState("");

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

  console.log(artistGigs);

  return (
    <div className="text-light">
      <div className="row">
        <div className="col-md-6">
          {artistGigs.length === 1 ? (
            <h2>You currently have 1 gig listed:</h2>
          ) : artistGigs.length > 1 ? (
            <h2>You currently have {artistGigs.length} gigs listed:</h2>
          ) : (
            <h2>You currently have 0 gigs listed:</h2>
          )}
        </div>
        <div className="col-md-6">
          <Button variant="secondary" onClick={artistOrVenueAdvertiseGig}>
            List a new gig
          </Button>
        </div>
      </div>

      <ul>
        {artistGigs.length > 0 ? (
          artistGigs.map((gig, index) => (
            <li className="py-4" key={index}>
              <strong>Artist Name:</strong> {gig.artist_name}
              <br />
              <strong>Artist Type:</strong> {gig.artist_type}
              <br />
              <strong>Country of Venue:</strong> {gig.country_of_venue}
              <br />
              <strong>Date of Gig:</strong> {gig.date_of_gig}
              <br />
              <strong>Genre of Gig:</strong> {gig.genre_of_gig}
              <br />
              <strong>ID:</strong> {gig.id}
              <br />
              <strong>Payment:</strong> {gig.payment}
              <br />
              <strong>Type of Gig:</strong> {gig.type_of_gig}
              <br />
              <strong>User Type:</strong> {gig.user_type}
              <br />
              <strong>Venue Name:</strong> {gig.venue_name}
              <br />
              <Button variant="secondary" className="mt-4">
                Edit this gig
              </Button>
            </li>
          ))
        ) : (
          <li>No gigs listed</li>
        )}
      </ul>
    </div>
  );
};

export default MyListedGigs;
