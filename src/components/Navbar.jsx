import { useState } from "react";
import { FaTasks } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTracker } from "../context/TrackerContext";
const Navbar = () => {
  const { theme, handleTheme } = useTheme();
  const { allnames, isActive, handlechangeActive } = useTracker();

  return (
    <>
      <div className="mx-auto container text-black relative dark:text-white flex  justify-between items-center border border-black dark:border-white  lg:px-5 px-1 py-2">
        <div className="">
          <h1
           
            className="text-2xl font-bold flex flex-nowrap items-center gap-3"
          >
            <FaTasks className="lg:text-2xl text-lg" />
            Daily TimeTable
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <ul
            className={`md:flex hidden    md:flex-row flex-col  items-center gap-2 text-xl bg-gray-200 dark:bg-gray-800 px-3 py-2 rounded-2xl`}
          >
            {allnames?.map((item, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    handlechangeActive(item);
                  }}
                  className={`${
                    isActive == item &&
                    "bg-white text-black rounded-xl shadow-lg"
                  }  capitalize  px-2 py-1 cursor-pointer`}
                >
                  {item}
                </li>
              );
            })}
          </ul>
         
          <div
            onClick={() => handleTheme()}
            className="text-2xl bg-black p-2 rounded-full text-white dark:text-black dark:bg-white"
          >
            {theme == "dark" ? <FaSun /> : <FaMoon />}
          </div>
        </div>
      </div>
       <ul
            className={`md:hidden my-3 w-[70%] mx-auto flex justify-center items-center gap-2 text-xl bg-gray-200 dark:bg-gray-800 px-3 py-2 rounded-2xl text-black dark:text-white`}
          >
            {allnames.map((item, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    handlechangeActive(item);
                  }}
                  className={`${
                    isActive == item &&
                    "bg-white text-black rounded-xl shadow-lg"
                  }  capitalize  px-2 py-1 cursor-pointer`}
                >
                  {item}
                </li>
              );
            })}
          </ul>
    </>
  );
};

export default Navbar;
