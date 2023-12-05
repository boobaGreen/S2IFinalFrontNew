// Logout.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the authentication token from cookies
    Cookies.remove("jwt");
    window.location.reload();
    // Redirect to the login page or any other desired page
    navigate("/login");
  }, [navigate]);

  return (
    <div>
      <p>Logging out...</p>
      {/* You can add additional UI or a redirect message if needed */}
    </div>
  );
}

export default Logout;
