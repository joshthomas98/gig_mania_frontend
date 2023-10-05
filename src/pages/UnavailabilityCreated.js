import React from "react";
import SuccessAnimation from "../components/SuccessAnimation";

const UnavailabilityCreated = () => {
  const storedUserId = localStorage.getItem("userId");
  const storedUserType = localStorage.getItem("artistOrVenue");

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
            storedUserType === "A"
              ? `artistuserprofile/${storedUserId}`
              : `venueuserprofile/${storedUserId}`
          }
        >
          Back to my profile
        </a>
      </div>
    </div>
  );
};

export default UnavailabilityCreated;
