import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import SuccessAnimation from "../components/SuccessAnimation";
import { LoginContext } from "../App";

const UnavailabilityCreated = () => {
  const { userId, setUserId, artistOrVenue, setArtistOrVenue } =
    useContext(LoginContext);

  const navigate = useNavigate();

  if (!userId || !artistOrVenue) {
    navigate("/signin");
  } else if (userId && artistOrVenue === "A") {
    navigate("/restrictedpage");
  }

  return (
    <div className="text-light text-center">
      <h1>Success!</h1>
      <h3 className="pt-3">
        You've successfully added a new unavailable date to your calendar.
      </h3>
      <div style={{ position: "relative", top: "-110px" }}>
        <SuccessAnimation />
      </div>

      <div style={{ position: "relative", top: "-200px" }}>
        <a
          className="pb-3"
          href={
            artistOrVenue === "A"
              ? `artistuserprofile/${userId}`
              : `venueuserprofile/${userId}`
          }
        >
          Back to my profile
        </a>
      </div>
    </div>
  );
};

export default UnavailabilityCreated;
