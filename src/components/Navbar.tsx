import swiggyLogo from "../assets/swiggy-logo.svg";
import SearchIcon from "./icons/SearchIcon";

export default function Navbar() {
  return (
    <div className="w-full">
      <div className="mx-auto w-full px-4 md:px-8 py-2 md:py-4 lg:max-w-screen-xl">
        <nav className="flex w-full justify-between items-center">
          <img className="mr-4 w-28 sm:w-32 md:w-40" src={swiggyLogo} alt="Swiggy Logo" />
          <div className="min-w-40 w-80 flex items-center bg-gray-200 rounded-lg px-2 py-1 md:px-4 md:py-2">
            <input
              type="text"
              className="outline-none w-full bg-transparent"
              placeholder="Search for restaurant and food"
            />

            <button className="ml-2 w-6 ">
              <SearchIcon />
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
