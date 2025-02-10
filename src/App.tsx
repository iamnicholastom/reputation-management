import AddReview from "./containers/AddReview";
import Login from "./containers/Login";
import ProtectedRoute from "./containers/ProtectedRoute";
import Register from "./containers/Register";
import ReviewList from "./containers/ReviewList";
import { Routes, Route } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ReviewList />} />
      <Route
        path="/add-review"
        element={
          <ProtectedRoute>
            <AddReview />
          </ProtectedRoute>
        }
      />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
