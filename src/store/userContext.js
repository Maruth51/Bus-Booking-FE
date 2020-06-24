import { createContext, useReducer } from "react";
import React from "react";
const initialState = {
  isLoggedIn: localStorage.getItem("token") ? true : false,
  userData: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {}
};
export const userContext = createContext(false);
const { Provider } = userContext;

function reducer(state = initialState, action) {
  switch (action.type) {
    case "Logout":
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return { userData: {}, isLoggedIn: false };
    case "Login":
      window.localStorage.setItem("user", JSON.stringify(action.data.user));
      window.localStorage.setItem("token", action.data.jwt);
      return { ...state, isLoggedIn: true, userData: action.data.user };
    case "SET_USER":
      console.log(action.data);
      return { ...state };
    default:
      return { ...state };
  }
}

const Userprovider = ({ children }) => {
  const [userState, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ user: userState, dispatch }}>{children}</Provider>;
};
export default Userprovider;
