import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Themeprovider from "./context/ThemeContext.jsx";
import TrackerProvider from "./context/TrackerContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TrackerProvider>
      <Themeprovider>
        <App />
      </Themeprovider>
    </TrackerProvider>
  </StrictMode>
);
