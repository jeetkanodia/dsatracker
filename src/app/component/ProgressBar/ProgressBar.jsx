"use client";
import React, { useState, useEffect, useContext } from "react";
import { QuestionContext } from "@/context/question.context";

const ProgressBar = () => {
  const { state } = useContext(QuestionContext);
  const [solvedQuestionLength, setSolvedQuestionLength] = useState(0);
  const [totalQuestionLength, setTotalQuestionLength] = useState(1);
  useEffect(() => {
    setSolvedQuestionLength(state?.solvedQuestionList?.length);
    if (state?.questionList?.length === 0) return;
    setTotalQuestionLength(state?.questionList?.length);
  }, [state]);

  return (
    <div className="flex my-10">
      <div className="w-full bg-gray-200 rounded-full h-2.5  dark:bg-gray-700 m-auto">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{
            width: `${
              (solvedQuestionLength / totalQuestionLength) * 100 > 100
                ? 100
                : (solvedQuestionLength / totalQuestionLength) * 100
            }%`,
          }}
        ></div>
      </div>
      <div className="text-white text-center ml-6">
        {solvedQuestionLength}/{totalQuestionLength}
      </div>
    </div>
  );
};

export default ProgressBar;
