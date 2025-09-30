import { createContext, useContext, useEffect, useState } from "react";
import uuid from "react-native-uuid";
import { toast } from "react-toastify";

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

  const [gethour, setGethour] = useState({
    hour: "",
    min: "",
    totalMin: "",
  });

  const [completehour, setCompletehour] = useState({
    today: 0,
    week: 0,
    monthly: 0,
  });

  // Get current date info for reset tracking
  const getCurrentDateInfo = () => {
    const now = new Date();
    return {
      day: now.getDate(),
      week: getWeekNumber(now),
      month: now.getMonth(),
      year: now.getFullYear(),
      dateString: now.toDateString()
    };
  };

  // Get week number of the year
  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  // Check and reset completed hours based on time period
  const checkAndResetHours = () => {
    const currentDateInfo = getCurrentDateInfo();
    const storedDateInfo = JSON.parse(localStorage.getItem("last-reset-date") || "{}");
    const storedHours = JSON.parse(localStorage.getItem("completed-hours") || "{}");

    let needsUpdate = false;
    const newCompleteHour = { ...completehour };

    // Daily reset - if day changed
    if (storedDateInfo.day !== currentDateInfo.day || 
        storedDateInfo.month !== currentDateInfo.month ||
        storedDateInfo.year !== currentDateInfo.year) {
      newCompleteHour.today = 0;
      needsUpdate = true;
      
      // Also uncheck all completed tasks for the new day
      resetCompletedTasks();
    }

    // Weekly reset - if week changed
    if (storedDateInfo.week !== currentDateInfo.week || 
        storedDateInfo.year !== currentDateInfo.year) {
      newCompleteHour.week = 0;
      needsUpdate = true;
    }

    // Monthly reset - if month changed
    if (storedDateInfo.month !== currentDateInfo.month || 
        storedDateInfo.year !== currentDateInfo.year) {
      newCompleteHour.monthly = 0;
      needsUpdate = true;
    }

    if (needsUpdate) {
      setCompletehour(newCompleteHour);
      localStorage.setItem("completed-hours", JSON.stringify(newCompleteHour));
    }

    // Update last reset date
    localStorage.setItem("last-reset-date", JSON.stringify(currentDateInfo));
  };

  // Reset all completed tasks when day changes
  const resetCompletedTasks = () => {
    setAllschedule(prevSchedule => {
      const updatedSchedule = prevSchedule.map(task => ({
        ...task,
        complete: false
      }));
      
      localStorage.setItem("daily-tracker", JSON.stringify(updatedSchedule));
      return updatedSchedule;
    });
  };

  // Calculate time difference in minutes between two times
  const calculateTimeDifference = (start, end) => {
    const [h1, m1] = start.split(":").map(Number);
    const [h2, m2] = end.split(":").map(Number);
    
    const startMinutes = h1 * 60 + m1;
    const endMinutes = h2 * 60 + m2;
    
    let difference = endMinutes - startMinutes;
    
    // Handle overnight tasks (end time is next day)
    if (difference < 0) {
      difference += 24 * 60;
    }
    
    return difference;
  };

  // Update completed hours when checkbox is clicked
  const updateCompletedHours = (taskId, isCompleted) => {
    const task = allschedule.find(item => item.id === taskId);
    if (!task) return;

    const timeDifference = calculateTimeDifference(task.start, task.end);
    const hours = timeDifference / 60;

    setCompletehour(prev => {
      const newCompleteHour = { ...prev };
      
      if (isCompleted) {
        // Add hours when task is completed
        newCompleteHour.today = parseFloat((prev.today + hours).toFixed(2));
        newCompleteHour.week = parseFloat((prev.week + hours).toFixed(2));
        newCompleteHour.monthly = parseFloat((prev.monthly + hours).toFixed(2));
      } else {
        // Subtract hours when task is unchecked
        newCompleteHour.today = Math.max(0, parseFloat((prev.today - hours).toFixed(2)));
        newCompleteHour.week = Math.max(0, parseFloat((prev.week - hours).toFixed(2)));
        newCompleteHour.monthly = Math.max(0, parseFloat((prev.monthly - hours).toFixed(2)));
      }

      // Save to localStorage
      localStorage.setItem("completed-hours", JSON.stringify(newCompleteHour));
      return newCompleteHour;
    });
  };

  // Load completed hours and check for reset
  useEffect(() => {
    const savedHours = localStorage.getItem("completed-hours");
    const lastResetDate = localStorage.getItem("last-reset-date");
    
    // Initialize last reset date if not exists
    if (!lastResetDate) {
      localStorage.setItem("last-reset-date", JSON.stringify(getCurrentDateInfo()));
    }

    if (savedHours) {
      try {
        const parsedHours = JSON.parse(savedHours);
        
        // First set the hours, then check for reset
        setCompletehour(parsedHours);
        
        // Check if we need to reset based on date change
        setTimeout(() => {
          checkAndResetHours();
        }, 100);
        
      } catch (error) {
        console.error("Error parsing completed hours:", error);
      }
    } else {
      // Initialize if no saved hours
      setTimeout(() => {
        checkAndResetHours();
      }, 100);
    }
  }, []);

  // Calculate total hours for all tasks
  function getHour() {
    const totalMinutes =
      allschedule?.reduce((acc, currentValue) => {
        const timeDifference = calculateTimeDifference(currentValue.start, currentValue.end);
        return acc + timeDifference;
      }, 0) || 0;

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    setGethour({
      hour: hours,
      min: minutes,
      totalMin: totalMinutes,
    });
    return { hours, minutes, totalMinutes };
  }

  useEffect(() => {
    getHour();
  }, [allschedule]);

  // Load schedule from localStorage
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
          complete: false,
        },
      ];
      localStorage.setItem("daily-tracker", JSON.stringify(newSchedule));
      return newSchedule;
    });
  };

  const handlecheckbox = (taskId) => {
    const updatedSchedule = allschedule.map((item) => {
      if (item.id === taskId) {
        const newComplete = !item.complete;
        
        // Update completed hours
        updateCompletedHours(taskId, newComplete);
        
        return { ...item, complete: newComplete };
      }
      return item;
    });
    
    setAllschedule(updatedSchedule);
    localStorage.setItem("daily-tracker", JSON.stringify(updatedSchedule));
  };

  const handledelete = (taskid) => {
    const taskToDelete = allschedule.find(item => item.id === taskid);
    
    // If task was completed, subtract its hours from completed hours
    if (taskToDelete && taskToDelete.complete) {
      updateCompletedHours(taskid, false);
    }
    
    const handlefilter = allschedule.filter((item) => item.id !== taskid);
    setAllschedule(handlefilter);
    localStorage.setItem("daily-tracker", JSON.stringify(handlefilter));
    toast.success("Delete Task Successfully");
  };

  function clearall() {
    // Reset completed hours when clearing all tasks
    setCompletehour({
      today: 0,
      week: 0,
      monthly: 0,
    });
    
    setAllschedule([]);
    localStorage.removeItem("daily-tracker");
    localStorage.setItem("completed-hours", JSON.stringify({
      today: 0,
      week: 0,
      monthly: 0
    }));
    toast.success("Clear All Tasks Successfully");
  }

  // Manual reset function (optional)
  const resetCompletedHours = (type) => {
    setCompletehour(prev => {
      const newHours = {
        ...prev,
        [type]: 0
      };
      localStorage.setItem("completed-hours", JSON.stringify(newHours));
      return newHours;
    });
  };

  // Check for reset on app load and every minute
  useEffect(() => {
    checkAndResetHours();
    
    // Check every minute if date changed
    const interval = setInterval(() => {
      checkAndResetHours();
    }, 60000); // 1 minute
    
    return () => clearInterval(interval);
  }, []);

  const allvalue = {
    categoryoption,
    handleSubmitTask,
    allschedule,
    handledelete,
    clearall,
    handlechangeActive,
    isActive,
    allnames,
    handlecheckbox,
    gethour,
    completehour,
    resetCompletedHours
  };
  
  return (
    <TrackerContext.Provider value={allvalue}>
      {children}
    </TrackerContext.Provider>
  );
};

export default TrackerProvider;

export const useTracker = () => useContext(TrackerContext);