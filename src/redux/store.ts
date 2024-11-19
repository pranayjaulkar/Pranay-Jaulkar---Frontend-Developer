import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../reducers/filter";
import DetailedMealReducer from "../reducers/detailedMeal";

const store = configureStore({
  reducer: { filter: filterReducer, detailedMeal: DetailedMealReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
