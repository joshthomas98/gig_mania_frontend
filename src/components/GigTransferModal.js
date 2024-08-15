import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const GigTransferModal = ({
  show,
  handleClose,
  action,
  artist,
  artistName,
  onApprove,
  onDecline,
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
    if (action === "approve") {
      // Call the onApprove function if action is "approve"
      if (onApprove) onApprove();
    } else if (action === "decline") {
      // Call the onDecline function if action is "decline"
      if (onDecline) onDecline();
    }
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
