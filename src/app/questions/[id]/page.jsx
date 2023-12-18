"use client";
import { Password, Search } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import SearchBar from "@/app/component/SearchBar/SearchBar";
const page = ({ params }) => {
  const [question, setQuestion] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // useEffect(() => {
  //   const fetchQuestion = async () => {
  //     try {
  //       const response = await fetch(
  //         // api endpoint
  //       );
  //       const data = await response.json();
  //       setQuestion(data);
  //       setLoading(false);
  //     } catch (error) {
  //       setError(true);
  //       setLoading(false);
  //     }
  //   };
  //   fetchQuestion();
  // }, []);

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
      </div>
    </div>
  );
};

export default page;
