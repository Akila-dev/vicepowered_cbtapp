import React, { useState, useEffect } from "react";

const Header = ({ endExam }) => {
  const [secondsRemaining, setSecondsRemaining] = useState(2);
  // const [seconds, setSeconds] = useState(10);
  // const [minutes, setMinutes] = useState(10);
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

  // useEffect(() => {
  //   setInterval(() => {
  //     // timer();
  //     setSecondsRemaining((prev) => prev - 1);
  //   }, 1000);
  // }, []);

  const timer = () => {
    // console.log(secondsRemaining);
    setSecondsRemaining((prev) => prev - 1);
  };

  return (
    <div className="border-b py-4 px-1 shadow rounded-b-lg bg-white">
      <div className="container mx-auto px-5 lg:px-10 xl:px-0 flex justify-between items-center">
        <div className="text-green-700 text-xl uppercase font-bold">
          Voice-CBT
        </div>
        <div>
          <p className={`text-2xl font-semibold ${redTime && "text-red-800"}`}>
            {Math.floor(secondsRemaining / 60) < 10
              ? `0${Math.floor(secondsRemaining / 60)}`
              : Math.floor(secondsRemaining / 60)}
            :
            {secondsRemaining - Math.floor(secondsRemaining / 60) * 60 < 10
              ? `0${secondsRemaining - Math.floor(secondsRemaining / 60) * 60}`
              : secondsRemaining - Math.floor(secondsRemaining / 60) * 60}
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
