import AddReview from "./containers/AddReview";
import Login from "./containers/Login";
import Navbar from "./containers/Navbar";
import ProtectedRoute from "./containers/ProtectedRoute";
import PublicRoute from "./containers/PublicRoute";
import Register from "./containers/Register";
import ReviewList from "./containers/ReviewList";
import { Routes, Route } from "react-router";

function App() {
  const showNavbar = !["/", "/register"].includes(window.location.pathname);
  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/reviews"
          element={
            <ProtectedRoute>
              <ReviewList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-review"
          element={
            <ProtectedRoute>
              <AddReview />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
