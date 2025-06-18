// src/redux/slices/merchSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  merchList: [],
  merchDetails: null,
  errorList: null,
  errorDetails: null,
};

export const fetchFilteredMerch = createAsyncThunk(
  "merch/fetchFilteredMerch",
  async ({ org = [], sortBy = "price-lowtohigh" } = {}) => {
    // Build query params
    const params = new URLSearchParams();
    params.append("sortBy", sortBy);
    if (org.length > 0) {
      params.append("org", org.join(","));
    }

    const response = await axios.get(
      `http://localhost:5001/api/student/merch/get?${params.toString()}`
    );

    return response.data; // { success: true, data: [...] }
  }
);

export const fetchMerchDetails = createAsyncThunk(
  "merch/fetchMerchDetails",
  async (merchId) => {
    const response = await axios.get(
      `http://localhost:5001/api/student/merch/get/${merchId}`
    );
    return response.data; // { success: true, data: {...} }
  }
);

const merchSlice = createSlice({
  name: "merch",
  initialState,
  reducers: {
    clearMerchDetails: (state) => {
      state.merchDetails = null;
      state.errorDetails = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch merch list
      .addCase(fetchFilteredMerch.pending, (state) => {
        state.isLoading = true;
        state.errorList = null;
      })
      .addCase(fetchFilteredMerch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.merchList = action.payload.data || [];
      })
      .addCase(fetchFilteredMerch.rejected, (state, action) => {
        state.isLoading = false;
        state.errorList = action.error.message || "Failed to fetch merch list";
        state.merchList = [];
      })

      // Fetch merch details
      .addCase(fetchMerchDetails.pending, (state) => {
        state.isLoading = true;
        state.errorDetails = null;
      })
      .addCase(fetchMerchDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.merchDetails = action.payload.data || null;
      })
      .addCase(fetchMerchDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.errorDetails = action.error.message || "Failed to fetch merch details";
        state.merchDetails = null;
      });
  },
});

export const { clearMerchDetails } = merchSlice.actions;
export default merchSlice.reducer;
