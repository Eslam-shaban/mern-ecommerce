import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>

      <Navbar />
      <AppRouter />
      <Footer />
      <ToastContainer position="top-center" />
    </>
  );
};

export default App;
