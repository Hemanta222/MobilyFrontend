import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = "http://localhost:8080";
const initialState = {
  userId: "",
  email: "",
  token: "",
};
export const handleLogin = createAsyncThunk(
  "user/handleLogin",
  async (inputData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${URL}/login`,
        data: { email: inputData.email, password: inputData.password },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue({ message: error.response.data.message });
      } else {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);
export const handleSignup = createAsyncThunk(
  "user/handleSignup",
  async (inputData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${URL}/signup`,
        data: { email: inputData.email, password: inputData.password },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue({ message: error.response.data.message });
      } else {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(handleLogin.fulfilled, (state, action) => {
      const { user } = action.payload;
      state.email = user.email;
      state.userId = user.userId;
      state.token = user.token;
      localStorage.setItem("token", user.token);
    });
    builder.addCase(handleSignup.fulfilled, (state, action) => {
      const { user } = action.payload;
      state.email = user.email;
      state.userId = user.userId;
      state.token = user.token;
      localStorage.setItem("token", user.token);
    });
  },
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default userSlice.reducer;
