import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";

function ApplyForGig() {
  const { userId, setUserId, artistOrVenue, setArtistOrVenue } =
    useContext(LoginContext);

  const navigate = useNavigate();

  const PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH =
    "https://gigsweep-express.vercel.app/";

  if (!userId || !artistOrVenue) {
    navigate("/signin");
  } else if (userId && artistOrVenue === "V") {
    navigate("/restrictedpage");
  }

  const [artistName, setArtistName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a FormData object
    const formData = new FormData();

    // Append the other data fields to the FormData object
    formData.append("artist_name", artistName);
    formData.append("email", email);

    // Send the FormData object in the request
    fetch(`${PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH}/gigapplications/`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          navigate("/gigapplicationsuccess");
        }
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });
  };

  return (
    <div>
      <h1 className="text-light mb-4">
        Almost there... Just a couple details.
      </h1>

      <form className="w-50" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="artistName" className="text-light mb-2">
            Artist Name:
          </label>
          <input
            type="text"
            placeholder="Enter your artist name here"
            className="form-control"
            id="artistName"
            value={artistName}
            onChange={(event) => setArtistName(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="text-light mb-2 mt-3">
            Email:
          </label>
          <input
            type="email"
            placeholder="Enter your email here"
            className="form-control"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-4">
          Apply For Gig
        </button>
      </form>
    </div>
  );
}

export default ApplyForGig;
