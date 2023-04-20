import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function AdvertiseGig({ onUserIdChange, userId }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/signin");
    }
  }, [userId, navigate]);

  const [artistName, setArtistName] = useState("");
  const [dateOfGig, setDateOfGig] = useState("");
  const [countryOfVenue, setCountryOfVenue] = useState("");
  const [venueName, setVenueName] = useState("");
  const [genreOfGig, setGenreOfGig] = useState("");
  const [payment, setPayment] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // convert dateOfGig to a Date object
    const dateObj = new Date(dateOfGig);

    // extract only the date portion
    const date = dateObj.toISOString().slice(0, 10);

    const data = {
      artist_name: artistName,
      date_of_gig: date,
      country_of_venue: countryOfVenue,
      venue_name: venueName,
      genre_of_gig: genreOfGig,
      payment: payment,
    };

    fetch("http://localhost:8000/artist_listed_gigs/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          navigate("/gigadvertised");
        }
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });
  };

  return (
    <div className="container-fluid">
      <h1 className="text-white px-3">Advertise Your Gig</h1>
      <Form onSubmit={handleSubmit} className="rounded-3 w-50">
        <Form.Group className="p-3">
          <Form.Label className="text-white">Artist Name:</Form.Label>
          <Form.Control
            placeholder="Enter your band name here"
            type="text"
            value={artistName}
            onChange={(event) => setArtistName(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="p-3 text-white" controlId="date">
          <Form.Label>Date of Gig:</Form.Label>
          <Form.Control
            type="date"
            name="dateOfGig"
            value={dateOfGig}
            onChange={(event) => setDateOfGig(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="p-3">
          <Form.Label className="text-white">Country Of Venue:</Form.Label>
          <Form.Select
            value={countryOfVenue}
            onChange={(event) => setCountryOfVenue(event.target.value)}
          >
            <option value="">Please select a country</option>
            <option value="England">England</option>
            <option value="Wales">Wales</option>
            <option value="Scotland">Scotland</option>
            <option value="Northern Ireland">Northern Ireland</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="p-3">
          <Form.Label className="text-white">Name Of Venue:</Form.Label>
          <Form.Control
            placeholder="Enter the venue name here"
            type="text"
            value={venueName}
            onChange={(event) => setVenueName(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="p-3">
          <Form.Label className="text-white">Select a Genre:</Form.Label>
          <Form.Select
            value={genreOfGig}
            onChange={(event) => setGenreOfGig(event.target.value)}
          >
            <option value="">Please select a genre</option>
            <option value="Rock">Rock</option>
            <option value="Pop">Pop</option>
            <option value="Jazz">Jazz</option>
            <option value="Country">Country</option>
            <option value="Hip Hop">Hip Hop</option>
            <option value="R&B">R&B</option>
            <option value="Electronic">Electronic</option>
            <option value="Classical">Classical</option>
            <option value="Reggae">Reggae</option>
            <option value="Metal">Metal</option>
            <option value="Folk">Folk</option>
            <option value="Blues">Blues</option>
            <option value="World Music">World Music</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="p-3">
          <Form.Label className="text-white">Payment For Gig:</Form.Label>
          <Form.Control
            placeholder="£ (If gig is unpaid enter 0)"
            type="number"
            value={payment}
            onChange={(event) => setPayment(event.target.value)}
          />
        </Form.Group>
        <Button className="my-3 mx-3" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AdvertiseGig;
