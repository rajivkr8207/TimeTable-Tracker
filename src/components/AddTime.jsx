import React from "react";
import { useForm } from "react-hook-form";
import { useTracker } from "../context/TrackerContext";
import { toast } from "react-toastify";

const AddTime = () => {
  const {
    register,
    handleSubmit,
    watch,reset,
    formState: { errors },
  } = useForm();
  const { categoryoption, handleSubmitTask } = useTracker();

  const onSubmit = (item) => {
    handleSubmitTask(item)
    toast.success('Add Task Successfully')
    reset()
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="lg:w-[28%] w-full  h-[30rem] bg-white text-black dark:text-white flex flex-col gap-5  dark:bg-black border border-gray-300 rounded-2xl p-6"
    >
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
            defaultValue="12:00"
            {...register("start", { required: true })}
            className="border border-black dark:border-white  rounded-md px-1 py-1  bg-black text-white dark:bg-white dark:text-black"
          />
          {errors.start && (
            <span className="text-red-400">This field is required</span>
          )}
        </div>
        <div className="flex flex-col">
          <label for="end" className="capitalize text-lg">
            end
          </label>
          <input
            type="time"
            name="end"
            id="end"
            defaultValue="01:00"
            {...register("end", { required: true })}
            className="border border-black dark:border-white  rounded-md px-1 py-1  bg-black text-white dark:bg-white dark:text-black"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label for="title" className="capitalize text-lg">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          {...register("title", { required: true })}
          className="border text-lg  border-black dark:border-white  rounded-md px-2 py-2"
        />
      </div>
      <div className="flex flex-col">
        <label for="title" className="capitalize text-lg">
          Category
        </label>
        <select
          name=""
          id=""
          {...register("category", { required: true })}
          className="border border-black dark:border-white  rounded-md px-2 py-2  bg-black text-white dark:bg-white dark:text-black"
        >
          {categoryoption.map((item, index) => {
            return (
              <option value={item} key={index}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <button
          type="submit"
          className=" bg-black hover:bg-white border border-black hover:text-black dark:border-white dark:bg-white dark:hover:bg-black dark:hover:text-white rounded-full w-full text-center py-3 text-white dark:text-black text-xl transition-all duration-300"
        >
          Add
        </button>
      </div>
      <hr />
    </form>
  );
};

export default AddTime;
