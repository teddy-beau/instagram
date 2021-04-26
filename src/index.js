import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import FirebaseContext from "./context/firebase";
import { firebase, FieldValue } from "./lib/firebase";
import "./styles/app.css";

ReactDOM.render(
   <FirebaseContext.Provider value={{ firebase, FieldValue }}>
      <App />
   </FirebaseContext.Provider>,
   document.getElementById("root")
);

// Client side rendered app: react cra
// DB with Firebase
// react-loading-skeleton
// tailwind

// Architecture:
// components, constants, context, helpers, lib (Firebase in here), services (firebase function in here), styles (tailwind), hooks, pages
