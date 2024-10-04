import { ToastContainer } from "react-toastify";

import Filters from "./components/Filters";
import FoodItems from "./components/FoodItems";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Filters />
      <FoodItems />
      <Footer />
    </>
  );
}

export default App;
