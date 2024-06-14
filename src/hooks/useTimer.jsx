import { useState,useEffect } from "react";


const getFormattedTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return {
      days: days < 10 ? "0" + days : days,
      hours: hours < 10 ? "0" + hours : hours,
      minutes: minutes < 10 ? "0" + minutes : minutes,
      seconds: seconds < 10 ? "0" + seconds : seconds,
    };
  };
  

  
  const useTimer = ({ timerDays }) => {
    const currentTime = new Date().getTime();
    const deadlineTime = currentTime + timerDays * 24 * 60 * 60 * 1000;
  
    const [timeLeft, setTimeLeft] = useState(deadlineTime - currentTime);
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1000);
  
        if (timeLeft <= 0) {
          clearInterval(intervalId);
        }
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, [timeLeft]);
  
    const { days, hours, minutes, seconds } = getFormattedTime(timeLeft);
    return { timeLeft, days, hours, minutes, seconds };
  };
  
  export default useTimer;