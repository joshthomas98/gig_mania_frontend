// SignIn.js

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import IncorrectLoginModal from "../components/modals/IncorrectLoginModal";
import { LoginContext } from "../App";
import { useArtistGigApplications } from "../contexts/ArtistGigApplicationsContext";

const SignIn = () => {
  const navigate = useNavigate();
  const { userId, setUserId, artistOrVenue, setArtistOrVenue } =
    useContext(LoginContext);
  const { updateArtistGigApplications } = useArtistGigApplications();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleSignIn = (e) => {
    e.preventDefault();
    const url =
      artistOrVenue === "A"
        ? "http://localhost:8000/artists/validate/"
        : "http://localhost:8000/venues/validate/";

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (response.status === 404) {
          handleShowModal();
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.id) {
          setUserId(data.id);
          localStorage.setItem("userId", data.id);
          setArtistOrVenue(artistOrVenue);
          localStorage.setItem("artistOrVenue", artistOrVenue);
          const storedUserId = localStorage.getItem("userId");
          if (artistOrVenue === "A") {
            navigate(`/artistuserprofile/${storedUserId}`);
          } else if (artistOrVenue === "V") {
            navigate(`/venueuserprofile/${storedUserId}`);
          }

          // Update context with artistGigApplications data
          fetchArtistGigApplications(data.id);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const fetchArtistGigApplications = (userId) => {
    fetch(`http://localhost:8000/artistgigapplications/?venue_id=${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch artist gig applications");
        }
        return response.json();
      })
      .then((data) => {
        updateArtistGigApplications(data); // Update context with fetched data
      })
      .catch((error) => {
        console.error("Error fetching artist gig applications:", error);
        // Handle errors appropriately
      });
  };

  const handleUserTypeChange = (event) => {
    setArtistOrVenue(event.target.value === "artist" ? "A" : "V");
  };

  return (
    <>
      <div className="sign-in-grid-container">
        <div>
          <h3 className="text-light mb-2">LOG IN TO YOUR ACCOUNT</h3>

          <form className="mb-5" onSubmit={handleSignIn}>
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

            <div className="form-group">
              <label htmlFor="password" className="text-light mb-2 mt-3">
                Password:
              </label>
              <input
                type="password"
                placeholder="Enter your password here"
                className="form-control"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="userType" className="text-light mb-2 mt-3">
                I am...
              </label>
              <div className="d-flex align-items-center">
                <label className="text-light me-3">
                  <input
                    type="radio"
                    name="userType"
                    value="artist"
                    checked={artistOrVenue === "A"}
                    onChange={handleUserTypeChange}
                  />{" "}
                  An artist
                </label>
                <label className="text-light">
                  <input
                    type="radio"
                    name="userType"
                    value="venue"
                    checked={artistOrVenue === "V"}
                    onChange={handleUserTypeChange}
                  />{" "}
                  A venue
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary mt-4">
              Sign In
            </button>

            {showModal && (
              <IncorrectLoginModal
                show={showModal}
                handleClose={handleCloseModal}
              />
            )}
          </form>
        </div>

        <div>
          <div
            style={{
              display: "flex",
              alignItems: "left",
              flexDirection: "column",
            }}
          >
            <h3 className="text-light mb-4">New to GigSweep?</h3>

            <h5 className="text-light mb-2">GigSweep account benefits</h5>

            <p className="text-light lead mt-3">Artists:</p>

            <ul className="text-light mt-2">
              <li>
                More gigs, wider reach: Advertise unplayable gigs for other
                artists.
              </li>
              <li>
                Easy gig search, applications: Find and apply for gigs
                efficiently.
              </li>
              <li>
                Promotion, networking: Connect with artists, promote music,
                collaborate effectively.
              </li>
            </ul>

            <p className="text-light lead">Venues:</p>

            <ul className="text-light mt-2">
              <li>
                Diverse talent pool: Discover local and national talent easily.
              </li>
              <li>
                Streamlined booking: List gigs, let artists apply effortlessly.
              </li>
              <li>
                Enhanced exposure, credibility: Priority placement, verified
                bluetick, artist recommendations.
              </li>
            </ul>

            <a
              target={"_blank"}
              href="/membershipplans"
              className="btn btn-secondary mt-4"
              style={{ width: "300px" }}
            >
              CREATE YOUR GIGSWEEP ACCOUNT
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
