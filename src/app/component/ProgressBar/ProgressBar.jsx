import React from "react";

const ProgressBar = () => {
  return (
    <div className="flex my-10">
      <div className="w-full bg-gray-200 rounded-full h-2.5  dark:bg-gray-700 m-auto">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${(8 / 10) * 100}%` }}
        ></div>
      </div>
      <div className="text-white text-center ml-6">8/10</div>
    </div>
  );
};

export default ProgressBar;
