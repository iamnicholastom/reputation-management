import AddReview from "./containers/AddReview";
import ReviewList from "./containers/ReviewList";
import { Routes, Route } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ReviewList />} />
      <Route path="/add-review" element={<AddReview />} />
    </Routes>
  );
}

export default App;
