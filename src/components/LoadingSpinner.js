import React from "react";
import { MDBSpinner } from "mdb-react-ui-kit";

export default function LoadingSpinner() {
  return (
    <MDBSpinner role="status" color="light">
      <span className="visually-hidden">Loading...</span>
    </MDBSpinner>
  );
}
