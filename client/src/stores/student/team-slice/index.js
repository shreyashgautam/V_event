// src/redux/slices/teamSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// BASE URL
const BASE_URL = 'http://localhost:5001/api/student/team'; // Adjust if hosted elsewhere

// Async thunk: Create team
export const createTeam = createAsyncThunk(
  'team/createTeam',
  async (teamData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/create`, teamData);
      return response.data.team;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || 'Failed to create team');
    }
  }
);

// Async thunk: Get teams by leader regno
export const fetchTeamsByLeader = createAsyncThunk(
  'team/fetchTeamsByLeader',
  async (regno, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/leader/${regno}`);
      return response.data.teams;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || 'Failed to fetch teams');
    }
  }
);

// Async thunk: Delete a team
export const deleteTeam = createAsyncThunk(
  'team/deleteTeam',
  async ({ teamId, regno }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${teamId}`, {
        data: { regno }
      });
      return teamId;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || 'Failed to delete team');
    }
  }
);

// Initial state
const initialState = {
  teams: [],
  loading: false,
  error: null,
};

// Slice
const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    clearTeamError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.teams.push(action.payload);
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH
      .addCase(fetchTeamsByLeader.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamsByLeader.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = action.payload;
      })
      .addCase(fetchTeamsByLeader.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = state.teams.filter(team => team.teamId !== action.payload);
      })
      .addCase(deleteTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearTeamError } = teamSlice.actions;
export default teamSlice.reducer;
