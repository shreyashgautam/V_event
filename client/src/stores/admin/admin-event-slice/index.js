import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'http://localhost:5001/api/admin/event';

// 🔄 Thunks

export const fetchEvents = createAsyncThunk(
  'adminEvent/fetchEvents',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${API}/get`, { withCredentials: true });
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to fetch events'
      );
    }
  }
);

export const addEvent = createAsyncThunk(
  'adminEvent/addEvent',
  async (eventData, thunkAPI) => {
    try {
      const res = await axios.post(`${API}/add`, eventData, {
        withCredentials: true,
      });
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to add event'
      );
    }
  }
);

export const editEvent = createAsyncThunk(
  'adminEvent/editEvent',
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const res = await axios.put(`${API}/edit/${id}`, updatedData, {
        withCredentials: true,
      });
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to edit event'
      );
    }
  }
);

export const deleteEvent = createAsyncThunk(
  'adminEvent/deleteEvent',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${API}/delete/${id}`, { withCredentials: true });
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to delete event'
      );
    }
  }
);

// 🧠 Slice

const adminEventSlice = createSlice({
  name: 'adminEvent',
  initialState: {
    events: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearEventErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
      })
      .addCase(addEvent.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(editEvent.fulfilled, (state, action) => {
        const index = state.events.findIndex((e) => e._id === action.payload._id);
        if (index !== -1) state.events[index] = action.payload;
      })
      .addCase(editEvent.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter((e) => e._id !== action.payload);
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearEventErrors } = adminEventSlice.actions;
export default adminEventSlice.reducer;
