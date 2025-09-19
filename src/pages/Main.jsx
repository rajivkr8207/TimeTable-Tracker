import React from "react";
import Navbar from "../components/Navbar";
import Weekand from "../components/Weekand";
import Schedule from "../components/Schedule";
import AddTime from "../components/AddTime";

const Main = () => {
  return (
    <>
      <Navbar />
      <Weekand />
      <div className="container my-2 mx-auto flex lg:flex-row flex-col gap-3 justify-between px-2">
        <Schedule />
        <AddTime />
      </div>
    </>
  );
};

export default Main;
