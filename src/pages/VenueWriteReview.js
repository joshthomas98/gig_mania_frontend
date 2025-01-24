import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import StarRating from "../components/StarRating";
import VenueReviewBox from "../components/VenueReviewBox";
import LoadingSpinner from "../components/LoadingSpinner";
import { LoginContext } from "../App";

const VenueWriteReview = () => {
  const { userId, setUserId, artistOrVenue, setArtistOrVenue } =
    useContext(LoginContext);

  const navigate = useNavigate();

  if (!userId || !artistOrVenue) {
    navigate("/signin");
  } else if (userId && artistOrVenue === "A") {
    navigate("/restrictedpage");
  }

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const artistIdFromURL = searchParams.get("artistId");

  const SERVER_BASE_URL = "http://localhost:8000/";
  const PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH =
    "https://gigsweep-express.vercel.app";

  const [artist, setArtist] = useState("");
  const [venue, setVenue] = useState("");

  const [dateOfPerformance, setDateOfPerformance] = useState("");
  const [venueName, setVenueName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [review, setReview] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch artist data from API
  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await fetch(
          `${PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH}/venues/${userId}/`
        );
        const data = await response.json();
        console.log(data);
        setVenue(data); // Store the entire venue data
        setVenueName(data.venue_name); // Set the venue name
      } catch (error) {
        console.log(error);
      }
    };
    fetchVenue();
  }, [userId]);

  // Fetch venue data from API
  useEffect(() => {
    if (artistIdFromURL) {
      fetchArtistData(artistIdFromURL); // Create a function to fetch venue data
    }
  }, [artistIdFromURL]);

  const fetchArtistData = async (artistId) => {
    try {
      const response = await fetch(
        `${PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH}/artists/${artistId}/`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch artist data");
      }
      const data = await response.json();
      setArtist(data); // Set the fetched artist data
      setArtistName(data.artist_name); // Set the artist name if needed
    } catch (error) {
      console.log(error);
    }
  };

  // Submit review
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const dateObj = new Date(dateOfPerformance);
    const date = dateObj.toISOString().slice(0, 10);

    const data = {
      date_of_performance: date,
      venue_name: venueName,
      artist_name: artistName,
      review: review,
      rating: selectedRating,
    };

    fetch(
      `${PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH}/venue_written_review_check_profanities/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        if (response.ok) {
          setIsLoading(false);
          navigate("/thanksforreview");
        }
      })
      .catch((error) => {
        console.error("Error posting review:", error);
      });
  };

  return (
    <>
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backdropFilter: "blur(5px)",
            zIndex: 1,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <LoadingSpinner />
          </div>
        </div>
      )}

      <div className="awr-grid-container">
        <div className="text-light">
          <section>
            <h1 className="pb-3 px-5">
              Write your review for<br></br>
              {artist.artist_name}
            </h1>
          </section>

          <section className="awr-create-review-section py-3 px-5">
            <h3>What rating would you give this artist?</h3>
            <StarRating
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
            />

            <Form onSubmit={handleSubmit} className="rounded-3 mt-4">
              <Form.Group className="text-white" controlId="date">
                <Form.Label>Date of Performance:</Form.Label>
                <p>Enter the date this artist performed at your venue</p>
                <Form.Control
                  type="date"
                  name="dateOfPerformance"
                  value={dateOfPerformance}
                  onChange={(event) => setDateOfPerformance(event.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label
                  htmlFor="venueName"
                  className="text-light mb-2 mt-3"
                >
                  Venue Name:
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your venue name"
                  id="venueName"
                  value={venueName}
                  readOnly // Make the input field non-editable
                />
              </Form.Group>

              <Form.Group>
                <Form.Label
                  htmlFor="artistName"
                  className="text-light mb-2 mt-3"
                >
                  Artist Name:
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the name of the artist you're reviewing"
                  id="artistName"
                  value={artistName}
                  readOnly
                />
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="review" className="text-light mb-2 mt-3">
                  Review:
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Enter your review here"
                  id="review"
                  value={review}
                  onChange={(event) => setReview(event.target.value)}
                />
              </Form.Group>

              <div className="d-flex justify-content-between">
                {isLoading ? (
                  <div className="py-4">
                    <LoadingSpinner />
                  </div>
                ) : (
                  <Button className="mt-4" variant="primary" type="submit">
                    Submit
                  </Button>
                )}
              </div>
            </Form>
          </section>
        </div>

        <section className="awr-review-subject-box-section">
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <h3 className="text-light text-center mb-5">
                How was your experience with<br></br>
                {artistName}?
              </h3>
              <VenueReviewBox
                artistInfo={{
                  image: artist.image,
                  artistName: artist.artist_name,
                  facebook: artist.facebook,
                  youtube: artist.youtube,
                  twitter: artist.twitter,
                }}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default VenueWriteReview;
