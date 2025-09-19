import { useContext, useEffect, useState } from "react";
import { createContext } from "react";

const Themecontext = createContext("dark");

const Themeprovider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("time-theme") || "dark";
  });

  useEffect(() => {
    const ele = document.documentElement;

    ele.classList.remove("light", "dark");

    ele.classList.add(theme);
    localStorage.setItem("time-theme", theme);
  }, [theme]);

  const handleTheme = () => {
    setTheme((prev) => (prev == "dark" ? "light" : "dark"));
  };

  const allvalue = {
    handleTheme,
    theme,
  };
  return (
    <Themecontext.Provider value={allvalue}>{children}</Themecontext.Provider>
  );
};

export default Themeprovider;

export const useTheme = () => useContext(Themecontext);
