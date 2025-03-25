import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInterface {
  name: string;
  email: string;
  phoneNumber: string;
}

interface AuthStateInterface {
  isAuthenticated: boolean;
  user: UserInterface | null;
}

const initialState: AuthStateInterface = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // eslint-disable-next-line no-unused-vars
    login: (state, action: PayloadAction<number>) => {
      state.isAuthenticated = true;
      state.user = {
        name: "User",
        email: "user@example.com",
        phoneNumber: "xxx",
      };
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },

    // eslint-disable-next-line no-unused-vars
    updateUser: (state, action: PayloadAction<number>) => {
      state.isAuthenticated = true;
      state.user = {
        name: "User",
        email: "user@example.com",
        phoneNumber: "xxx",
      }; // action.payload.user
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
