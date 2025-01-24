// import React, { useState, useEffect, useContext } from "react";
// import { Form, Button, Row, Col, FormControl } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { LoginContext } from "../App";
// import LoadingSpinner from "../components/LoadingSpinner";

// function ArtistAdvertiseGig() {
//   const { userId, artistOrVenue } = useContext(LoginContext);
//   const navigate = useNavigate();

//   if (!userId || !artistOrVenue) {
//     navigate("/signin");
//   } else if (userId && artistOrVenue === "V") {
//     navigate("/restrictedpage");
//   }

//   const [isLoading, setIsLoading] = useState(false);

//   const [fetchedArtistDetails, setFetchedArtistDetails] = useState();
//   const [artistName, setArtistName] = useState("");
//   const [dateOfGig, setDateOfGig] = useState("");
//   const [venueName, setVenueName] = useState("");
//   const [venue, setVenue] = useState(""); // New state for venue ID
//   const [countryOfVenue, setCountryOfVenue] = useState("");
//   const [genreOfGig, setGenreOfGig] = useState("");
//   const [typeOfGig, setTypeOfGig] = useState("");
//   const [payment, setPayment] = useState("");
//   const [description, setDescription] = useState("");

//   const [searchQuery, setSearchQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [typingTimeout, setTypingTimeout] = useState(null);

//   const fetchArtistName = () => {
//     fetch(`http://localhost:8000/artists/${userId}/`)
//       .then((response) => response.json())
//       .then((data) => {
//         setFetchedArtistDetails(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching artist name:", error);
//       });
//   };

//   useEffect(() => {
//     fetchArtistName();
//   }, [userId]);

//   useEffect(() => {
//     if (fetchedArtistDetails?.artist_name) {
//       setArtistName(fetchedArtistDetails.artist_name);
//     }
//   }, [fetchedArtistDetails]);

//   const handleSearchInputChange = (event) => {
//     const query = event.target.value;
//     setSearchQuery(query);
//     setVenueName(query);

//     if (query.trim() === "") {
//       setSuggestions([]); // Clear suggestions
//       setShowSuggestions(false); // Hide suggestions
//     } else {
//       if (typingTimeout) {
//         clearTimeout(typingTimeout);
//       }

//       const timeout = setTimeout(() => {
//         fetchSuggestions(query);
//       }, 500);

//       setTypingTimeout(timeout);
//       setShowSuggestions(true); // Show suggestions when typing
//     }
//   };

//   const fetchSuggestions = async (query) => {
//     try {
//       const response = await fetch(
//         `http://localhost:8000/venues/search/?q=${query}`
//       );
//       const venueData = await response.json();
//       const venueSuggestions = venueData.map((venue) => ({
//         id: venue.id,
//         name: venue.venue_name,
//       }));

//       setSuggestions(
//         venueSuggestions.filter((venue) =>
//           venue.name.toLowerCase().startsWith(query.toLowerCase())
//         )
//       );
//       setShowSuggestions(venueSuggestions.length > 0);
//     } catch (error) {
//       console.error("Error fetching suggestions:", error);
//     }
//   };

//   const handleSuggestionClick = (venue) => {
//     setSearchQuery(venue.name);
//     setVenueName(venue.name);
//     setVenue(venue.id); // Set venue ID
//     setShowSuggestions(false); // Hide suggestions after selection
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setIsLoading(true);
//     const dateObj = new Date(dateOfGig);
//     const date = dateObj.toISOString().slice(0, 10);

//     const data = {
//       artist: fetchedArtistDetails ? fetchedArtistDetails.id : "",
//       date_of_gig: date,
//       venue_name: venueName,
//       venue: venue, // Use venue ID here
//       country_of_venue: countryOfVenue,
//       genre_of_gig: genreOfGig,
//       type_of_gig: typeOfGig,
//       type_of_artist: fetchedArtistDetails
//         ? fetchedArtistDetails.type_of_artist
//         : "",
//       payment: payment,
//       description: description,
//       user_type: artistOrVenue === "A" ? "Artist" : "",
//     };

//     fetch("http://localhost:8000/artist_gigs/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => {
//         if (response.ok) {
//           setTimeout(() => {
//             navigate("/gigadvertised");
//           }, 2000); // Delay for 2 seconds before navigating
//         } else {
//           console.error("Error advertising gig:", response.status);
//         }
//       })
//       .catch((error) => {
//         console.error("Error advertising gig:", error);
//       })
//       .finally(() => {
//         setTimeout(() => {
//           setIsLoading(false);
//         }, 1500); // Ensure spinner is shown for at least 2 seconds
//       });
//   };

//   return (
//     <>
//       {isLoading && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             backdropFilter: "blur(5px)",
//             zIndex: 1,
//           }}
//         >
//           <div
//             style={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//             }}
//           >
//             <LoadingSpinner />
//           </div>
//         </div>
//       )}

//       <div className="container-fluid">
//         <h1 className="text-white text-center mb-4 px-3">Advertise Your Gig</h1>

//         <Form
//           onSubmit={handleSubmit}
//           className="rounded-3 w-50 mx-auto text-light"
//         >
//           <Row className="justify-content-center">
//             <Col md={6}>
//               <Form.Group className="p-3 text-center">
//                 <Form.Label className="text-white">Artist Name:</Form.Label>
//                 <div>{artistName}</div>
//                 <input
//                   type="hidden"
//                   name="artistName"
//                   value={artistName}
//                   readOnly
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={6}>
//               <Form.Group className="p-3 text-center" controlId="date">
//                 <Form.Label>Date of Gig:</Form.Label>
//                 <Form.Control
//                   type="date"
//                   name="dateOfGig"
//                   value={dateOfGig}
//                   onChange={(event) => setDateOfGig(event.target.value)}
//                 />
//               </Form.Group>
//             </Col>
//           </Row>
//           <Row className="justify-content-center">
//             <Col md={6}>
//               <Form.Group className="p-3 text-center position-relative">
//                 <Form.Label className="text-white">Name Of Venue:</Form.Label>
//                 <FormControl
//                   placeholder="Search for venue"
//                   type="text"
//                   value={searchQuery}
//                   onChange={handleSearchInputChange}
//                 />
//                 {showSuggestions && searchQuery.trim() !== "" && (
//                   <ul className="suggestion-dropdown mt-1">
//                     {suggestions.map((venue) => (
//                       <li
//                         key={venue.id}
//                         onClick={() => handleSuggestionClick(venue)}
//                         className="suggestion-item"
//                       >
//                         {venue.name}
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </Form.Group>
//             </Col>
//             <Col md={6}>
//               <Form.Group className="p-3 text-center">
//                 <Form.Label className="text-white">
//                   Country Of Venue:
//                 </Form.Label>
//                 <Form.Select
//                   value={countryOfVenue}
//                   onChange={(event) => setCountryOfVenue(event.target.value)}
//                 >
//                   <option value="">Select country</option>
//                   <option value="England">England</option>
//                   <option value="Wales">Wales</option>
//                   <option value="Scotland">Scotland</option>
//                   <option value="Northern Ireland">Northern Ireland</option>
//                 </Form.Select>
//               </Form.Group>
//             </Col>
//           </Row>
//           <Row className="justify-content-center">
//             <Col md={6}>
//               <Form.Group className="p-3 text-center">
//                 <Form.Label className="text-white">Select a Genre:</Form.Label>
//                 <Form.Select
//                   value={genreOfGig}
//                   onChange={(event) => setGenreOfGig(event.target.value)}
//                 >
//                   <option value="">Select a genre</option>
//                   <option value="Rock">Rock</option>
//                   <option value="Pop">Pop</option>
//                   <option value="Jazz">Jazz</option>
//                   <option value="Country">Country</option>
//                   <option value="Hip Hop">Hip Hop</option>
//                   <option value="R&B">R&B</option>
//                   <option value="Electronic">Electronic</option>
//                   <option value="Classical">Classical</option>
//                   <option value="Reggae">Reggae</option>
//                   <option value="Metal">Metal</option>
//                   <option value="Folk">Folk</option>
//                   <option value="Blues">Blues</option>
//                   <option value="World Music">World Music</option>
//                 </Form.Select>
//               </Form.Group>
//             </Col>
//             <Col md={6}>
//               <Form.Group className="p-3 text-center">
//                 <Form.Label className="text-white">Type Of Gig:</Form.Label>
//                 <Form.Select
//                   value={typeOfGig}
//                   onChange={(event) => setTypeOfGig(event.target.value)}
//                 >
//                   <option disabled hidden value="">
//                     Type of gig
//                   </option>
//                   <option value="Original Music">Original Music</option>
//                   <option value="Covers">Covers</option>
//                   <option value="Both">Both</option>
//                 </Form.Select>
//               </Form.Group>
//             </Col>
//           </Row>
//           <Row>
//             <Col md={12}>
//               <Form.Group className="p-3 text-center">
//                 <Form.Label className="text-white">
//                   Reason for advertising this gig:
//                 </Form.Label>
//                 <Form.Control
//                   as="textarea" // Change to textarea
//                   rows={5} // Set the number of visible rows
//                   placeholder="Tell us a bit more about why you can no longer play this gig."
//                   value={description}
//                   onChange={(event) => setDescription(event.target.value)}
//                 />
//               </Form.Group>
//             </Col>
//           </Row>
//           <Row className="justify-content-center">
//             <Col md={6}>
//               <Form.Group className="p-3 text-center">
//                 <Form.Label className="text-white">Payment For Gig:</Form.Label>
//                 <Form.Control
//                   placeholder="£ (If gig is unpaid enter 0)"
//                   type="number"
//                   value={payment}
//                   onChange={(event) => setPayment(event.target.value)}
//                 />
//               </Form.Group>
//             </Col>
//           </Row>
//           <div className="text-center">
//             <Button className="mt-4 mx-3" variant="primary" type="submit">
//               Submit
//             </Button>
//           </div>
//         </Form>
//       </div>
//     </>
//   );
// }

// export default ArtistAdvertiseGig;

import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Row, Col, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";
import LoadingSpinner from "../components/LoadingSpinner";

function ArtistAdvertiseGig() {
  const { userId, artistOrVenue } = useContext(LoginContext);
  const navigate = useNavigate();

  const PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH =
    "https://gigsweep-express.vercel.app";

  if (!userId || !artistOrVenue) {
    navigate("/signin");
  } else if (userId && artistOrVenue === "V") {
    navigate("/restrictedpage");
  }

  const [isLoading, setIsLoading] = useState(false);

  const [fetchedArtistDetails, setFetchedArtistDetails] = useState();
  const [artistName, setArtistName] = useState("");
  const [dateOfGig, setDateOfGig] = useState("");
  const [timeOfGig, setTimeOfGig] = useState(""); // New state for Time of Gig
  const [durationOfGig, setDurationOfGig] = useState(""); // New state for Duration of Gig
  const [venueName, setVenueName] = useState("");
  const [venue, setVenue] = useState(""); // New state for venue ID
  const [countryOfVenue, setCountryOfVenue] = useState("");
  const [genreOfGig, setGenreOfGig] = useState("");
  const [typeOfGig, setTypeOfGig] = useState("");
  const [payment, setPayment] = useState("");
  const [reasonForAdvertising, setReasonForAdvertising] = useState(""); // Notes about gig the artist wants to add

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

  const fetchArtistName = () => {
    fetch(`${PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH}/artists/${userId}/`)
      .then((response) => response.json())
      .then((data) => {
        setFetchedArtistDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching artist name:", error);
      });
  };

  useEffect(() => {
    fetchArtistName();
  }, [userId]);

  useEffect(() => {
    if (fetchedArtistDetails?.artist_name) {
      setArtistName(fetchedArtistDetails.artist_name);
    }
  }, [fetchedArtistDetails]);

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setVenueName(query);

    if (query.trim() === "") {
      setSuggestions([]); // Clear suggestions
      setShowSuggestions(false); // Hide suggestions
    } else {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }

      const timeout = setTimeout(() => {
        fetchSuggestions(query);
      }, 500);

      setTypingTimeout(timeout);
      setShowSuggestions(true); // Show suggestions when typing
    }
  };

  const fetchSuggestions = async (query) => {
    try {
      const response = await fetch(
        `${PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH}/venues/search/?q=${query}`
      );
      const venueData = await response.json();
      const venueSuggestions = venueData.map((venue) => ({
        id: venue.id,
        name: venue.venue_name,
      }));

      setSuggestions(
        venueSuggestions.filter((venue) =>
          venue.name.toLowerCase().startsWith(query.toLowerCase())
        )
      );
      setShowSuggestions(venueSuggestions.length > 0);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSuggestionClick = (venue) => {
    setSearchQuery(venue.name);
    setVenueName(venue.name);
    setVenue(venue.id); // Set venue ID
    setShowSuggestions(false); // Hide suggestions after selection
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const dateObj = new Date(dateOfGig);
    const date = dateObj.toISOString().slice(0, 10);

    const data = {
      original_artist: fetchedArtistDetails ? fetchedArtistDetails.id : "",
      date_of_gig: date,
      time_of_gig: timeOfGig,
      duration_of_gig: durationOfGig,
      venue_name: venueName,
      venue: venue, // Use venue ID here
      country_of_venue: countryOfVenue,
      genre_of_gig: genreOfGig,
      type_of_gig: typeOfGig,
      type_of_artist: fetchedArtistDetails
        ? fetchedArtistDetails.type_of_artist
        : "",
      payment: payment,
      reason_for_advertising: reasonForAdvertising,
      user_type: artistOrVenue === "A" ? "Artist" : "",
      is_advertised: true,
    };

    fetch(
      `${PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH}/artists/artist_gigs/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        if (response.ok) {
          setTimeout(() => {
            navigate("/gigadvertised");
          }, 2000); // Delay for 2 seconds before navigating
        } else {
          console.error("Error advertising gig:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error advertising gig:", error);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1500); // Ensure spinner is shown for at least 2 seconds
      });
  };

  console.log(timeOfGig);

  return (
    <>
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backdropFilter: "blur(5px)",
            zIndex: 1,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <LoadingSpinner />
          </div>
        </div>
      )}

      <div className="container-fluid">
        <h1 className="text-white text-center mb-4 px-3">
          Create a New Gig Advertisemnt
        </h1>

        <Form
          onSubmit={handleSubmit}
          className="rounded-3 w-50 mx-auto text-light"
        >
          <Row className="justify-content-center">
            <Col md={6}>
              <Form.Group className="p-3 text-center">
                <Form.Label className="text-white">Artist Name:</Form.Label>
                <div>{artistName}</div>
                <input
                  type="hidden"
                  name="artistName"
                  value={artistName}
                  readOnly
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
              <Form.Group className="p-3 text-center" controlId="timeOfGig">
                <Form.Label>Time of Gig:</Form.Label>
                <Form.Control
                  type="time"
                  name="timeOfGig"
                  value={timeOfGig}
                  onChange={(event) => setTimeOfGig(event.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="p-3 text-center" controlId="durationOfGig">
                <Form.Label>Duration of Gig (In Minutes):</Form.Label>
                <Form.Control
                  placeholder='e.g., "45"'
                  type="number"
                  min="1" // Minimum value of 1 minute
                  value={durationOfGig}
                  onChange={(event) => setDurationOfGig(event.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={6}>
              <Form.Group className="p-3 text-center position-relative">
                <Form.Label className="text-white">Name Of Venue:</Form.Label>
                <FormControl
                  placeholder="Search for venue"
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                />
                {showSuggestions && searchQuery.trim() !== "" && (
                  <ul className="suggestion-dropdown mt-1">
                    {suggestions.map((venue) => (
                      <li
                        key={venue.id}
                        onClick={() => handleSuggestionClick(venue)}
                        className="suggestion-item"
                      >
                        {venue.name}
                      </li>
                    ))}
                  </ul>
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="p-3 text-center">
                <Form.Label className="text-white">
                  Country Of Venue:
                </Form.Label>
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
          </Row>
          <Row className="justify-content-center">
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
            <Col md={6}>
              <Form.Group className="p-3 text-center">
                <Form.Label className="text-white">Type Of Gig:</Form.Label>
                <Form.Select
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
          <Row className="justify-content-center">
            <Col md={12}>
              <Form.Group className="p-3 text-center" controlId="notesAboutGig">
                <Form.Label>Reason For Advertising:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Add any notes you want to about the gig"
                  value={reasonForAdvertising}
                  onChange={(event) =>
                    setReasonForAdvertising(event.target.value)
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="text-center">
            <Button className="mt-3 mx-3" variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default ArtistAdvertiseGig;
