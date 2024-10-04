import { useEffect, useState } from "react";
import FilterIcon from "./icons/FilterIcon";
import ChevronDownIcon from "../assets/chevronDownIcon.svg";
import FilterModal from "./FilterModal";
import { changeSortBy } from "../reducers/filter";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import ChevronUpIcon from "../assets/chevronUpIcon.svg";

export default function Filters() {
  const dispatch = useAppDispatch();
  const { sortBy } = useAppSelector((state) => state.filter);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [sortByOpen, setSortByOpen] = useState(false);
  const filterStyles = "flex items-center rounded-full px-3 py-1 space-x-2 border border-gray-800 cursor-pointer";

  const handleClick = (event: Event) => {
    const target = event.target as HTMLElement;

    // if click is outside the popup or sortby button then close popup
    if (!target.closest("#openPopupButton") && !target.closest("#popup")) {
      setSortByOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="flex text-sm w-full md:max-w-screen-xl mx-auto my-4 space-x-2 px-8 items-center">
      {/* Filter Modal */}
      {filterOpen && <FilterModal onClose={() => setFilterOpen(false)} />}

      {/* Filter Button */}
      <div
        className={filterStyles}
        onClick={() => {
          setFilterOpen(true);
        }}
      >
        <span>Filters</span>
        <FilterIcon className="w-4 h-4" />
      </div>

      <div className="relative">
        {/* SortBy Button */}
        <div
          onClick={() => {
            setSortByOpen((sortByOpen) => !sortByOpen);
          }}
          className={filterStyles}
          id="openPopupButton"
        >
          <div className="flex space-x-1 select-none">
            <span>Sort By</span>
            {sortByOpen ? (
              <img src={ChevronUpIcon} className="w-5 h-5" />
            ) : (
              <img src={ChevronDownIcon} className="w-5 h-5" />
            )}
          </div>
        </div>

        {/* SortBy Popup */}
        {sortByOpen && (
          <div
            id="popup"
            className="absolute z-10 top-10 right-0 min-w-24  border bg-white  rounded-xl flex flex-col space-y-2 p-4"
          >
            {/* A-Z */}
            <div
              onClick={() => {
                setSortByOpen(false);
                dispatch(changeSortBy("A-Z"));
              }}
              className="flex space-x-3 items-center cursor-pointer"
            >
              <input type="radio" onChange={() => {}} checked={sortBy === "A-Z"} />
              <label>A-Z</label>
            </div>

            {/* Z-A */}
            <div
              onClick={() => {
                setSortByOpen(false);
                dispatch(changeSortBy("Z-A"));
              }}
              className="flex space-x-3 items-center cursor-pointer"
            >
              <input type="radio" onChange={() => {}} checked={sortBy === "Z-A"} />
              <label>Z-A</label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
