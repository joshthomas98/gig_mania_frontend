import React from "react";
import SuccessAnimation from "../components/SuccessAnimation";
import { Button } from "react-bootstrap";

const GigAdvertised = () => {
  const storedUserType = localStorage.getItem("artistOrVenue");

  return (
    <div className="text-light text-center">
      <div className="pb-5" style={{ position: "relative" }}>
        <SuccessAnimation />
      </div>

      <h2 className="pb-4">You have successfully advertised your gig!</h2>

      <p className="pb-3">
        Need further assistance? Contact our{" "}
        <a href="/contactus">support team.</a>
      </p>

      <div className="pt-3">
        <Button
          variant="primary"
          href={
            storedUserType === "A" ? "artistuserprofile" : "venueuserprofile"
          }
        >
          Back to my profile
        </Button>
      </div>
    </div>
  );
};

export default GigAdvertised;
