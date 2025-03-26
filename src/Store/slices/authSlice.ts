import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateUserDto } from "src/sdk";

export interface UserInterface extends CreateUserDto {
  id?: string;
  createdAt: string;
  updatedAt: string;
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
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },

    updateUser: (state, action: PayloadAction<UserInterface | null>) => {
      const user = action.payload;
      state.isAuthenticated = Boolean(user);
      state.user = user;
    },
  },
});

export const { logout, updateUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
