import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  eventList: [],
  eventDetails: null,
};

export const fetchAllFilteredEvents = createAsyncThunk(
  "events/fetchAllFilteredEvents",
  async ({ filterParams = {}, sortParams = "date-newest" }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });

    const result = await axios.get(
      `https://v-event-hp33.vercel.app/api/student/event/get?${query}`
    );

    return result?.data;
  }
);

export const fetchEventDetails = createAsyncThunk(
  "events/fetchEventDetails",
  async (id) => {
    const result = await axios.get(
      `https://v-event-hp33.vercel.app/api/student/event/get/${id}`
    );

    return result?.data;
  }
);

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    clearEventDetails: (state) => {
      state.eventDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.eventList = action.payload.data;
      })
      .addCase(fetchAllFilteredEvents.rejected, (state) => {
        state.isLoading = false;
        state.eventList = [];
      })
      .addCase(fetchEventDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchEventDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.eventDetails = action.payload.data;
      })
      .addCase(fetchEventDetails.rejected, (state) => {
        state.isLoading = false;
        state.eventDetails = null;
      });
  },
});

export const { clearEventDetails } = eventSlice.actions;

export default eventSlice.reducer;
