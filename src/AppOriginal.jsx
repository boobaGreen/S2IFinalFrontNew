import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./components/AppLayout";
import { isUserAuthenticated } from "./auth/AuthUtils";
import Auth from "./auth/Auth";
import Home from "./pages/Home";
import Cover from "./pages/Cover";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  const isAuthenticated = isUserAuthenticated();

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate replace to="cover" />} />

        {/* Rotte protette per utenti autenticati */}
        <Auth
          path="home"
          element={<Home />}
          authenticated={isAuthenticated}
          redirectPath="cover"
        />

        {/* Rotte pubbliche accessibili solo agli utenti non autenticati */}
        <Auth
          path="cover"
          element={<Cover />}
          authenticated={isAuthenticated}
          redirectPath="home"
        />
        <Auth
          path="signup"
          element={<Signup />}
          authenticated={isAuthenticated}
          redirectPath="home"
        />
        <Auth
          path="login"
          element={<Login />}
          authenticated={isAuthenticated}
          redirectPath="home"
        />

        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}
export default App;
