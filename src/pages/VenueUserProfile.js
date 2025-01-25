import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import LoadingSpinner from "../components/LoadingSpinner";

const VenueUserProfile = () => {
  const [userId, setUserId] = useState(null);
  const [artistOrVenue, setArtistOrVenue] = useState(null);
  const { profileId } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);

  const SERVER_BASE_URL = "http://localhost:8000/";
  const SERVER_BASE_URL_WITHOUT_TRAILING_SLASH = "http://localhost:8000";
  const PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH =
    "https://gigsweep-express.vercel.app";

  useEffect(() => {
    const userIdFromLocalStorage = localStorage.getItem("userId");
    const artistOrVenueFromLocalStorage = localStorage.getItem("artistOrVenue");
    if (userIdFromLocalStorage) {
      setUserId(userIdFromLocalStorage);
    }
    if (artistOrVenueFromLocalStorage) {
      setArtistOrVenue(artistOrVenueFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await fetch(
          `${PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH}/venues/${profileId}/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch venue data");
        }
        const data = await response.json();
        setVenue(data);
      } catch (error) {
        console.error("Error fetching venue data:", error);
      } finally {
        setLoading(false); // Ensure loading state is set to false after fetching
      }
    };

    fetchVenue();
  }, [profileId]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="text-light">
      <h1 className="text-center mb-4">My Profile</h1>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card bg-dark text-light border-light shadow-lg">
              <div className="card-body">
                <div className="text-center mt-3 mb-4">
                  <img
                    src={
                      PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH + venue.image
                    }
                    alt="Venue"
                    className="img-fluid rounded-circle border border-light"
                    style={{ width: 150, height: 150, objectFit: "cover" }}
                  />
                  <h2 className="mt-4">{venue.venue_name}</h2>
                  <p className="lead mt-3">{venue.county}</p>
                  <p className="lead">{venue.genre}</p>
                </div>

                {artistOrVenue === "V" && userId === profileId && (
                  <div className="text-center pt-3 mb-4">
                    <Button
                      variant="outline-light"
                      className="mx-2"
                      onClick={() => navigate("/venueprofilesettings")}
                    >
                      Edit Profile
                    </Button>
                    <Button
                      variant="outline-light"
                      className="mx-2"
                      onClick={() => navigate("/mybookings")}
                    >
                      View My Gigs
                    </Button>
                  </div>
                )}

                {artistOrVenue !== "V" && (
                  <div className="text-center mb-4">
                    <Button
                      variant="outline-light"
                      onClick={() =>
                        navigate(`/artistwritereview?venueId=${venue.id}`)
                      }
                    >
                      Leave Feedback
                    </Button>
                  </div>
                )}

                <div className="text-center mt-5 mb-4">
                  <h4>About</h4>
                  <Container>
                    <p className="mt-4">{venue.bio}</p>
                  </Container>
                </div>

                <div className="text-center mt-5 mb-4">
                  <ul className="list-inline">
                    <li className="list-inline-item mx-3">
                      <h5 className="font-weight-bold">215</h5>
                      <p>Photos</p>
                    </li>
                    <li className="list-inline-item mx-3">
                      <h5 className="font-weight-bold">745</h5>
                      <p>Followers</p>
                    </li>
                    <li className="list-inline-item mx-3">
                      <h5 className="font-weight-bold">340</h5>
                      <p>Following</p>
                    </li>
                  </ul>
                </div>

                <div className="text-center mb-4">
                  <h4 className="mb-4">Recent Photos</h4>
                  <div className="row">
                    <div className="col-lg-6 mb-3">
                      <img
                        src="https://images.unsplash.com/photo-1469594292607-7bd90f8d3ba4?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                        alt="Photo 1"
                        className="img-fluid rounded shadow-sm"
                      />
                    </div>
                    <div className="col-lg-6 mb-3">
                      <img
                        src="https://images.unsplash.com/photo-1493571716545-b559a19edd14?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                        alt="Photo 2"
                        className="img-fluid rounded shadow-sm"
                      />
                    </div>
                    <div className="col-lg-6 mb-3">
                      <img
                        src="https://images.unsplash.com/photo-1453791052107-5c843da62d97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                        alt="Photo 3"
                        className="img-fluid rounded shadow-sm"
                      />
                    </div>
                    <div className="col-lg-6 mb-3">
                      <img
                        src="https://images.unsplash.com/photo-1475724017904-b712052c192a?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                        alt="Photo 4"
                        className="img-fluid rounded shadow-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueUserProfile;
