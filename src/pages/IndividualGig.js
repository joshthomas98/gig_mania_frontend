import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../App";
import LoadingSpinner from "../components/LoadingSpinner";

const IndividualGig = () => {
  const { userId, setUserId, artistOrVenue, setArtistOrVenue } =
    useContext(LoginContext);

  const storedUserId = localStorage.getItem("userId");
  const storedUserType = localStorage.getItem("artistOrVenue");

  const navigate = useNavigate();

  const { userType, gigId } = useParams();

  const [gigDetails, setGigDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [venueId, setVenueId] = useState(null);

  useEffect(() => {
    const fetchGigData = async () => {
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

    fetchGigData();
  }, [userType, gigId]);

  useEffect(() => {
    const fetchVenueData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/gigapplications/${gigId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const venue = data.venue; // Assuming "venue" is the key in the response
          setVenueId(venue);
        }
      } catch (error) {
        console.error("Error fetching venue data:", error);
      }
    };

    fetchVenueData();
  }, [gigId]);

  const handleApplyNowClick = async () => {
    setIsLoading(true);

    try {
      // Assuming you have "individualArtistData" and "gigDetails" defined earlier
      const postResponse = await fetch(
        "http://localhost:8000/gigapplications/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            artist: gigDetails.artist,
            venue: venueId, // Use the fetched venueId
            date_of_gig: gigDetails.date_of_gig,
            email: gigDetails.email,
          }),
        }
      );

      if (postResponse.ok) {
        console.log("Data sent successfully");
        console.log(venueId);
        navigate("/gigapplicationsuccess");
      } else {
        console.error("Request failed with status:", postResponse.status);
      }
    } catch (error) {
      console.error("Error occurred while sending data:", error);
    }

    setIsLoading(false);
  };

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
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <a
                className="individual-gig-apply-btn btn btn-secondary"
                onClick={handleApplyNowClick}
              >
                Apply Now
              </a>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default IndividualGig;
