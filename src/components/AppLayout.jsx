import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import NavbarCover from "./NavBarCover";
function AppLayout() {
  const isLogged = true;
  return (
    <div className="h-full-screen">
      {isLogged ? <Navbar /> : <NavbarCover />}
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
