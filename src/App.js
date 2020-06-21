import React from "react";
import "./styles.scss";
import Search from "./components/serachBar";
import NavbarTop from "./components/navbar";
import { Switch, Route } from "react-router-dom";
import BusList from "./components/busList";
import BusLayout from "./components/busLayout";

export default function App() {
  return (
    <div className="App">
      <NavbarTop />
      <Switch>
        <Route path="/" exact component={Search} />
        <Route path="/search" exact component={BusList} />
        <Route path="/bus/layout/:busId" exact component={BusLayout} />
      </Switch>
    </div>
  );
}
