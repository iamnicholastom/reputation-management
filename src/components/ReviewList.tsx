import { useTypedSelector } from "../store/hooks";

const ReviewList = () => {
  const reviews = useTypedSelector((state) => state.reviews.items);

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
