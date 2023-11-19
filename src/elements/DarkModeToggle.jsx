import { useDarkMode } from "../contexts/DarkModeContext";
import Toggle from "react-toggle";
import "../styles/styleDarkModeToggleCustom.css";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <Toggle
      className="mr-10"
      checked={isDarkMode}
      onChange={({ target }) => toggleDarkMode(target.checked)}
      icons={{ checked: <HiOutlineSun />, unchecked: <HiOutlineMoon /> }}
      aria-label="Dark mode toggle"
    />
  );
}

export default DarkModeToggle;
