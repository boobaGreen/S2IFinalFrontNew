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
import Logout from "./pages/Logout";
import About from "./pages/About";

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
          <Route
            path="logout"
            element={isAuthenticated ? <Logout /> : <Navigate to="/" />}
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
          {/* route accessibbili allo stesso modo da utenti autrntificati o NO */}
          <Route path="about" element={<About />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
