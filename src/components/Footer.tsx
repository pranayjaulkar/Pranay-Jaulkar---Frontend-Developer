import SwiggyLogo from "../assets/swiggy-logo.svg";

export default function Footer() {
  return (
    <footer className="w-full px-4 py-6 bg-gray-950 mt-8">
      <div className="max-w-screen-xl mx-auto flex items-center">
        <span className="flex flex-col space-y-2 text-white">
          <img src={SwiggyLogo} className="w-40" alt="" />
          <span className="text-sm">&#169; 2024 Bundl Technologies Pvt. Ltd</span>
        </span>
      </div>
    </footer>
  );
}
