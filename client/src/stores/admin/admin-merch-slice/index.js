import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'http://localhost:5001/api/admin/merch';

// Async Thunks

export const fetchMerch = createAsyncThunk(
  'adminMerch/fetchMerch',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/get`, { withCredentials: true });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch merch');
    }
  }
);

export const addMerch = createAsyncThunk(
  'adminMerch/addMerch',
  async (newMerch, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API}/add`, newMerch, { withCredentials: true });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to add merch');
    }
  }
);

export const editMerch = createAsyncThunk(
  'adminMerch/editMerch',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API}/edit/${id}`, updatedData, { withCredentials: true });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to edit merch');
    }
  }
);

export const deleteMerch = createAsyncThunk(
  'adminMerch/deleteMerch',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API}/delete/${id}`, { withCredentials: true });
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete merch');
    }
  }
);

// Slice

const adminMerchSlice = createSlice({
  name: 'adminMerch',
  initialState: {
    merch: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchMerch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMerch.fulfilled, (state, action) => {
        state.loading = false;
        state.merch = action.payload;
      })
      .addCase(fetchMerch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add
      .addCase(addMerch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMerch.fulfilled, (state, action) => {
        state.loading = false;
        state.merch.unshift(action.payload);
      })
      .addCase(addMerch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Edit
      .addCase(editMerch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editMerch.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.merch.findIndex((m) => m._id === action.payload._id);
        if (index !== -1) state.merch[index] = action.payload;
      })
      .addCase(editMerch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteMerch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMerch.fulfilled, (state, action) => {
        state.loading = false;
        state.merch = state.merch.filter((m) => m._id !== action.payload);
      })
      .addCase(deleteMerch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminMerchSlice.reducer;
