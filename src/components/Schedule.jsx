import React, { useEffect, useState } from "react";
import { useTracker } from "../context/TrackerContext";
import { FaTrash } from "react-icons/fa";

const Schedule = () => {
  const {
    allschedule,
    handleSubmitTask,
    categoryoption,
    handledelete,
    clearall,handlecheckbox
  } = useTracker();
  const [filname, setFilname] = useState("all");
  const [filteredSchedule, setFilteredSchedule] = useState([]);

  function schedulefilter() {
    if (filname === "all") {
      return allschedule || [];
    } else {
      return allschedule?.filter((item) => item.category === filname) || [];
    }
  }

  useEffect(() => {
    const filtered = schedulefilter();
    setFilteredSchedule(filtered);
  }, [filname, allschedule]);

  const dynamicdate = new Date().toLocaleDateString();

  const handleComplete = (taskId) => {
    handlecheckbox(taskId);
  }

  return (
    <div className="lg:w-[68%] w-full min-h-[30rem] h-auto bg-white dark:bg-black border border-gray-300 rounded-2xl p-6">
      <div className="flex lg:flex-row flex-col items-center justify-between gap-4">
        <h1 className="lg:text-2xl text-lg font-semibold capitalize text-black dark:text-white">
          Today's Schedule -- {dynamicdate}
        </h1>

        <div className="flex items-center gap-3 text-black dark:text-white flex-wrap justify-center">
          <h3 className="text-lg font-semibold capitalize">Filter</h3>
          <select
            value={filname}
            onChange={(e) => setFilname(e.target.value)}
            className="border border-black dark:border-white px-4 rounded-md py-2 bg-black text-white dark:bg-white dark:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            {categoryoption.map((item, index) => {
              return (
                <option value={item} key={index}>
                  {item}
                </option>
              );
            })}
          </select>
          <button
            onClick={() => clearall()}
            className="border border-black dark:border-white px-4 rounded-md py-2 bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>
      
      <div className="my-5 flex flex-col gap-3 max-h-[30rem] px-2 overflow-y-auto">
        {filteredSchedule.length > 0 ? (
          filteredSchedule.map((item, index) => {
            const [h1, m1] = item.start.split(":").map(Number);
            const [h2, m2] = item.end.split(":").map(Number);
            const totalMinutes = h2 * 60 + m2 - (h1 * 60 + m1);
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;
            
            return (
              <div
                key={item.id || index}
                className="border border-gray-300 p-4 flex flex-col gap-2 rounded-2xl hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <input 
                      type="checkbox" 
                      checked={item.complete}
                      onChange={() => handleComplete(item.id)}
                      className="w-5 h-5 cursor-pointer" 
                    />
                    <div>
                      <h2 className="text-xl font-medium capitalize text-black dark:text-white">
                        {item.title}
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300">
                        {item.start} - {item.end} • {hours}h {minutes}m • {item.category}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handledelete(item.id)}
                    className="text-xl cursor-pointer text-red-500 hover:text-red-700 transition-colors p-2"
                    title="Delete task"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-black dark:text-white text-2xl my-8 text-center capitalize">
            {allschedule?.length === 0 ? "No schedules added yet" : "No schedules match the selected filter"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;