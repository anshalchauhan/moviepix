import { configureStore } from "@reduxjs/toolkit";
import {
  homeSliceReducer,
  getApiConfiguration,
  getGenres,
} from "./slices/homeSlice";

export const store = configureStore({
  reducer: {
    home: homeSliceReducer,
  },
});

export { getApiConfiguration, getGenres };
