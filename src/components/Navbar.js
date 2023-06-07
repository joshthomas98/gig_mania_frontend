import { useContext } from "react";
import { Button, Form, FormControl, Navbar } from "react-bootstrap";
import { LoginContext } from "../App";
import { useNavigate } from "react-router-dom";

const NavbarComponent = () => {
  const navigate = useNavigate();
  const { userId, setUserId, artistOrVenue, setArtistOrVenue } =
    useContext(LoginContext);

  const handleProfileButtonClick = () => {
    if (userId !== null && artistOrVenue === "A") {
      navigate("/artistuserprofile");
    } else if (userId !== null && artistOrVenue === "V") {
      navigate("/venueuserprofile");
    } else {
      navigate("/signin");
    }
  };

  return (
    <Navbar expand="sm">
      <Navbar.Brand href="/">
        <img
          src="../../images/gigsweep_logo.png"
          width="300"
          height="300"
          className="d-inline-block align-top"
          alt="Gig Mania Logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-between">
        <Form inline className="mx-auto">
          <FormControl
            type="text"
            placeholder="Search for bands, concerts and venues"
            className="mr-sm-2 rounded-pill"
            style={{ width: "450px" }}
          />
        </Form>
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

          <Button className="mx-2 mb-3" variant="secondary">
            Logout
          </Button>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
