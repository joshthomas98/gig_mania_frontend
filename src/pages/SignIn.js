import React, { useState } from "react";

const SignInForm = () => {
  const [bandName, setBandName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(bandName, email, password);
    // Perform your sign in logic here (such as making a network request)
  };

  return (
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

      <button type="submit" className="btn btn-primary mt-4">
        Sign In
      </button>
    </form>
  );
};

export default SignInForm;
