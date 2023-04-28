import React from "react";

const ArtistOrVenueSignIn = () => {
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
                <div className="card-body text-center">
                  <div className="h1 mb-3">
                    <i class="bi bi-music-note-beamed"></i>
                  </div>
                  <h3 className="card-title mb-3">ARTIST</h3>
                  <p className="card-text">
                    I am an artist looking to advertise gig(s) that I can no
                    longer play and or would like to pick up gigs from other
                    artists.
                  </p>
                  <a href="/artistsignin" className="btn btn-primary my-2">
                    I'm an Artist
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md">
              <div className="register-card bg-secondary text-light">
                <div className="card-body text-center">
                  <div className="h1 mb-3">
                    <i class="bi bi-building"></i>
                  </div>
                  <h3 className="card-title mb-3">VENUE</h3>
                  <p className="card-text">
                    I am a music venue looking to book artists to perform on
                    available dates that I have free.
                  </p>
                  <a href="/venuesignin" className="btn btn-primary my-2">
                    I'm a Venue
                  </a>
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
