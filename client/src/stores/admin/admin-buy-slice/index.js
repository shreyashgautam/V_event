import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://v-event-hp33.vercel.app/api/admin/buy"; // adjust if deployed

// ✅ 1. Fetch all buys
export const fetchAllBuys = createAsyncThunk("adminBuy/fetchAllBuys", async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${BASE_URL}/all`);
    return res.data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch buys");
  }
});

// ✅ 2. Fetch buys by merchId
export const fetchBuysByMerchId = createAsyncThunk("adminBuy/fetchBuysByMerchId", async (merchId, thunkAPI) => {
  try {
    const res = await axios.get(`${BASE_URL}/merchid/${merchId}`);
    return res.data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch by merch ID");
  }
});

// ✅ 3. Delete a buy by buyId
export const deleteBuyById = createAsyncThunk("adminBuy/deleteBuyById", async (buyId, thunkAPI) => {
  try {
    await axios.delete(`${BASE_URL}/delete/${buyId}`);
    return buyId;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to delete purchase");
  }
});

const adminBuySlice = createSlice({
  name: "adminBuy",
  initialState: {
    buys: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Fetch all buys
      .addCase(fetchAllBuys.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBuys.fulfilled, (state, action) => {
        state.loading = false;
        state.buys = action.payload;
      })
      .addCase(fetchAllBuys.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Fetch by merchId
      .addCase(fetchBuysByMerchId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBuysByMerchId.fulfilled, (state, action) => {
        state.loading = false;
        state.buys = action.payload;
      })
      .addCase(fetchBuysByMerchId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Delete buy
      .addCase(deleteBuyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBuyById.fulfilled, (state, action) => {
        state.loading = false;
        state.buys = state.buys.filter((buy) => buy._id !== action.payload);
      })
      .addCase(deleteBuyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminBuySlice.reducer;
