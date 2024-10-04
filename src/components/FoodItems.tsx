import { useEffect, useState } from "react";
import { getAllMealsByArea } from "../api";
import { useAppSelector } from "../redux/hooks";
import { Meal } from "../../types";
import MealCard from "./MealCard";
import FoodItemsSkeleton from "./FoodItemsSkeleton";
import MealDetailsModal from "./MealDetailsModal";
import { toast } from "react-toastify";

export default function FoodItems() {
  const { currentArea, sortBy } = useAppSelector((state) => state.filter);
  const { isOpen } = useAppSelector((state) => state.detailedMeal);
  const [loading, setLoading] = useState(false);
  const [meals, setMeals] = useState<(Meal & { rating: string; reviews: string })[]>([]);

  useEffect(() => {
    setLoading(true);
    getAllMealsByArea(currentArea)
      .then((result) => {
        setMeals(
          result.map((r) => ({
            ...r,
            rating: (Math.random() * (5 - 2) + 2).toFixed(1),
            reviews: (Math.random() * (150 - 20) + 20).toFixed(0),
          }))
        );
        setLoading(false);
      })
      .catch(() => {
        // console.log(error);
        setLoading(false);
        toast.error("An unexpected Error Occured");
      });
  }, [currentArea]);

  useEffect(() => {
    if (sortBy === "A-Z") {
      setMeals([...meals.sort((a, b) => a.strMeal.localeCompare(b.strMeal))]);
    } else {
      setMeals([...meals.sort((a, b) => b.strMeal.localeCompare(a.strMeal))]);
    }
  }, [sortBy]);

  return (
    <section className=" w-full md:max-w-screen-xl mx-auto py-4 px-8">
      {isOpen && <MealDetailsModal />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {loading ? <FoodItemsSkeleton /> : meals.map((m, i) => <MealCard key={i} meal={m} />)}
      </div>
    </section>
  );
}
