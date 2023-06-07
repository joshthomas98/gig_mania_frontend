import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import IncorrectLoginModal from "../components/IncorrectLoginModal";
import { LoginContext } from "../App";

const SignIn = () => {
  const navigate = useNavigate();
  const { userId, setUserId, artistOrVenue, setArtistOrVenue } =
    useContext(LoginContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleSignIn = (e) => {
    e.preventDefault();
    const url =
      artistOrVenue === "A"
        ? "http://localhost:8000/artists/validate/"
        : "http://localhost:8000/venues/validate/";
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUserId(data.id);
        setArtistOrVenue(artistOrVenue);

        if (data.id != null && artistOrVenue === "A") {
          navigate("/artistuserprofile");
        } else if (data.id != null && artistOrVenue === "V") {
          navigate("/venueuserprofile");
        } else {
          handleShowModal();
        }
      });
  };

  const handleUserTypeChange = (event) => {
    setArtistOrVenue(event.target.value === "artist" ? "A" : "V");
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

            <div className="form-group">
              <label htmlFor="userType" className="text-light mb-2 mt-3">
                I am...
              </label>
              <div className="d-flex align-items-center">
                <label className="text-light me-3">
                  <input
                    type="radio"
                    name="userType"
                    value="artist"
                    checked={artistOrVenue === "A"}
                    onChange={handleUserTypeChange}
                  />{" "}
                  An artist
                </label>
                <label className="text-light">
                  <input
                    type="radio"
                    name="userType"
                    value="venue"
                    checked={artistOrVenue === "V"}
                    onChange={handleUserTypeChange}
                  />{" "}
                  A venue
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary mt-4">
              Sign In
            </button>

            {showModal && (
              <IncorrectLoginModal
                show={showModal}
                handleClose={handleCloseModal}
              />
            )}
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
              <li>Opportunities to fill in canceled gigs</li>
              <li>A platform to promote your music</li>
              <li>Improved chances of getting booked</li>
              <li>Increased exposure for your music</li>
              <li>Time-saving booking process</li>
            </ul>

            <a
              target={"_blank"}
              href="/artistorvenueregister"
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

export default SignIn;
