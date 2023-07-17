import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import StarRating from "../components/StarRating";
import ReviewSubjectBox from "../components/ReviewSubjectBox";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const ArtistWriteReview = () => {
  const { venueId } = useParams();
  const navigate = useNavigate();

  const [dateOfPerformance, setDateOfPerformance] = useState("");
  const [artistName, setArtistName] = useState("");
  const [venueName, setVenueName] = useState("");
  const [review, setReview] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetch(`http://localhost:8000/venues/${venueId}`)
      .then((response) => response.json())
      .then((data) => {
        setVenueName(data.name);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching venue details:", error);
        setIsLoading(false);
      });
  }, [venueId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const dateObj = new Date(dateOfPerformance);
    const date = dateObj.toISOString().slice(0, 10);

    const data = {
      date_of_performance: date,
      artist_name: artistName,
      venue_name: venueName,
      review: review,
      rating: selectedRating,
    };

    fetch("http://localhost:8000/artist_written_review_check_profanities/", {
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
        setIsLoading(false);
      });
  };

  return (
    <div className="awr-grid-container">
      <div className="text-light">
        <section>
          <h1 className="awr-title-section pb-3 px-5">
            Write your review for the venue
          </h1>
        </section>

        <section className="awr-create-review-section py-3 px-5">
          <h3>What rating would you give this venue?</h3>
          <StarRating
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
          />

          <Form onSubmit={handleSubmit} className="rounded-3 w-50 mt-4">
            <Form.Group className="text-white" controlId="date">
              <Form.Label>Date of Performance:</Form.Label>
              <p>Enter the date you performed at the venue</p>
              <Form.Control
                type="date"
                name="dateOfPerformance"
                value={dateOfPerformance}
                onChange={(event) => setDateOfPerformance(event.target.value)}
                style={{ width: "200%" }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="artistName" className="text-light mb-2 mt-3">
                Artist Name:
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your artist name"
                id="artistName"
                value={artistName}
                onChange={(event) => setArtistName(event.target.value)}
                style={{ width: "200%" }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="venueName" className="text-light mb-2 mt-3">
                Venue Name:
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the name of the venue you're reviewing"
                id="venueName"
                value={venueName}
                onChange={(event) => setVenueName(event.target.value)}
                style={{ width: "200%" }}
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
                style={{ width: "200%" }}
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
              How was your experience with {venueName}?
            </h3>
            <ReviewSubjectBox venueName={venueName} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArtistWriteReview;
