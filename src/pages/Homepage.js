import React, { useState } from "react";
import Carousel from "../components/Carousel";

import { useNavigate } from "react-router-dom";
import FeaturedArtists from "../components/FeaturedArtists";
import Testimonials from "../components/Testimonials";

const Homepage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleAdvertiseSubmit = () => {
    navigate("/advertisegig");
  };

  const handleFindGigsSubmit = () => {
    navigate("/venuesearchforartist");
  };

  const handleNewsletterSignUp = (event) => {
    event.preventDefault();
    const data = {
      email: email,
    };

    fetch("http://localhost:8000/newslettersignups/", {
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
        <p className="lead">
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
      <section id="functionality boxes" className="p-5">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-md">
              <div className="homepage-card bg-secondary text-light">
                <div className="card-body text-center p-3">
                  <div className="h1 mb-3">
                    <i className="bi bi-badge-ad"></i>
                  </div>
                  <h3 className="card-title mb-3">Advertise Gigs</h3>
                  <p className="card-text">
                    Artists! Got a gig booked in that you can no longer play for
                    whatever reason? Click here to advertise your gig and let
                    another artist pick it up.
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
                    <i className="bi bi-search"></i>
                  </div>
                  <h3 className="card-title mb-3">Find a Band</h3>
                  <p className="card-text">
                    Do you run a venue/pub and need a band/artist at short
                    notice or sometime in the future? Click here to filter by
                    date and see what artists are available.
                  </p>
                  <button
                    className="btn btn-primary text-light my-2"
                    onClick={handleFindGigsSubmit}
                  >
                    Find Gigs
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md">
              <div className="homepage-card bg-secondary text-light">
                <div className="card-body text-center p-3">
                  <div className="h1 mb-3">
                    <i className="bi bi-ticket-detailed"></i>
                  </div>
                  <h3 className="card-title mb-3">See Gigs In Your Area</h3>
                  <p className="card-text">
                    Craving your next live music experience? Click here to find
                    out what artists are playing in your area soon via
                    Bandsintown and never miss your favourites!
                  </p>
                  <a
                    target={"_blank"}
                    href="https://www.bandsintown.com"
                    className="btn btn-primary my-2"
                  >
                    Find Gigs
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured artists section */}
      <section className="py-2">
        <FeaturedArtists />
      </section>

      {/* Testimonials section */}
      <section>
        <Testimonials />
      </section>

      <section className="pt-5">
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
