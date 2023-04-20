import React from "react";
import Carousel from "../components/Carousel";

import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  const handleAdvertiseSubmit = () => {
    navigate("/advertisegig");
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
      <section className="p-5">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-md">
              <div className="card bg-secondary text-light">
                <div className="card-body text-center">
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
              <div className="card bg-secondary text-light">
                <div className="card-body text-center">
                  <div className="h1 mb-3">
                    <i className="bi bi-search"></i>
                  </div>
                  <h3 className="card-title mb-3">Find a Band</h3>
                  <p className="card-text">
                    Do you run a venue/pub and need a band/artist at short
                    notice or sometime in the future? Click here to filter by
                    date and see what artists are available.
                  </p>
                  <a href="/bandsearch" className="btn btn-primary my-2">
                    Find Gigs
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md">
              <div className="card bg-secondary text-light">
                <div className="card-body text-center">
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
    </div>
  );
};

export default Homepage;
