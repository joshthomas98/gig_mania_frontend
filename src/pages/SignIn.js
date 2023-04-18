import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignInForm = (props) => {
  const navigate = useNavigate();

  const { setIsArtistLoggedIn } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/bands/validate/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setIsArtistLoggedIn(true);
          navigate("/advertisegig");
        } else {
          alert(data.error);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="grid-container">
        <div>
          <h3 className="text-light mb-2">LOG IN TO YOUR ACCOUNT</h3>

          <form className="mb-5" onSubmit={handleSignIn}>
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
