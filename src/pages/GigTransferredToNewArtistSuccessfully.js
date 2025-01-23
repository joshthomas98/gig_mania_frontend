import React, { useContext, useState, useEffect } from "react";
import SuccessAnimation from "../components/SuccessAnimation";
import { Button } from "react-bootstrap";
import { LoginContext } from "../App";
import { useParams, Link } from "react-router-dom";

const GigTransferredToNewArtistSuccessfully = () => {
  const { userId, setUserId, artistOrVenue, setArtistOrVenue } =
    useContext(LoginContext);
  const [artist, setArtist] = useState(null);
  const { artistId } = useParams();
  const SERVER_BASE_URL = "http://localhost:8000/";
  const PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH =
    "https://gigsweep-express.vercel.app/";

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch(
          `${PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH}/artists/${artistId}/`
        );
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch artist");
        }
        const data = await response.json();
        setArtist(data);
      } catch (error) {
        console.error("Error fetching artist:", error);
      }
    };

    fetchArtist();
  }, [artistId]);

  return (
    <div className="text-light text-center">
      <div className="pb-5" style={{ position: "relative" }}>
        <SuccessAnimation />
      </div>

      <h1>WOOHOO!</h1>

      <h2 className="pb-4">
        You have successfully transferred the gig to the new artist!
      </h2>

      <p className="pb-3 lead">
        The gig now belongs to{" "}
        {artist ? (
          <Link
            to={`/artistuserprofile/${artist.id}`}
            style={{
              textDecoration: "none",
              color: "#4AC4FF",
            }}
          >
            {artist.artist_name}
          </Link>
        ) : (
          "the new artist"
        )}{" "}
        and has been updated in your booking system. <br />
        You don't need to take any further action.
      </p>

      <div className="pt-3">
        <Button
          variant="primary"
          href={
            artistOrVenue === "A"
              ? `artistuserprofile/${userId}`
              : `venueuserprofile/${userId}`
          }
        >
          Back to my profile
        </Button>
      </div>
    </div>
  );
};

export default GigTransferredToNewArtistSuccessfully;
