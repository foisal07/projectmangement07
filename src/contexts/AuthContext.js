import React from "react";
import { createContext } from "react";
import { useReducer } from "react";
import { auth } from "../firbase/config";
import { useEffect } from "react";

export const AuthContext = createContext();

const authReducer = (state, action) => {
  if (action.type === "LOGIN") {
    return { ...state, user: action.payload };
  }

  if (action.type === "LOGOUT") {
    return { ...state, user: null };
  }

  if (action.type === "AUTH_IS_READY") {
    return { ...state, authIsReady: true, user: action.payload };
  }

  return state;
};

export default function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user });
      unsub();
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
