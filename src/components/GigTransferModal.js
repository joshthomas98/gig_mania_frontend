import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const GigTransferModal = ({
  show,
  handleClose,
  action,
  artist,
  artistName,
}) => {
  const modalStyle = {
    backgroundColor: "#121212",
    color: "#fff",
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#222",
    padding: "10px",
  };

  const closeButtonStyle = {
    marginLeft: "auto",
  };

  const noButtonStyle = {
    marginLeft: "10px",
  };

  const handleYesButtonClick = () => {
    // fetch(`http://localhost:8000/artist_listed_gigs/${gigId}/`, {
    //   method: "DELETE",
    // })
    //   .then((response) => {
    //     // Check if the DELETE request was successful
    //     if (response.ok) {
    //       // Do something if successful, e.g., update the UI or handle the response
    //       console.log("DELETE request successful");
    //     } else {
    //       // Handle errors if the DELETE request fails
    //       console.error("DELETE request failed");
    //     }
    //   })
    //   .catch((error) => {
    //     // Handle network errors or other exceptions
    //     console.error("Error occurred while processing DELETE request:", error);
    //   });

    console.log("APPROVED");
  };

  const handleNoButtonClick = () => {
    // fetch(`http://localhost:8000/artist_listed_gigs/${gigId}/`, {
    //   method: "DELETE",
    // })
    //   .then((response) => {
    //     // Check if the DELETE request was successful
    //     if (response.ok) {
    //       // Do something if successful, e.g., update the UI or handle the response
    //       console.log("DELETE request successful");
    //     } else {
    //       // Handle errors if the DELETE request fails
    //       console.error("DELETE request failed");
    //     }
    //   })
    //   .catch((error) => {
    //     // Handle network errors or other exceptions
    //     console.error("Error occurred while processing DELETE request:", error);
    //   });

    console.log("DECLINED");
  };

  return (
    <Modal show={show} onHide={handleClose} style={modalStyle}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "#fff" }}>
          {action === "approve"
            ? `Are you sure you want to transfer the gig to ${artistName}?`
            : `Are you sure you want to delete the application from ${artistName}?`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {action === "approve"
          ? "Once the gig is transferred, it will officially become the new artist's responsibility. Payment for the gig (if applicable) will also be made to the new artist."
          : "Once the application has been declined it cannot be undone."}
      </Modal.Body>
      <Modal.Footer style={buttonContainerStyle}>
        <div>
          <Button variant="success" onClick={handleYesButtonClick}>
            Yes
          </Button>
          <Button variant="danger" onClick={handleClose} style={noButtonStyle}>
            No
          </Button>
        </div>
        <Button
          variant="secondary"
          onClick={handleClose}
          style={closeButtonStyle}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GigTransferModal;
