// src/stores/admin/adminSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  students: [],
  loading: false,
  error: null,
  deleteStatus: null,
};

// ✅ Fetch all students
export const fetchAllStudents = createAsyncThunk(
  "admin/fetchAllStudents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5001/api/admin/studinfo/get");
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch students");
    }
  }
);

// ✅ Delete student by ID
export const deleteStudentById = createAsyncThunk(
  "admin/deleteStudentById",
  async (studentId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:5001/api/admin/studinfo/delete/${studentId}`);
      return { id: studentId, message: response.data.message };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete student");
    }
  }
);

const adminuserdetailsSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearDeleteStatus: (state) => {
      state.deleteStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all students
      .addCase(fetchAllStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchAllStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete student
      .addCase(deleteStudentById.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteStudentById.fulfilled, (state, action) => {
        state.students = state.students.filter(s => s._id !== action.payload.id);
        state.deleteStatus = "success";
      })
      .addCase(deleteStudentById.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.payload;
      });
  }
});

export const { clearDeleteStatus } = adminuserdetailsSlice.actions;
export default adminuserdetailsSlice.reducer;
