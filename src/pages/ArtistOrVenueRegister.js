import React from "react";

const ArtistOrVenue = () => {
  return (
    <>
      <h1 className="text-light text-center mb-5">
        Are you an artist or a venue?
      </h1>

      <section className="p-5">
        <div className="container">
          <div className="row text-center g-5">
            <div className="col-md">
              <div className="register-card text-light">
                <div className="card-body text-center">
                  <div className="h1 mb-3 mt-3">
                    <i class="bi bi-music-note-beamed"></i>
                  </div>
                  <h3 className="card-title mb-3">ARTIST</h3>
                  <div className="container">
                    <p className="card-text mb-3">
                      I am an artist looking to advertise gig(s) that I can no
                      longer play and or would like to pick up gigs from other
                      artists.
                    </p>
                  </div>
                  <a
                    target={"_blank"}
                    href="/artistregister"
                    className="btn btn-primary my-2 mb-4"
                  >
                    I'm an Artist
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md">
              <div className="register-card text-light">
                <div className="card-body text-center">
                  <div className="h1 mb-3 mt-3">
                    <i class="bi bi-building"></i>
                  </div>
                  <h3 className="card-title mb-3">VENUE</h3>
                  <div className="container">
                    <p className="card-text mb-3">
                      I am a music venue looking to book artists to perform on
                      available dates that I have free.
                    </p>
                  </div>
                  <a
                    target={"_blank"}
                    href="/venueregister"
                    className="btn btn-primary my-2 mb-4"
                  >
                    I'm a Venue
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="text-light text-center py-5 lead">
        <p>
          Already have an account?{" "}
          <span>
            <a href="#">Log In</a>
          </span>
        </p>
      </section>
    </>
  );
};

export default ArtistOrVenue;
