//AppLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function AppLayout() {
  return (
    <div className="h-full-screen">
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
