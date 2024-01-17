import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";

const MyBookings = () => {
  const { userId, setUserId, artistOrVenue, setArtistOrVenue } =
    useContext(LoginContext);

  const navigate = useNavigate();

  const SERVER_BASE_URL = "http://localhost:8000/";

  const [artist, setArtist] = useState({});

  useEffect(() => {
    const userIdFromLocalStorage = localStorage.getItem("userId");
    const artistOrVenueFromLocalStorage = localStorage.getItem("artistOrVenue");

    if (!userIdFromLocalStorage || !artistOrVenueFromLocalStorage) {
      navigate("/signin");
    } else {
      setUserId(userIdFromLocalStorage);
      setArtistOrVenue(artistOrVenueFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch(`${SERVER_BASE_URL}artists/${userId}/`);
        if (!response.ok) {
          throw new Error("Failed to fetch artist data");
        }
        const data = await response.json();
        console.log(data);
        setArtist(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchArtist();
  }, [userId]);

  return (
    <div>
      <h1 className="text-light text-center">My Bookings</h1>

      <table className="table table-bordered mt-5 mb-5 text-light">
        <thead>
          <tr>
            <th>Date</th>
            <th>Venue</th>
          </tr>
        </thead>
        <tbody>
          {artist.upcoming_gigs &&
            artist.upcoming_gigs.map((gig, index) => (
              <tr key={index}>
                <td>{gig.date}</td>
                <td>{gig.venue}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyBookings;
