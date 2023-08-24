import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import StarRating from "../components/StarRating";
import VenueReviewBox from "../components/VenueReviewBox";
import LoadingSpinner from "../components/LoadingSpinner";
import { LoginContext } from "../App";

const VenueWriteReview = () => {
  const { userId, setUserId } = useContext(LoginContext);

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const artistIdFromURL = searchParams.get("artistId");

  const SERVER_BASE_URL = "http://localhost:8000/";

  const userIdFromLocalStorage = localStorage.getItem("userId");

  const [artist, setArtist] = useState("");
  const [venue, setVenue] = useState("");

  const [dateOfPerformance, setDateOfPerformance] = useState("");
  const [venueName, setVenueName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [review, setReview] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch and set userId context value from local storage
  useEffect(() => {
    if (userIdFromLocalStorage) {
      setUserId(userIdFromLocalStorage);
    }
  }, [setUserId]);

  // Navigate to the profile settings page if the user is logged in, otherwise navigate to the sign-in page
  useEffect(() => {
    if (userIdFromLocalStorage) {
      navigate("/venuewritereview");
    } else {
      navigate("/signin");
    }
  }, [userId, navigate]);

  // Fetch artist data from API
  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await fetch(`${SERVER_BASE_URL}venues/${userId}/`);
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
      const response = await fetch(`${SERVER_BASE_URL}artists/${artistId}/`);
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

    fetch("http://localhost:8000/venue_written_review_check_profanities/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
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
    <div className="awr-grid-container">
      <div className="text-light">
        <section>
          <h1 className="pb-3 px-5">
            Write your review for<br></br>
            {artist.artist_name}
          </h1>
        </section>

        <section className="awr-create-review-section py-3 px-5">
          <h3>What rating would you give this venue?</h3>
          <StarRating
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
          />

          <Form onSubmit={handleSubmit} className="rounded-3 mt-4">
            <Form.Group className="text-white" controlId="date">
              <Form.Label>Date of Performance:</Form.Label>
              <p>Enter the date you performed at the venue</p>
              <Form.Control
                type="date"
                name="dateOfPerformance"
                value={dateOfPerformance}
                onChange={(event) => setDateOfPerformance(event.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="venueName" className="text-light mb-2 mt-3">
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
              <Form.Label htmlFor="artistName" className="text-light mb-2 mt-3">
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
  );
};

export default VenueWriteReview;
