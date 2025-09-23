import { createContext, useContext, useEffect, useState } from "react";
import uuid from "react-native-uuid";
const TrackerContext = createContext();

const TrackerProvider = ({ children }) => {
  const [allschedule, setAllschedule] = useState([]);
  const [isActive, SetISActive] = useState("daily");
  const allnames = ["daily", "weekly", "monthly"];

  const handlechangeActive = (item) => {
    SetISActive(item);
  };
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
    setAllschedule((prevSchedule) => {
      const newSchedule = [
        ...prevSchedule,
        {
          id: uuid.v4(),
          start: task.start,
          end: task.end,
          category: task.category,
          title: task.title,
        },
      ];
      localStorage.setItem("daily-tracker", JSON.stringify(newSchedule));
      return newSchedule;
    });
  };

  const handledelete = (taskid) => {
    const handlefilter = allschedule.filter((item) => item.id != taskid);
    setAllschedule(handlefilter);
    localStorage.setItem("daily-tracker", JSON.stringify(handlefilter));
    console.log(handlefilter);
  };

  function clearall() {
    setAllschedule([]);
    localStorage.removeItem("daily-tracker");
  }

  const allvalue = {
    categoryoption,
    handleSubmitTask,
    allschedule,
    handledelete,
    clearall,
    handlechangeActive,
    isActive,
    allnames
  };
  return (
    <TrackerContext.Provider value={allvalue}>
      {children}
    </TrackerContext.Provider>
  );
};

export default TrackerProvider;

export const useTracker = () => useContext(TrackerContext);
