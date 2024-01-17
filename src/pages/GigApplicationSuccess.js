import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";

const GigApplicationSuccess = () => {
  const { userId, setUserId, artistOrVenue, setArtistOrVenue } =
    useContext(LoginContext);

  const navigate = useNavigate();

  if (!userId || !artistOrVenue) {
    navigate("/signin");
  } else if (userId && artistOrVenue === "V") {
    navigate("/restrictedpage");
  }
  return (
    <div className="text-light text-center">
      <h1>Thank you!</h1>
      <h3>You have successfully applied for the gig.</h3>

      <div className="text-center mt-5">
        <img
          className="img-fluid"
          src="../../images/applied_for_gig_man_no_background.png"
          alt="man"
          style={{ width: 400, height: 400 }}
        />
      </div>

      <h3 className="mt-4 mb-4">
        Now kick back, relax and we'll be in touch very soon!
      </h3>

      <a href="/">Back to homepage</a>
    </div>
  );
};

export default GigApplicationSuccess;
