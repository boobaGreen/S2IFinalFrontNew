//main.jsx
import { DarkModeProvider } from "./contexts/DarkModeContext.jsx";
import { AuthModeProvider } from "./contexts/AuthModeProvider.jsx";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <DarkModeProvider>
    <AuthModeProvider>
      <App />
    </AuthModeProvider>
  </DarkModeProvider>
  /* </React.StrictMode> */
);
