import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";

const VenueCreateGig = () => {
  const { userId, setUserId, artistOrVenue, setArtistOrVenue } =
    useContext(LoginContext);

  const navigate = useNavigate();

  if (!userId || !artistOrVenue) {
    navigate("/signin");
  } else if (userId && artistOrVenue !== "V") {
    navigate("/restrictedpage");
  }

  return (
    <div>
      <h2 className="text-center text-light">
        Choose the Type of Gig You Want to Add
      </h2>
      <section id="venue-functionality_boxes" className="p-5">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-md">
              <div className="homepage-card bg-secondary text-light">
                <div className="card-body text-center p-4">
                  <div className="h1 mb-3">
                    <i className="bi bi-person-check"></i>
                  </div>
                  <h3 className="card-title mb-3">Add a Confirmed Gig</h3>
                  <p className="card-text lead">
                    The artist has already been booked and confirmed for this
                    gig. Add this gig to your schedule now.
                  </p>
                  <button
                    className="btn btn-primary text-light my-2"
                    // onClick={handleVenueFindArtistsClick}
                  >
                    Add Confirmed Gig
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md">
              <div className="homepage-card bg-secondary text-light">
                <div className="card-body text-center p-4">
                  <div className="h1 mb-3">
                    <i className="bi bi-megaphone"></i>
                  </div>
                  <h3 className="card-title mb-3">Advertise an Open Gig</h3>
                  <p className="card-text lead">
                    Don't have an artist booked yet? No problem! Advertise this
                    gig date to find a performer.
                  </p>
                  <button
                    className="btn btn-primary text-light my-2"
                    // onClick={handleVenueProfileInfoBoxClick}
                  >
                    Advertise Gig Date
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VenueCreateGig;
