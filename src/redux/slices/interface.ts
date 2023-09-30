import { createSlice } from "@reduxjs/toolkit";

export type InterfaceSliceType = {
  loading: boolean;
};

export const interfaceSlice = createSlice({
  name: "user",
  initialState: { loading: false } as InterfaceSliceType,
  reducers: {
    showLoading: () => {
      return { loading: true };
    },
    hideLoading: () => {
      return { loading: false };
    },
  },
});

// Action creators are generated for each case reducer function
export const { showLoading, hideLoading } = interfaceSlice.actions;

export default interfaceSlice.reducer;
