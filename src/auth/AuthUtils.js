// authUtils.js
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import Axios from "axios";

export async function validateUserToken() {
  const jwtToken = Cookies.get("jwt");

  if (!jwtToken) {
    return null; // Il token non esiste
  }

  try {
    const response = await Axios.get(
      "http://localhost:3005/api/v1/users/validateToken",
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );

    return response.data.userName; // Restituisce i dati dell'utente
  } catch (error) {
    console.error("Errore nella validazione del token:", error);
    return null; // Gestione errore, assume che il token non sia valido
  }
}

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
