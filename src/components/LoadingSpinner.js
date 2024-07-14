import React from "react";
import { MDBSpinner } from "mdb-react-ui-kit";

export default function LoadingSpinner() {
  return (
    <MDBSpinner
      role="status"
      color="light"
      style={{
        width: "4rem", // Adjust the width to make it bigger
        height: "4rem", // Adjust the height to make it bigger
      }}
    >
      <span className="visually-hidden">Loading...</span>
    </MDBSpinner>
  );
}
