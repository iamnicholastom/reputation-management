import { useState } from "react";
import { useGetReviewsQuery } from "../store/features/reviews";

const ReviewList = () => {
  const { data: reviews = [], isLoading, error } = useGetReviewsQuery();

  const [editingReview, setEditingReview] = useState<string | null>(null);
  const [editedText, setEditedText] = useState("");

  const getSentimentColor = (rating: number) => {
    if (rating >= 4) return "bg-green-100 border-green-400 text-green-800";
    if (rating === 3) return "bg-gray-100 border-gray-400 text-gray-800";
    return "bg-red-100 border-red-400 text-red-800";
  };

  const handleEdit = (id: string, currentReview: string) => {
    setEditingReview(id);
    setEditedText(currentReview);
  };

  const handleSave = (id: string) => {
    console.log(`Saving updated review for ID: ${id}`, editedText);
    setEditingReview(null);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-16">
        <div className="text-gray-500 text-lg">Loading reviews...</div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-16">
        <div className="text-red-500 text-lg">Error loading reviews</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h2>
      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-6">
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-lg">No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className={`p-6 border-l-4 rounded-lg shadow-md ${getSentimentColor(
                review.rating
              )}`}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{review.name}</h3>
                <span className="text-gray-500 text-sm">{review.email}</span>
              </div>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-xl ${
                      i < review.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              {editingReview === review.id ? (
                <textarea
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition border-gray-300"
                />
              ) : (
                <p className="text-gray-700">{review.review}</p>
              )}

              <div className="mt-4 flex gap-2">
                {editingReview === review.id ? (
                  <button
                    onClick={() => handleSave(review.id)}
                    className="px-3 py-1 text-sm font-medium bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(review.id, review.review)}
                    className="px-3 py-1 text-sm font-medium bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => {}}
                  className="px-3 py-1 text-sm font-medium bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                >
                  Delete
                </button>
                <button className="px-3 py-1 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                  Reply
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewList;
