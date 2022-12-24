import React, { useState, useEffect } from "react";

const Header = ({ endExam }) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(10);
  const [redTime, setRedTime] = useState(false);

  // setInterval(() => {
  //   if (seconds === 0 && minutes !== 0) {
  //     setMinutes((prev) => prev - 1);
  //     setSeconds(59);
  //   } else if (seconds > 0 && seconds <= 59) {
  //     setSeconds((prev) => prev - 1);
  //   } else if (minutes <= 2) {
  //     setRedTime(true);
  //   } else if (seconds === 0 && minutes === 0) {
  //     setMinutes(0);
  //     setSeconds(0);
  //   } else {
  //     console.log("Confused time");
  //   }
  // }, 1000);

  useEffect(() => {}, [seconds, minutes]);

  return (
    <div className="border-b py-4 px-1 shadow rounded-b-lg bg-white">
      <div className="container mx-auto px-5 lg:px-10 xl:px-0 flex justify-between items-center">
        <div className="text-green-700 text-xl uppercase font-bold">
          Voice-CBT
        </div>
        <div>
          <p className={`text-2xl font-semibold ${redTime && "text-red-800"}`}>
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </p>
        </div>
        <button
          className="bg-red-700 text-white px-5 py-2 rounded-md font-semibold text-[15px] uppercase hidden md:block"
          onClick={endExam}
        >
          End Exam
        </button>
      </div>
    </div>
  );
};

export default Header;
