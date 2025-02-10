import AddReview from "./containers/AddReview";
import Login from "./containers/Login";
import Register from "./containers/Register";
import ReviewList from "./containers/ReviewList";
import { Routes, Route } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Login />} />
      <Route path="/reviews" element={<ReviewList />} />
      <Route path="/add-review" element={<AddReview />} />
    </Routes>
  );
}

export default App;
