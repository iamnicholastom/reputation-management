import AddReview from "./components/AddReview";
import ReviewList from "./components/ReviewList";

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Review & Feedback Management
      </h1>
      <AddReview />
      <ReviewList />
    </>
  );
}

export default App;
