import React, { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
// import { LoginContext } from "../App";

function VenueAdvertiseGig() {
  const navigate = useNavigate();

  const storedUserId = localStorage.getItem("userId");
  const storedUserType = localStorage.getItem("artistOrVenue");

  const [fetchedVenueDetails, setFetchedVenueDetails] = useState();

  // const { userId, setUserId, artistOrVenue, setArtistOrVenue } =
  //   useContext(LoginContext);

  // useEffect(() => {
  //   if (userId === null) {
  //     navigate("/artistorvenuesignin");
  //   }
  // }, [userId, navigate]);

  const [venueName, setVenueName] = useState("");
  const [dateOfGig, setDateOfGig] = useState("");
  const [countryOfVenue, setCountryOfVenue] = useState("");
  const [genreOfGig, setGenreOfGig] = useState("");
  const [typeOfGig, setTypeOfGig] = useState("");
  const [payment, setPayment] = useState("");

  const fetchVenueName = () => {
    fetch(`http://localhost:8000/venues/${storedUserId}/`)
      .then((response) => response.json())
      .then((data) => {
        setFetchedVenueDetails(data);
        console.log(fetchedVenueDetails.venue_name);
      })
      .catch((error) => {
        console.error("Error fetching venue name:", error);
      });
  };

  useEffect(() => {
    fetchVenueName();
  }, [storedUserId]);

  useEffect(() => {
    // Once the data is fetched and stored in gigFormFieldData state,
    // set the individual form field values using that data
    if (fetchedVenueDetails) {
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
      venue: fetchedVenueDetails ? fetchedVenueDetails.venue_name : "", // Include the fetched venue name
      date_of_gig: date,
      country_of_venue: countryOfVenue,
      genre_of_gig: genreOfGig,
      type_of_gig: typeOfGig,
      payment: payment,
    };

    // Replace Axios with Fetch API here
    fetch("http://localhost:8000/venue_listed_gigs/", {
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
      <h1 className="text-white px-3">Advertise Your Gig</h1>

      <Form onSubmit={handleSubmit} className="rounded-3 w-50">
        <Form.Group className="p-3">
          <Form.Label className="text-white">Venue Name:</Form.Label>
          <Form.Control
            placeholder="Enter the name of your venue here"
            type="text"
            value={venueName}
            onChange={(event) => setVenueName(event.target.value)}
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
          <Form.Label className="text-white">Type Of Gig:</Form.Label>
          <Form.Select
            placeholder="What type of gig are you looking for?"
            value={typeOfGig}
            onChange={(event) => setTypeOfGig(event.target.value)}
          >
            <option disabled hidden value="">
              What type of gig are you looking for?
            </option>
            <option value="Original Music">Original Music</option>
            <option value="Covers">Covers</option>
            <option value="Both">Both</option>
            {/* <option value="Any">Any</option> */}
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

export default VenueAdvertiseGig;
