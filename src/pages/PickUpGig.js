import React, { useEffect, useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";

const PickUpGig = () => {
  const { userId, setUserId, artistOrVenue, setArtistOrVenue } =
    useContext(LoginContext);

  const navigate = useNavigate();

  useEffect(() => {
    const userIdFromLocalStorage = localStorage.getItem("userId");
    const artistOrVenueFromLocalStorage = localStorage.getItem("artistOrVenue");

    if (!userIdFromLocalStorage || !artistOrVenueFromLocalStorage) {
      navigate("/signin");
    } else if (
      userIdFromLocalStorage &&
      artistOrVenueFromLocalStorage !== "A"
    ) {
      // Redirect or handle the case where the user's role is not "V"
      navigate("/"); // For example, redirect to another page
    } else if (
      userIdFromLocalStorage &&
      artistOrVenueFromLocalStorage === "A"
    ) {
      // Set user data or perform other actions for venue users
      setUserId(userIdFromLocalStorage);
      setArtistOrVenue(artistOrVenueFromLocalStorage);
    }
  }, []);

  const [dateOfGig, setDateOfGig] = useState("");
  const [countryOfVenue, setCountryOfVenue] = useState("");
  const [genreOfGig, setGenreOfGig] = useState("");
  const [typeOfGig, setTypeOfGig] = useState("");
  const [payment, setPayment] = useState("");

  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [resetClicked, setResetClicked] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const dateObj = new Date(dateOfGig);
    const date = dateObj.toISOString().slice(0, 10);

    const data = {
      date_of_gig: date,
      country_of_venue: countryOfVenue,
      genre_of_gig: genreOfGig,
      type_of_gig: typeOfGig,
      payment: payment,
    };

    setResetClicked(false);

    fetch("http://localhost:8000/gig_search/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            const combinedResults = [
              ...data.artist_listed_gigs,
              ...data.venue_listed_gigs,
            ];
            setSearchResults(combinedResults);
            setSearched(true);
          });
        }
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
  };

  const handleResetFilters = () => {
    setDateOfGig("");
    setCountryOfVenue("");
    setGenreOfGig("");
    setTypeOfGig("");
    setPayment("");
    setSearchResults([]);
    setResetClicked(true);
  };

  return (
    <>
      <section className="artist-search-area">
        <div className="container-fluid">
          <h1 className="text-white px-3">Search For Your Next Gig</h1>

          <Form onSubmit={handleSubmit} className="rounded-3 w-50 text-light">
            <Form.Group className="p-3 text-white" controlId="date">
              <Form.Label>Date of Gig:</Form.Label>
              <p>Enter the date that you want the gig</p>
              <Form.Control
                type="date"
                name="dateOfGig"
                value={dateOfGig}
                onChange={(event) => setDateOfGig(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="p-3">
              <Form.Label className="text-white">Country of venue:</Form.Label>
              <p>What country do you want the gig to be in?</p>
              <Form.Select
                value={countryOfVenue}
                onChange={(event) => setCountryOfVenue(event.target.value)}
              >
                <option value="">Please select a country</option>
                <option value="England">England</option>
                <option value="Wales">Wales</option>
                <option value="Scotland">Scotland</option>
                <option value="Northern Ireland">Northern Ireland</option>
                {/* <option value="Any">Any</option> */}
              </Form.Select>
            </Form.Group>

            <Form.Group className="p-3">
              <Form.Label className="text-white">Select a Genre:</Form.Label>
              <p>
                What genre artist are you? We'll only show you gigs that fit
                your genre.
              </p>
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
              <p>Enter the minimum amount you will play for</p>
              <Form.Control
                placeholder="£ (If free then enter 0)"
                type="number"
                value={payment}
                onChange={(event) => setPayment(event.target.value)}
              />
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button className="my-3 mx-3" variant="primary" type="submit">
                Search
              </Button>

              <Button
                className="my-3 mx-3"
                variant="primary"
                type="button"
                onClick={handleResetFilters}
              >
                Reset filters
              </Button>
            </div>
          </Form>
        </div>
      </section>

      <section className="my-5 px-4">
        {searched && searchResults.length > 0 ? (
          <div className="gig-output-area">
            <h2 className="text-white mb-4">
              Gigs that meet your search criteria:
            </h2>
            <table className="individual-gig-details table table-bordered mt-5 mb-5 text-light">
              <thead>
                <tr>
                  <th>Listed by:</th>
                  <th>Date:</th>
                  <th>Venue:</th>
                  <th>Gig Type:</th>
                  <th>Fee:</th>
                  <th>More details:</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((result, index) => (
                  <tr key={index}>
                    <td>{result.user_type}</td>
                    <td>{result.date_of_gig}</td>
                    <td>
                      {result.user_type === "Artist" ||
                      result.user_type === "Venue"
                        ? result.venue_name
                        : result.venue}
                    </td>
                    <td>{result.type_of_gig}</td>
                    <td>£{result.payment}</td>
                    <td>
                      <a
                        href={`/individualgig/${result.user_type}-listed/${result.id}`}
                      >
                        Find out more
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : searched && searchResults.length === 0 && !resetClicked ? (
          <div className="artist-output-area text-light">
            <h3 className="mb-3">Sorry, no gigs were found.</h3>
          </div>
        ) : null}
      </section>
    </>
  );
};

export default PickUpGig;
