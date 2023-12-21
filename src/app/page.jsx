"use client";
import React, { useState, useEffect } from "react";

import Card from "./component/Card/Card";
import Loader from "./component/Loader/Loader";
import { TypeAnimation } from "react-type-animation";
export default function ButtonUsage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [categoryArray, setCategoryArray] = useState([]);
  useEffect(() => {
    setLoading(true);
    fetch("/api/questions")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(true);
          setLoading(false);
        } else {
          const categoryList = data?.questions;
          setData(categoryList);
          let newArray = [];
          for (let i = 0; i < categoryList.length; i++) {
            newArray.push(categoryList[i].category);
            newArray.push(1000);
          }
          setCategoryArray(newArray);
          setLoading(false);
        }
      });
  }, []);

  return (
    <>
      <div className="bg-gradient-to-t from-[#2A2541] from-0% to-[#000000] to-90% absolute top-0 w-full min-h-screen h-auto flex flex-col content-center items-center sm:pt-[100px] pt-[70px]">
        {loading ? (
          <Loader />
        ) : (
          <>
            <h1 className=" mx-5 text-4xl font-bold text-white mt-2">
              Ace your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600">
                Coding Interviews
              </span>
            </h1>
            //bg-gradient-to-t from-red-500 via-indigo-500 to-teal-500
            text-transparent bg-clip-text
            <h3 className="mx-5 text-xl font-bold text-white mt-2">
              Solve questions from different categories including{" "}
              <TypeAnimation
                sequence={categoryArray}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </h3>
            <div className="flex flex-wrap items-center p-5 gap-5">
              {data.map((item, idx) => (
                <Card
                  key={idx}
                  title={item.category}
                  link={item.category}
                  number={item.questionCount}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
