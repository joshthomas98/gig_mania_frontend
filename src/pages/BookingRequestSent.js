import React from "react";
import SuccessAnimation from "../components/SuccessAnimation";

const BookingRequestSent = () => {
  return (
    <div className="text-light text-center">
      <h1>Thanks for sending your booking request to the artist!</h1>
      <h3 className="py-3">
        The artist will now have 48 hours to accept or decline your booking
        request <br></br> and you will be notified of their decision within that
        time.
      </h3>

      <div style={{ position: "relative", top: "-110px" }}>
        <SuccessAnimation />
      </div>

      <a style={{ position: "relative", top: "-150px" }} href="/">
        Back to homepage
      </a>
    </div>
  );
};

export default BookingRequestSent;
