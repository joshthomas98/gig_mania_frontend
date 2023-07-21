import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const EditGig = () => {
  const navigate = useNavigate();
  const { gigId } = useParams();

  const [gigFormFieldData, setGigFormFieldData] = useState("");

  const [artistName, setArtistName] = useState("");
  const [dateOfGig, setDateOfGig] = useState("");
  const [venueName, setVenueName] = useState("");
  const [countryOfVenue, setCountryOfVenue] = useState("");
  const [genreOfGig, setGenreOfGig] = useState("");
  const [typeOfGig, setTypeOfGig] = useState("");
  const [artistType, setArtistType] = useState("");
  const [payment, setPayment] = useState("");

  // Fetches data for the form fields from the server based on gigId parameter in the URL
  const fetchDataForFormFields = () => {
    fetch(`http://localhost:8000/artist_listed_gigs/${gigId}/`)
      .then((response) => response.json())
      .then((data) => {
        setGigFormFieldData(data);
        console.log(gigFormFieldData); // Log the fetched data (might show previous state due to closure)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    fetchDataForFormFields();
  }, []);

  // Handles the form submission when the "Save Changes" button is clicked
  const handleSubmit = (event) => {
    event.preventDefault();

    // Prepare the data to be sent in the PUT request
    const gigData = {
      artist_name: artistName,
      date_of_gig: dateOfGig,
      venue_name: venueName,
      country_of_venue: countryOfVenue,
      genre_of_gig: genreOfGig,
      type_of_gig: typeOfGig,
      artist_type: artistType,
      payment: payment,
    };

    // Make the PUT request using fetch API
    fetch(`http://localhost:8000/artist_listed_gigs/${gigId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gigData),
    })
      .then((response) => {
        if (response.ok) {
          // Handle successful response here (e.g., show success message)
          console.log("Gig data updated successfully!");
          navigate("/gigsuccessfullyupdated");
        } else {
          // Handle error response here (e.g., show error message)
          console.error("Failed to update gig data");
        }
      })
      .catch((error) => {
        // Handle any network or fetch-related errors
        console.error("Error updating gig data:", error);
      });
  };

  return (
    <Form onSubmit={handleSubmit} className="w-50">
      <Form.Group controlId="artistName">
        <Form.Label>Artist Name:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter artist name"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="dateOfGig">
        <Form.Label>Date of Gig:</Form.Label>
        <Form.Control
          type="date"
          value={dateOfGig}
          onChange={(e) => setDateOfGig(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="venueName">
        <Form.Label>Venue Name:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter venue name"
          value={venueName}
          onChange={(e) => setVenueName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="countryOfVenue">
        <Form.Label>Country of Venue:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter country of venue"
          value={countryOfVenue}
          onChange={(e) => setCountryOfVenue(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="genreOfGig">
        <Form.Label>Genre of Gig:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter genre of gig"
          value={genreOfGig}
          onChange={(e) => setGenreOfGig(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="typeOfGig">
        <Form.Label>Type of Gig:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter type of gig"
          value={typeOfGig}
          onChange={(e) => setTypeOfGig(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="artistType">
        <Form.Label>Artist Type:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter artist type"
          value={artistType}
          onChange={(e) => setArtistType(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="payment">
        <Form.Label>Payment:</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter payment amount"
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
        />
      </Form.Group>

      <Button className="mt-4" variant="primary" type="submit">
        Save Changes
      </Button>
    </Form>
  );
};

export default EditGig;
