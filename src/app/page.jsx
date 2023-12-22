"use client";
import React, { useState, useEffect, useContext } from "react";
import { QuestionContext } from "../context/question.context";
import Card from "./component/Card/Card";
import Loader from "./component/Loader/Loader";
import { TypeAnimation } from "react-type-animation";
export default function ButtonUsage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [categoryArray, setCategoryArray] = useState([]);
  const { state, dispatch } = useContext(QuestionContext);

  useEffect(() => {
    setLoading(true);
    if (state?.categoryList?.length > 0) {
      setData(state?.categoryList);
      let newArray = [];
      for (let i = 0; i < state?.categoryList.length; i++) {
        newArray.push(state?.categoryList[i].category);
        newArray.push(1000);
      }
      setCategoryArray(newArray);
      setLoading(false);
    }
  }, [state]);

  if (loading)
    return (
      <>
        <div className="bg-gradient-to-t from-[#2A2541] from-0% to-[#000000] to-90% absolute top-0 w-full min-h-screen h-auto flex flex-col content-center items-center sm:pt-[100px] pt-[70px]">
          <Loader />
        </div>
      </>
    );

  return (
    <>
      <div className="bg-gradient-to-t from-[#2A2541] from-0% to-[#000000] to-90% absolute top-0 w-full min-h-screen h-auto flex flex-col content-center items-center sm:pt-[100px] pt-[70px]">
        <>
          <h1 className=" mx-5 text-4xl font-bold text-white mt-2">
            Ace your{" "}
            <span className="bg-gradient-to-br from-red-500 via-indigo-500 to-teal-500 text-transparent bg-clip-text">
              Coding Interviews
            </span>
          </h1>

          <h3 className="mx-5 text-xl font-bold text-white mt-2">
            Solve questions from different categories including{" "}
            <TypeAnimation
              sequence={categoryArray}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h3>
          <div className="flex flex-wrap max-w-screen-lg items-center mx-auto p-5 gap-5">
            {data.map((item) => (
              <>
                <Card
                  key={item.category}
                  title={item.category}
                  link={item.category}
                  number={item.questionCount}
                />
              </>
            ))}
          </div>
        </>
      </div>
    </>
  );
}
