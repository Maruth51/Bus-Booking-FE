import React, { useState, useContext } from "react";
import "../login.css";
import { userLogin } from "../services/authServices";
import { useHistory } from "react-router-dom";
import { userContext } from "../store/userContext";
import { Button } from "react-bootstrap";

const Login = props => {
  const { user, dispatch } = useContext(userContext);
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [pwd, setPwd] = useState("");
  const history = useHistory();
  const handleSumbmit = e => {
    setLoading(true);
    e.preventDefault();
    userLogin(email.trim(), pwd.trim())
      .then(res => {
        setLoading(false);
        if (res.status === "Success") {
          dispatch({ type: "Login", data: res });
          console.log(props.location.state);
          history.push(props.location.state || "/");
        } else if (res.status === "Invalid Password") {
          alert("Incorrect Password");
        } else {
          alert("user not found");
        }
      })
      .catch(err => {
        setLoading(false);
        alert("some error occured");
      });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSumbmit}>
          <h3>Login</h3>

          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={pwd}
              onChange={e => setPwd(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                value
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? "Loading…" : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
