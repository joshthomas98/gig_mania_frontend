import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { LoginContext } from "../App";

const VenueUserProfile = () => {
  const { userId, setUserId, artistOrVenue, setArtistOrVenue } =
    useContext(LoginContext);

  const { profileId } = useParams();

  const navigate = useNavigate();

  const SERVER_BASE_URL = "http://localhost:8000/";

  const [venue, setVenue] = useState([]);

  useEffect(() => {
    const userIdFromLocalStorage = localStorage.getItem("userId");
    const artistOrVenueFromLocalStorage = localStorage.getItem("artistOrVenue");

    if (!userIdFromLocalStorage || !artistOrVenueFromLocalStorage) {
      navigate("/signin");
    } else {
      setUserId(userIdFromLocalStorage);
      setArtistOrVenue(artistOrVenueFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await fetch(`${SERVER_BASE_URL}venues/${profileId}/`);
        if (!response.ok) {
          throw new Error("Failed to fetch artist data");
        }
        const data = await response.json();
        console.log(data);
        setVenue([data]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchVenue();
  }, [profileId]);

  useEffect(() => {
    console.log(venue);
  });

  return (
    <>
      <h1 className="text-light text-center">My Profile</h1>

      <section className="venue-profile-output text-light">
        {venue.map((venue) => (
          <div className="row py-5 px-4" key={venue.id}>
            <div className="col-lg-8 mx-auto">
              <div className="bg-dark shadow rounded overflow-hidden border border-secondary">
                <div className="px-4 pt-0 pb-4 cover">
                  <div className="media align-items-end profile-head text-center py-5">
                    <div className="profile mr-3">
                      <img
                        src={SERVER_BASE_URL + venue.image}
                        alt="..."
                        width={130}
                        className="rounded mb-2 img-thumbnail"
                      />
                    </div>

                    <div className="media-body text-white">
                      <h4 className="mt-3">{venue.venue_name}</h4>

                      <p>{venue.county}</p>

                      <p className="py-3">{venue.genre}</p>
                    </div>

                    {userId === profileId ? (
                      <a
                        href="/venueprofilesettings"
                        className="btn btn-outline-dark btn-sm btn-block text-light border-secondary mt-3"
                      >
                        Edit profile
                      </a>
                    ) : null}

                    {userId !== profileId && (
                      <div className="leave-venue-feedback-btn text-center pt-5">
                        <Button href="/venuewritereview">Leave feedback</Button>
                      </div>
                    )}
                  </div>
                </div>

                {userId === profileId ? (
                  <div className="show-listed-gigs text-center pb-4">
                    <a href="/mylistedgigs">View my listed gigs</a>
                  </div>
                ) : null}

                <div className="bg-dark p-4 d-flex justify-content-end text-center">
                  <ul className="list-inline mb-0">
                    <li className="list-inline-item">
                      <h5 className="font-weight-bold mb-0 d-block">215</h5>
                      <small className="text-light">Photos</small>
                    </li>

                    <li className="list-inline-item">
                      <h5 className="font-weight-bold mb-0 d-block">745</h5>
                      <small className="text-light">Followers</small>
                    </li>

                    <li className="list-inline-item">
                      <h5 className="font-weight-bold mb-0 d-block">340</h5>
                      <small className="text-light">Following</small>
                    </li>
                  </ul>
                </div>

                <div className="px-4 py-3 text-center">
                  <h4 className="mb-3 mt-3">About</h4>
                  <div className="p-4 rounded shadow-sm bg-dark">
                    <p className="font-italic mb-0 p-3">{venue.bio}</p>
                  </div>
                </div>

                <div className="py-4 px-4">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h5 className="mb-0">Recent photos</h5>
                    <a href="#" className="btn btn-link text-light">
                      Show all
                    </a>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 mb-2 pr-lg-1">
                      <img
                        src="https://images.unsplash.com/photo-1469594292607-7bd90f8d3ba4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                        alt=""
                        className="img-fluid rounded shadow-sm"
                      />
                    </div>
                    <div className="col-lg-6 mb-2 pl-lg-1">
                      <img
                        src="https://images.unsplash.com/photo-1493571716545-b559a19edd14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                        alt=""
                        className="img-fluid rounded shadow-sm"
                      />
                    </div>
                    <div className="col-lg-6 pr-lg-1 mb-2">
                      <img
                        src="https://images.unsplash.com/photo-1453791052107-5c843da62d97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                        alt=""
                        className="img-fluid rounded shadow-sm"
                      />
                    </div>
                    <div className="col-lg-6 pl-lg-1">
                      <img
                        src="https://images.unsplash.com/photo-1475724017904-b712052c192a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                        alt=""
                        className="img-fluid rounded shadow-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default VenueUserProfile;
