import { useState } from "react";
import { useNavigate } from "react-router";
import { useAddReviewMutation } from "../store/features/reviews";
import Label from "../components/Label/Label";
import Input from "../components/Input/Input";
import StarRating from "../components/StarRating/StarRating";
import Button from "../components/Button/Button";

const AddReview = () => {
  const [addReview, { isLoading }] = useAddReviewMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
    review: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (formData.rating === 0) newErrors.rating = "Please select a rating";
    if (!formData.review) newErrors.review = "Review is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validateForm()) {
      try {
        await addReview(formData).unwrap();
        setFormData({
          name: "",
          email: "",
          rating: 0,
          review: "",
        });
        navigate("/reviews");
      } catch (err) {
        console.error("Failed to save the review:", err);
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-16">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-card p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Add a Review</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              name="name"
              label="Name"
              htmlFor="name"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              error={errors.name}
            />
          </div>
          <div>
            <Input
              name="email"
              type="email"
              label="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="your@email.com"
              error={errors.email}
              htmlFor="email"
            />
          </div>
          <StarRating
            numberOfStars={5}
            error={errors.rating}
            onChange={(rating) => setFormData({ ...formData, rating })}
          />
          <div>
            <Label>Review</Label>
            <textarea
              value={formData.review}
              onChange={(e) =>
                setFormData({ ...formData, review: e.target.value })
              }
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                errors.review ? "border-red-500" : "border-gray-300"
              }`}
              rows={4}
              placeholder="Write your review here..."
            />
            {errors.review && (
              <p className="mt-1 text-sm text-red-500">{errors.review}</p>
            )}
          </div>
          <Button type="submit" isLoading={isLoading} disabled={isLoading}>
            Submit Review
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
