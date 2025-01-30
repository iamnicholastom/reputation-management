import { useState } from "react";
import { useDispatch } from "react-redux";
import { addReview } from "../store/features/reviews";

const AddReview = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
    review: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (formData.rating === 0) newErrors.rating = "Please select a rating";
    if (!formData.review) newErrors.review = "Review text is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validateForm()) {
      dispatch(addReview(formData));
      setFormData({ name: "", email: "", rating: 0, review: "" });
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-16">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-card p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Add a Review</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Your name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className={`p-2 text-2xl ${
                    formData.rating >= star
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
            {errors.rating && (
              <p className="mt-1 text-sm text-red-500">{errors.rating}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Review
            </label>
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
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
