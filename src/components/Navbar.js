import React, { useContext, useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
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

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Determine whether to show the navigation items in the menu
  const shouldShowInMenu = window.innerWidth <= 1199;

  // State to track whether the hamburger menu should be shown
  const [shouldShowMenu, setShouldShowMenu] = useState(
    window.innerWidth <= 1199 // Only consider the width for showing the menu
  );

  // Function to update the shouldShowMenu state based on the window width
  const updateMenuVisibility = () => {
    setShouldShowMenu(window.innerWidth <= 1199);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMenuVisibility);
    return () => {
      window.removeEventListener("resize", updateMenuVisibility);
    };
  }, []); // Run this effect only once when the component mounts

  return (
    <Navbar expand="xl">
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

        <Navbar.Toggle
          aria-controls="navbar-nav"
          onClick={() => setShouldShowMenu(!shouldShowMenu)}
        >
          {shouldShowInMenu ? hamburgerIcon : hamburgerIcon}
        </Navbar.Toggle>

        <Navbar.Collapse id="navbar-nav">
          <div className="mx-auto">
            <SearchBar />
          </div>
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
            {storedUserId && storedUserType ? (
              <Nav.Link
                href="/pickupgig"
                className="text-light mt-3 mx-2"
                style={{ fontSize: "18px" }}
              >
                Find Gigs
              </Nav.Link>
            ) : null}
            {localStorage.userId != null &&
            localStorage.artistOrVenue != null ? (
              <Nav.Link
                onClick={handleLogout}
                className="text-light mb-4 mt-3 mx-2"
                style={{ fontSize: "18px" }}
              >
                Logout
              </Nav.Link>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
