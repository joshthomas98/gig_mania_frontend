import React, { useContext } from "react";
import { Container, Button } from "react-bootstrap";
import { FaExclamationTriangle } from "react-icons/fa"; // FontAwesome icon for a warning triangle
import { LoginContext } from "../App";

const RestrictedPage = () => {
  const { userId, setUserId, artistOrVenue, setArtistOrVenue } =
    useContext(LoginContext);

  return (
    <div className="d-flex justify-content-center align-items-center text-light">
      <Container
        className="text-center p-5"
        style={{
          maxWidth: "600px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <FaExclamationTriangle size={60} className="text-warning mb-4" />
        <h1 className="pb-3">Ooops!</h1>
        <p className="lead mb-4">
          It looks like you don't have permission to access this page. Please
          ensure you are logged in and have the correct account type, then try
          again.
        </p>
        <Button
          variant="primary"
          className="me-2"
          href={
            userId && artistOrVenue === "A"
              ? `/artistuserprofile${userId}`
              : userId && artistOrVenue === "V"
              ? `/venueuserprofile/${userId}`
              : "/signin"
          }
        >
          My profile
        </Button>
        <Button variant="secondary" href="/">
          Go home
        </Button>
      </Container>
    </div>
  );
};

export default RestrictedPage;
