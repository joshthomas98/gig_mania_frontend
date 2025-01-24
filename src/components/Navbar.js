import React, { useContext, useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Dropdown,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
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
    <rect x="4" y="12" width="16" height="2" rx="1" fill="#FFFFFF" />
    <rect x="4" y="6" width="16" height="2" rx="1" fill="#FFFFFF" />
    <rect x="4" y="18" width="16" height="2" rx="1" fill="#FFFFFF" />
  </svg>
);

const NavbarComponent = () => {
  const navigate = useNavigate();
  const { userId, setUserId, artistOrVenue, setArtistOrVenue } =
    useContext(LoginContext);
  const storedUserId = localStorage.getItem("userId");
  const storedUserType = localStorage.getItem("artistOrVenue");
  const SERVER_BASE_URL = "http://localhost:8000/";
  const SERVER_BASE_URL_WITHOUT_TRAILING_SLASH = "http://localhost:8000";
  const PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH =
    "https://gigsweep-express.vercel.app";

  const [artist, setArtist] = useState([]);
  const [venue, setVenue] = useState([]);
  const [venueNotifications, setVenueNotifications] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (storedUserId) {
        const endpoint =
          storedUserType === "A"
            ? `artists/${storedUserId}/`
            : `venues/${storedUserId}/`;
        const response = await fetch(
          `${PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH}/${endpoint}`
        );
        const data = await response.json();
        storedUserType === "A" ? setArtist([data]) : setVenue([data]);
      }
    };

    fetchUserData();
  }, [storedUserId, storedUserType]);

  useEffect(() => {
    const fetchVenueNotifications = async () => {
      if (storedUserId && storedUserType === "V") {
        const response = await fetch(
          `${PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH}/venue_notifications/${storedUserId}/`
        );
        const data = await response.json();
        const verifiedNotifications = await verifyNotifications(data);
        setVenueNotifications(verifiedNotifications);
      }
    };

    fetchVenueNotifications();
  }, [storedUserId, storedUserType]);

  const verifyNotifications = async (notifications) => {
    const verifiedNotifications = [];
    for (const notification of notifications) {
      let gigExists = true;
      if (notification.if_gig_advertised_by_artist) {
        const gigResponse = await fetch(
          `${PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH}/artist_gigs/${notification.if_gig_advertised_by_artist}/`
        );
        if (!gigResponse.ok) {
          gigExists = false;
        }
      } else if (notification.if_venue_made_gig) {
        const gigResponse = await fetch(
          `${PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH}/venue_gigs/${notification.if_venue_made_gig}/`
        );
        if (!gigResponse.ok) {
          gigExists = false;
        }
      }
      if (gigExists) {
        verifiedNotifications.push(notification);
      }
    }
    return verifiedNotifications;
  };

  const notificationCount = venueNotifications.length;

  const handleShowMoreNotifications = (e) => {
    e.stopPropagation(); // Prevent dropdown from closing
    setShowAll((prev) => !prev);
  };

  const notificationsToShow = showAll
    ? venueNotifications
    : venueNotifications.slice(0, 5);

  const handleLogout = () => {
    localStorage.clear();
    setUserId(null);
    setArtistOrVenue(null);
    navigate("/");
  };

  const handleNotificationClick = (notification) => {
    if (
      notification.notification_type.includes("GIG_TRANSFER") &&
      notification.if_gig_advertised_by_artist
    ) {
      navigate(
        `/gigtransferreview/${notification.if_gig_advertised_by_artist}/`
      );
    } else if (
      notification.notification_type.includes("VENUE_ADVERTISED_GIG") &&
      notification.if_venue_made_gig
    ) {
      navigate(`/venuegigapplicationreview/${notification.if_venue_made_gig}`);
    } else {
      navigate("/");
    }
  };

  const shouldShowInMenu = window.innerWidth <= 1199;
  const [shouldShowMenu, setShouldShowMenu] = useState(shouldShowInMenu);

  useEffect(() => {
    const updateMenuVisibility = () => {
      setShouldShowMenu(window.innerWidth <= 1199);
    };

    window.addEventListener("resize", updateMenuVisibility);
    return () => {
      window.removeEventListener("resize", updateMenuVisibility);
    };
  }, []);

  return (
    <Navbar expand="xxl">
      <Container>
        <Navbar.Brand href="/">
          <img
            src="../../images/gigsweep_logo.png"
            width="320"
            height="170"
            className="d-inline-block align-top mb-4 mt-2"
            alt="Gig Mania Logo"
          />
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="navbar-nav"
          onClick={() => setShouldShowMenu(!shouldShowMenu)}
        >
          {hamburgerIcon}
        </Navbar.Toggle>

        <Navbar.Collapse id="navbar-nav">
          <div className="mx-auto mt-5" style={{ paddingRight: "50px" }}>
            <SearchBar />
          </div>

          <Nav className="ml-auto mt-5">
            {!storedUserId && !storedUserType ? (
              <Nav.Link href="/signin">
                <i
                  className="bi bi-person h1 px-2"
                  style={{ color: "white", cursor: "pointer" }}
                ></i>
              </Nav.Link>
            ) : storedUserType === "A" ? (
              <Nav.Link href={`/artistuserprofile/${storedUserId}`}>
                {artist.length > 0 && (
                  <img
                    src={
                      SERVER_BASE_URL_WITHOUT_TRAILING_SLASH +
                      "/" +
                      artist[0].image
                    }
                    alt="..."
                    width={50}
                    className="rounded mb-2 img-thumbnail mt-2 mx-2"
                  />
                )}
              </Nav.Link>
            ) : (
              <Nav.Link href={`/venueuserprofile/${storedUserId}`}>
                {venue.length > 0 && (
                  <img
                    src={
                      SERVER_BASE_URL_WITHOUT_TRAILING_SLASH +
                      "/" +
                      venue[0].image
                    }
                    alt="..."
                    width={60}
                    className="rounded mb-2 img-thumbnail mx-2"
                  />
                )}
              </Nav.Link>
            )}
            {storedUserType === "A" ? (
              <Nav.Link
                href="/pickupgig"
                className="text-light mt-3 mx-2"
                style={{ fontSize: "18px" }}
              >
                Find Gigs
              </Nav.Link>
            ) : storedUserType === "V" ? (
              <Nav.Link
                href="/venuesearchforartist"
                className="text-light mt-3 mx-2"
                style={{ fontSize: "18px" }}
              >
                Find Artists
              </Nav.Link>
            ) : null}
            {storedUserId && storedUserType && (
              <Nav.Link
                onClick={handleLogout}
                className="text-light mb-4 mt-3 mx-2"
                style={{ fontSize: "18px" }}
              >
                Logout
              </Nav.Link>
            )}
            {storedUserId && storedUserType && (
              <Dropdown
                align="end"
                className="mb-4 mt-xxl-3 mx-2"
                show={dropdownOpen}
                onToggle={setDropdownOpen}
              >
                <Dropdown.Toggle
                  variant="link"
                  id="notification-dropdown"
                  className="position-relative"
                  style={{
                    padding: 0,
                    color: notificationCount > 0 ? "gold" : "white",
                  }}
                >
                  <i
                    className="bi bi-bell"
                    style={{ fontSize: "1.5rem", cursor: "pointer" }}
                  ></i>
                  {notificationCount > 0 && (
                    <span
                      className="badge bg-danger position-absolute top-0 start-100 translate-middle"
                      style={{ fontSize: "0.75rem", padding: "0.2em 0.5em" }}
                    >
                      {notificationCount}
                    </span>
                  )}
                </Dropdown.Toggle>

                <Dropdown.Menu
                  style={{
                    maxHeight: "300px",
                    overflowY: "auto",
                    width: "300px",
                  }}
                >
                  <Dropdown.ItemText
                    style={{ background: "white", fontSize: "22px" }}
                  >
                    Notifications
                  </Dropdown.ItemText>
                  {notificationCount === 0 ? (
                    <Dropdown.ItemText style={{ background: "#d3d3d3" }}>
                      No notifications
                    </Dropdown.ItemText>
                  ) : (
                    notificationsToShow.map((notification, index) => (
                      <Dropdown.Item
                        key={index}
                        style={{
                          padding: "1em",
                          borderBottom: "1px solid #e0e0e0",
                          background: "#d3d3d3",
                          borderRadius: "5px",
                          margin: "0.3em 0",
                        }}
                        onClick={() => handleNotificationClick(notification)} // Integrate the click handler
                      >
                        <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                          {notification.title}
                        </div>
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id={`tooltip-${index}`}>
                              {notification.message}
                            </Tooltip>
                          }
                        >
                          <div
                            style={{
                              fontSize: "1rem",
                              color: "black",
                              backgroundColor: "#d3d3d3",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              maxWidth: "100%",
                            }}
                          >
                            {notification.message}
                          </div>
                        </OverlayTrigger>
                        <div style={{ fontSize: "0.8rem", color: "#888" }}>
                          {notification.date}
                        </div>
                      </Dropdown.Item>
                    ))
                  )}
                  {notificationCount > 5 && (
                    <Dropdown.Item>
                      <Button
                        variant="link"
                        onClick={handleShowMoreNotifications}
                      >
                        {showAll
                          ? "Show less notifications"
                          : "Show more notifications"}
                      </Button>
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
