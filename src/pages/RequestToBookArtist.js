import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { LoginContext } from "../App";

const RequestToBook = () => {
  const { userId, setUserId, artistOrVenue, setArtistOrVenue } =
    useContext(LoginContext);

  const navigate = useNavigate();

  if (!userId || !artistOrVenue) {
    navigate("/signin");
  } else if (userId && artistOrVenue === "A") {
    navigate("/restrictedpage");
  }

  const location = useLocation();

  const SERVER_BASE_URL = "http://localhost:8000/";
  const PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH =
    "https://gigsweep-express.vercel.app";

  const [artist, setArtist] = useState([]);

  const { resultId } = useParams();

  useEffect(() => {
    const userIdFromLocalStorage = localStorage.getItem("userId");
    const artistOrVenueFromLocalStorage = localStorage.getItem("artistOrVenue");

    if (!userIdFromLocalStorage || !artistOrVenueFromLocalStorage) {
      navigate("/signin");
    } else if (
      userIdFromLocalStorage &&
      artistOrVenueFromLocalStorage !== "V"
    ) {
      // Redirect or handle the case where the user's role is not "V"
      navigate("/"); // For example, redirect to another page
    } else if (
      userIdFromLocalStorage &&
      artistOrVenueFromLocalStorage === "V"
    ) {
      // Set user data or perform other actions for venue users
      setUserId(userIdFromLocalStorage);
      setArtistOrVenue(artistOrVenueFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch(
          `${PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH}/artists/${resultId}/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch artist data");
        }
        const data = await response.json();
        console.log(data);
        setArtist(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchArtist();
  }, [resultId]);

  const handleRequestBookingClick = () => {
    navigate("/bookingrequestsent");
  };

  console.log(artist.artist_name);

  return (
    <div className="text-light text-center">
      <h1 className="pb-5">Request To Book</h1>

      <Container>
        <h3 className="pb-5">
          You're just one step away from booking {artist.artist_name}.<br></br>
          Click the "Request Booking" button below to send your booking request
          to the artist.
        </h3>

        <h4 className="pb-4">
          Are you sure you want to send a booking request to{" "}
          {artist.artist_name}?
        </h4>

        <Button
          className="btn-success mx-3"
          onClick={handleRequestBookingClick}
        >
          Request Booking
        </Button>

        <Button className="btn-secondary mx-3" href="venuesearchforartist">
          Cancel
        </Button>

        <p className="pt-5">
          Once you send a booking request to the artist, they will have 48 hours
          to either accept or decline the gig offer.<br></br>You will receive an
          email notification with their decision within this time frame.
        </p>

        <p>
          Note: Once you have sent the booking request to the artist this cannot
          be undone.
        </p>
      </Container>
    </div>
  );
};

export default RequestToBook;
