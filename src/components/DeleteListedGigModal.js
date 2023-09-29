import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const DeleteListedGigModal = ({
  show,
  handleClose,
  gigId,
  handleDeleteGig,
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
    marginLeft: "10px", // Add margin to the "No" button
  };

  const handleYesButtonClick = () => {
    fetch(`http://localhost:8000/artist_listed_gigs/${gigId}/`, {
      method: "DELETE",
    })
      .then((response) => {
        // Check if the DELETE request was successful
        if (response.ok) {
          // Do something if successful, e.g., update the UI or handle the response
          console.log("DELETE request successful");
        } else {
          // Handle errors if the DELETE request fails
          console.error("DELETE request failed");
        }
      })
      .catch((error) => {
        // Handle network errors or other exceptions
        console.error("Error occurred while processing DELETE request:", error);
      });
  };

  return (
    <Modal show={show} onHide={handleClose} style={modalStyle}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "#fff" }}>Confirm deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this gig?</Modal.Body>
      <Modal.Footer style={buttonContainerStyle}>
        <div>
          <Button variant="secondary" onClick={handleDeleteGig}>
            Yes
          </Button>
          <Button
            variant="secondary"
            onClick={handleClose}
            style={noButtonStyle}
          >
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

export default DeleteListedGigModal;
