import React from "react";

const IndividualGig = () => {
  return (
    <div className="individual-gig-container text-light">
      <h1 className="individual-gig-heading text-center">About the gig...</h1>

      <p className="individual-gig-artist-info mt-5 lead text-center">
        This gig was listed by the artist Cancel The Transmission
      </p>

      <table className="individual-gig-details table table-bordered mt-5 mb-5 text-light">
        <tbody>
          <tr>
            <td>
              <strong>Venue:</strong> The Patriot
            </td>
            <td>
              <strong>Wales</strong>
            </td>
            <td>
              <strong>30/06/2023</strong>
            </td>
            <td>
              <strong>Genre:</strong> Rock
            </td>
            <td>
              <strong>Type of gig:</strong> Original Music
            </td>
            <td>
              <strong>Artist type:</strong> Full Band
            </td>
            <td>
              <strong>Payment:</strong> £200
            </td>
          </tr>
        </tbody>
      </table>

      <p className="individual-gig-apply-info text-center mb-4">
        Click the apply now button below to apply for this gig. <br /> If your
        application is successful, we'll notify you by email within a few days.
      </p>

      <div className="individual-gig-apply-button text-center">
        <a
          href="/individualgig"
          className="individual-gig-apply-btn btn btn-dark"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
};

export default IndividualGig;
