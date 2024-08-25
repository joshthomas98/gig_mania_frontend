import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ConfirmGigApplicationModal = ({ show, handleClose, handleConfirm }) => {
  const modalStyle = {
    backgroundColor: "#222",
    color: "#fff",
  };

  return (
    <Modal show={show} onHide={handleClose} style={modalStyle}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "#fff" }}>
          Sure you want to apply?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Great, you're one click away from potentially landing this gig!{" "}
        <br></br>
        <br></br>Before you apply, ensure you're available and willing to
        perform. Once applied, you can't undo it, and if approved by the venue,
        you're committed to performing.
      </Modal.Body>
      <Modal.Footer
        style={{
          backgroundColor: "#444",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ backgroundColor: "#444" }}>
          <Button
            variant="success"
            onClick={handleConfirm} // Call the handleConfirm function
            style={{ marginRight: "10px" }}
          >
            Yes, I want this gig.
          </Button>
          <Button variant="danger" onClick={handleClose}>
            No / I'm unsure
          </Button>
        </div>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmGigApplicationModal;
