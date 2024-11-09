import React from "react";
import SuccessAnimation from "../components/SuccessAnimation";
import { Button } from "react-bootstrap";

const UserCreated = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div>
        <h2 className="text-light text-center">Thank you for signing up!</h2>
        <h5 className="mt-3 text-light">
          Your account has been successfully created and you're all good to go!
        </h5>
        <div className="mt-5" style={{ position: "relative", top: "-20px" }}>
          <SuccessAnimation />
        </div>

        <div className="d-flex justify-content-center gap-3 mt-3">
          <Button href="/signin">Sign in now</Button>
          <Button href="/">Go to homepage</Button>
        </div>
      </div>
    </div>
  );
};

export default UserCreated;
