import { Bounce, ToastContainer } from "react-toastify";
import Main from "./pages/Main";
import { useTheme } from "./context/ThemeContext";

function App() {
  const { theme } = useTheme();
  return (
    <>
      <Main />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme == "dark" ? "dark" : "light"}
        transition={Bounce}
      />
    </>
  );
}

export default App;
