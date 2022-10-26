import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Netflix from "./pages/Netflix";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Player from "./pages/Player";
import TVShows from "./pages/TVShows";
import Movies from "./pages/Movies";
import UserListedMovies from "./pages/UserListedMovies";

const App = () => {
  return (
    <>
      <AuthContextProvider>
        <BrowserRouter basename="/react-netflix-clone">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Netflix />
                </ProtectedRoute>
              }
            />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route
              path="/player"
              element={
                <ProtectedRoute>
                  <Player />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shows"
              element={
                <ProtectedRoute>
                  <TVShows />
                </ProtectedRoute>
              }
            />
            <Route
              path="/movies"
              element={
                <ProtectedRoute>
                  <Movies />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mylist"
              element={
                <ProtectedRoute>
                  <UserListedMovies />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
};

export default App;
