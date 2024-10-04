import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import CloseIcon from "./icons/CloseIcon";
import { getMeal } from "../api";
import { changeDetailedMeal, close } from "../reducers/detailedMeal";
import { DetailedMeal } from "../../types";
import { toast } from "react-toastify";

export default function FilterModal() {
  const { value: detailedMeal, id } = useAppSelector((state) => state.detailedMeal);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    dispatch(close());
    dispatch(changeDetailedMeal({}));
  };

  let ingredientsAndQuantity = [];

  for (let i = 1; i <= 20; i++) {
    const ingredientKey = ("strIngredient" + i) as keyof DetailedMeal;
    const measureKey = ("strMeasure" + i) as keyof DetailedMeal;
    if (detailedMeal[ingredientKey] && detailedMeal[measureKey])
      ingredientsAndQuantity.push({
        ingredient: detailedMeal[ingredientKey],
        measure: detailedMeal[measureKey],
      });
  }

  ingredientsAndQuantity = ingredientsAndQuantity.map((item, i) => (
    <div
      key={i}
      className={`w-full flex border-gray-400 border-b border-l border-r ${
        i === ingredientsAndQuantity.length - 1 && "rounded-br-md rounded-bl-md"
      }`}
    >
      <span className="w-1/2 text-gray-700 text-center border-r border-gray-400 py-0.5">{item.ingredient}</span>
      <span className="w-1/2 text-gray-700 text-center py-0.5">{item.measure}</span>
    </div>
  ));

  useEffect(() => {
    setLoading(true);
    getMeal(id)
      .then((meal) => {
        setLoading(false);
        dispatch(changeDetailedMeal(meal));
      })
      .catch(() => {
        // console.log(error);
        setLoading(false);
        toast.error("An unexpected Error Occured");
      });
  }, []);

  return (
    <div className="fixed  z-10 left-0 top-0 w-screen h-screen flex justify-center items-center bg-[rgba(0,0,0,.5)]">
      <div className="flex flex-col w-4/5 md:w-3/4 lg:w-4/5 xl:w-2/3 h-4/5 mx-4 rounded-xl bg-white space-y-2 p-4">
        {loading ? (
          <div className="flex w-full h-full flex-col space-y-4 overflow-hidden">
            <div className="w-1/2 h-10 animate-pulse bg-gray-300 rounded-xl"></div>
            <div className="w-full h-80 bg-gray-300 animate-pulse rounded-xl"></div>
            <div className="w-full h-8 bg-gray-300 animate-pulse rounded-xl"></div>
            <div className="w-full h-80 bg-gray-300 animate-pulse rounded-xl"></div>
          </div>
        ) : (
          <>
            {/* Meal Name and Close button */}
            <div className="flex items-center justify-between">
              <span className="text-3xl">{detailedMeal.strMeal}</span>
              <span className="m-2 cursor-pointer" onClick={handleClose}>
                <CloseIcon />
              </span>
            </div>
            <div className="flex flex-col grow w-full overflow-y-scroll space-y-4 h-5/6">
              {/* Image */}
              <div className="w-full md:w-2/3 mx-auto min-h-80 md:h-[50%] rounded-xl">
                <img src={detailedMeal.strMealThumb} className="w-full h-full object-cover" alt="" />
              </div>

              {/* Category and Area */}
              <div className="w-full flex items-center justify-center">
                {detailedMeal.strCategory && (
                  <span className="w-1/2 space-x-2">
                    <span className="font-medium">Category :</span>
                    <span className="text-gray-700">{detailedMeal.strCategory}</span>
                  </span>
                )}
                {detailedMeal.strArea && (
                  <span className="w-1/2 space-x-2">
                    <span className="font-medium">Area :</span>
                    <span className="text-gray-700">{detailedMeal.strArea}</span>
                  </span>
                )}
              </div>

              {/* Instructions */}
              <div className="flex flex-col">
                <span className="w-full font-medium text-xl">Instructions</span>
                <p className="w-full flex flex-wrap break-word text-gray-700">{detailedMeal.strInstructions}</p>
              </div>

              {/* Ingredients and Quantity */}
              <div className="flex flex-col ">
                <div className="w-full flex text-xl font-medium border-gray-400 border rounded-tl-md rounded-tr-md">
                  <span className="w-1/2 text-center border-gray-400 border-r py-1">Ingredients</span>
                  <span className="w-1/2 text-center py-1">Quantity</span>
                </div>
                <div className="flex flex-col w-full">{ingredientsAndQuantity}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
