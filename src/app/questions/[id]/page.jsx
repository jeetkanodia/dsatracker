"use client";

import React, { useState, useEffect, useContext, use } from "react";
import SearchBar from "../../component/SearchBar/SearchBar";
import QuestionTable from "../../component/QuestionTable/QuestionTable";
import ProgressBar from "../../component/ProgressBar/ProgressBar";
import Loader from "../../component/Loader/Loader";
import { QuestionContext } from "../../../context/question.context";
import { UserContext } from "../../../context/user.context";
import { useRouter } from "next/navigation";
const Page = ({ params }) => {
  const router = useRouter();
  const { state, dispatch } = useContext(QuestionContext);
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const questionType = params.id;
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    // check if user is logged in
    if (
      localStorage.getItem("token") === null &&
      userState?.userToken === null
    ) {
      userDispatch({
        type: "TOAST_MESSAGE",
        payload: {
          toastMessage: "Please Login to continue",
        },
      });
      router.push("/login");
    }

    if (state?.categoryList.length === 0) {
      return;
    }
    let flag = false;
    state?.categoryList.forEach((element) => {
      if (element.category === questionType) {
        flag = true;
      }
    });

    if (!flag) {
      router.push("/");
    }

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
  }, [state.categoryList]);

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
    <div className="bg-gradient-to-t from-[#2A2541] from-0% to-[#000000] to-80% w-full min-h-screen h-auto top-0 absolute bg-[#212121] flex flex-col pt-[80px] items-center">
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
