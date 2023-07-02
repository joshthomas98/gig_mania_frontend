import React, { useState, useEffect } from "react";
import { Form, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      // Reset the state variables when the query is empty
      setSuggestions([]);
      setShowSuggestions(false);
    } else {
      // Clear the previous typing timeout
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }

      // Set a new typing timeout
      const timeout = setTimeout(() => {
        fetchSuggestions(query);
      }, 500);

      setTypingTimeout(timeout);
    }
  };

  const fetchSuggestions = async (query) => {
    try {
      const artistResponse = await fetch(
        `http://localhost:8000/artists/search/?q=${query}`
      );
      const artistData = await artistResponse.json();
      const artistSuggestions = artistData.map((artist) => ({
        id: artist.id,
        name: artist.artist_name,
        type: "Artist",
      }));

      const venueResponse = await fetch(
        `http://localhost:8000/venues/search/?q=${query}`
      );
      const venueData = await venueResponse.json();
      const venueSuggestions = venueData.map((venue) => ({
        id: venue.id,
        name: venue._venue_name,
        type: "Venue",
      }));

      // Combine the artist and venue suggestions into a single array
      const combinedSuggestions = [...artistSuggestions, ...venueSuggestions];

      let filteredSuggestions;
      if (query.trim() === "") {
        // If the query is empty, don't show any suggestions
        filteredSuggestions = [];
      } else {
        // Create a regular expression pattern with wildcard characters
        const pattern = new RegExp(query.replace(/\*/g, ".*"), "i");

        // Filter the suggestions based on the regular expression pattern
        filteredSuggestions = combinedSuggestions.filter((profile) =>
          pattern.test(profile.name)
        );
      }

      // Update the suggestions state with the filtered results
      setSuggestions(filteredSuggestions);

      // Show or hide the suggestions dropdown based on the number of suggestions
      setShowSuggestions(filteredSuggestions.length > 0);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleProfileClick = (profile) => {
    // Navigate to the profile page based on the profile's type (artist or venue)
    const profilePage =
      profile.type === "Artist" ? "/artistprofile" : "/venueprofile";
    navigate(`${profilePage}/${profile.id}`);
  };

  console.log(searchQuery);
  console.log(suggestions);

  return (
    <div className="text-light">
      <div className="search-bar-container">
        <Form inline className="mx-auto">
          <FormControl
            type="text"
            placeholder="Search for bands, concerts and venues"
            className="mr-sm-2 rounded-pill"
            style={{ width: "450px" }}
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </Form>
        {showSuggestions && searchQuery.trim() !== "" && (
          <ul className="suggestion-dropdown mt-3">
            {suggestions.map((profile) => (
              <li
                key={profile.id}
                onClick={() => handleProfileClick(profile)}
                style={{ cursor: "pointer" }}
              >
                {profile.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
