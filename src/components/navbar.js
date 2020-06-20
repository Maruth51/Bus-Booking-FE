import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { Nav, Navbar, Button } from "react-bootstrap";

const NavbarTop = () => {
  const handleClick = () => {
    logout();
  };
  return (
    <Fragment>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <NavLink to="/" className="nav-item" activeClassName="nav-active">
              Home
            </NavLink>
            <Fragment>
              <NavLink
                to="/Login"
                className="nav-item"
                activeClassName="nav-active"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="nav-item"
                activeClassName="nav-active"
              >
                SignUp
              </NavLink>{" "}
            </Fragment>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Fragment>
  );
};

export default NavbarTop;
