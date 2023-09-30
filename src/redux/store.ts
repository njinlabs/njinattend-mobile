import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/user";
import interfaceSlice from "./slices/interface";

const store = configureStore({
  reducer: {
    user,
    interface: interfaceSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
