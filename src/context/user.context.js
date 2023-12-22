"use client";
import React, { useEffect, createContext, useReducer } from "react";
import { jwtDecode } from "jwt-decode";
const initialState = {
  email: null,
  username: null,
  userToken: null,
  toastMessage: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        email: action.payload.email,
        username: action.payload.username,
        userToken: action.payload.userToken,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      return {
        ...state,
        email: null,
        username: null,
        userToken: null,
      };
    case "TOAST_MESSAGE":
      return {
        ...state,
        toastMessage: action.payload.toastMessage,
      };

    default:
      return state;
  }
};

export const UserContext = createContext({
  state: initialState,
  dispatch: () => {},
});

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");

    const verifyToken = (token) => {
      try {
        const decoded = jwtDecode(token);

        const currentTime = Date.now() / 1000;
        // Check token expiration
        if (decoded.exp && decoded.exp < currentTime) {
          dispatch({ type: "LOGOUT" });
          return;
        }

        // If everything is valid, you can set the user context

        dispatch({
          type: "LOGIN",
          payload: {
            userToken,
            username,
            email,
          },
        });
      } catch (error) {
        // Handle decoding errors
        console.log(error);
        dispatch({ type: "LOGOUT" });
      }
    };
    if (userToken && username && email) {
      verifyToken(userToken);
    } else {
      dispatch({ type: "LOGOUT" });
    }
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
