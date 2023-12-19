import React from "react";

const ProgressBar = ({ solvedQuestionLength, totalQuestionLength }) => {
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
