import React, { useContext } from "react";
import SuccessAnimation from "../components/SuccessAnimation";
import { Button } from "react-bootstrap";
import { LoginContext } from "../App";

const ThanksForContactingUs = () => {
  const { userId, setUserId, artistOrVenue, setArtistOrVenue } =
    useContext(LoginContext);

  return (
    <div className="text-light text-center">
      <div className="pb-5" style={{ position: "relative" }}>
        <SuccessAnimation />
      </div>

      <h2 className="pb-4">Thanks for getting in touch!</h2>

      <p className="lead pb-4">
        We have received your support query and we aim to respond to you within
        48 hours. <br />
        You'll recieve an email from us when we respond to your request.
      </p>

      <p className="pb-3">The GigSweep support team.</p>

      <div className="pt-3">
        <Button
          variant="primary"
          href={
            artistOrVenue === "A"
              ? `artistuserprofile/${userId}`
              : `venueuserprofile/${userId}`
          }
        >
          Back to my profile
        </Button>
      </div>
    </div>
  );
};

export default ThanksForContactingUs;
