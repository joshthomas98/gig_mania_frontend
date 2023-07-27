import { useContext, useEffect, useState } from "react";
import { Button, Navbar } from "react-bootstrap";
import { LoginContext } from "../App";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const NavbarComponent = () => {
  const navigate = useNavigate();
  const { userId, setUserId, artistOrVenue, setArtistOrVenue } =
    useContext(LoginContext);

  const storedUserId = localStorage.getItem("userId");
  const storedUserType = localStorage.getItem("artistOrVenue");

  const SERVER_BASE_URL = "http://localhost:8000/";

  const [artist, setArtist] = useState([]);
  const [venue, setVenue] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (storedUserId && storedUserType === "A") {
        try {
          const response = await fetch(
            `${SERVER_BASE_URL}artists/${storedUserId}/`
          );
          const data = await response.json();
          setArtist([data]); // Set the fetched artist as an array with a single element
        } catch (error) {
          console.log(error);
        }
      } else if (storedUserId && storedUserType === "V") {
        try {
          const response = await fetch(
            `${SERVER_BASE_URL}venues/${storedUserId}/`
          );
          const data = await response.json();
          setVenue([data]); // Set the fetched venue as an array with a single element
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchUserData();
  }, [storedUserId, storedUserType]); // Run this effect whenever storedUserId or storedUserType changes

  const handleProfileButtonClick = () => {
    if (storedUserId && storedUserType === "A") {
      navigate("/artistuserprofile");
    } else if (storedUserId && storedUserType === "V") {
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
          className="mx-2 mb-3 py-2"
          variant="secondary"
          onClick={handleLogout}
        >
          Logout
        </Button>
      );
    } else {
      return (
        <Button
          className="mx-2 mb-3 py-2"
          variant="secondary"
          onClick={handleLogin}
        >
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
          width="320"
          height="170"
          className="d-inline-block align-top mb-5 mt-3"
          alt="Gig Mania Logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-between">
        <div inline className="mx-auto">
          <SearchBar />
        </div>

        <div className="ml-auto">
          {!storedUserId && !storedUserType ? (
            <i
              className="bi bi-person h1 px-2"
              onClick={handleProfileButtonClick}
              style={{ color: "white", cursor: "pointer" }}
            ></i>
          ) : storedUserId && storedUserType === "A" ? (
            <>
              {artist.length > 0 ? (
                <img
                  src={SERVER_BASE_URL + artist[0].image}
                  alt="..."
                  width={50}
                  className="rounded mb-2 img-thumbnail mx-2"
                  onClick={handleProfileButtonClick}
                  style={{ color: "white", cursor: "pointer" }}
                />
              ) : null}
            </>
          ) : storedUserId && storedUserType === "V" ? (
            <>
              {venue.length > 0 ? (
                <img
                  src={SERVER_BASE_URL + venue[0].image}
                  alt="..."
                  width={60}
                  className="rounded mb-2 img-thumbnail mx-2"
                  onClick={handleProfileButtonClick}
                  style={{ color: "white", cursor: "pointer" }}
                />
              ) : null}
            </>
          ) : null}

          <Button
            className="mx-2 mb-3 py-2"
            href="/artistorvenueregister"
            variant="secondary"
          >
            Register
          </Button>
          <Button
            className="mx-2 mb-3 py-2"
            href="/pickupgig"
            variant="secondary"
          >
            Find Gigs
          </Button>

          {renderLogin()}
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
