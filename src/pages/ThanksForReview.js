import React, { useContext } from "react";
import SuccessAnimation from "../components/SuccessAnimation";
import { Button } from "react-bootstrap";
import { LoginContext } from "../App";

const ThanksForReview = () => {
  const { userId, setUserId, artistOrVenue, setArtistOrVenue } =
    useContext(LoginContext);

  return (
    <div className="text-light text-center">
      <div className="pb-5" style={{ position: "relative" }}>
        <SuccessAnimation />
      </div>

      <h2 className="pb-4">Thanks for leaving your review!</h2>

      <p className="lead pb-4">
        Your review is currently being moderated and should be live shortly.
      </p>

      <p className="pb-3">
        Need assistance? Contact our <a href="/contactus">support team.</a>
      </p>

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

export default ThanksForReview;
