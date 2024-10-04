import axios from "axios";
import { Area, DetailedMeal, Meal } from "../../types";

const api = axios.create({
  baseURL: "https://www.themealdb.com/api/json/v1/1",
});

export const getMeal = async (id: string): Promise<DetailedMeal> => {
  const res = await api.get(`/lookup.php?i=${id}`);
  return res.data.meals[0];
};

export const getAllMealsByArea = async (area: string): Promise<Meal[]> => {
  const res = await api.get(`/filter.php?a=${area}`);
  return res.data.meals;
};

export const getAllAreas = async (): Promise<Area[]> => {
  const res = await api.get("/list.php?a=list");
  return res.data.meals;
};
