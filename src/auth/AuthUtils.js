// authUtils.js
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

export function isUserAuthenticated() {
  const jwtToken = Cookies.get("jwt");

  if (!jwtToken) {
    return false; // Il token non esiste
  }

  try {
    const decodedToken = jwt.decode(jwtToken);

    // Verifica se il token è scaduto
    const isTokenExpired = decodedToken.exp < Date.now() / 1000;

    return !isTokenExpired; // Restituisce true se il token non è scaduto
  } catch (error) {
    console.error("Errore nella decodifica del token:", error);
    return false; // Gestione errore, assume che il token è non valido
  }
}
