import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";
import {
  countiesInEngland,
  countiesInWales,
  countiesInScotland,
  countiesInNorthernIreland,
} from "../components/CountyData";

const VenueProfileSettings = () => {
  const { userId, setUserId, artistOrVenue, setArtistOrVenue } =
    useContext(LoginContext);

  const navigate = useNavigate();

  if (!userId || !artistOrVenue) {
    navigate("/signin");
  } else if (userId && artistOrVenue !== "V") {
    navigate("/restrictedpage");
  }

  const SERVER_BASE_URL = "http://localhost:8000/";

  const [venue, setVenue] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [editedVenueName, setEditedVenueName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPassword, setEditedPassword] = useState("");
  const [editedPhoneNumber, setEditedPhoneNumber] = useState("");
  const [editedCountry, setEditedCountry] = useState("");
  const [editedCounty, setEditedCounty] = useState("");
  const [editedBio, setEditedBio] = useState("");

  // Fetch venue data from API
  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await fetch(`${SERVER_BASE_URL}venues/${userId}/`);
        const data = await response.json();
        console.log(data);
        setVenue([data]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVenue();
  }, [userId]);

  // Save profile button click
  const handleProfileSaveClick = async (event) => {
    event.preventDefault();

    const endpoint = `${SERVER_BASE_URL}venues/${userId}/`;

    const formData = new FormData();
    formData.append("image", selectedImage || venue[0].image);
    formData.append("venue_name", editedVenueName || venue[0].venue_name);
    formData.append("email", editedEmail || venue[0].email);
    formData.append("password", editedPassword || venue[0].password);
    formData.append("phone_number", editedPhoneNumber || venue[0].phone_number);
    formData.append("country", editedCountry || venue[0].country);
    formData.append("county", editedCounty || venue[0].county);
    formData.append("bio", editedBio || venue[0].bio);

    for (const [key, value] of formData.entries()) {
      if (!value) {
        formData.delete(key);
      }
    }

    try {
      const response = await fetch(endpoint, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        navigate("/profilesuccessfullyupdated");
      } else {
        console.error("Error editing profile:", response.status);
      }
    } catch (error) {
      console.error("Error editing profile:", error);
    }
  };

  return (
    <section className="profile-edit-area text-light">
      {venue.map((venueData) => (
        <div key={venueData.id}>
          <div className="container rounded bg-white mb-5">
            <div className="row">
              <div className="col-md-4 border-right">
                {/* Venue profile picture and edit */}
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    className="rounded-circle"
                    width="150px"
                    src={
                      selectedImage
                        ? URL.createObjectURL(selectedImage)
                        : SERVER_BASE_URL + venueData.image
                    }
                    alt="Profile picture"
                  />
                  <span className="font-weight-bold pt-3">
                    {venueData.venue_name}
                  </span>
                  <label className="btn btn-secondary mt-3">
                    Edit profile picture
                    <input
                      type="file"
                      style={{ display: "none" }}
                      accept="image/*"
                      onChange={(e) => {
                        setSelectedImage(e.target.files[0]);
                        e.target.value = null; // Reset the input value
                      }}
                    />
                  </label>
                </div>
              </div>

              <div className="col-md-8 border-right">
                {/* Profile Settings title */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Profile Settings</h4>
                </div>

                {/* Venue Name */}
                <div className="row mt-2">
                  <div className="col-md-12">
                    <label className="labels mb-2">Venue Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="venue name"
                      value={editedVenueName || venueData.venue_name}
                      onChange={(e) => setEditedVenueName(e.target.value)}
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
                    value={editedEmail || venueData.email}
                    onChange={(e) => setEditedEmail(e.target.value)}
                  />
                </div>

                {/* Password */}
                <div className="col-md-12 mt-2">
                  <label className="labels mb-2 mt-2">Password</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editedPassword || venueData.password}
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
                      value={editedPhoneNumber || venueData.phone_number}
                      onChange={(e) => setEditedPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>

                {/* Country */}
                <div className="row mt-3">
                  <div className="col-md-6">
                    <label className="labels mb-2 mt-2">Country</label>
                    <select
                      className="form-control"
                      value={editedCountry || venueData.country}
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
                      value={editedCounty || venueData.county}
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

                {/* Biography */}
                <div className="pt-2">
                  <div className="d-flex justify-content-between align-items-center experience">
                    <span className="mb-1">Biography</span>
                  </div>
                  <div className="py-2">
                    <textarea
                      value={editedBio || venueData.bio}
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

export default VenueProfileSettings;
