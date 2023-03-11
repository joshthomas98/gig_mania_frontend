import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ArtistRegister() {
  const [bandName, setBandName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [genre, setGenre] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      band_name: bandName,
      email: email,
      username: username,
      password: password,
      genre: genre,
    };

    fetch("http://localhost:8000/bands/", {
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
      <h1 className="text-light mb-4">Register as an Artist</h1>

      <form className="w-50" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="bandName" className="text-light mb-2">
            Band Name:
          </label>
          <input
            type="text"
            placeholder="Enter your band name here"
            className="form-control"
            id="bandName"
            value={bandName}
            onChange={(event) => setBandName(event.target.value)}
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
            Genre:
          </label>
          <select
            className="form-control"
            id="genre"
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
          >
            <option value="">Select a genre</option>
            <option value="Rock">Rock</option>
            <option value="Pop">Pop</option>
            <option value="Jazz">Jazz</option>
            <option value="Country">Country</option>
            <option value="Hip Hop">Hip Hop</option>
            <option value="R&B">R&B</option>
            <option value="Electronic">Electronic</option>
            <option value="Classical">Classical</option>
            <option value="Reggae">Reggae</option>
            <option value="Metal">Metal</option>
            <option value="Folk">Folk</option>
            <option value="Blues">Blues</option>
            <option value="World Music">World Music</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary mt-4">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ArtistRegister;
