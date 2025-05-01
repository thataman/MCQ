import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  timeRemaining: number; // in seconds
  onTimeEnd: () => void;
  isPaused: boolean;
}

const Timer: React.FC<TimerProps> = ({ timeRemaining, onTimeEnd, isPaused }) => {
  const [seconds, setSeconds] = useState(timeRemaining);

  useEffect(() => {
    setSeconds(timeRemaining);
  }, [timeRemaining]);

  useEffect(() => {
    if (seconds <= 0) {
      onTimeEnd();
      return;
    }

    if (isPaused) return;

    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 1) {
          clearInterval(interval);
          onTimeEnd();
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, onTimeEnd, isPaused]);

  // Format time as HH:MM:SS
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
    ].join(':');
  };

  // Get background color based on remaining time
  const getTimerColor = () => {
    const totalDuration = timeRemaining;
    const percentage = (seconds / totalDuration) * 100;
    
    if (percentage <= 25) return 'bg-red-100 dark:bg-red-900 dark:bg-opacity-20 text-red-600 dark:text-red-400';
    if (percentage <= 50) return 'bg-yellow-100 dark:bg-yellow-900 dark:bg-opacity-20 text-yellow-600 dark:text-yellow-400';
    return 'bg-green-100 dark:bg-green-900 dark:bg-opacity-20 text-green-600 dark:text-green-400';
  };

  return (
    <div className={`flex items-center space-x-2 px-3 py-2 rounded-md ${getTimerColor()}`}>
      <Clock className="h-4 w-4" />
      <span className="font-mono">{formatTime(seconds)}</span>
    </div>
  );
};

export default Timer;