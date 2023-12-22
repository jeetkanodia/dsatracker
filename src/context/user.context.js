"use client";
import React, { useEffect, createContext, useReducer } from "react";
import { jwtDecode } from "jwt-decode";
const initialState = {
  email: null,
  username: null,
  userToken: null,
  toastMessage: null,
  profileImage: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        email: action.payload.email,
        username: action.payload.username,
        userToken: action.payload.userToken,
        profileImage: action.payload.profileImage,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("profileImage");
      return {
        ...state,
        email: null,
        username: null,
        userToken: null,
        profileImage: "",
      };
    case "TOAST_MESSAGE":
      return {
        ...state,
        toastMessage: action.payload.toastMessage,
      };
    case "UPDATE_PROFILE_IMAGE":
      return {
        ...state,
        profileImage: action.payload.profileImage,
      };
    case "UPDATE_PROFILE":
      localStorage.setItem("username", action.payload.username);
      localStorage.setItem("profileImage", action.payload.profileImage);
      return {
        ...state,
        username: action.payload.username,
        profileImage: action.payload.profileImage,
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
    const profileImage = localStorage.getItem("profileImage");
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
            profileImage,
          },
        });
      } catch (error) {
        // Handle decoding errors
        console.log(error);
        dispatch({ type: "LOGOUT" });
      }
    };
    if (userToken && username && email && profileImage) {
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
