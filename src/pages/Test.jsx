import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { Header, Sidebar, Content } from "../components";

import { ENGLISH } from "../utilities/Questions";

const Test = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [endExam, setEndExam] = useState(false);
  const [queryEndExamPopup, setQueryEndExamPopup] = useState(false);
  const [percentageScore, setPercentageScore] = useState(0);
  const [correctlyAnswered, setCorrectlyAnswered] = useState(0);
  const [wronglyAnswered, setWronglyAnswered] = useState(0);
  const [unanswered, setUnanswered] = useState(0);
  const [endingExam, setEndingExam] = useState(false);
  // const [questions, setQuestions] = useState([...ENGLISH]);
  const questions = [...ENGLISH];

  useEffect(() => {
    ai_speak(
      `Question ${currentQuestion + 1}. ${questions[currentQuestion].question}`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    ai_speak(
      `Question ${currentQuestion + 1}. ${questions[currentQuestion].question}`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion]);

  const nextQuestion = () => {
    resetTranscript();
    if (currentQuestion + 1 < questions.length) {
      // setCurrentQuestion((prev) => (prev += 1));
      setTimeout(() => {
        setCurrentQuestion((prev) => (prev += 1));
      }, 2000);
    }
  };
  const prevQuestion = () => {
    resetTranscript();
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
    setCorrectlyAnswered(mark);
    setWronglyAnswered(questions.length - mark - unans);
    setUnanswered(unans);

    ai_speak(
      `Here is your result. You had ${perc} percent. You correctly answered ${mark} question, incorrectly answered ${
        questions.length - mark - unans
      } questions, and didn't answer ${unans} questions`
    );
  };

  const dontEndExam = () => {
    resetTranscript();
    setQueryEndExamPopup(false);
    setEndingExam(false);
  };

  const queryEndExam = () => {
    ai_speak("are you sure you want to end exam?");
    setEndingExam(true);
    setQueryEndExamPopup(true);
  };

  const ai_speak = (message, awaitresponse = true) => {
    if (message.includes("_")) {
      var l = message.indexOf("_");
      message = message.slice(0, l) + ",dash, " + message.slice(l);
    }

    for (let i = 0; i < 10; i++) {
      if (message.includes("_")) {
        message = message.replace("_", "");
        console.log(message);
      }
    }

    resetTranscript();
    SpeechRecognition.stopListening();
    const speech = new SpeechSynthesisUtterance();
    speech.text = message;
    const allVoices = speechSynthesis.getVoices();
    speech.voice = allVoices[3];
    console.log(allVoices);
    speech.volume = 0.8;
    speech.rate = 0.8;
    speech.pitch = 0.8;
    window.speechSynthesis.speak(speech);

    if (awaitresponse) {
      speech.onend = function (e) {
        resetTranscript();
        if (browserSupportsContinuousListening) {
          SpeechRecognition.startListening({ continuous: true });
        } else {
          // Fallback behaviour
          SpeechRecognition.startListening();
        }
      };
    }
  };

  const makeChoice = (questionNo, choice, choicenum) => {
    ai_speak(`You have selected option ${choicenum}`);
    questions[questionNo].choice = choice;
    nextQuestion();
  };

  const commands = [
    {
      command: [
        "options",
        "option",
        "auction",
        "action",
        "auctions",
        "actions",
      ],
      callback: () =>
        ai_speak(
          `option one: ${questions[currentQuestion].optionA}. option two: ${questions[currentQuestion].optionB}. option three: ${questions[currentQuestion].optionC}. option four: ${questions[currentQuestion].optionD}`
        ),
    },
    {
      command: ["question", "question again"],
      callback: () =>
        ai_speak(
          `Question ${currentQuestion + 1}. ${
            questions[currentQuestion].question
          }`
        ),
    },
    {
      command: [
        "one",
        "won",
        "1",
        "worn",
        "option one",
        "option 1",
        "auction one",
        "auction 1",
      ],
      callback: () => makeChoice(currentQuestion, "A", "one"),
    },
    {
      command: [
        "to",
        "22",
        "2",
        "two",
        "option two",
        "option 2",
        "option to",
        "auction 2",
        "auction to",
        "took",
        "so",
      ],
      callback: () => makeChoice(currentQuestion, "B", "two"),
    },
    {
      command: [
        "three",
        "3",
        "23",
        "tree",
        "option three",
        "option 3",
        "option tree",
        "auction three",
        "auction 3",
        "top 10",
      ],
      callback: () => makeChoice(currentQuestion, "C", "three"),
    },
    {
      command: [
        "four",
        "4",
        "24",
        "for",
        "option four",
        "option 4",
        "option for",
        "auction four",
        "auction 4",
        "auction for",
        "action for",
      ],
      callback: () => makeChoice(currentQuestion, "D", "four"),
    },
    {
      command: ["next", "next question", "skip"],
      callback: () => nextQuestion(),
    },
    {
      command: ["previous", "previous question", "back"],
      callback: () => prevQuestion(),
    },
    {
      command: ["end exam"],
      callback: () => queryEndExam(),
    },
    {
      command: ["yes"],
      callback: () => {
        endingExam && onEndExam();
      },
    },
    {
      command: ["no"],
      callback: () => {
        endingExam && dontEndExam();
      },
    },
    // {
    //   command: ["go to (question) (questions) *"],
    //   callback: (option) => {
    //     let numwords = [
    //       "one",
    //       "two",
    //       "three",
    //       "four",
    //       "five",
    //       "six",
    //       "seven",
    //       "eight",
    //       "nine",
    //       "ten",
    //     ];
    //     let numint = 0;
    //     if (Number(option) >= 0 && Number(option) <= 10) {
    //       setCurrentQuestion(Number(option) - 1);
    //     } else {
    //       for (let i = 0; i < numwords.length; i++) {
    //         const num = numwords[i];
    //         if (option === num) {
    //           numint = num;
    //         }
    //       }
    //       if (numint + 1 > 0) {
    //         setCurrentQuestion(Number(numint));
    //       } else {
    //         ai_speak(`I do not know question ${option}`);
    //       }
    //     }
    //   },
    // },
  ];

  // const { transcript, browserSupportsContinuousListening, resetTranscript } =
  //   useSpeechRecognition({ commands });

  const { browserSupportsContinuousListening, resetTranscript } =
    useSpeechRecognition({ commands });

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header endExam={queryEndExam} />
      {/* <p className="py-7 text-lg">{transcript}</p>
      <button onClick={() => SpeechRecognition.startListening()}>Click</button> */}
      <div className="container mx-auto pt-5 px-5 lg:px-10 xl:px-0">
        <div className="flex gap-6">
          <div className="w-[255px] hidden md:block">
            <Sidebar />
          </div>
          <Content
            questionNo={currentQuestion + 1}
            question={questions[currentQuestion]}
            nextQuestion={nextQuestion}
            // choose={chooseOption}
          />
        </div>
        <div className="my-5 bg-white rounded-lg shadow w-full p-5 flex gap-3 flex-wrap justify-center">
          {questions.map((question) => (
            <button
              key={question.id}
              className={`${
                questions[question.id - 1].choice === ""
                  ? "bg-gray-50"
                  : "bg-green-700 text-white rounded"
              } shadow min-w-[32px] h-[32px] font-mono`}
              onClick={() => setCurrentQuestion(Number(question.id) - 1)}
            >
              {question.id}
            </button>
          ))}
        </div>
      </div>
      {queryEndExamPopup && (
        <div className="bg-[rgba(255,255,255,0.7)] h-screen w-full absolute top-0 left-0 flex flex-col items-center py-8">
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
                onClick={() => dontEndExam()}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      {endExam && (
        <div className="bg-[rgba(255,255,255,0.7)] h-screen w-full absolute top-0 left-0 flex flex-col items-center py-8">
          <div className="bg-white border rounded-lg shadow flex gap-7 p-9">
            <div className="bg-green-600 p-8 w-[140px] h-[140px] text-white rounded-lg shadow flex flex-col justify-center items-center">
              <p className="uppercase text-sm">Score:</p>
              <div className="flex items-center gap-1 font-bold">
                <h2 className="text-4xl pb-2">{percentageScore} </h2>
                <span className="text-sm">%</span>
              </div>
            </div>
            <div className="border-l pl-7 flex flex-col justify-between gap-3">
              <p>
                Correct Answers:
                <span className="font-semibold pl-2">{correctlyAnswered}</span>
              </p>
              <p>
                Wrong Answers:
                <span className="font-semibold pl-2">{wronglyAnswered}</span>
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
