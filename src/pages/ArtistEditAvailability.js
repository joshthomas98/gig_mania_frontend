import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import Calendar from "react-calendar";
import { format } from "date-fns-tz";

const ArtistEditAvailability = () => {
  const { profileId } = useParams();

  const SERVER_BASE_URL = "http://localhost:8000/";

  const [artist, setArtist] = useState([]);
  const [unavailabilities, setUnavailabilities] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch(`${SERVER_BASE_URL}artists/${profileId}/`);
        if (!response.ok) {
          throw new Error("Failed to fetch artist data");
        }
        const data = await response.json();
        console.log(data);
        setArtist([data]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchArtist();
  }, [profileId]);

  useEffect(() => {
    const fetchUnavailabilities = async () => {
      try {
        const response = await fetch(
          `${SERVER_BASE_URL}unavailabilities/${profileId}/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch unavailabilities data");
        }
        const data = await response.json();
        setUnavailabilities(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUnavailabilities();
  }, [profileId]);

  // Function to handle date selection
  const handleDateSelect = (date) => {
    const dateString = date.toISOString().split("T")[0];
    const isDateUnavailable = unavailabilities.some(
      (u) => u.date === dateString
    );

    if (!isDateUnavailable) {
      if (selectedDate && date.toDateString() === selectedDate.toDateString()) {
        // Deselect the date if it's already selected
        setSelectedDate(null);
      } else {
        // Select the date if it's not selected
        setSelectedDate(date);
      }
    }
  };

  // Function to format a date in the desired timezone
  const formatWithTimezone = (date) => {
    const tz = "Europe/London";
    return format(date, "yyyy-MM-dd", { timeZone: tz });
  };

  return (
    <div className="text-light text-center">
      <h1 className="mb-4">Edit Your Availability</h1>

      <p className="mb-4 lead">
        Has your availability changed? No problem!<br></br>Select any dates that
        you're no longer available for and hit save availability to save them to
        your profile.
      </p>
      {/* Display the calendar */}
      <Calendar
        className="pt-3"
        value={selectedDate}
        onChange={handleDateSelect}
        tileClassName={({ date, view }) => {
          const dateString = formatWithTimezone(date); // Format date with timezone
          return unavailabilities.find((u) => u.date === dateString)
            ? "unavailable-date"
            : "available-date";
        }}
      />

      <div className="d-flex justify-content-between">
        <Button className="mt-4">Select multiple</Button>
        <Button className="mt-4">Save availability</Button>
      </div>
    </div>
  );
};

export default ArtistEditAvailability;
