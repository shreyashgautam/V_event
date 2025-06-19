import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial State
const initialState = {
  registrations: [],
  loading: false,
  error: null,
  deleteStatus: null,
};

// ✅ Fetch all registrations
export const fetchAllRegistrations = createAsyncThunk(
  "admin/fetchAllRegistrations",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5001/api/admin/registers/all");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch registrations");
    }
  }
);

// ✅ Fetch registrations by event ID
export const fetchByEventId = createAsyncThunk(
  "admin/fetchByEventId",
  async (eventId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:5001/api/admin/registers/eventid/${eventId}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch by event ID");
    }
  }
);

// ✅ Fetch registrations by event name
export const fetchByEventName = createAsyncThunk(
  "admin/fetchByEventName",
  async (eventName, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:5001/api/admin/registers/eventname/${eventName}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch by event name");
    }
  }
);

// ✅ Delete registration by ID
export const deleteRegistration = createAsyncThunk(
  "admin/deleteRegistration",
  async (regId, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`http://localhost:5001/api/admin/registers/delete/${regId}`);
      return { regId, message: res.data.message };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete registration");
    }
  }
);

const adminRegisterSlice = createSlice({
  name: "adminRegister",
  initialState,
  reducers: {
    clearAdminRegisterError: (state) => {
      state.error = null;
    },
    clearDeleteStatus: (state) => {
      state.deleteStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchAllRegistrations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllRegistrations.fulfilled, (state, action) => {
        state.loading = false;
        state.registrations = action.payload;
      })
      .addCase(fetchAllRegistrations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch by event ID
      .addCase(fetchByEventId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchByEventId.fulfilled, (state, action) => {
        state.loading = false;
        state.registrations = action.payload;
      })
      .addCase(fetchByEventId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch by event name
      .addCase(fetchByEventName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchByEventName.fulfilled, (state, action) => {
        state.loading = false;
        state.registrations = action.payload;
      })
      .addCase(fetchByEventName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete registration
      .addCase(deleteRegistration.pending, (state) => {
        state.deleteStatus = "loading";
        state.error = null;
      })
      .addCase(deleteRegistration.fulfilled, (state, action) => {
        state.deleteStatus = "success";
        state.registrations = state.registrations.filter(
          (reg) => reg._id !== action.payload.regId
        );
      })
      .addCase(deleteRegistration.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.payload;
      });
  }
});

// Export actions
export const { clearAdminRegisterError, clearDeleteStatus } = adminRegisterSlice.actions;

// Export reducer
export default adminRegisterSlice.reducer;
