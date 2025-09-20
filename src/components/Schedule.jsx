import React from "react";
import { useTracker } from "../context/TrackerContext";

const Schedule = () => {
  const { allschedule, handleSubmitTask, categoryoption } = useTracker();
  //   console.log(<allsch></allsch>edule)
  const somedata = [
    {
      title: "Math/Science",
      start: "7:00am",
      end: "9:00am",
      category: "study",
    },
    // {
    //   title: "Math/Science",
    //   start: "7:00am",
    //   end: "9:00am",
    //   category: "study",
    // },
    // {
    //   title: "Math/Science",
    //   start: "7:00am",
    //   end: "9:00am",
    //   category: "study",
    // },
    // {
    //   title: "Math/Science",
    //   start: "7:00am",
    //   end: "9:00am",
    //   category: "study",
    // },
    // {
    //     title:'Math/Science',
    //     start:"7:00am",
    //     end:"9:00am",
    //     category:"study"
    // },
    // {
    //     title:'Math/Science',
    //     start:"7:00am",
    //     end:"9:00am",
    //     category:"study"
    // },
    // {
    //     title:'Math/Science',
    //     start:"7:00am",
    //     end:"9:00am",
    //     category:"study"
    // },
    // {
    //     title:'Math/Science',
    //     start:"7:00am",
    //     end:"9:00am",
    //     category:"study"
    // },
  ];
  return (
    <div className="lg:w-[68%] w-full  min-h-[30rem] h-auto bg-white dark:bg-black border border-gray-300 rounded-2xl p-6 ">
      <div className="flex lg:flex-row flex-col items-center justify-between">
        <h1 className="lg:text-2xl text-lg font-semibold capitalize text-black dark:text-white">
          Today's Schedule -- 2025-09-19
        </h1>

        <div className="flex items-center gap-3 text-black dark:text-white ">
          <h3 className="text-2xl font-semibold capitalize">filter</h3>
          <select
            name=""
            id=""
            className="border border-black dark:border-white px-4 rounded-md py-2 bg-black text-white dark:bg-white dark:text-black  "
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
          <div className="border border-black dark:border-white px-4 rounded-md py-2 bg-black text-white dark:bg-white dark:text-black  ">
            Clearall
          </div>
        </div>
      </div>
      <div className="my-5 flex flex-col gap-3 max-h-[30rem] px-2 overflow-y-auto">
        {allschedule?.length > 0 ? (
          allschedule.map((item, index) => {
            return (
              <div
                key={index}
                className="border border-gray-300 p-2 px-4  flex flex-col gap-2 rounded-2xl "
              >
                <div className="flex items-center gap-5 ">
                  <input type="checkbox" className="w-6 h-6" name="" id="" />
                  <div>
                    <h2 className="text-xl text-black dark:text-white">
                      {item.title}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 text-lg">
                      {item.start}- {item.end} 2h00m {item.category}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <>
            <div className="text-black dark:text-white text-5xl my-4 text-center capitalize">
              its empty noow
            </div>
          </>
        )}
        {/* {somedata.map((item, index) => {
          return (
            <div key={index} className="border border-gray-300 p-2 px-4  flex flex-col gap-2 rounded-2xl ">
              <div className="flex items-center gap-5 ">
                <input type="checkbox" className="w-6 h-6" name="" id="" />
                <div>
                  <h2 className="text-xl text-black dark:text-white">
                    {item.title}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 text-lg">
                    {item.start}- {item.end} 2h00m {item.category}
                  </p>
                </div>
              </div>
            </div>
          );
        })} */}
      </div>
    </div>
  );
};

export default Schedule;
