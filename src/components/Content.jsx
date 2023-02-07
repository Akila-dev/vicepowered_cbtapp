import React, { useState, useEffect } from "react";

const Content = ({ questionNo, question, nextQuestion }) => {
  const [choice, setChoice] = useState(question.choice);

  useEffect(() => {
    setChoice(question.choice);
  }, [choice, question.choice]);

  const choose = (option) => {
    question.choice = option;
    setChoice(question.choice);
    console.log(questionNo + ". " + option);
  };

  return (
    <div className="bg-white p-5 shadow rounded-lg w-full ">
      <h2 className="font-bold text-2xl">Question {questionNo}</h2>
      <p className="my-5">{question.question}</p>
      <div className="flex flex-col gap-2 items-start pb-4">
        <button
          className={`${
            choice === "A" ? "bg-green-700 text-white" : "bg-white"
          } py-[6px] px-3 rounded shadow-sm border border-gray-50 outline-none w-full text-left`}
          onClick={() => {
            choose("A");
            nextQuestion();
          }}
        >
          {question.optionA}
        </button>
        <button
          className={`${
            choice === "B" ? "bg-green-700 text-white" : "bg-white"
          } py-[6px] px-3 rounded shadow-sm border border-gray-50 outline-none w-full text-left`}
          onClick={() => {
            choose("B");
            nextQuestion();
          }}
        >
          {question.optionB}
        </button>
        <button
          className={`${
            choice === "C" ? "bg-green-700 text-white" : "bg-white"
          } py-[6px] px-3 rounded shadow-sm border border-gray-50 outline-none w-full text-left`}
          onClick={() => {
            choose("C");
            nextQuestion();
          }}
        >
          {question.optionC}
        </button>
        <button
          className={`${
            choice === "D" ? "bg-green-700 text-white" : "bg-white"
          } py-[6px] px-3 rounded shadow-sm border border-gray-50 outline-none w-full text-left`}
          onClick={() => {
            choose("D");
            nextQuestion();
          }}
        >
          {question.optionD}
        </button>
      </div>
    </div>
  );
};

export default Content;
