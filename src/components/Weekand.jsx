import React from "react";
import { MdAccessTime, MdAvTimer } from "react-icons/md";
import { IoIosTimer } from "react-icons/io";
const Weekand = () => {
  return (
    <div className="mx-auto my-5 container w-full flex lg:flex-row flex-col flex-wrap gap-5">
      <div className="lg:w-[30%]  lg:mx-auto mx-2 lg:h-[10rem] h-[8rem] border shadow-lg border-gray-300 rounded-2xl flex flex-col justify-center lg:gap-16 gap-4 p-10">
        <h1 className="text-3xl font-semibold capitalize flex items-center gap-3 text-black dark:text-white">
          <MdAccessTime /> Today
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">0h 0m / 15h 0m Complete</p>
      </div>
      <div className="lg:w-[30%]  lg:mx-auto mx-2 lg:h-[10rem] h-[8rem] border shadow-lg border-gray-300 rounded-2xl flex flex-col justify-center lg:gap-16 gap-4 p-10">
        <h1 className="text-3xl font-semibold capitalize flex items-center gap-3 text-black dark:text-white">
          <MdAvTimer />
          This Week
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">0h 0m / 15h 0m Complete</p>
      </div>
      <div className="lg:w-[30%]  lg:mx-auto mx-2 lg:h-[10rem] h-[8rem] border shadow-lg border-gray-300 rounded-2xl flex flex-col justify-center lg:gap-16 gap-4 p-10">
        <h1 className="text-3xl font-semibold capitalize flex items-center gap-3 text-black dark:text-white">
          <IoIosTimer /> This Month
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">0h 0m / 15h 0m Complete</p>
      </div>
    </div>
  );
};

export default Weekand;
