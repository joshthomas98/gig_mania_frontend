import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import ArtistSearchResultCard from "../components/ArtistSearchResultCard";
import { LoginContext } from "../App";

const VenueSearchForArtist = () => {
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

  const [dateOfGig, setDateOfGig] = useState("");
  const [genreOfGig, setGenreOfGig] = useState("");
  const [typeOfArtist, setTypeOfArtist] = useState("");
  const [country, setCountry] = useState("");

  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // convert dateOfGig to a Date object
    const dateObj = new Date(dateOfGig);

    // extract only the date portion
    const date = dateObj.toISOString().slice(0, 10);

    const data = {
      date_of_gig: date,
      genre: genreOfGig,
      type_of_artist: typeOfArtist,
      country: country,
    };

    fetch(`${PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH}/artist_search/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setSearchResults(data);
            setSearched(true);
          });
        }
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
  };

  return (
    <>
      <section className="artist-search-area">
        <div className="container-fluid">
          <h1 className="text-white px-3">Search For An Artist</h1>

          <Form onSubmit={handleSubmit} className="rounded-3 w-50">
            <Form.Group className="p-3 text-white" controlId="date">
              <Form.Label>Date of Gig:</Form.Label>
              <p>Enter the date you're looking to book the artist for</p>
              <Form.Control
                type="date"
                name="dateOfGig"
                value={dateOfGig}
                onChange={(event) => setDateOfGig(event.target.value)}
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
              <Form.Label className="text-white">Type Of Artist:</Form.Label>
              <Form.Select
                placeholder="What type of artist are you looking for?"
                value={typeOfArtist}
                onChange={(event) => setTypeOfArtist(event.target.value)}
              >
                <option disabled hidden value="">
                  What type of artist are you looking for?
                </option>
                <option value="Full band">Full band</option>
                <option value="Solo artist">Solo artist</option>
                <option value="Duo">Duo</option>
                <option value="Any">Any</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="p-3">
              <Form.Label className="text-white">Country:</Form.Label>
              <Form.Select
                value={country}
                onChange={(event) => setCountry(event.target.value)}
              >
                <option value="">Please select a country</option>
                <option value="England">England</option>
                <option value="Wales">Wales</option>
                <option value="Scotland">Scotland</option>
                <option value="Northern Ireland">Northern Ireland</option>
              </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button className="my-3 mx-3" variant="primary" type="submit">
                Search
              </Button>
              <Button
                className="my-3 mx-3"
                variant="primary"
                type="button"
                onClick={() => {
                  setDateOfGig("");
                  setGenreOfGig("");
                  setTypeOfArtist("");
                  setCountry("");
                  setSearchResults([]);
                }}
              >
                Reset filters
              </Button>
            </div>
          </Form>
        </div>
      </section>

      <section className="my-5 px-4">
        {searchResults.length > 0 ? (
          <div className="artist-output-area">
            <h2 className="text-white mb-4">
              Artists that meet your search criteria:
            </h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {searchResults.map((result, index) => (
                <div key={index} className="col">
                  <ArtistSearchResultCard result={result} />
                </div>
              ))}
            </div>
          </div>
        ) : searched && searchResults.length === 0 ? (
          <div className="artist-output-area text-light py-5">
            <h2 className="mb-3">Sorry, no artists were found.</h2>
          </div>
        ) : null}
      </section>
    </>
  );
};

export default VenueSearchForArtist;
