//Cover.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

import { useDarkMode } from "../contexts/DarkModeContext";

function Cover() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const goToLogin = () => navigate("/login");
  const goToSignup = () => navigate("/signup");

  return (
    <div className="max-w-full h-screen ">
      <div
        className={`w-full h-full bg-hero-pattern bg-no-repeat bg-top flex flex-col  justify-center items-center  ${
          isDarkMode ? "dark" : ""
        }`}
      >
        <div className="flex gap-x-20">
          <button
            className={`bg-lime-600 hover:bg-lime-200 text-white w-max font-bold py-2 px-4 rounded-lg  ${
              isDarkMode ? "darkButton" : ""
            }`}
            onClick={goToSignup}
          >
            Sign up
          </button>
          <button
            className={`bg-lime-600 hover:bg-lime-200 text-white w-max font-bold py-2 px-4 rounded-lg  ${
              isDarkMode ? "darkButton" : ""
            }`}
            onClick={goToLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cover;
