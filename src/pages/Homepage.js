import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../components/Carousel";
import { LoginContext } from "../App";

import FeaturedArtists from "../components/FeaturedArtists";
import Testimonials from "../components/Testimonials";
import MembershipPlans from "../components/MembershipPlans";

const Homepage = () => {
  const { userId, setUserId, artistOrVenue, setArtistOrVenue } =
    useContext(LoginContext);

  const navigate = useNavigate();

  const PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH =
    "https://gigsweep-express.vercel.app/";

  if (!userId || !artistOrVenue) {
    navigate("/signin");
  }

  const [email, setEmail] = useState("");

  const handlePickUpGigClick = () => {
    navigate("/pickupgig");
  };

  const handleAdvertiseSubmit = () => {
    if (userId && artistOrVenue === "A") {
      navigate("/artistadvertisegig");
    } else if (userId && artistOrVenue === "V") {
      navigate("/venueadvertisegig");
    } else if (!userId && !artistOrVenue) {
      navigate("/signin");
    }
  };

  const handleArtistProfileInfoBoxClick = () => {
    navigate(`/artistuserprofile/${userId}`);
  };

  const handleVenueFindArtistsClick = () => {
    navigate("/venuesearchforartist");
  };

  const handleVenueProfileInfoBoxClick = () => {
    navigate(`/venueuserprofile/${userId}`);
  };

  const handleNewsletterSignUp = (event) => {
    event.preventDefault();
    const data = {
      email: email,
    };

    fetch(`${PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH}/newslettersignups/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          navigate("/newsletterthankyou");
        }
      })
      .catch((error) => {
        console.error("Error signing up for newsletter:", error);
      });
  };

  return (
    <div>
      {/* Carousel section */}
      <section>
        <Carousel />
      </section>

      <section className="text-light text-center mt-5">
        <h3 className="mb-4">GigSweep - The All-In-One Gigging Platform.</h3>
        <p className="lead">
          At GigSweep, we understand the importance of every gig to an artist.
          That's why we created a platform where musicians and bands can
          advertise gigs that they have booked, but can no longer play, and
          allow other artists to come in and pick up those gigs instead. We
          believe that every artist should have the chance to perform, and by
          allowing musicians to collaborate and work together, we can ensure
          that no gig goes to waste. Whether you're a solo artist, a band, or a
          DJ, our platform provides you with the opportunity to showcase your
          talent and perform in front of new audiences.
        </p>
        <p className="lead pb-4">
          But GigSweep isn't just for musicians. We also provide a simple and
          efficient system for music venues to find and book the best talent in
          their local area. And for fans, we offer a convenient way to stay
          up-to-date with their favourite artists' gigs and never miss a
          performance. Join our community today and discover a new world of
          opportunities. Whether you're a musician, a music venue, or a fan,
          GigSweep is the platform for you.
        </p>
      </section>

      {/* Info boxes section */}
      {userId && artistOrVenue === "A" ? (
        <section id="artist-functionality_boxes" className="p-5">
          <div className="container">
            <div className="row text-center g-4">
              <div className="col-md">
                <div className="homepage-card bg-secondary text-light">
                  <div className="card-body text-center p-3">
                    <div className="h1 mb-3">
                      <i className="bi bi-search"></i>
                    </div>
                    <h3 className="card-title mb-3">Fill Your Schedule</h3>
                    <p className="card-text">
                      Looking to fill your your gig calendar? Browse available
                      slots at great venues. Whether you're a solo artist, duo
                      or part of a band, discover chances to shine and connect
                      with fresh fans.
                    </p>
                    <button
                      className="btn btn-primary text-light my-2"
                      onClick={handlePickUpGigClick}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-md">
                <div className="homepage-card bg-secondary text-light">
                  <div className="card-body text-center p-3">
                    <div className="h1 mb-3">
                      <i className="bi bi-badge-ad"></i>
                    </div>
                    <h3 className="card-title mb-3">Advertise Gigs</h3>
                    <p className="card-text">
                      Got a gig that you can't play anymore? Advertise it here
                      and let fellow artists pick up the gig instead. Share your
                      stage and keep the music alive.
                    </p>
                    <button
                      className="btn btn-primary text-light my-2"
                      onClick={handleAdvertiseSubmit}
                    >
                      Advertise
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-md">
                <div className="homepage-card bg-secondary text-light">
                  <div className="card-body text-center p-3">
                    <div className="h1 mb-3">
                      <i className="bi bi-play"></i>
                    </div>
                    <h3 className="card-title mb-3">Be Seen, Be Heard</h3>
                    <p className="card-text">
                      Enhance your artistic presence online and get found by
                      more people. Curate and showcase your media seamlessly,
                      building a comprehensive artist profile.
                    </p>
                    <button
                      className="btn btn-primary text-light my-2"
                      onClick={handleArtistProfileInfoBoxClick}
                    >
                      Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : userId && artistOrVenue === "V" ? (
        <section id="venue-functionality_boxes" className="p-5">
          <div className="container">
            <div className="row text-center g-4">
              <div className="col-md">
                <div className="homepage-card bg-secondary text-light">
                  <div className="card-body text-center p-3">
                    <div className="h1 mb-3">
                      <i className="bi bi-search"></i>
                    </div>
                    <h3 className="card-title mb-3">Book Your Acts</h3>
                    <p className="card-text">
                      Ready for live music? Discover a varied artist lineup for
                      your venue. Filter by genre, location, and availability to
                      find exact matches for your requirements.
                    </p>
                    <button
                      className="btn btn-primary text-light my-2"
                      onClick={handleVenueFindArtistsClick}
                    >
                      Book Artists
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-md">
                <div className="homepage-card bg-secondary text-light">
                  <div className="card-body text-center p-3">
                    <div className="h1 mb-3">
                      <i class="bi bi-calendar-week"></i>
                    </div>
                    <h3 className="card-title mb-3">Effortless Management</h3>
                    <p className="card-text">
                      Streamline artist bookings with our integrated booking
                      system. Control your venue's entertainment calendar,
                      creating seamless shows from start to encore.
                    </p>
                    <button
                      className="btn btn-primary text-light my-2"
                      onClick={handleVenueProfileInfoBoxClick}
                    >
                      View Bookings
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-md">
                <div className="homepage-card bg-secondary text-light">
                  <div className="card-body text-center p-3">
                    <div className="h1 mb-3">
                      <i className="bi bi-play"></i>
                    </div>
                    <h3 className="card-title mb-3">Let The Music Play</h3>
                    <p className="card-text">
                      Elevate your venue's presence and event promotion. Use
                      your profile to highlight your space, and showcase
                      upcoming events to attract talented artists and
                      enthusiastic fans.
                    </p>
                    <button
                      className="btn btn-primary text-light my-2"
                      onClick={handleVenueProfileInfoBoxClick}
                    >
                      Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Featured artists section */}
      <section className="pt-3">
        <FeaturedArtists />
      </section>

      {/* Testimonials section */}
      <section className="pt-4">
        <Testimonials />
      </section>

      <section>
        <MembershipPlans />
      </section>

      <section className="pt-3">
        <h2 className="text-light text-center">
          Want to stay up to date with everything happening at GigSweep?
        </h2>

        <h4 className="text-light text-center py-3">
          Sign up for our monthly newsletter here!
        </h4>

        <form
          className="mb-5 d-flex flex-column align-items-center"
          onSubmit={handleNewsletterSignUp}
        >
          <div className="form-group py-2">
            <input
              type="email"
              placeholder="Enter your email here"
              className="form-control"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              style={{ width: "400px" }}
            />
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            Sign Up
          </button>
        </form>
      </section>
    </div>
  );
};

export default Homepage;
