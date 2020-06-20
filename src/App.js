import React from "react";
import "./styles.scss";
import Search from "./components/serachBar";
import NavbarTop from "./components/navbar";
import { Switch, Route } from "react-router-dom";
import Bus from "./components/busList";

export default function App() {
  return (
    <div className="App">
      <NavbarTop />
      <Switch>
        <Route path="/" exact component={Search} />
      </Switch>
      <Bus />
    </div>
  );
}
