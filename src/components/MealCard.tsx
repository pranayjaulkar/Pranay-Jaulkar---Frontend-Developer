import { Meal } from "../../types";
import { changeDetailedMealId, open } from "../reducers/detailedMeal";
import { useAppDispatch } from "../redux/hooks";
import StarIcon from "./icons/StarIcon";

interface MealProps {
  meal: Meal & { rating: string; reviews: string };
}

export default function MealCard({ meal }: MealProps) {
  const dispatch = useAppDispatch();

  return (
    <article className="flex flex-col w-full hover:scale-95 transition-all duration-100">
      <div
        onClick={() => {
          dispatch(open());
          dispatch(changeDetailedMealId(meal.idMeal));
        }}
        className="w-full rounded-xl h-48 cursor-pointer overflow-hidden"
      >
        <img src={meal.strMealThumb} className="w-full h-full object-cover" alt="" />
      </div>
      <span className="text-lg font-semibold w-full pt-2">{meal.strMeal}</span>
      <span className="flex items-center">
        <StarIcon />
        <span className="ml-2">{meal.rating} • </span>
        <span className="ml-1">{meal.reviews}</span>
      </span>
    </article>
  );
}
