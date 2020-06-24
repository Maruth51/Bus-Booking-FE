import React, { useState } from "react";
import { Row, Form, Button, Container, Col } from "react-bootstrap";
import { userRegister } from "../services/authServices";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [validated, setValidated] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [address, setAddress] = useState({ city: "", state: "", zipcode: "" });
  const history = useHistory();

  const handleSubmit = event => {
    setLoading(true);
    const form = event.currentTarget;
    setValidated(true);
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setLoading(false);
    } else {
      const newUser = {
        firstName,
        lastName,
        dob,
        email,
        address,
        password
      };
      console.log(newUser);
      userRegister(newUser)
        .then(data => {
          toast.success("Registered succesfully");
          history.push("/login");
        })
        .catch(err => {
          toast.error(err);
          setLoading(false);
        });
    }
  };
  return (
    <Container className="col-lg-6  p-4 mt-5">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="Fname">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="First Name"
                value={firstName}
                //isInvalid={!firstName.length}
                onChange={e => {
                  setFirstName(e.target.value);
                }}
              />
              <Form.Control.Feedback type="invalid">
                Invalid first name
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="Lname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Last Name"
                value={lastName}
                //isInvalid={lastName.length}
                onChange={e => {
                  setLastName(e.target.value);
                }}
              />
              <Form.Control.Feedback type="invalid">
                Invalid last name
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="Email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                required
                placeholder="Enter email"
                value={email}
                //isInvalid={email.indexOf("@")}
                onChange={e => {
                  setEmail(e.target.value);
                }}
              />
              <Form.Control.Feedback type="invalid">
                Enter valid email ID
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="DOB">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                required
                value={dob}
                // isInvalid={dob}
                onChange={e => {
                  setDob(e.target.value);
                }}
              />
              <Form.Control.Feedback type="invalid">
                Invalid DOB
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="City">
              <Form.Control
                type="text"
                required
                onChange={e => {
                  setAddress({ ...address, city: e.target.value });
                }}
                placeholder="City"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="Sate">
              <Form.Control
                type="text"
                required
                placeholder="State"
                onChange={e => {
                  setAddress({ ...address, state: e.target.value });
                }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="Sate">
              <Form.Control
                type="number"
                required
                placeholder="Zip Code"
                onChange={e => {
                  setAddress({ ...address, zipcode: e.target.value });
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="Password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            minLength="8"
            value={password}
            //isInvalid={password.length >= 8}
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
          <Form.Control.Feedback type="invalid">
            Password should be minimum 8 charecter
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="password2">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            required
            isInvalid={
              passwordConfirm.length > 0
                ? passwordConfirm.localeCompare(password)
                : false
            }
            onChange={e => {
              setPasswordConfirm(e.target.value);
            }}
          />
          <Form.Control.Feedback type="invalid">
            {" "}
            confirm password should match password
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Register"}
        </Button>
      </Form>
    </Container>
  );
};

export default Signup;
