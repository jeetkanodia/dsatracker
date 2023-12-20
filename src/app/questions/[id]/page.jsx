"use client";

import React, { useState, useEffect, useContext } from "react";
import SearchBar from "@/app/component/SearchBar/SearchBar";
import QuestionTable from "@/app/component/QuestionTable/QuestionTable";
import ProgressBar from "@/app/component/ProgressBar/ProgressBar";
import Loader from "@/app/component/Loader/Loader";
import { QuestionContext } from "@/context/question.context";

const Page = ({ params }) => {
  const { state, dispatch } = useContext(QuestionContext);

  const questionType = params.id;
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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
          // dispatch questionList to context
          dispatch({
            type: "SET_INITAL_STATE",
            payload: {
              questionList: data?.["questionsList"][0]?.["questionList"],
              category: questionType,
            },
          });
          setLoading(false);
        });
    }
    fetchData();
  }, []);

  const handleFilter = (filterType) => {
    let filteredQuestions;
    setSearchQuery("");
    if (filterType === "All") {
      filteredQuestions = state.questionList;
    } else {
      filteredQuestions = state.questionList.filter(
        (question) => question.difficulty === filterType
      );
    }
    dispatch({
      type: "SET_FILTER_QUESTION_LIST",
      payload: {
        filterQuestionList: filteredQuestions,
      },
    });
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchQuery(searchTerm);

    const filteredQuestions = state.questionList.filter((question) =>
      question.title.toLowerCase().includes(searchTerm)
    );
    dispatch({
      type: "SET_FILTER_QUESTION_LIST",
      payload: {
        filterQuestionList: filteredQuestions,
      },
    });
  };

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
          <Loader />
        ) : (
          <>
            <SearchBar
              handleFilter={handleFilter}
              searchQuery={searchQuery}
              handleSearch={handleSearch}
            />
            <ProgressBar />
            <QuestionTable />
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
