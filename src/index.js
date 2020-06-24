import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";
import Userprovider from "./store/userContext";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Userprovider>
        <App />
      </Userprovider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
