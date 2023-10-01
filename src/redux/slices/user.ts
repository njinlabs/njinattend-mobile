import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../api/models/user";

export type UserSliceType = {
  logged: boolean;
  data: Partial<UserType> | null;
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    logged: false,
    data: null,
  } as UserSliceType,
  reducers: {
    login: (_, { payload }: { payload: Partial<UserType> }) => {
      return {
        logged: true,
        data: payload,
      };
    },
    logout: () => {
      return {
        logged: false,
        data: null,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
