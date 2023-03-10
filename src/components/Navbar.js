import React from "react";
import { Button, Form, FormControl, Navbar } from "react-bootstrap";

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
          <Button className="mx-2" href="register" variant="secondary">
            Register
          </Button>
          <Button className="mx-2" href="signin" variant="secondary">
            Sign In
          </Button>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
