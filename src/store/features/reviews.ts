import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Review {
  id: string;
  name: string;
  email: string;
  rating: number;
  review: string;
}

interface ReviewSubmitData {
  name: string;
  email: string;
  rating: number;
  review: string;
}

export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://reputation-management-backend-41vt.onrender.com/api/",
  }),
  tagTypes: ["Review"],
  endpoints: (builder) => ({
    getReviews: builder.query<Review[], void>({
      query: () => "reviews",
      providesTags: ["Review"],
    }),

    addReview: builder.mutation<Review, ReviewSubmitData>({
      query: (review) => ({
        url: "reviews",
        method: "POST",
        body: review,
      }),
      invalidatesTags: ["Review"],
    }),

    deleteReview: builder.mutation<void, string>({
      query: (id) => ({
        url: `reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useAddReviewMutation,
  useDeleteReviewMutation,
} = reviewsApi;
