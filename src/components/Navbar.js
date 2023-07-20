import { useContext } from "react";
import { Button, Navbar } from "react-bootstrap";
import { LoginContext } from "../App";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const NavbarComponent = () => {
  const navigate = useNavigate();
  const { userId, setUserId, artistOrVenue, setArtistOrVenue } =
    useContext(LoginContext);

  const handleProfileButtonClick = () => {
    if (localStorage.userId !== "" && localStorage.artistOrVenue === "A") {
      navigate("/artistuserprofile");
    } else if (
      localStorage.userId !== "" &&
      localStorage.artistOrVenue === "V"
    ) {
      navigate("/venueuserprofile");
    } else {
      navigate("/signin");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/signin");
  };

  const renderLogin = () => {
    if (localStorage.userId != null && localStorage.artistOrVenue != null) {
      return (
        <Button
          className="mx-2 mb-3"
          variant="secondary"
          onClick={handleLogout}
        >
          Logout
        </Button>
      );
    } else {
      return (
        <Button className="mx-2 mb-3" variant="secondary" onClick={handleLogin}>
          Login
        </Button>
      );
    }
  };

  return (
    <Navbar expand="sm">
      <Navbar.Brand href="/">
        <img
          src="../../images/gigsweep_logo.png"
          width="300"
          height="300"
          className="d-inline-block align-top mb-5"
          alt="Gig Mania Logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-between">
        <div inline className="mx-auto">
          <SearchBar />
        </div>

        <div className="ml-auto">
          <i
            className="bi bi-person h1 px-2"
            onClick={handleProfileButtonClick}
            style={{ color: "white", cursor: "pointer" }}
          ></i>
          <Button
            className="mx-2 mb-3"
            href="/artistorvenueregister"
            variant="secondary"
          >
            Register
          </Button>
          <Button className="mx-2 mb-3" href="/pickupgig" variant="secondary">
            Find Gigs
          </Button>
          <Button
            className="mx-2 mb-3"
            href="/mylistedgigs"
            variant="secondary"
          >
            MLG's
          </Button>

          {renderLogin()}
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
