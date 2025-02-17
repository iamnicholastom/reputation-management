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

interface GetReviewsResponse {
  reviews: Review[];
  page: number;
  limit: number;
  totalPages: number;
  totalReviews: number;
}

export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      // No need to manually set the token since it's in httpOnly cookie
      return headers;
    },
  }),
  tagTypes: ["Review"],
  endpoints: (builder) => ({
    getReviews: builder.query<
      GetReviewsResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => `reviews?page=${page}&limit=${limit}`,
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
