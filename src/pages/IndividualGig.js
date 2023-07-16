import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const IndividualGig = () => {
  const { userType, gigId } = useParams();
  const [gigDetails, setGigDetails] = useState(null);

  useEffect(() => {
    // Make a fetch call based on the userType and gigId
    const fetchData = async () => {
      try {
        let url = "";
        if (userType === "Artist") {
          url = `http://localhost:8000/artist_listed_gigs/${gigId}/`;
        } else if (userType === "Venue") {
          url = `http://localhost:8000/venue_listed_gigs/${gigId}/`;
        }

        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setGigDetails(data);
        }
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };

    fetchData();
  }, [userType, gigId]);

  return (
    <div className="individual-gig-container text-light">
      <h1 className="individual-gig-heading text-center">About the gig...</h1>

      {gigDetails && (
        <>
          <p className="individual-gig-artist-info mt-5 lead text-center">
            {userType === "Artist"
              ? `This gig was listed by the artist ${gigDetails.artist_name}`
              : `This gig was listed by the venue ${gigDetails.venue_name}`}
          </p>

          <table className="individual-gig-details table table-bordered mt-5 mb-5 text-light">
            <tbody>
              <tr>
                <td>
                  <strong>Venue:</strong> {gigDetails.venue_name}
                </td>
                <td>
                  <strong>{gigDetails.country_of_venue}</strong>
                </td>
                <td>
                  <strong>{gigDetails.date_of_gig}</strong>
                </td>
                <td>
                  <strong>Genre:</strong> {gigDetails.genre_of_gig}
                </td>
                <td>
                  <strong>Type of gig:</strong> {gigDetails.type_of_gig}
                </td>
                <td>
                  <strong>Artist type:</strong> {gigDetails.artist_type}
                </td>
                <td>
                  <strong>Payment:</strong> £{gigDetails.payment}
                </td>
              </tr>
            </tbody>
          </table>

          <p className="individual-gig-apply-info text-center mb-4">
            Click the apply now button below to apply for this gig. <br /> If
            your application is successful, we'll notify you by email within a
            few days.
          </p>

          <div className="individual-gig-apply-button text-center">
            <a
              href="/individualgig"
              className="individual-gig-apply-btn btn btn-secondary"
            >
              Apply Now
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default IndividualGig;
