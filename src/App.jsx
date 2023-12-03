//App.jsx
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./components/AppLayout";
import { isUserAuthenticated } from "./auth/authUtils";
import Home from "./pages/Home";
import Cover from "./pages/Cover";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ConfirmAccount from "./pages/ConfirmAccount";
import ForgetPassword from "./pages/ForgetPassword";
import GoogleOauth from "./pages/googleOauth";

function App() {
  // const isAuthenticated = isUserAuthenticated();
  const isAuthenticated = isUserAuthenticated();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="cover" />} />

          {/* Rotte protette per utenti autenticati */}
          <Route
            path="home"
            element={isAuthenticated ? <Home /> : <Navigate to="/" />}
          />

          {/* Rotte pubbliche accessibili solo agli utenti non autenticati */}
          <Route
            path="cover"
            element={!isAuthenticated ? <Cover /> : <Navigate to="/home" />}
          />
          <Route
            path="signup"
            element={!isAuthenticated ? <Signup /> : <Navigate to="/home" />}
          />
          <Route
            path="login"
            element={!isAuthenticated ? <Login /> : <Navigate to="/home" />}
          />
          <Route
            path="confirmAccount/:token"
            element={
              !isAuthenticated ? <ConfirmAccount /> : <Navigate to="/home" />
            }
          />
          <Route
            path="forgetPassword"
            element={
              !isAuthenticated ? <ForgetPassword /> : <Navigate to="/home" />
            }
          />
          <Route
            path="googleOauth"
            element={
              !isAuthenticated ? <GoogleOauth /> : <Navigate to="/home" />
            }
          />

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
