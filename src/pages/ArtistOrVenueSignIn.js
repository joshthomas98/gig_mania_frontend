import React from "react";
import { useNavigate } from "react-router-dom";

//get LogInStatus from state
//console.log "status when loading login selection page" : LogInStatus

const ArtistOrVenueSignIn = () => {
  const navigate = useNavigate();

  const handleArtistClick = () => {
    navigate("/signin", { state: { userType: "A" } });
  };

  const handleVenueClick = () => {
    navigate("/signin", { state: { userType: "V" } });
  };

  return (
    <>
      <section className="text-light">
        <h1 className="text-center">Log in as an Artist or a Venue</h1>
      </section>

      <section className="p-5">
        <div className="container">
          <div className="row text-center g-5">
            <div className="col-md">
              <div className="register-card bg-secondary text-light">
                <div className="card-body text-center p-3">
                  <div className="h1 mb-3">
                    <i class="bi bi-music-note-beamed"></i>
                  </div>
                  <h3 className="card-title mb-3">ARTIST</h3>
                  <p className="card-text">
                    I am an artist looking to advertise gig(s) that I can no
                    longer play and or would like to pick up gigs from other
                    artists.
                  </p>
                  <button
                    className="btn btn-primary my-2"
                    onClick={handleArtistClick}
                  >
                    I'm an Artist
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md">
              <div className="register-card bg-secondary text-light">
                <div className="card-body text-center p-3">
                  <div className="h1 mb-3">
                    <i class="bi bi-building"></i>
                  </div>
                  <h3 className="card-title mb-3">VENUE</h3>
                  <p className="card-text">
                    I am a music venue looking to book artists to perform on
                    available dates that I have free.
                  </p>
                  <button
                    className="btn btn-primary my-2"
                    onClick={handleVenueClick}
                  >
                    I'm a Venue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ArtistOrVenueSignIn;
