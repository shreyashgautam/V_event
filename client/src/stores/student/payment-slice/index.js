// ✅ Redux slice for payment verification and order creation

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5001/api/student/payment";

// ✅ Create Razorpay Order
export const createRazorpayOrder = createAsyncThunk(
  "payment/createOrder",
  async (amount, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/create-order`, { amount });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Order creation failed");
    }
  }
);

// ✅ Verify Razorpay Payment
export const verifyRazorpayPayment = createAsyncThunk(
  "payment/verifyPayment",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/verify-payment`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Verification failed");
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    loading: false,
    error: null,
    success: null,
    order: null,
    verification: null,
  },
  reducers: {
    clearPaymentStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = null;
      state.order = null;
      state.verification = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createRazorpayOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRazorpayOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createRazorpayOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Verify Payment
      .addCase(verifyRazorpayPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyRazorpayPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.verification = action.payload;
        state.success = action.payload.message;
      })
      .addCase(verifyRazorpayPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPaymentStatus } = paymentSlice.actions;
export default paymentSlice.reducer;
