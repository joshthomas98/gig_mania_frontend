import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = { username: username, password: password };

    fetch("http://localhost:8000/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Invalid username or password");
        }
      })
      .then((data) => {
        setLoggedIn(true);
        localStorage.setItem("username", data.username);
        localStorage.setItem("id", data.id);
      })
      .catch((error) => setError(error.message));
  };

  if (loggedIn) {
    return (
      <div>
        <p>You are logged in.</p>
      </div>
    );
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p>{error}</p>}
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="button">
          <button type="submit">Login</button>
        </div>
      </form>
    );
  }
}

export default Login;
