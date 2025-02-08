import { useState } from "react";
import { StarRatingProps } from "./StarRating.interface";

const StarRating = ({ numberOfStars, error, onChange }: StarRatingProps) => {
  const [starValue, setStarValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(0);
  const starsArray = new Array(numberOfStars).fill(0);

  return (
    <div>
      {starsArray.map((_, index) => (
        <span
          key={index}
          onClick={() => {
            setStarValue(index + 1);
            onChange(index + 1);
          }}
          className={`p-2 text-2xl cursor-pointer ${(hoverValue === 0 && index < starValue) || index < hoverValue ? "text-yellow-400" : "text-gray-300"}`}
          onMouseEnter={() => setHoverValue(index + 1)}
          onMouseLeave={() => setHoverValue(0)}
        >
          &#9733;
        </span>
      ))}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default StarRating;
