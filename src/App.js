import React from "react";
import "./styles.scss";
import "react-toastify/dist/ReactToastify.css";
import Search from "./components/serachBar";
import NavbarTop from "./components/navbar";
import { Switch, Route } from "react-router-dom";
import BusList from "./components/busList";
import BusLayout from "./components/busLayout";
import Signup from "./components/signup";
import Login from "./components/login";
import { ToastContainer, toast, Slide } from "react-toastify";
import AuthRoute from "./components/authRoute";

toast.configure({
  autoClose: 8000,
  draggable: false,
  transition: Slide
  //etc you get the idea
});
export default function App() {
  return (
    <div>
      <NavbarTop />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={true}
      />
      <Switch>
        <Route path="/" exact component={Search} />
        <Route path="/search" exact component={BusList} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/login" exact component={Login} />
        <AuthRoute path="/bus/layout/:busId" exact component={BusLayout} />
      </Switch>
    </div>
  );
}
