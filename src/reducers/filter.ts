import { createSlice } from "@reduxjs/toolkit";
import { Area } from "../../types";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    // current selected area
    currentArea: "Indian",
    sortBy: "A-Z",
    // all areas
    areas: [] as Area[],
  },
  reducers: {
    changeArea: (state, action) => {
      state.currentArea = action.payload;
    },
    changeSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setAreas: (state, action) => {
      state.areas = action.payload;
    },
  },
});

export const { changeArea, setAreas, changeSortBy } = filterSlice.actions;

export default filterSlice.reducer;
