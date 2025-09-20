import { createContext, useContext, useEffect, useState } from "react";

const TrackerContext = createContext();

const TrackerProvider = ({ children }) => {
 const [allschedule, setAllschedule] = useState([]);

const categoryoption = [
  "Work",
  "Study",
  "Projects",
  "Meditation",
  "Travel",
  "Fitness",
  "Entertainment",
  "Meals",
];

useEffect(() => {
  const local = localStorage.getItem("daily-tracker");
  if (local) {
    try {
      const parsedData = JSON.parse(local);
      setAllschedule(parsedData);
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      setAllschedule([]);
    }
  }
}, []);

const handleSubmitTask = (task) => {
  setAllschedule(prevSchedule => {
    const newSchedule = [...prevSchedule, task];
    localStorage.setItem("daily-tracker", JSON.stringify(newSchedule));
    return newSchedule;
  });
};
  const allvalue = { categoryoption, handleSubmitTask, allschedule };
  return (
    <TrackerContext.Provider value={allvalue}>
      {children}
    </TrackerContext.Provider>
  );
};

export default TrackerProvider;

export const useTracker = () => useContext(TrackerContext);
