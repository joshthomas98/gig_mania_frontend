import React, { useContext, useEffect, useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap"; // Import Nav and Dropdown components
import { LoginContext } from "../App";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const hamburgerIcon = (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="24" height="24" rx="4" fill="transparent" fillOpacity="0" />
    <rect
      x="4"
      y="12"
      width="16"
      height="2"
      rx="1"
      fill="#FFFFFF" // White color for the bars
    />
    <rect
      x="4"
      y="6"
      width="16"
      height="2"
      rx="1"
      fill="#FFFFFF" // White color for the bars
    />
    <rect
      x="4"
      y="18"
      width="16"
      height="2"
      rx="1"
      fill="#FFFFFF" // White color for the bars
    />
  </svg>
);

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

  // Determine whether to show the navigation items in the menu
  const shouldShowInMenu =
    window.innerWidth <= 1400 && window.innerHeight <= 918;

  // State to track whether the hamburger menu should be shown
  const [shouldShowMenu, setShouldShowMenu] = useState(
    window.innerWidth <= 1400
  );

  // Function to update the shouldShowMenu state based on the window width
  const updateMenuVisibility = () => {
    setShouldShowMenu(window.innerWidth <= 1400);
  };

  useEffect(() => {
    // Add an event listener to update menu visibility on window resize
    window.addEventListener("resize", updateMenuVisibility);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", updateMenuVisibility);
    };
  }, []); // Run this effect only once when the component mounts

  return (
    <Navbar expand="md">
      <Container>
        <Navbar.Brand href="/">
          <img
            src="../../images/gigsweep_logo.png"
            width="320"
            height="170"
            className="d-inline-block align-top mb-5 mt-3"
            alt="Gig Mania Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav">
          <div>
            {!storedUserId && !storedUserType ? (
              <Nav.Link href="/signin">
                <i
                  className="bi bi-person h1 px-2"
                  style={{ color: "white", cursor: "pointer" }}
                ></i>
              </Nav.Link>
            ) : storedUserId && storedUserType === "A" ? (
              <Nav.Link href="/artistuserprofile">
                {artist.length > 0 ? (
                  <img
                    src={SERVER_BASE_URL + artist[0].image}
                    alt="..."
                    width={50}
                    className="rounded mb-2 img-thumbnail mt-3 mx-2"
                    style={{ color: "white", cursor: "pointer" }}
                  />
                ) : null}
              </Nav.Link>
            ) : storedUserId && storedUserType === "V" ? (
              <Nav.Link href="/venueuserprofile">
                {venue.length > 0 ? (
                  <img
                    src={SERVER_BASE_URL + venue[0].image}
                    alt="..."
                    width={60}
                    className="rounded mb-2 img-thumbnail mx-2"
                    style={{ color: "white", cursor: "pointer" }}
                  />
                ) : null}
              </Nav.Link>
            ) : null}
          </div>
        </Navbar.Toggle>

        <Navbar.Collapse id="navbar-nav">
          <div inline className="mx-auto">
            <SearchBar />
          </div>
          {shouldShowInMenu ? (
            <Nav className="ml-auto"></Nav>
          ) : (
            <Nav className="ml-auto">
              {!storedUserId && !storedUserType ? (
                <Nav.Link href="/signin">
                  <i
                    className="bi bi-person h1 px-2"
                    style={{ color: "white", cursor: "pointer" }}
                  ></i>
                </Nav.Link>
              ) : storedUserId && storedUserType === "A" ? (
                <Nav.Link href="/artistuserprofile">
                  {artist.length > 0 ? (
                    <img
                      src={SERVER_BASE_URL + artist[0].image}
                      alt="..."
                      width={50}
                      className="rounded mb-2 img-thumbnail mt-2 mx-2"
                      style={{ color: "white", cursor: "pointer" }}
                    />
                  ) : null}
                </Nav.Link>
              ) : storedUserId && storedUserType === "V" ? (
                <Nav.Link href="/venueuserprofile">
                  {venue.length > 0 ? (
                    <img
                      src={SERVER_BASE_URL + venue[0].image}
                      alt="..."
                      width={60}
                      className="rounded mb-2 img-thumbnail mx-2"
                      style={{ color: "white", cursor: "pointer" }}
                    />
                  ) : null}
                </Nav.Link>
              ) : null}
              <Nav.Link
                href="/artistorvenueregister"
                className="text-light mt-3"
                style={{ fontSize: "18px" }}
              >
                Register
              </Nav.Link>
              <Nav.Link
                href="/pickupgig"
                className="text-light mt-3"
                style={{ fontSize: "18px" }}
              >
                Find Gigs
              </Nav.Link>
              {localStorage.userId != null &&
              localStorage.artistOrVenue != null ? (
                <Nav.Link
                  onClick={handleLogout}
                  className="text-light mb-4 mt-3"
                  style={{ fontSize: "18px" }}
                >
                  Logout
                </Nav.Link>
              ) : (
                <Nav.Link
                  href="/signin"
                  className="text-light mt-3"
                  style={{ fontSize: "18px" }}
                >
                  Login
                </Nav.Link>
              )}
            </Nav>
          )}
        </Navbar.Collapse>
        {shouldShowInMenu && (
          <NavDropdown title={hamburgerIcon} id="basic-nav-dropdown">
            <NavDropdown.Item href="/artistorvenueregister">
              Register
            </NavDropdown.Item>
            <NavDropdown.Item href="/pickupgig">Find Gigs</NavDropdown.Item>
            {localStorage.userId != null &&
            localStorage.artistOrVenue != null ? (
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            ) : (
              <NavDropdown.Item href="/signin">Login</NavDropdown.Item>
            )}
          </NavDropdown>
        )}
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
