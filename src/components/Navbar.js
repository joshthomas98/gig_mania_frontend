import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";

const NavbarComponent = () => {
  return (
    <Navbar expand="sm">
      <Navbar.Brand href="/">
        <img
          src="../../images/gig_mania_logo.png"
          width="200"
          height="200"
          className="d-inline-block align-top"
          alt="Gig Mania Logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Button className="mx-2" href="signup">
          Sign Up
        </Button>
        <Button className="mx-2" href="login">
          Log In
        </Button>
        <Button className="mx-2" href="about">
          About
        </Button>
        <Button className="mx-2" href="faqs">
          FAQs
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
