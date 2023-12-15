//App.jsx
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import Cover from "./pages/Cover";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ConfirmAccount from "./pages/ConfirmAccount";
import ForgetPassword from "./pages/ForgetPassword";
import GoogleOauth from "./pages/googleOauth";
import Logout from "./pages/Logout";
import About from "./pages/About";
import ManageAdmin from "./pages/ManageAdmin";
import Manage from "./pages/Manage";
import { useAuthMode } from "./contexts/AuthModeProvider";
import GroupList from "./pages/GroupList";

function App() {
  const { isAuth, name, role, userId } = useAuthMode();
  const admin = role === "admin";
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="cover" />} />
          {/* Rotte protette per utenti autenticati */}
          <Route
            path="home"
            element={isAuth ? <Home /> : <Navigate to="/" />}
          />
          <Route
            path="logout"
            element={isAuth ? <Logout /> : <Navigate to="/" />}
          />
          <Route path="manageAdmin" element={admin ? <ManageAdmin /> : null} />
          <Route
            path="manage"
            element={isAuth ? <Manage /> : <Navigate to="/" />}
          />
          <Route
            path="details"
            element={isAuth ? <GroupList /> : <Navigate to="/" />}
          />
          {/* Rotte pubbliche accessibili solo agli utenti non autenticati */}
          <Route
            path="cover"
            element={!isAuth ? <Cover /> : <Navigate to="/home" />}
          />
          <Route
            path="signup"
            element={!isAuth ? <Signup /> : <Navigate to="/home" />}
          />
          <Route
            path="login"
            element={!isAuth ? <Login /> : <Navigate to="/home" />}
          />
          <Route
            path="confirmAccount/:token"
            element={!isAuth ? <ConfirmAccount /> : <Navigate to="/home" />}
          />
          <Route
            path="forgetPassword"
            element={!isAuth ? <ForgetPassword /> : <Navigate to="/home" />}
          />
          <Route
            path="googleOauth"
            element={!isAuth ? <GoogleOauth /> : <Navigate to="/home" />}
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
