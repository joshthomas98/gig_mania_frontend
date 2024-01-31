import React from "react";
import SuccessAnimation from "../components/SuccessAnimation";

const UserCreated = () => {
  return (
    <div className="text-light text-center">
      <h2>Thank you for signing up!</h2>
      <h5 className="mt-3">
        Your account has been successfully created and you're all good to go!
      </h5>
      <div style={{ position: "relative", top: "-110px" }}>
        <SuccessAnimation />
      </div>
    </div>
  );
};

export default UserCreated;
