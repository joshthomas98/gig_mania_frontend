import React from "react";
import SuccessAnimation from "../components/SuccessAnimation";

const GigSuccessfullyUpdated = () => {
  const storedUserType = localStorage.getItem("artistOrVenue");

  return (
    <div className="text-light text-center">
      <h2 className="pb-5">Your gig has been successfully updated!</h2>

      <a
        className="pb-3"
        href={storedUserType === "A" ? "artistuserprofile" : "venueuserprofile"}
      >
        Back to my profile
      </a>

      <div style={{ position: "relative", top: "-110px" }}>
        <SuccessAnimation />
      </div>
    </div>
  );
};

export default GigSuccessfullyUpdated;
