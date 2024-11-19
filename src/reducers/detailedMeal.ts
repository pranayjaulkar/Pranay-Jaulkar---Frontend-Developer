import { createSlice } from "@reduxjs/toolkit";
import { DetailedMeal } from "../../types";

export const DetailedMealSlice = createSlice({
  name: "DetailedMeal",
  initialState: {
    id: "",
    value: {} as DetailedMeal,
    // open boolean for Meal Details Modal
    isOpen: false,
  },
  reducers: {
    changeDetailedMeal: (state, action) => {
      state.value = action.payload;
    },
    changeDetailedMealId: (state, action) => {
      state.id = action.payload;
    },
    open: (state) => {
      state.isOpen = true;
    },
    close: (state) => {
      state.isOpen = false;
    },
  },
});

export const { changeDetailedMeal, open, close, changeDetailedMealId } = DetailedMealSlice.actions;

export default DetailedMealSlice.reducer;
