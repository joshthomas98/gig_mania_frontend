import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../App";

const ArtistEditGig = () => {
  const { userId, artistOrVenue } = useContext(LoginContext);

  const navigate = useNavigate();
  const { gigId } = useParams();

  if (!userId || !artistOrVenue) {
    navigate("/signin");
  } else if (userId && artistOrVenue === "V") {
    navigate("/restrictedpage");
  }

  const [gigFormFieldData, setGigFormFieldData] = useState("");

  const [dateOfGig, setDateOfGig] = useState("");
  const [venueName, setVenueName] = useState("");
  const [countryOfVenue, setCountryOfVenue] = useState("");
  const [genreOfGig, setGenreOfGig] = useState("");
  const [typeOfGig, setTypeOfGig] = useState("");
  const [payment, setPayment] = useState("");
  const [timeOfGig, setTimeOfGig] = useState("");
  const [durationOfGig, setDurationOfGig] = useState("");
  const [notesAboutGig, setNotesAboutGig] = useState("");

  // Fetches data for the form fields from the server based on gigId parameter in the URL
  const fetchDataForFormFields = () => {
    fetch(`http://localhost:8000/artist_gigs/${gigId}/`)
      .then((response) => response.json())
      .then((data) => {
        setGigFormFieldData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    fetchDataForFormFields();
  }, []);

  console.log(gigFormFieldData);

  useEffect(() => {
    // Once the data is fetched and stored in gigFormFieldData state,
    // set the individual form field values using that data
    if (gigFormFieldData) {
      setDateOfGig(gigFormFieldData.date_of_gig);
      setVenueName(gigFormFieldData.venue_name);
      setCountryOfVenue(gigFormFieldData.country_of_venue);
      setGenreOfGig(gigFormFieldData.genre_of_gig);
      setTypeOfGig(gigFormFieldData.type_of_gig);
      setPayment(gigFormFieldData.payment);
      setTimeOfGig(gigFormFieldData.time_of_gig);
      setDurationOfGig(gigFormFieldData.duration_of_gig);
      setNotesAboutGig(gigFormFieldData.notes_about_gig);
    }
  }, [gigFormFieldData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Convert dateOfGig to a Date object
    const dateObj = new Date(dateOfGig);
    // Extract only the date portion
    const date = dateObj.toISOString().slice(0, 10);

    const data = {
      date_of_gig: date,
      venue_name: venueName,
      country_of_venue: countryOfVenue,
      genre_of_gig: genreOfGig,
      type_of_gig: typeOfGig,
      payment: payment,
      time_of_gig: timeOfGig,
      duration_of_gig: durationOfGig,
      notes_about_gig: notesAboutGig,
    };

    fetch(`http://localhost:8000/artist_gigs/${gigId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          navigate("/gigsuccessfullyupdated");
        } else {
          console.error("Error editing gig:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error editing gig:", error);
      });
  };

  return (
    <Form onSubmit={handleSubmit} className="container text-light">
      <h3 className="text-center mb-4">Edit Gig Details</h3>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="text-white">Date of Gig:</Form.Label>
            <Form.Control
              type="date"
              value={dateOfGig}
              onChange={(e) => setDateOfGig(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="text-white">Time of Gig:</Form.Label>
            <Form.Control
              type="time"
              value={timeOfGig}
              onChange={(e) => setTimeOfGig(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="text-white">Venue Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter venue name"
              value={venueName}
              onChange={(e) => setVenueName(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="text-white">Duration (minutes):</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter duration"
              value={durationOfGig}
              onChange={(e) => setDurationOfGig(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="text-white">Country of Venue:</Form.Label>
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
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="text-white">Type of Gig:</Form.Label>
            <Form.Select
              value={typeOfGig}
              onChange={(event) => setTypeOfGig(event.target.value)}
            >
              <option value="">Please select a type</option>
              <option value="Original Music">Original Music</option>
              <option value="Covers">Covers</option>
              <option value="Both">Both</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="text-white">Genre of Gig:</Form.Label>
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
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="text-white">Payment:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter payment amount"
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group className="mb-3">
        <Form.Label className="text-white">Notes About Gig:</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter notes"
          value={notesAboutGig}
          onChange={(e) => setNotesAboutGig(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="w-100">
        Save Changes
      </Button>
    </Form>
  );
};

export default ArtistEditGig;
