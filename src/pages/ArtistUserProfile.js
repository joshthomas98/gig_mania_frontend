import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { LoginContext } from "../App";
import Calendar from "react-calendar";
import { format } from "date-fns-tz";

const ArtistUserProfile = () => {
  const { userId, setUserId, artistOrVenue, setArtistOrVenue } =
    useContext(LoginContext);

  const { profileId } = useParams();

  const navigate = useNavigate();

  const SERVER_BASE_URL = "http://localhost:8000/";

  const [artist, setArtist] = useState([]);
  const [unavailabilities, setUnavailabilities] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedUnavailability, setSelectedUnavailability] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
    const fetchArtist = async () => {
      try {
        const response = await fetch(`${SERVER_BASE_URL}artists/${profileId}/`);
        if (!response.ok) {
          throw new Error("Failed to fetch artist data");
        }
        const data = await response.json();
        console.log(data);
        setArtist([data]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchArtist();
  }, [profileId]);

  useEffect(() => {
    const fetchUnavailabilities = async () => {
      try {
        const response = await fetch(
          `${SERVER_BASE_URL}unavailabilities/${profileId}/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch unavailabilities data");
        }
        const data = await response.json();
        setUnavailabilities(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUnavailabilities();
  }, [profileId]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Function to handle date selection
  const handleDateSelect = (date) => {
    const dateString = formatWithTimezone(date);
    const isDateUnavailable = unavailabilities.some(
      (u) => u.date === dateString
    );

    if (isDateUnavailable) {
      const unavailability = unavailabilities.find(
        (u) => u.date === dateString
      );
      setSelectedUnavailability(unavailability);
      setShowModal(true); // Show the modal
    } else {
      setSelectedUnavailability(null);
    }

    setSelectedDate(date);
  };

  // Function to format a date in the desired timezone
  const formatWithTimezone = (date) => {
    const tz = "Europe/London";
    return format(date, "yyyy-MM-dd", { timeZone: tz });
  };

  return (
    <>
      <h1 className="text-light text-center">My Profile</h1>

      <section className="artist-profile-output text-light">
        {artist.map((artist) => (
          <div className="row py-5 px-4" key={artist.id}>
            <div className="col-lg-8 mx-auto">
              <div className="bg-dark shadow rounded overflow-hidden border border-secondary">
                <div className="px-4 pt-0 pb-4 cover">
                  <div className="media align-items-end profile-head text-center py-5">
                    <div className="profile mr-3">
                      <img
                        src={SERVER_BASE_URL + artist.image}
                        alt="..."
                        width={130}
                        className="rounded mb-2 img-thumbnail"
                      />
                    </div>

                    <div className="media-body text-white">
                      <h4 className="mt-3">{artist.artist_name}</h4>

                      <p>{artist.county}</p>

                      <h6 className="py-3">{artist.genre}</h6>
                    </div>

                    {userId === profileId ? (
                      <a
                        href="/artistprofilesettings"
                        className="btn btn-outline-dark btn-sm btn-block text-light border-secondary mt-3"
                      >
                        Edit profile
                      </a>
                    ) : null}

                    {userId && artistOrVenue === "V" ? (
                      <div className="leave-venue-feedback-btn text-center pt-5">
                        <Button
                          href={`/venuewritereview?artistId=${artist.id}`}
                        >
                          Leave feedback
                        </Button>
                      </div>
                    ) : userId && artistOrVenue === "A" ? null : null}
                  </div>
                </div>

                {userId === profileId ? (
                  <div className="advertise-new-gig text-center pb-4">
                    <Button href="/artistadvertisegig">
                      Advertise a New Gig
                    </Button>
                  </div>
                ) : null}

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
                    <p className="font-italic mb-0 p-3">{artist.bio}</p>
                  </div>
                </div>

                <div className="py-3 px-4 text-center">
                  <h2>Availability</h2>

                  {/* Display the calendar */}
                  <Calendar
                    className="pt-3"
                    value={selectedDate}
                    onChange={handleDateSelect}
                    tileClassName={({ date }) => {
                      const dateString = formatWithTimezone(date);
                      return unavailabilities.find((u) => u.date === dateString)
                        ? "unavailable-date"
                        : "available-date";
                    }}
                  />

                  {artistOrVenue === "A" && userId === profileId ? (
                    <div className="pt-4">
                      <Button href={`/artisteditavailability/${profileId}`}>
                        Edit my availability
                      </Button>
                    </div>
                  ) : null}
                </div>

                {artistOrVenue === "A" && userId === profileId ? (
                  <div className="px-4 pb-2 pt-2">
                    {/* Display the pop-up for unavailable dates */}
                    {selectedUnavailability && (
                      <div className="unavailability-popup">
                        <h3>Date: {selectedUnavailability.date}</h3>
                        <p className="pt-2">
                          Status: {selectedUnavailability.status}
                        </p>
                        <p>Reason: {selectedUnavailability.reason}</p>
                      </div>
                    )}
                  </div>
                ) : null}

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

export default ArtistUserProfile;
