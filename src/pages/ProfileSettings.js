import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";

const ProfileSettings = () => {
  const { userId, setUserId, artistOrVenue, setArtistOrVenue } =
    useContext(LoginContext);

  const navigate = useNavigate();

  const SERVER_BASE_URL = "http://localhost:8000/";

  const userIdFromLocalStorage = localStorage.getItem("userId");
  const artistOrVenueFromLocalStorage = localStorage.getItem("artistOrVenue");

  const [artist, setArtist] = useState([]);
  const [venue, setVenue] = useState([]);

  const [editedArtistName, setEditedArtistName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPassword, setEditedPassword] = useState("");
  const [editedPhoneNumber, setEditedPhoneNumber] = useState("");
  const [editedGenre, setEditedGenre] = useState("");
  const [editedCountry, setEditedCountry] = useState("");
  const [editedCounty, setEditedCounty] = useState("");
  const [editedSummary, setEditedSummary] = useState("");
  const [editedBio, setEditedBio] = useState("");

  // Fetch and set artistOrVenue context value from local storage
  useEffect(() => {
    if (artistOrVenueFromLocalStorage) {
      setArtistOrVenue(artistOrVenueFromLocalStorage);
    }
  }, [setArtistOrVenue]);

  useEffect(() => {
    if (userIdFromLocalStorage && artistOrVenueFromLocalStorage) {
      navigate("/profilesettings");
    } else {
      navigate("/signin");
    }
  }, [userId, navigate]);

  useEffect(() => {
    if (artistOrVenueFromLocalStorage === "A") {
      const fetchArtist = async () => {
        try {
          const artistId = localStorage.getItem("userId");
          const response = await fetch(
            `${SERVER_BASE_URL}artists/${artistId}/`
          );
          const data = await response.json();
          console.log(data);
          setArtist([data]);
        } catch (error) {
          console.log(error);
        }
      };
      fetchArtist();
    } else if (artistOrVenueFromLocalStorage === "V") {
      const fetchVenue = async () => {
        try {
          const venueId = localStorage.getItem("userId");
          const response = await fetch(`${SERVER_BASE_URL}venues/${venueId}/`);
          const data = await response.json();
          console.log(data);
          setVenue([data]);
        } catch (error) {
          console.log(error);
        }
      };
      fetchVenue();
    }
  }, []);

  return (
    <section className="profile-edit-area text-light">
      {artist.map((artist) => (
        <div key={artist.id}>
          <div className="container rounded bg-white mb-5">
            <div className="row">
              <div className="col-md-4 border-right">
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    className="rounded-circle mt-5"
                    width="150px"
                    src={SERVER_BASE_URL + artist.image}
                    alt="Profile picture"
                  />
                  <span className="font-weight-bold pt-3">
                    {artist.artist_name}
                  </span>
                  <label className="btn btn-secondary mt-3">
                    Edit profile picture
                    <input type="file" style={{ display: "none" }} />
                  </label>
                </div>
              </div>

              <div className="col-md-8 border-right">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Profile Settings</h4>
                </div>

                {/* A or V Name */}
                <div className="row mt-2">
                  <div className="col-md-12">
                    <label className="labels mb-2">
                      {artistOrVenue === "A"
                        ? artist.artist_name
                        : venue.venue_name}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="band/artist name"
                      value={
                        editedArtistName !== ""
                          ? editedArtistName
                          : artistOrVenue === "A"
                          ? artist.artist_name
                          : venue.venue_name
                      }
                      onChange={(e) => setEditedArtistName(e.target.value)}
                    />
                  </div>
                </div>

                {/* A or V Email */}
                {artistOrVenue === "A" && (
                  <div className="col-md-12 mt-2">
                    <label className="labels mb-2 mt-2">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter email address"
                      value={
                        editedEmail !== ""
                          ? editedEmail
                          : artistOrVenue === "A"
                          ? artist.email
                          : venue.email
                      }
                      onChange={(e) => setEditedEmail(e.target.value)}
                    />
                  </div>
                )}

                {/* A or V Password */}
                {artistOrVenue === "A" && (
                  <div className="col-md-12 mt-2">
                    <label className="labels mb-2 mt-2">Password</label>
                    <input
                      type="text"
                      className="form-control"
                      value={
                        editedPassword !== ""
                          ? editedPassword
                          : artistOrVenue === "A"
                          ? artist.password
                          : venue.password
                      }
                      onChange={(e) => setEditedPassword(e.target.value)}
                    />
                  </div>
                )}

                {/* A or V Phone Number */}
                {artistOrVenue === "A" && (
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <label className="labels mb-2">Phone Number</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="enter phone number"
                        value={
                          editedPhoneNumber !== ""
                            ? editedPhoneNumber
                            : artistOrVenue === "A"
                            ? artist.phone_number
                            : venue.phone_number
                        }
                        onChange={(e) => setEditedPhoneNumber(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {/* A Genre */}
                {artistOrVenue === "A" && (
                  <div className="form-group">
                    <label htmlFor="genre" className="text-light mb-2 mt-3">
                      Genre:
                    </label>
                    <select
                      className="form-control"
                      id="genre"
                      value={editedGenre !== "" ? editedGenre : artist.genre}
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
                )}

                {/* A or V Country */}
                <div className="row mt-3">
                  <div className="col-md-6">
                    <label className="labels mb-2 mt-2">Country</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="country"
                      value={
                        editedCountry !== ""
                          ? editedCountry
                          : artistOrVenue === "A"
                          ? artist.country
                          : venue.country
                      }
                      onChange={(e) => setEditedCountry(e.target.value)}
                    />
                  </div>

                  {/* A or V County */}
                  <div className="col-md-6">
                    <label className="labels mb-2 mt-2">County</label>
                    <input
                      type="text"
                      className="form-control"
                      value={
                        editedCounty !== ""
                          ? editedCounty
                          : artistOrVenue === "A"
                          ? artist.county
                          : venue.county
                      }
                      onChange={(e) => setEditedCounty(e.target.value)}
                      placeholder="county"
                    />
                  </div>
                </div>

                {/* A Summary */}
                {artistOrVenue === "A" && (
                  <div className="col-md-12">
                    <div className="pt-4">
                      <div className="d-flex justify-content-between align-items-center experience">
                        <span className="mb-1">Summary</span>
                      </div>
                      <div className="py-2">
                        <textarea
                          value={
                            editedSummary !== ""
                              ? editedSummary
                              : artist.summary
                          }
                          onChange={(e) => setEditedSummary(e.target.value)}
                          placeholder="Enter summary"
                          className="form-control"
                          style={{
                            width: "100%", // Set it to 100% width
                            minHeight: "80px",
                            backgroundColor: "#FFFFFF",
                            border: "1px solid #ced4da",
                            resize: "vertical",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* A or V Bio */}
                <div className="pt-2">
                  <div className="d-flex justify-content-between align-items-center experience">
                    <span className="mb-1">Biography</span>
                  </div>
                  <div className="py-2">
                    <textarea
                      value={
                        editedBio !== ""
                          ? editedBio
                          : artistOrVenue === "A"
                          ? artist.bio
                          : venue.bio
                      }
                      onChange={(e) => setEditedBio(e.target.value)}
                      placeholder="Enter bio"
                      className="form-control"
                      style={{
                        width: "100%", // Set the width to 100% to match the summary input area
                        minHeight: "150px",
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #ced4da",
                        resize: "vertical",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="position-relative pb-5">
                <button
                  className="btn btn-primary profile-button mt-4"
                  type="button"
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

export default ProfileSettings;
