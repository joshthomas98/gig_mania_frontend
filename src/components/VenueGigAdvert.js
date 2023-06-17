import React from "react";

const VenueGigAdvert = () => {
  return (
    <div>
      <div className="col-md">
        <div
          className="card bg-secondary text-light"
          style={{ width: "400px", height: "540px" }}
        >
          <div className="card-body text-center">
            <div className="h1 mb-3">
              <i className="bi bi-person-square"></i>
            </div>
            <p>Gig listed by venue</p>
            <h3 className="card-title mb-3">The Patriot</h3>
            <p>Wales</p>
            <p>30/06/2023</p>
            <p>Genre: Rock</p>
            <p>Type of gig: Original Music</p>
            <p>Artist type: Full band</p>
            <p>Payment: £200</p>
            <p className="card-text">
              Interested in this gig? Click the more details button below to
              find out more and apply.
            </p>
            <a href="/individualgig" className="btn btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueGigAdvert;
