import { useState } from "react";
import { useDispatch } from "react-redux";
import { addReview } from "../store/features/reviews";

const AddReview = () => {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const dispatch = useDispatch();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const review = { id: crypto.randomUUID(), content, rating };
    dispatch(addReview(review));
    setContent("");
    setRating(5);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="description">Description</label>
      <br />
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        id="description"
      />
      <br />
      <button>Submit Review</button>
    </form>
  );
};

export default AddReview;
