import React from "react";
import SuccessAnimation from "../components/SuccessAnimation";

const ThanksForReview = () => {
  return (
    <div className="text-light text-center">
      <h1>Thanks for posting your review!</h1>

      <div style={{ position: "relative", top: "-110px" }}>
        <SuccessAnimation />
      </div>

      <a style={{ position: "relative", top: "-150px" }} href="/">
        Back to homepage
      </a>
    </div>
  );
};

export default ThanksForReview;
