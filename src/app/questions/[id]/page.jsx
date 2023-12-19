"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "@/app/component/SearchBar/SearchBar";
import QuestionTable from "@/app/component/QuestionTable/QuestionTable";
import ProgressBar from "@/app/component/ProgressBar/ProgressBar";
import Loader from "@/app/component/Loader/Loader";
const page = ({ params }) => {
  const questionType = params.id;
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // fetch data from API using post method and pass questionType as body
    function fetchData() {
      fetch("/api/questions/list", {
        method: "POST",
        body: JSON.stringify({ category: questionType }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data?.["questionsList"][0]?.["questionList"]);
          setQuestions(data?.["questionsList"][0]?.["questionList"]);
          setLoading(false);
        });
    }
    fetchData();
  }, []);

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
      <div
        className={`w-[80%] sm:w-[60%] mt-6  ${
          loading ? "flex flex-col items-center justify-center" : ""
        }`}
      >
        {loading ? (
          <Loader className="" />
        ) : (
          <>
            <SearchBar />
            <ProgressBar />
            <QuestionTable questionList={questions} />
          </>
        )}
      </div>
    </div>
  );
};

export default page;
