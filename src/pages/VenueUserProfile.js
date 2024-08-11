import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { LoginContext } from "../App";

const VenueUserProfile = () => {
  const { userId, artistOrVenue } = useContext(LoginContext);
  const { profileId } = useParams();
  const navigate = useNavigate();

  const [venue, setVenue] = useState(null);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/venues/${profileId}/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch venue data");
        }
        const data = await response.json();
        setVenue(data);
      } catch (error) {
        console.error("Error fetching venue data:", error);
      }
    };

    fetchVenue();
  }, [profileId]);

  if (!userId || !artistOrVenue) {
    navigate("/signin");
    return null;
  } else if (userId && artistOrVenue === "A") {
    navigate("/restrictedpage");
    return null;
  }

  if (!venue) {
    return (
      <div className="text-light text-center">Loading venue profile...</div>
    );
  }

  return (
    <div className="text-light">
      <h1 className="text-center mt-5 mb-4">My Profile</h1>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card bg-dark text-light border-light shadow-lg">
              <div className="card-body">
                <div className="text-center mt-3 mb-4">
                  <img
                    src={`http://localhost:8000/${venue.image}`}
                    alt="Venue"
                    className="img-fluid rounded-circle border border-light"
                    style={{ width: 150, height: 150, objectFit: "cover" }}
                  />
                  <h2 className="mt-4">{venue.venue_name}</h2>
                  <p className="lead mt-3">{venue.county}</p>
                  <p className="lead">{venue.genre}</p>
                </div>

                {userId === profileId && (
                  <div className="text-center mb-4">
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
                      onClick={() => navigate("/mylistedgigs")}
                    >
                      View My Listed Gigs
                    </Button>
                  </div>
                )}

                {userId !== profileId && (
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
                  <p className="container">{venue.bio}</p>
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
