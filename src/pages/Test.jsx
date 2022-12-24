import React, { useState, useEffect } from "react";
import { Header, Sidebar, Content } from "../components";

import { ENGLISH } from "../utilities/Questions";

const Test = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [endExam, setEndExam] = useState(false);
  const [queryEndExamPopup, setQueryEndExamPopup] = useState(false);
  const [percentageScore, setPercentageScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [unanswered, setUnanswered] = useState(0);
  const questions = [...ENGLISH];

  useEffect(() => {
    setCurrentQuestion(0);
  }, []);

  const chooseOption = (option) => {
    questions[currentQuestion].choice = option;
    if (currentQuestion + 1 < questions.length) {
      setTimeout(() => {
        setCurrentQuestion((prev) => (prev += 1));
      }, 1000);
    }
    console.log(currentQuestion + 1 + ". " + option);
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => (prev += 1));
    }
  };
  const prevQuestion = () => {
    if (!currentQuestion <= 0) {
      setCurrentQuestion((prev) => (prev -= 1));
    }
  };

  const onEndExam = () => {
    setQueryEndExamPopup(false);
    let mark = 0;
    let unans = 0;
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const choice = question.choice;
      const answer = question.answer;
      if (choice === answer) {
        mark += 1;
      } else if (choice === "") {
        unans += 1;
      }
    }
    let perc = Math.round((mark / questions.length) * 100);
    setEndExam(true);
    setPercentageScore(perc);
    setCorrectAnswers(mark);
    setWrongAnswers(questions.length - mark + unans);
    setUnanswered(unans);
  };

  const queryEndExam = () => {
    setQueryEndExamPopup(true);
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header endExam={queryEndExam} />
      <div className="container mx-auto pt-5 px-5 lg:px-10 xl:px-0">
        <div className="flex gap-6">
          <div className="w-[255px] hidden md:block">
            <Sidebar />
          </div>
          <Content
            questionNo={currentQuestion + 1}
            question={questions[currentQuestion]}
            choose={chooseOption}
          />
        </div>
        <div className="my-5 bg-white rounded-lg shadow w-full p-5 flex gap-3 flex-wrap justify-center">
          {questions.map((question) => (
            <button
              key={question.id}
              className="bg-gray-50 shadow min-w-[32px] h-[32px] font-mono"
              onClick={() => setCurrentQuestion(Number(question.id) - 1)}
            >
              {question.id}
            </button>
          ))}
        </div>
      </div>
      {queryEndExamPopup && (
        <div className="bg-[rgba(255,255,255,0.7)] h-screen w-full absolute top-0 left-0 flex flex-col items-center py-5">
          <div className="bg-white border rounded-lg shadow p-5">
            <div className="p-5">
              <p>Are you sure you want to end exam?</p>
            </div>
            <div className="flex justify-between items-center px-5">
              <button
                className="px-4 py-2 rounded text-sm font-semibold bg-green-700 text-white"
                onClick={() => onEndExam()}
              >
                Yes
              </button>
              <button
                className="px-4 py-2 rounded text-sm font-semibold bg-red-700 text-white"
                onClick={() => setQueryEndExamPopup(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      {endExam && (
        <div className="bg-[rgba(255,255,255,0.7)] h-screen w-full absolute top-0 left-0 flex flex-col items-center py-5">
          <div className="bg-white border rounded-lg shadow flex gap-5 p-7">
            <div className="bg-green-600 p-5 w-[120px] h-[120px] text-white rounded-lg shadow flex flex-col justify-center items-center">
              <p className="uppercase text-sm">Score:</p>
              <div className="flex items-center gap-1 font-bold">
                <h2 className="text-4xl">{percentageScore} </h2>
                <span className="text-sm">%</span>
              </div>
            </div>
            <div className="border-l pl-5 flex flex-col justify-between">
              <p>
                Correct Answers:
                <span className="font-semibold pl-2">{correctAnswers}</span>
              </p>
              <p>
                Wrong Answers:
                <span className="font-semibold pl-2">{wrongAnswers}</span>
              </p>
              <p>
                Unanswered Questions:
                <span className="font-semibold pl-2">{unanswered}</span>
              </p>
              <p>
                Total No. of Questions:
                <span className="font-semibold pl-2">{questions.length}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Test;
