"use client";
import React, { useState, useEffect } from "react";

import Card from "./component/Card/Card";
import Loader from "./component/Loader/Loader";
import { TypeAnimation } from "react-type-animation";
export default function ButtonUsage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
          setLoading(false);
          setData(categoryList);
        }
      });
  }, []);

  return (
    <>
      <div className="bg-gradient-to-t from-[#2A2541] from-0% to-[#000000] to-90% absolute top-0 w-full min-h-screen h-auto flex flex-col items-center sm:pt-[100px] pt-[70px]">
        {loading ? (
          <Loader />
        ) : (
          <>
            <h1 className="home-title font-display mx-5 text-4xl font-bold text-white">
              <TypeAnimation
                sequence={[
                  "Crack DSA with our specialized curated list🔥",
                  "Save and track your progress.",
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </h1>
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
