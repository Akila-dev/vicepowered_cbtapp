import React from "react";

const Content = ({ questionNo, question, choose }) => {
  return (
    <div className="bg-white p-5 shadow rounded-lg w-full ">
      <h2 className="font-bold text-2xl">Question {questionNo}</h2>
      <p className="my-5">{question.question}</p>
      <div className="flex flex-col gap-2 items-start pb-4">
        <button
          className="py-[6px] px-3 rounded bg-white shadow-sm border border-gray-50 outline-none w-full text-left"
          onClick={() => choose("A")}
          id={`opt${questionNo}A`}
        >
          {question.optionA}
        </button>
        <button
          className="py-[6px] px-3 rounded bg-white shadow-sm border border-gray-50 outline-none w-full text-left"
          onClick={() => choose("B")}
          id={`opt${questionNo}B`}
        >
          {question.optionB}
        </button>
        <button
          className="py-[6px] px-3 rounded bg-white shadow-sm border border-gray-50 outline-none w-full text-left"
          onClick={() => choose("C")}
          id={`opt${questionNo}C`}
        >
          {question.optionC}
        </button>
        <button
          className="py-[6px] px-3 rounded bg-white shadow-sm border border-gray-50 outline-none w-full text-left"
          onClick={() => choose("D")}
          id={`opt${questionNo}D`}
        >
          {question.optionD}
        </button>
      </div>
    </div>
  );
};

export default Content;
