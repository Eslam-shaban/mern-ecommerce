import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>

      <Navbar />
      <AppRouter />
      <ToastContainer position="top-center" />
    </>
  );
};

export default App;
