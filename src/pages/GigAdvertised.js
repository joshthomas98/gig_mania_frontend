import React from "react";
import SuccessAnimation from "../components/SuccessAnimation";

const GigAdvertised = () => {
  return (
    <div className="text-light text-center">
      <h1>Thank you!</h1>
      <h3>You have successfully advertised your gig.</h3>
      <div style={{ position: "relative", top: "-110px" }}>
        <SuccessAnimation />
      </div>
    </div>
  );
};

export default GigAdvertised;
