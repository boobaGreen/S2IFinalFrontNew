
//AuthModeProvider.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { isUserAuthenticated } from "../auth/authUtils";

const AuthModeContext = createContext();

function AuthModeProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(
    function () {
      const auth = isUserAuthenticated();
      setIsAuth(auth);
    },
    [isAuth, setIsAuth]
  );

  return (
    <AuthModeContext.Provider value={{ isAuth }}>
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
