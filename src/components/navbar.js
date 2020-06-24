import React, { useContext, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { Nav, Navbar, Button, Dropdown } from "react-bootstrap";
import { userContext } from "../store/userContext";

const NavbarTop = () => {
  return (
    <Fragment>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">MyBus</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <NavLink
              className="nav-link"
              activeClassName={"active"}
              to="/"
              exact
            >
              Home
            </NavLink>
            <UserComponent />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Fragment>
  );
};

const UserComponent = () => {
  const { user, dispatch } = useContext(userContext);
  console.log(user);
  if (user?.isLoggedIn) {
    return (
      <Fragment>
        <Nav.Item>
          <Dropdown>
            <Dropdown.Toggle as={Dropdown} className="nav-link">
              {"Hello! " + user.userData?.first_name}
            </Dropdown.Toggle>
            <Dropdown.Menu bg="dark" className="dropdown-menu-right">
              <Dropdown.Item
                as={NavLink}
                exact
                to="/"
                onClick={() => {
                  dispatch({ type: "Logout" });
                  window.location.reload();
                }}
                activeClassName={"text-primary"}
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav.Item>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <Nav.Item>
          <NavLink className="nav-link" activeClassName={"active"} to="/login">
            Login
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink className="nav-link" activeClassName={"active"} to="/signup">
            Signup
          </NavLink>
        </Nav.Item>
      </Fragment>
    );
  }
};

export default NavbarTop;
