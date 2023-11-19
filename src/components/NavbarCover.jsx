import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import DarkModeToggle from "../elements/DarkModeToggle";
import { useDarkMode } from "../contexts/DarkModeContext";
import StartNormal from "../icons/StartNormal";
import StartDark from "../icons/StartDark";
import { Link, useNavigate } from "react-router-dom";

const NavbarCover = () => {
  const navigate = useNavigate();
  const goToHome = () => navigate("/home");
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  const { isDarkMode, toggleDarkMode } = useDarkMode();

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation itemsclassificationleaderboard
  const navItems = [
    { id: 1, text: "About", linkTo: "/about" },
    { id: 2, text: "Login", linkTo: "/login" },
    { id: 3, text: "SignUp", linkTo: "/signup" },
  ];

  return (
    <div
      className={`white flex justify-between items-center h-24 max-w-full mx-auto px-4  ${
        isDarkMode ? "dark" : ""
      }`}
    >
      <div className="flex w-max gap-5 hover:cursor-pointer" onClick={goToHome}>
        {/* Logo */}
        <div className="w-10 h-full  hover:cursor:pointer">
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
          <Link to={item.linkTo}>
            <li
              key={item.id}
              className="p-4 hover:bg-lime-300 rounded-xl m-2 cursor-pointer duration-300 hover:text-black"
            >
              {item.text}
            </li>
          </Link>
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
        <h1
          className={`w-full text-3xl font-bold text-gray-900 m-4  ${
            isDarkMode ? "dark" : ""
          } `}
        >
          S2I-Quiz
        </h1>

        {/* Mobile Navigation Items */}
        {navItems.map((item) => (
          <li
            key={item.id}
            className="p-4 border-b rounded-xl hover:bg-lime-300 duration-300 hover:text-black cursor-pointer border-gray-600"
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavbarCover;
