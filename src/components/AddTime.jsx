import React from "react";

const AddTime = () => {
  return (
    <div className="lg:w-[28%] w-full  h-[30rem] bg-white text-black dark:text-white flex flex-col gap-5  dark:bg-black border border-gray-300 rounded-2xl p-6">
      <h1 className="text-2xl font-semibold">Add Time Block</h1>
      <div className="flex justify-between ">
        <div className="flex flex-col">
          <label for="start" className="capitalize text-lg">
            start
          </label>
          <input
            type="time"
            name="start"
            id="start"
            className="border border-black dark:border-white  rounded-md px-2 py-1"
          />
        </div>
        <div className="flex flex-col">
          <label for="end" className="capitalize text-lg">
            end
          </label>
          <input
            type="time"
            name="end"
            id="end"
            className="border border-black dark:border-white  rounded-md px-2 py-1"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label for="title" className="capitalize text-lg">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          className="border text-lg  border-black dark:border-white  rounded-md px-2 py-2"
        />
      </div>
      <div className="flex flex-col">
        <label for="title" className="capitalize text-lg">Category</label>
        <select
          name=""
          id=""
          className="border border-black dark:border-white  rounded-md px-2 py-2"
        >
          <option value="">Study</option>
          <option value="">Study</option>
          <option value="">Study</option>
          <option value="">Study</option>
          <option value="">Study</option>
        </select>
      </div>
      <div>
        <button className=" bg-black hover:bg-white border border-black hover:text-black dark:border-white dark:bg-white dark:hover:bg-black dark:hover:text-white rounded-full w-full text-center py-3 text-white dark:text-black text-xl transition-all duration-300">
          Add
        </button>
      </div>
      <hr />
    </div>
  );
};

export default AddTime;
