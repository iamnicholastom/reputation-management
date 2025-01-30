import { useSelector } from "react-redux";

const ReviewList = () => {
  const reviews = useSelector((state) => state.reviews.items);

  return (
    <div>
      <h2>Reviews</h2>
      {reviews.map((review) => (
        <div key={review.id}>
          <p>
            {review.content} - ⭐{review.rating}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
