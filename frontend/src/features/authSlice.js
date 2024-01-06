import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
};

export const LoginUser = createAsyncThunk(
  "user/LoginUser",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: user.email,
        password: user.password
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.msg;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const RegisterUser = createAsyncThunk(
  "user/RegisterUser",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:5000/register", {
        email: user.email,
        password: user.password
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.msg;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const getMe = createAsyncThunk(
  'user/getMe',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:5000/me');
      return response.data;
    } catch (error) {
      // Jika respons kesalahan ada, tangani kesalahan di sini
      if (error.response) {
        const message = error.response.data.msg; // Anda bisa mengubah ini sesuai struktur respons Anda
        return thunkAPI.rejectWithValue(message);
      }
      // Anda juga bisa menangani kesalahan lain jika diperlukan
      throw error;
    }
  }
);

export const LogOut = createAsyncThunk("user/LogOut", async () => {
  await axios.delete("http://localhost:5000/logout");
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(RegisterUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(LogOut.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
        state.isSuccess = false;
      });
  }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
