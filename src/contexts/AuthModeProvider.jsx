// AuthModeProvider.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { isUserAuthenticated, validateUserToken } from "../auth/authUtils";

const AuthModeContext = createContext();

function AuthModeProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [name, setName] = useState(null);

  useEffect(() => {
    async function fetchData() {
      // verificare se controllare anche se e' scaduto il token jwt?
      // funzione gia' esistente in AuthUtils.js
      const auth = isUserAuthenticated();
      setIsAuth(auth);

      if (auth) {
        const userName = await validateUserToken();
        setName(userName);
        console.log("name ", userName);
      }
    }

    fetchData();
  }, []); // The dependency array should be empty since we only want this effect to run once on mount

  return (
    <AuthModeContext.Provider value={{ isAuth, name }}>
      {children}
    </AuthModeContext.Provider>
  );
}

function useAuthMode() {
  const context = useContext(AuthModeContext);
  if (context === undefined)
    throw new Error("AuthModeContext was used outside of AuthModeProvider");
  return context;
}

export { AuthModeProvider, useAuthMode };
