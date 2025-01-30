import { useTypedSelector } from "../store/hooks";

const ReviewList = () => {
  const reviews = useTypedSelector((state) => state.reviews.items);

  return (
    <div className="p-4 space-y-4">
      {reviews.map(({ id, content, rating }) => (
        <div key={id} className="p-4 bg-gray-100 rounded-md shadow">
          <p className="font-semibold text-lg">{content}</p>
          <p className="text-sm text-gray-500">Rating: {rating}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
