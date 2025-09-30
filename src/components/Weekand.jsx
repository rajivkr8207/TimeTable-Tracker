import React, { useEffect, useState } from "react";
import { MdAccessTime, MdAvTimer } from "react-icons/md";
import { IoIosTimer } from "react-icons/io";
import { useTracker } from "../context/TrackerContext";
const Weekand = () => {
  const { isActive, gethour, completehour } = useTracker();
  console.log(completehour);

  function getDaysInCurrentMonth() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    return new Date(year, month + 1, 0).getDate();
  }

  return (
    <div className="mx-auto my-5 container w-full flex lg:flex-row flex-col flex-wrap gap-5">
      {isActive === "daily" && (
        <>
          <div className="lg:w-[30%] lg:mx-auto mx-2 lg:h-[10rem] h-[8rem] border shadow-lg border-gray-300 rounded-2xl flex flex-col justify-center lg:gap-16 gap-4 p-10">
            <h1 className="text-3xl font-semibold capitalize flex items-center gap-3 text-black dark:text-white">
              <MdAccessTime /> Today
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {Math.floor(completehour.today)}h{" "}
              {(completehour.today - Math.floor(completehour.today)) * 60}m /{" "}
              {gethour.hour}h {gethour.min}m Complete
            </p>
          </div>
        </>
      )}

      {(isActive === "daily" || isActive === "weekly") && (
        <>
          <div className="lg:w-[30%] lg:mx-auto mx-2 lg:h-[10rem] h-[8rem] border shadow-lg border-gray-300 rounded-2xl flex flex-col justify-center lg:gap-16 gap-4 p-10">
            <h1 className="text-3xl font-semibold capitalize flex items-center gap-3 text-black dark:text-white">
              <MdAvTimer />
              This Week
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {Math.floor(completehour.week)}h{" "}
              {(completehour.week - Math.floor(completehour.week)) * 60}m /{" "}
              {Math.floor((gethour.totalMin * 7) / 60)}h{" "}
              {(gethour.totalMin * 7) % 60}m Complete
            </p>
          </div>
        </>
      )}

      {(isActive === "daily" || isActive === "monthly") && (
        <>
          <div className="lg:w-[30%] lg:mx-auto mx-2 lg:h-[10rem] h-[8rem] border shadow-lg border-gray-300 rounded-2xl flex flex-col justify-center lg:gap-16 gap-4 p-10">
            <h1 className="text-3xl font-semibold capitalize flex items-center gap-3 text-black dark:text-white">
              <IoIosTimer /> This Month
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {Math.floor(completehour.monthly)}h{" "}
              {(completehour.monthly - Math.floor(completehour.monthly)) * 60}m /{" "}
              {Math.floor((gethour.totalMin * getDaysInCurrentMonth()) / 60)}h{" "}
              {(gethour.totalMin * getDaysInCurrentMonth()) % 60}m Complete
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Weekand;
