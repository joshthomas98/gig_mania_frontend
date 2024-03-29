import React from "react";
import SuccessAnimation from "../components/SuccessAnimation";

const ProfileSuccessfullyUpdated = () => {
  const storedUserId = localStorage.getItem("userId");
  const storedUserType = localStorage.getItem("artistOrVenue");

  return (
    <div className="text-light text-center">
      <h2 className="pb-5">Your profile has been successfully updated!</h2>

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

      <div style={{ position: "relative", top: "-110px" }}>
        <SuccessAnimation />
      </div>
    </div>
  );
};

export default ProfileSuccessfullyUpdated;
