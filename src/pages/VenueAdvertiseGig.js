import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";

function VenueAdvertiseGig() {
  const { userId, setUserId, artistOrVenue, setArtistOrVenue } =
    useContext(LoginContext);

  const navigate = useNavigate();

  const PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH =
    "https://gigsweep-express.vercel.app/";

  if (!userId || !artistOrVenue) {
    navigate("/signin");
  } else if (userId && artistOrVenue === "A") {
    navigate("/restrictedpage");
  }

  const [fetchedVenueDetails, setFetchedVenueDetails] = useState();

  const [venueName, setVenueName] = useState("");
  const [dateOfGig, setDateOfGig] = useState("");
  const [countryOfVenue, setCountryOfVenue] = useState("");
  const [genreOfGig, setGenreOfGig] = useState("");
  const [typeOfGig, setTypeOfGig] = useState("");
  const [typeOfArtist, setTypeOfArtist] = useState("");
  const [payment, setPayment] = useState("");

  const fetchVenueName = () => {
    fetch(`${PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH}/venues/${userId}/`)
      .then((response) => response.json())
      .then((data) => {
        setFetchedVenueDetails(data);
        console.log(data?.id); // Use optional chaining here
      })
      .catch((error) => {
        console.error("Error fetching venue name:", error);
      });
  };

  useEffect(() => {
    fetchVenueName();
  }, [userId]);

  useEffect(() => {
    // Once the data is fetched and stored in gigFormFieldData state,
    // set the individual form field values using that data
    if (fetchedVenueDetails?.venue_name) {
      setVenueName(fetchedVenueDetails.venue_name);
    }
  }, [fetchedVenueDetails]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // convert dateOfGig to a Date object
    const dateObj = new Date(dateOfGig);

    // extract only the date portion
    const date = dateObj.toISOString().slice(0, 10);

    const data = {
      venue: fetchedVenueDetails ? fetchedVenueDetails.id : "", // Include the fetched venue name
      date_of_gig: date,
      country_of_venue: countryOfVenue,
      genre_of_gig: genreOfGig,
      type_of_gig: typeOfGig,
      artist_type: typeOfArtist,
      payment: payment,
      user_type: artistOrVenue === "V" ? "Venue" : "",
    };

    fetch(`${PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH}/venue_gigs/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          navigate("/gigadvertised");
        } else {
          console.error("Error advertising gig:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error advertising gig:", error);
      });
  };

  return (
    <div className="container-fluid">
      <h1 className="text-white text-center mb-4 px-3">Advertise Your Gig</h1>

      <Form
        onSubmit={handleSubmit}
        className="rounded-3 w-50 mx-auto text-light"
      >
        <Row className="justify-content-center">
          <Col md={6}>
            <Form.Group className="p-3 text-center">
              <Form.Label className="text-white">Venue Name:</Form.Label>
              {/* Non-editable text element to display the venue name */}
              <div>{venueName}</div>
              {/* Hidden input field to store and send the venue name in the POST request */}
              <input
                type="hidden"
                name="venueName"
                value={venueName}
                readOnly // Make the input read-only
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="p-3 text-center" controlId="date">
              <Form.Label>Date of Gig:</Form.Label>
              <Form.Control
                type="date"
                name="dateOfGig"
                value={dateOfGig}
                onChange={(event) => setDateOfGig(event.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={6}>
            <Form.Group className="p-3 text-center">
              <Form.Label className="text-white">Country Of Venue:</Form.Label>
              <Form.Select
                value={countryOfVenue}
                onChange={(event) => setCountryOfVenue(event.target.value)}
              >
                <option value="">Select country</option>
                <option value="England">England</option>
                <option value="Wales">Wales</option>
                <option value="Scotland">Scotland</option>
                <option value="Northern Ireland">Northern Ireland</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="p-3 text-center">
              <Form.Label className="text-white">Select a Genre:</Form.Label>
              <Form.Select
                value={genreOfGig}
                onChange={(event) => setGenreOfGig(event.target.value)}
              >
                <option value="">Select a genre</option>
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
        </Row>
        <Row className="justify-content-center">
          <Col md={6}>
            <Form.Group className="p-3 text-center">
              <Form.Label className="text-white">Type Of Gig:</Form.Label>
              <Form.Select
                placeholder="Type of gig you are looking for"
                value={typeOfGig}
                onChange={(event) => setTypeOfGig(event.target.value)}
              >
                <option disabled hidden value="">
                  Type of gig
                </option>
                <option value="Original Music">Original Music</option>
                <option value="Covers">Covers</option>
                <option value="Both">Both</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="p-3 text-center">
              <Form.Label className="text-white">Type Of Artist:</Form.Label>
              <Form.Select
                placeholder="Type of artist you are looking for"
                value={typeOfArtist}
                onChange={(event) => setTypeOfArtist(event.target.value)}
              >
                <option disabled hidden value="">
                  Type of artist you're looking for
                </option>
                <option value="Full band">Full band</option>
                <option value="Solo artist">Solo artist</option>
                <option value="Duo">Duo</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={6}>
            <Form.Group className="p-3 text-center">
              <Form.Label className="text-white">Payment For Gig:</Form.Label>
              <Form.Control
                placeholder="£ (If gig is unpaid enter 0)"
                type="number"
                value={payment}
                onChange={(event) => setPayment(event.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="text-center">
          <Button className="my-3 mx-3" variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default VenueAdvertiseGig;
