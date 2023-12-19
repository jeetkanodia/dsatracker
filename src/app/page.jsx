"use client";
import React, { useState, useEffect } from "react";
import Card from "./component/Card/Card";
import Loader from "./component/Loader/Loader";

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
          console.log(categoryList);
        }
      });
  }, []);

  return (
    <>
      <div className="bg-[#212121] w-full min-h-screen h-auto flex flex-col items-center sm:pt-[100px] pt-[70px]">
        {loading ? (
          <Loader />
        ) : (
          <>
            <h1 className="home-title text-5xl font-bold text-white">
              Crack DSA with our specialized curated list🔥
            </h1>
            <div className="flex flex-wrap w- items-center ">
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
