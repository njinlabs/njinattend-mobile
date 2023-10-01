import { createSlice } from "@reduxjs/toolkit";

export type InterfaceSliceType = {
  loading: boolean;
  toast: string | null;
};

export const interfaceSlice = createSlice({
  name: "user",
  initialState: { loading: false, toast: null } as InterfaceSliceType,
  reducers: {
    showLoading: (state) => {
      return { ...state, loading: true };
    },
    hideLoading: (state) => {
      return { ...state, loading: false };
    },
    toast: (state, { payload }: { payload: string | null }) => {
      return { ...state, toast: payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { showLoading, hideLoading, toast } = interfaceSlice.actions;

export default interfaceSlice.reducer;
