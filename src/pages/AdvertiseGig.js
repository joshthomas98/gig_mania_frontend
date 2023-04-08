import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function BookArtistPage(props) {
  const navigate = useNavigate();

  const { isArtistLoggedIn } = props;

  useEffect(() => {
    if (!isArtistLoggedIn) {
      navigate("/signin");
    }
  }, [isArtistLoggedIn, navigate]);

  const [artistName, setArtistName] = useState("");
  const [dateOfGig, setDateOfGig] = useState("");
  const [countryOfVenue, setCountryOfVenue] = useState("");
  const [venueName, setVenueName] = useState("");
  const [genre, setGenre] = useState("");
  const [payment, setPayment] = useState("");

  const handleArtistNameChange = (event) => {
    setArtistName(event.target.value);
  };

  const handleDateOfGigChange = (event) => {
    setDateOfGig(event.target.value);
  };

  const handleCountryOfVenueChange = (event) => {
    setCountryOfVenue(event.target.value);
  };

  const handleVenueNameChange = (event) => {
    setVenueName(event.target.value);
  };

  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };

  const handlePaymentChange = (event) => {
    setPayment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      artistName: artistName,
      dateOfGig: dateOfGig,
      countryOfVenue: countryOfVenue,
      venueName: venueName,
      genre: genre,
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
        console.error("Error advertising gig:", error);
      });
  };

  console.log(dateOfGig);

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
            onChange={handleArtistNameChange}
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
            onChange={handleCountryOfVenueChange}
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
            onChange={handleVenueNameChange}
          />
        </Form.Group>

        <Form.Group className="p-3">
          <Form.Label className="text-white">Select a Genre:</Form.Label>
          <Form.Select value={genre} onChange={handleGenreChange}>
            <option value="">Please select a genre</option>
            <option value="rock">Rock</option>
            <option value="pop">Pop</option>
            <option value="jazz">Jazz</option>
            <option value="country">Country</option>
            <option value="hip-hop">Hip hop</option>
            <option value="r&b">R&B</option>
            <option value="electronic">Electronic</option>
            <option value="classical">Classical</option>
            <option value="reggae">Reggae</option>
            <option value="metal">Metal</option>
            <option value="folk">Folk</option>
            <option value="blues">Blues</option>
            <option value="world-music">World Music</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="p-3">
          <Form.Label className="text-white">Payment For Gig:</Form.Label>
          <Form.Control
            placeholder="£ (If gig is unpaid enter 0)"
            type="number"
            value={payment}
            onChange={handlePaymentChange}
          />
        </Form.Group>
        <Button className="my-3 mx-3" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default BookArtistPage;
