"use client";

import React from "react";
import SearchBar from "@/app/component/SearchBar/SearchBar";
import QuestionTable from "@/app/component/QuestionTable/QuestionTable";
import ProgressBar from "@/app/component/ProgressBar/ProgressBar";
const page = ({ params }) => {
  const questionType = params.id;

  // convert question Type to title case string
  const questionTypeTitle = questionType
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="w-full min-h-screen h-auto bg-[#212121] flex flex-col items-center pt-[100px]">
      <h1 className="home-title text-5xl font-bold text-white">
        {questionTypeTitle}
      </h1>
      <div className="w-[80%] sm:w-[60%] mt-6">
        <SearchBar />
        <ProgressBar />
        <QuestionTable />
      </div>
    </div>
  );
};

export default page;
