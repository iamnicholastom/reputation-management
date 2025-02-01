import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Review {
  id: string;
  name: string;
  email: string;
  rating: number;
  review: string;
}

interface ReviewsState {
  items: Review[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ReviewsState = {
  items: [],
  status: "idle",
  error: null,
};

const reviews = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    addReview: (state, action: PayloadAction<Omit<Review, "id">>) => {
      state.items.push({ id: crypto.randomUUID(), ...action.payload });
    },
    setReviews: (state, action: PayloadAction<Review[]>) => {
      state.items = action.payload;
    },
    setLoading: (state) => {
      state.status = "loading";
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.status = "failed";
    },
  },
});

export const { addReview, setReviews, setLoading, setError } = reviews.actions;
export default reviews.reducer;
