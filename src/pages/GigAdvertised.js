import React from "react";
import SuccessAnimation from "../components/SuccessAnimation";

const GigAdvertised = () => {
  const storedUserType = localStorage.getItem("artistOrVenue");

  return (
    <div className="text-light text-center">
      <h2 className="pb-5">You have successfully advertised your gig!</h2>

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

export default GigAdvertised;
