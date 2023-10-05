import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import Calendar from "react-calendar";
import { format } from "date-fns-tz";

const ArtistEditAvailability = () => {
  const storedUserId = localStorage.getItem("userId");

  const navigate = useNavigate();

  const { profileId } = useParams();

  const SERVER_BASE_URL = "http://localhost:8000/";

  const [artist, setArtist] = useState([]);
  const [unavailabilities, setUnavailabilities] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [unavailabilityReason, setUnavailabilityReason] = useState("");

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

  // Function to handle saving availability
  const handleSaveAvailability = () => {
    // Check if a date is selected
    if (selectedDate) {
      // Extract the year, month, and day from the selected date
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");

      // Create a new unavailability object with the formatted date
      const dateString = `${year}-${month}-${day}`;

      const newUnavailability = {
        artist: storedUserId, // Remove the curly braces around storedUserId
        date: dateString,
        reason: unavailabilityReason, // Include the reason text
      };

      // Send a POST request to create the unavailability
      fetch(`${SERVER_BASE_URL}unavailabilities/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUnavailability),
      })
        .then((response) => {
          if (response.ok) {
            // Handle successful response, e.g., navigate to a success page
            navigate("/unavailabilitycreated");
          } else {
            // Handle error response
            console.error(
              "Error creating unavailability:",
              response.statusText
            );
          }
        })
        .catch((error) => {
          console.error("Error creating unavailability:", error);
        });
    } else {
      // Handle the case when no date is selected
      console.error("No date selected.");
    }
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

      <div className="pt-4">
        {selectedDate && (
          <div className="unavailability-reason">
            <textarea
              className="px-2"
              style={{ backgroundColor: "white" }}
              placeholder="Please enter the reason for your unavailability"
              value={unavailabilityReason}
              onChange={(e) => setUnavailabilityReason(e.target.value)}
            ></textarea>
          </div>
        )}
      </div>

      <div className="d-flex justify-content-between">
        <Button className="mt-2">Select multiple</Button>
        <Button className="mt-2" onClick={handleSaveAvailability}>
          Save availability
        </Button>
      </div>
    </div>
  );
};

export default ArtistEditAvailability;
