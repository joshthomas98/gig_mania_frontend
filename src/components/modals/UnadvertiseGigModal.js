import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const UnadvertiseGigModal = ({ show, onClose, onConfirm, gig }) => {
  const modalStyle = {
    backgroundColor: "#222",
    color: "#fff",
  };

  return (
    <Modal show={show} onHide={onClose} style={modalStyle}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "#fff" }}>Unadvertise Gig</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Please confirm that you want to unadvertise this gig. This action will
        make the gig no longer visible to other artists, but it will remain in
        your bookings as one of your confirmed gigs.
      </Modal.Body>
      <Modal.Footer
        style={{
          backgroundColor: "#444",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ backgroundColor: "#444" }}>
          <Button className="me-1" variant="success" onClick={onConfirm}>
            Yes
          </Button>

          <Button className="ms-1" variant="danger" onClick={onClose}>
            No
          </Button>
        </div>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UnadvertiseGigModal;
