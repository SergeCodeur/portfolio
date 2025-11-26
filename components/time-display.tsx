"use client";
import { useEffect } from "react";
import { useTimeStore } from "@/store/time-store";

const TimeDisplay = () => {
  const currentTime = useTimeStore((state) => state.currentTime);
  const startInterval = useTimeStore((state) => state.startInterval);
  const stopInterval = useTimeStore((state) => state.stopInterval);

  useEffect(() => {
    startInterval();
    return () => {
      stopInterval();
    };
  }, [startInterval, stopInterval]);

  return <span className="text-center sm:text-left whitespace-nowrap">Local Time: {currentTime || "--:--"}</span>;
};

export default TimeDisplay;

