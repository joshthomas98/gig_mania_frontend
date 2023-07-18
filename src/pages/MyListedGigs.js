import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MyListedGigs = () => {
  const navigate = useNavigate();
  const storedUserId = localStorage.getItem("userId");
  const storedUserType = localStorage.getItem("artistOrVenue");

  //   useEffect(() => {
  //     if user with userId(id) > 0 gigs then display gigs else display no gigs
  //   })

  const artistOrVenueAdvertiseGig = () => {
    if (storedUserId && storedUserType === "A") {
      navigate("/artistadvertisegig");
    } else if (storedUserId && storedUserType === "V") {
      navigate("/venueadvertisegig");
    } else {
      navigate("/signin");
    }
  };

  return (
    <div className="text-light text-center">
      <div className="row">
        <div className="col-md-6">
          <h2>You currently have 0 gigs listed</h2>
        </div>
        <div className="col-md-6">
          <Button onClick={artistOrVenueAdvertiseGig}>List a new gig</Button>
        </div>
      </div>
    </div>
  );
};

export default MyListedGigs;
