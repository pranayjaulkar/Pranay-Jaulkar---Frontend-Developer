import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { changeArea, changeSortBy, setAreas } from "../reducers/filter";
import CloseIcon from "./icons/CloseIcon";
import { getAllAreas } from "../api";
import { toast } from "react-toastify";

export default function FilterModal({ onClose }: { onClose: () => void }) {
  const { sortBy, currentArea, areas } = useAppSelector((state) => state.filter);
  // "filter" for filter by area section and "sort" for sort section
  const [selectedSection, setSelectedSection] = useState<"filter" | "sort">("filter");
  const [selectedArea, setSelectedArea] = useState(currentArea);
  const [selectedSort, setSelectedSort] = useState(sortBy);
  const sorts: string[] = ["A-Z", "Z-A"];
  const dispatch = useAppDispatch();

  const handleApply = () => {
    dispatch(changeArea(selectedArea));
    dispatch(changeSortBy(selectedSort));
    onClose();
  };

  const handleCancel = () => {
    // set selectedArea back to previous selected area.
    setSelectedArea(currentArea);
    // set sort to previous sort
    setSelectedSort(sortBy);
    onClose();
  };

  // get all areas from api
  useEffect(() => {
    getAllAreas()
      .then((areas) => {
        dispatch(setAreas(areas));
      })
      .catch(() => {
        // console.log(error);
        toast.error("An unexpected Error Occured");
      });
  }, []);

  return (
    <div className="fixed z-10 left-0 top-0 w-screen h-screen flex justify-center items-center bg-[rgba(0,0,0,0.5)]">
      <div className="w-5/6  md:w-3/4 lg:w-3/6 xl:w-2/6 h-1/2 mx-4 rounded-xl bg-white">
        {/* Header and Close button */}
        <div className="flex h-1/6 items-center justify-between border-b border-gray-300">
          <span className="text-3xl ml-4 py-2">Filters</span>
          <span className="mr-4 m-2 cursor-pointer" onClick={onClose}>
            <CloseIcon />
          </span>
        </div>

        {/* Container for side panel and selection area */}
        <div className="w-full h-5/6 flex space-x-4">
          {/* Side Panel */}
          <div className="w-1/4 h-full flex flex-col pt-4 border-r border-gray-300">
            <span
              onClick={() => selectedSection !== "filter" && setSelectedSection("filter")}
              className={`cursor-pointer px-4 py-2 ${selectedSection === "filter" && "bg-gray-200"}`}
            >
              Filter by Area
            </span>
            <span
              onClick={() => selectedSection !== "sort" && setSelectedSection("sort")}
              className={`cursor-pointer px-4 py-2 ${selectedSection === "sort" && "bg-gray-200"}`}
            >
              Sort By
            </span>
          </div>

          {/* Selection Area */}
          <div className="w-3/4 py-4 max-h-full flex flex-col">
            <div className="flex flex-col h-full space-y-2 overflow-y-scroll">
              {/* if selectedSection === filter then load areas  */}
              {/* else load sort strategies */}
              {selectedSection === "filter" ? (
                <>
                  {areas.map((a, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedArea(a.strArea)}
                      className="flex space-x-3 items-center cursor-pointer"
                    >
                      <input
                        className="cursor-pointer"
                        type="radio"
                        onChange={() => {}}
                        checked={a.strArea === selectedArea}
                      />
                      <label className="cursor-pointer">{a.strArea}</label>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {sorts.map((sort, i) => (
                    <div
                      onClick={() => setSelectedSort(sort)}
                      key={i}
                      className="flex space-x-3 items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        className="cursor-pointer"
                        onChange={() => {}}
                        checked={sort === selectedSort}
                      />
                      <label className="cursor-pointer">{sort}</label>
                    </div>
                  ))}
                </>
              )}
            </div>
            <div className="w-full border-t flex justify-end items-center space-x-2 px-4 pt-4">
              <button
                onClick={handleCancel}
                className="px-4 py-1 bg-white border border-gray-500 hover:bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                className="px-4 py-1 rounded-lg bg-swiggy-orange border border-swiggy-orabg-swiggy-orange text-white hover:bg-swiggy-orange-dark hover:border-swiggy-orbg-swiggy-orange-dark"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
