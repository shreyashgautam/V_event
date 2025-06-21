import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5001/api/student/buy"; // Update if hosted

// ✅ 1. Buy merch
export const buyMerch = createAsyncThunk("studentBuy/buyMerch", async ({ regNo, merchId }, thunkAPI) => {
  try {
    const res = await axios.post(`${BASE_URL}/buy`, { regNo, merchId });
    return res.data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to buy merch");
  }
});

// ✅ 2. Fetch all merch bought by student
export const fetchStudentBuys = createAsyncThunk("studentBuy/fetchStudentBuys", async (regNo, thunkAPI) => {
  try {
    const res = await axios.get(`${BASE_URL}/${regNo}`);
    return res.data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch your merch buys");
  }
});

const studentBuySlice = createSlice({
  name: "studentBuy",
  initialState: {
    myBuys: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearBuyMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Buy merch
      .addCase(buyMerch.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(buyMerch.fulfilled, (state, action) => {
        state.loading = false;
        state.myBuys.push(action.payload);
        state.successMessage = "Merch bought successfully!";
      })
      .addCase(buyMerch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Fetch merch bought by student
      .addCase(fetchStudentBuys.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentBuys.fulfilled, (state, action) => {
        state.loading = false;
        state.myBuys = action.payload;
      })
      .addCase(fetchStudentBuys.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBuyMessages } = studentBuySlice.actions;

export default studentBuySlice.reducer;
