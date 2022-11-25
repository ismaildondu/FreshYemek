import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "../components/navbar";
import Home from "../components/home";
import Auth from "../components/auth";
import ProtectedRoute from "../components/protected-route";
import Restaurants from "../components/restaurants";
import Restaurant from "../components/restaurant";
import PreLoader from "../components/pre-load";

import ENUM from "../services/enum";

import { AuthContext } from "../context/auth";

import { useNavigate } from "react-router-dom";

function ExitUser() {
  const { ExitUser } = React.useContext(AuthContext);
  const navigate = useNavigate();
  ExitUser();
  navigate(ENUM.PAGES.HOME);
  return <div></div>;
}

function RoutesComponent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ENUM.PAGES.HOME} element={<Navbar />}>
          <Route
            path={ENUM.PAGES.HOME}
            element={
              <PreLoader>
                <Home />
              </PreLoader>
            }
          />

          <Route
            path={ENUM.PAGES.AUTH}
            element={
              <PreLoader>
                <ProtectedRoute type={ENUM.PROTECTED_TYPES.ONLY_GUETS}>
                  <Auth />
                </ProtectedRoute>
              </PreLoader>
            }
          />

          <Route
            path={ENUM.PAGES.RESTAURANTS}
            element={
              <PreLoader>
                <Restaurants />
              </PreLoader>
            }
          />

          <Route
            path={ENUM.PAGES.RESTAURANT}
            element={
              <PreLoader>
                <Restaurant />
              </PreLoader>
            }
          />
          <Route path={ENUM.PAGES.EXIT} element={<ExitUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesComponent;
