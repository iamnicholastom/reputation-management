import { useEffect } from "react";
import AddReview from "./containers/AddReview";
import Login from "./containers/Login";
import ProtectedRoute from "./containers/ProtectedRoute";
import Register from "./containers/Register";
import ReviewList from "./containers/ReviewList";
import { Routes, Route } from "react-router";
import { useAppDispatch } from "./store/hooks";
import { checkAuth } from "./store/features/authSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/add-review"
        element={
          <ProtectedRoute>
            <AddReview />
          </ProtectedRoute>
        }
      />
      <Route path="/register" element={<Register />} />
      <Route path="/reviews" element={<ReviewList />} />
    </Routes>
  );
}

export default App;
