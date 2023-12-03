import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function GoogleOauth() {
  const location = useLocation();

  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");
    console.log("Token:", token);
    // Salva il token come cookie HTTP-only
    document.cookie = `jwt=${token}; path=/; secure; samesite=none; httponly`;

    // Puoi anche fare altre azioni, come reindirizzare l'utente alla home page, ecc.
    // window.location.href = "http://localhost:4000/";
  }, [location]);

  return (
    <div>
      {/* Puoi aggiungere contenuti aggiuntivi per questa route se necessario */}
      <h1>Google OAuth Redirect Page</h1>
    </div>
  );
}

export default GoogleOauth;
