import React, { useState } from "react";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      email: email,
      password: password,
    };

    const response = await fetch(
      `http://localhost:8000/bands/validate/${email}/${password}/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      // Perform any action you want with the response data
    } else {
      console.error("Failed to sign in");
    }
  };

  return (
    <>
      <div className="grid-container">
        <div>
          <h3 className="text-light mb-2">LOG IN TO YOUR ACCOUNT</h3>

          <form className="mb-5" onSubmit={handleSubmit}>
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
        </div>

        <div>
          <div
            style={{
              display: "flex",
              alignItems: "left",
              flexDirection: "column",
            }}
          >
            <h3 className="text-light mb-4">New to GigSweep?</h3>

            <h5 className="text-light mb-2">GigSweep account benefits</h5>

            <ul className="text-light mt-2">
              <li>Access to a wider network of musicians and venues</li>
              <li>Opportunities to fill in cancelled gigs</li>
              <li>A platform to promote your music</li>
              <li>Improved chances of getting booked</li>
              <li>Increased exposure for your music</li>
              <li>Time-saving booking process</li>
            </ul>

            <a
              target={"_blank"}
              href="/artistorvenue"
              className="btn btn-secondary mt-4"
              style={{ width: "300px" }}
            >
              CREATE YOUR GIGSWEEP ACCOUNT
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInForm;
