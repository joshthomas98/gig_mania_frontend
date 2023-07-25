import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const DeleteListedGig = ({ show, handleClose }) => {
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

  return (
    <Modal show={show} onHide={handleClose} style={modalStyle}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "#fff" }}>Confirm deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this gig?</Modal.Body>
      <Modal.Footer style={buttonContainerStyle}>
        <div>
          <Button variant="secondary" onClick={handleClose}>
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

export default DeleteListedGig;
