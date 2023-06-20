import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import StarRating from "../components/StarRating";

const VenueWriteReview = () => {
  const navigate = useNavigate();

  const [dateOfPerformance, setDateOfPerformance] = useState("");
  const [venueName, setVenueName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [review, setReview] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    // convert dateOfGig to a Date object
    const dateObj = new Date(dateOfPerformance);

    // extract only the date portion
    const date = dateObj.toISOString().slice(0, 10);

    const data = {
      date_of_performance: date,
      venue_name: venueName,
      artist_name: artistName,
      review: review,
      rating: selectedRating,
    };

    fetch("http://localhost:8000/venue_written_reviews/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          navigate("/thanksforreview");
        }
      })
      .catch((error) => {
        console.error("Error posting review:", error);
      });
  };

  return (
    <div className="text-light">
      <section>
        <h1 className="pb-3 px-5">Write your review for the artist</h1>
      </section>

      <section className="py-3 px-5">
        <h3>What rating would you give this artist?</h3>
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
              onChange={(event) => setVenueName(event.target.value)}
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
              onChange={(event) => setArtistName(event.target.value)}
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
            <Button className="mt-4" variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </section>
    </div>
  );
};

export default VenueWriteReview;
