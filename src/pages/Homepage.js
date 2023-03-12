import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import Footer from "../components/Footer";

const Homepage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleAdvertise = () => {
    if (user) {
      navigate("/form");
    } else {
      navigate("/signin");
    }
  };

  return (
    <div>
      {/* Showcase area displaying upcoming events by calling Bandsintown API */}
      <section></section>

      {/* Info boxes section */}
      <section className="p-5">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-md">
              <div className="card bg-secondary text-light">
                <div className="card-body text-center">
                  <div className="h1 mb-3">
                    <i class="bi bi-badge-ad"></i>
                  </div>
                  <h3 className="card-title mb-3">Advertise Gigs</h3>
                  <p className="card-text">
                    Artists! Got a gig booked in that you can no longer play for
                    whatever reason? Click here to advertise your gig and let
                    another artist pick it up.
                  </p>
                  <button
                    className="btn btn-primary text-light my-2"
                    onClick={handleAdvertise}
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
                    <i class="bi bi-search"></i>
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
                    <i class="bi bi-ticket-detailed"></i>
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
