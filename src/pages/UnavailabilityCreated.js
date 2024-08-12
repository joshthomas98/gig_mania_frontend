import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SuccessAnimation from "../components/SuccessAnimation";
import { LoginContext } from "../App";

const UnavailabilityCreated = () => {
  const { userId, artistOrVenue } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId || !artistOrVenue) {
      navigate("/signin");
    } else if (userId && artistOrVenue !== "A") {
      navigate("/restrictedpage");
    }
  }, [userId, artistOrVenue, navigate]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-light text-center">
      <h1>Success!</h1>
      <h3 className="pt-3">
        You've successfully added a new unavailable date to your calendar.
      </h3>
      <div className="mt-4">
        <SuccessAnimation />
      </div>
      <div className="mt-5">
        <a
          className="btn btn-outline-light"
          href={
            artistOrVenue === "A"
              ? `/artistuserprofile/${userId}`
              : `/venueuserprofile/${userId}`
          }
        >
          Back to my profile
        </a>
      </div>
    </div>
  );
};

export default UnavailabilityCreated;
