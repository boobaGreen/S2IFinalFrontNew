import Cookies from "js-cookie";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function GoogleOauth() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");
    console.log("Token:", token);
    Cookies.set("jwt", token, { secure: true, sameSite: "strict" });

    window.location.reload();
    navigate("/home");
  }, [location, navigate]);

  return (
    <div>
      {/* Puoi aggiungere contenuti aggiuntivi per questa route se necessario */}
      <h1>Google OAuth Redirect Page</h1>
    </div>
  );
}

export default GoogleOauth;
