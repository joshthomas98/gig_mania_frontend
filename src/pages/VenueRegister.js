import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function VenueRegister() {
  const [venueName, setVenueName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [typeOfMusic, setTypeOfMusic] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      venue_name: venueName,
      email: email,
      username: username,
      password: password,
      type_of_music: typeOfMusic,
    };

    fetch("http://localhost:8000/venues/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          navigate("/usercreated");
        }
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });
  };

  return (
    <div>
      <h1 className="text-light mb-4">Register as a Venue</h1>

      <form className="w-50" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="bandName" className="text-light mb-2">
            Venue Name:
          </label>
          <input
            type="text"
            placeholder="Enter your venue name here"
            className="form-control"
            id="venueName"
            value={venueName}
            onChange={(event) => setVenueName(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="text-light mb-2 mt-3">
            Email:
          </label>
          <input
            type="email"
            placeholder="Enter your email here"
            className="form-control"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="username" className="text-light mb-2 mt-3">
            Username:
          </label>
          <input
            type="text"
            placeholder="Enter your username here"
            className="form-control"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="text-light mb-2 mt-3">
            Password:
          </label>
          <input
            type="password"
            placeholder="Enter your password here"
            className="form-control"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="genre" className="text-light mb-2 mt-3">
            Type of music you have at your venue:
          </label>
          <select
            className="form-control"
            id="typeofmusic"
            value={typeOfMusic}
            onChange={(event) => setTypeOfMusic(event.target.value)}
          >
            <option value="">Select a type of music</option>
            <option value="Original Music">Original Music</option>
            <option value="Covers">Covers</option>
            <option value="Both">Both</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary mt-4">
          Submit
        </button>
      </form>
    </div>
  );
}

export default VenueRegister;
