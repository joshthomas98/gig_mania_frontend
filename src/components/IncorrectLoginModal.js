import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const IncorrectLoginModal = ({ show, handleClose }) => {
  const modalStyle = {
    backgroundColor: "#222",
    color: "#fff",
  };

  return (
    <Modal show={show} onHide={handleClose} style={modalStyle}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "#fff" }}>Ooops!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You have either entered an invalid email and/or password or selected the
        incorrect user type, please try again.
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#444" }}>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default IncorrectLoginModal;
