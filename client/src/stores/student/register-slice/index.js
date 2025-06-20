import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:5001/api/student';

// ✅ Create Razorpay order
export const createRazorpayOrder = createAsyncThunk(
  'event/createRazorpayOrder',
  async ({ amount }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/payment/create-order`, { amount });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create order');
    }
  }
);

// ✅ Fetch all events a student has registered for
export const fetchStudentRegistrations = createAsyncThunk(
  'event/fetchStudentRegistrations',
  async (regNo, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/reg/registrations/${regNo}`);
      return response.data.data; // assuming data contains the registrations array
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch registrations');
    }
  }
);


// ✅ Register for Event
export const registerForEvent = createAsyncThunk(
  'event/registerForEvent',
  async (registrationData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/reg/register`, registrationData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Registration failed');
    }
  }
);

const registerEventSlice = createSlice({
  name: 'registerEvent',
  initialState: {
    loading: false,
    error: null,
    success: null,
    orderDetails: null,
    registrationData: null,
    registeredEvents: [], // 🆕 Store student's existing event registrations
  },
  reducers: {
    clearEventStatus: (state) => {
      state.error = null;
      state.success = null;
      state.orderDetails = null;
      state.registrationData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Create Razorpay Order
      .addCase(createRazorpayOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRazorpayOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(createRazorpayOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Register for Event
      .addCase(registerForEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(registerForEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
        state.registrationData = action.payload.data;
        // push the new registration to local state
        state.registeredEvents.push(action.payload.data);
      })
      .addCase(registerForEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Fetch Student Registrations
      .addCase(fetchStudentRegistrations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentRegistrations.fulfilled, (state, action) => {
        state.loading = false;
        state.registeredEvents = action.payload;
      })
      .addCase(fetchStudentRegistrations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearEventStatus } = registerEventSlice.actions;
export default registerEventSlice.reducer;
