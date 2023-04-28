import React from "react";
import { Button, Form, FormControl, Navbar } from "react-bootstrap";

const NavbarComponent = () => {
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
          <a href="/artistorvenuesignin">
            <i class="bi bi-person h1 px-2" style={{ color: "white" }}></i>
          </a>
          <Button
            className="mx-2 mb-3"
            href="/artistorvenueregister"
            variant="secondary"
          >
            Register
          </Button>
          <Button
            className="mx-2 mb-3"
            href="/artistorvenuesignin"
            variant="secondary"
          >
            Sign In
          </Button>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
