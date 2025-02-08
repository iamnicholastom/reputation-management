export interface StarRatingProps {
  numberOfStars: number;
  error: string;
  onChange: (rating: number) => void;
}
