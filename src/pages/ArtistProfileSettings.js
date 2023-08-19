import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";
import {
  countiesInEngland,
  countiesInWales,
  countiesInScotland,
  countiesInNorthernIreland,
} from "../components/CountyData";

const ArtistProfileSettings = () => {
  const { userId, setUserId } = useContext(LoginContext);

  const navigate = useNavigate();

  const SERVER_BASE_URL = "http://localhost:8000/";

  const userIdFromLocalStorage = localStorage.getItem("userId");

  const [artist, setArtist] = useState([]);

  const [editedArtistName, setEditedArtistName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPassword, setEditedPassword] = useState("");
  const [editedPhoneNumber, setEditedPhoneNumber] = useState("");
  const [editedGenre, setEditedGenre] = useState("");
  const [editedCountry, setEditedCountry] = useState("");
  const [editedCounty, setEditedCounty] = useState("");
  const [editedSummary, setEditedSummary] = useState("");
  const [editedBio, setEditedBio] = useState("");

  // Fetch and set userId context value from local storage
  useEffect(() => {
    if (userIdFromLocalStorage) {
      setUserId(userIdFromLocalStorage);
    }
  }, [setUserId]);

  // Navigate to the profile settings page if the user is logged in, otherwise navigate to the sign-in page
  useEffect(() => {
    if (userIdFromLocalStorage) {
      navigate("/artistprofilesettings");
    } else {
      navigate("/signin");
    }
  }, [userId, navigate]);

  // Fetch artist data from API
  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch(`${SERVER_BASE_URL}artists/${userId}/`);
        const data = await response.json();
        console.log(data);
        setArtist([data]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchArtist();
  }, [userId]);

  // Save profile button click
  const handleProfileSaveClick = (event) => {
    event.preventDefault();

    const endpoint = `${SERVER_BASE_URL}artists/${userId}/`;
    const formData = {
      artist_name: editedArtistName || artist[0].artist_name,
      email: editedEmail || artist[0].email,
      password: editedPassword || artist[0].password,
      phone_number: editedPhoneNumber || artist[0].phone_number,
      genre: editedGenre || artist[0].genre,
      country: editedCountry || artist[0].country,
      county: editedCounty || artist[0].county,
      summary: editedSummary || artist[0].summary,
      bio: editedBio || artist[0].bio,
    };

    // Remove empty fields from formData
    const filteredFormData = {};
    for (const key in formData) {
      if (formData[key]) {
        filteredFormData[key] = formData[key];
      }
    }

    fetch(endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filteredFormData),
    })
      .then((response) => {
        if (response.ok) {
          navigate("/profilesuccessfullyupdated");
        } else {
          console.error("Error editing profile:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error editing profile:", error);
      });
  };

  return (
    <section className="profile-edit-area text-light">
      {artist.map((artistData) => (
        <div key={artistData.id}>
          <div className="container rounded bg-white mb-5">
            <div className="row">
              <div className="col-md-4 border-right">
                {/* Artist profile picture and edit */}
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    className="rounded-circle"
                    width="150px"
                    src={SERVER_BASE_URL + artistData.image}
                    alt="Profile picture"
                  />
                  <span className="font-weight-bold pt-3">
                    {artistData.artist_name}
                  </span>
                  <label className="btn btn-secondary mt-3">
                    Edit profile picture
                    <input type="file" style={{ display: "none" }} />
                  </label>
                </div>
              </div>

              <div className="col-md-8 border-right">
                {/* Profile Settings title */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Profile Settings</h4>
                </div>

                {/* Artist/Band Name */}
                <div className="row mt-2">
                  <div className="col-md-12">
                    <label className="labels mb-2">Artist/Band Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="band/artist name"
                      value={editedArtistName || artistData.artist_name}
                      onChange={(e) => setEditedArtistName(e.target.value)}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="col-md-12 mt-2">
                  <label className="labels mb-2 mt-2">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter email address"
                    value={editedEmail || artistData.email}
                    onChange={(e) => setEditedEmail(e.target.value)}
                  />
                </div>

                {/* Password */}
                <div className="col-md-12 mt-2">
                  <label className="labels mb-2 mt-2">Password</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editedPassword || artistData.password}
                    onChange={(e) => setEditedPassword(e.target.value)}
                  />
                </div>

                {/* Phone Number */}
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels mb-2">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter phone number"
                      value={editedPhoneNumber || artistData.phone_number}
                      onChange={(e) => setEditedPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>

                {/* Genre */}
                <div className="form-group">
                  <label htmlFor="genre" className="text-light mb-2 mt-3">
                    Genre:
                  </label>
                  <select
                    className="form-control"
                    id="genre"
                    value={editedGenre || artistData.genre}
                    onChange={(e) => setEditedGenre(e.target.value)}
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
                  </select>
                </div>

                {/* Country */}
                <div className="row mt-3">
                  <div className="col-md-6">
                    <label className="labels mb-2 mt-2">Country</label>
                    <select
                      className="form-control"
                      value={editedCountry || artistData.country}
                      onChange={(e) => setEditedCountry(e.target.value)}
                    >
                      <option value="">Select a country</option>
                      <option value="England">England</option>
                      <option value="Wales">Wales</option>
                      <option value="Scotland">Scotland</option>
                      <option value="Northern Ireland">Northern Ireland</option>
                    </select>
                  </div>

                  {/* County */}
                  <div className="col-md-6">
                    <label className="labels mb-2 mt-2">County</label>
                    <select
                      className="form-control"
                      value={editedCounty || artistData.county}
                      onChange={(e) => setEditedCounty(e.target.value)}
                    >
                      <option value="">Select a county</option>
                      {editedCountry === "England"
                        ? countiesInEngland.map((county) => (
                            <option key={county} value={county}>
                              {county}
                            </option>
                          ))
                        : editedCountry === "Wales"
                        ? countiesInWales.map((county) => (
                            <option key={county} value={county}>
                              {county}
                            </option>
                          ))
                        : editedCountry === "Scotland"
                        ? countiesInScotland.map((county) => (
                            <option key={county} value={county}>
                              {county}
                            </option>
                          ))
                        : editedCountry === "Northern Ireland"
                        ? countiesInNorthernIreland.map((county) => (
                            <option key={county} value={county}>
                              {county}
                            </option>
                          ))
                        : null}
                    </select>
                  </div>
                </div>

                {/* Summary */}
                <div className="col-md-12">
                  <div className="pt-4">
                    <div className="d-flex justify-content-between align-items-center experience">
                      <span className="mb-1">Summary</span>
                    </div>
                    <div className="py-2">
                      <textarea
                        value={editedSummary || artistData.summary}
                        onChange={(e) => setEditedSummary(e.target.value)}
                        placeholder="Enter summary"
                        className="form-control"
                        style={{
                          width: "100%",
                          minHeight: "80px",
                          backgroundColor: "#FFFFFF",
                          border: "1px solid #ced4da",
                          resize: "vertical",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Biography */}
                <div className="pt-2">
                  <div className="d-flex justify-content-between align-items-center experience">
                    <span className="mb-1">Biography</span>
                  </div>
                  <div className="py-2">
                    <textarea
                      value={editedBio || artistData.bio}
                      onChange={(e) => setEditedBio(e.target.value)}
                      placeholder="Enter bio"
                      className="form-control"
                      style={{
                        width: "100%",
                        minHeight: "150px",
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #ced4da",
                        resize: "vertical",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Save Profile Button */}
              <div className="position-relative pb-5">
                <button
                  className="btn btn-primary profile-button mt-4"
                  type="button"
                  onClick={handleProfileSaveClick}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ArtistProfileSettings;
