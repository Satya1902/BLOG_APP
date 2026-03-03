import { Route, Routes } from "react-router-dom";

import OpenRoute from "./components/authentication/OpenRoute";
// import PrivateRoute from "./components/authentication/PrivateRoute";
import Navbar from "./components/common/Navbar";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/HomePage";

import "./App.css";
import VarifyEmail from "./pages/VarifyEmailPage";
import SignupProfilePage from "./pages/SignupProfilePage";
import SignupRoute from "./components/authentication/SignupProfileRoute";
// import { useEffect, useState } from "react";
import { Dashboard } from "./pages/dashboard";
import PrivateRoute from "./components/authentication/PrivateRoute";
import { Logout } from "./pages/Logout";
import { Likes } from "./components/post/Likes";
import { Comments } from "./components/post/Comments";
import CreateBlogPage from "./pages/CreateBlogPage";
import { SinglePost } from "./components/post/SinglePost";

// import useTracking from "./hooks/useTrackingHook";

function App() {
  // useTracking("App");

  // useEffect(() => {
  //   const localToken = localStorage.getItem("token");
  //   setToken(localToken);
  // }, [token]);

  return (
    <div className="w-[100vw] h-[100vh] bg-gray-900">
      <div className="w-full h-full flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/dashboard/my-profile"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route path="/about" element={<AboutPage />} />

          <Route
            path="signup"
            element={
              <OpenRoute>
                <SignupPage />
              </OpenRoute>
            }
          />
          <Route
            path="/login"
            element={
              <OpenRoute>
                <LoginPage />
              </OpenRoute>
            }
          />

          <Route
            path="/varifyemail"
            element={
              <OpenRoute>
                <VarifyEmail />
              </OpenRoute>
            }
          />

          <Route
            path="/signupprofile"
            element={
              <SignupRoute>
                <SignupProfilePage />
              </SignupRoute>
            }
          />

          <Route path="/logout" element={<Logout />} />

          <Route
            path="/createblog"
            element={
              <PrivateRoute>
                <CreateBlogPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/post/:postid"
            element={
              <PrivateRoute>
                <SinglePost />
              </PrivateRoute>
            }
          />

          <Route path="/likes/:postid" element={<Likes />} />
          <Route path="/comments/:postid" element={<Comments />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
