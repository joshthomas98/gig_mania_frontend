import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import moment from "moment";

const DeleteArtistGigModal = ({
  show,
  handleClose,
  gig,
  onYesDelete,
  onNoDoNotDelete,
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

  console.log(gig);

  return (
    <Modal show={show} onHide={handleClose} style={modalStyle}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "#fff" }}>Confirm deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this gig?
        <div className="pt-3">
          {gig
            ? `${moment(gig.date_of_gig).format("DD/MM/YYYY")} - ${
                gig.venue_name
              }`
            : "Gig details unavailable"}
        </div>
      </Modal.Body>
      <Modal.Footer style={buttonContainerStyle}>
        <div>
          <Button
            variant="success"
            style={{ marginRight: "5px" }}
            onClick={onYesDelete}
          >
            Yes
          </Button>
          <Button
            variant="danger"
            style={{ marginLeft: "5px" }}
            onClick={onNoDoNotDelete}
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

export default DeleteArtistGigModal;
