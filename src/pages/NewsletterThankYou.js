import React from "react";
import SuccessAnimation from "../components/SuccessAnimation";

const NewsletterThankYou = () => {
  return (
    <div className="text-light text-center">
      <h1>Thank you for signing up to our monthly newsletter</h1>
      <h3 className="pt-3">
        You'll now receieve the best of GigSweep every month straight to your
        inbox!
      </h3>
      <div style={{ position: "relative", top: "-110px" }}>
        <SuccessAnimation />
      </div>

      <div style={{ position: "relative", top: "-200px" }}>
        <a href="/">Back to home</a>
      </div>
    </div>
  );
};

export default NewsletterThankYou;
