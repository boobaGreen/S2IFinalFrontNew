//Navbar.jsx
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import DarkModeToggle from "../elements/DarkModeToggle";
import StartNormal from "../icons/StartNormal";
import StartDark from "../icons/StartDark";
import { useDarkMode } from "../contexts/DarkModeContext";
import { useNavigate } from "react-router-dom";

import { useAuthMode } from "../contexts/AuthModeProvider";

const Navbar = () => {
  const { isAuth, name } = useAuthMode();
  console.log("name in nav bar", name);
  const navigate = useNavigate();
  const goToHome = () => navigate("/home");
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  let navItems = [];

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };
  const handleNavItemClick = (route) => {
    console.log("route: ", route);
    navigate(`/${route}`);
    setNav(false); // Close the mobile menu after navigating
  };
  isAuth
    ? // Array containing navigation itemsclassificationleaderboard
      (navItems = [
        { id: 1, text: "Home" }, //home app
        { id: 2, text: "Leaderboard" },
        { id: 3, text: "About" },
        { id: 4, text: "Logout" },
      ])
    : (navItems = [
        { id: 1, text: "Home" }, //cover
        { id: 2, text: "SignUp" },
        { id: 3, text: "Login" },
        { id: 4, text: "About" },
      ]);

  return (
    <div
      className={`white flex justify-between items-center h-24 max-w-full mx-auto px-4  ${
        isDarkMode ? "dark" : ""
      }`}
    >
      <div className="flex w-max gap-5 hover:cursor-pointer" onClick={goToHome}>
        {/* Logo */}
        <div className="w-10 h-full">
          {isDarkMode ? <StartDark /> : <StartNormal />}
        </div>
        {/* Title */}
        <h1
          className={`w-max text-3xl font-bold text-[black] ${
            isDarkMode ? "dark" : ""
          } `}
        >
          Quiz
        </h1>
      </div>
      {/* Switch */}
      <DarkModeToggle className="w-full h-full" />

      {/* Desktop Navigation */}
      <ul className="hidden md:flex">
        {navItems.map((item) => (
          <li
            key={item.id}
            onClick={() => handleNavItemClick(item.text.toLowerCase())}
            className="p-4 hover:bg-lime-300 rounded-xl m-2 cursor-pointer duration-300 hover:text-black"
          >
            {item.text}
          </li>
        ))}
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? `fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-lime-100 ease-in-out duration-500  ${
                isDarkMode ? "dark" : ""
              }`
            : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
        }
      >
        {/* Mobile Logo */}
        {/* <h1
          className={`md:hidden w-full text-3xl font-bold text-gray-900 m-4  ${
            isDarkMode ? "dark" : ""
          } `}
        >
          S2I-Quiz
        </h1> */}

        {/* Mobile Navigation Items */}
        {navItems.map((item) => (
          <li
            key={item.id}
            onClick={() => handleNavItemClick(item.text.toLowerCase())}
            className="p-4 border-b rounded-xl hover:bg-lime-300 duration-300 hover:text-black cursor-pointer border-gray-600"
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
