import React from "react";

const GigApplicationSuccess = () => {
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

      <h3 className="mt-4">
        Now kick back, relax and we'll be in touch very soon!
      </h3>
    </div>
  );
};

export default GigApplicationSuccess;
