import React, { useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";

const AlreadyAppliedForGig = () => {
  const { userId, setUserId, artistOrVenue, setArtistOrVenue } =
    useContext(LoginContext);

  const navigate = useNavigate();

  if (!userId || !artistOrVenue) {
    navigate("/signin");
  } else if (userId && artistOrVenue === "V") {
    navigate("/restrictedpage");
  }

  return (
    <div className="text-light">
      <h1 className="text-center">Ooops!</h1>

      <h3 className="pt-4 text-center">
        Sorry, it looks like you've already applied for this gig.<br></br>Please
        try applying for another one.
      </h3>

      <div className="text-center pt-5 pb-3">
        <Button href="pickupgig">Search For Gigs</Button>
      </div>
    </div>
  );
};

export default AlreadyAppliedForGig;
