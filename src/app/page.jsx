import React from "react";
import Card from "./component/Card/Card";

const data = [
  {
    title: "Array",
    link: "array",
    number: "23",
  },
  {
    title: "Array",
    link: "array",
    number: "23",
  },
  {
    title: "Array",
    link: "array",
    number: "23",
  },
];

export default function ButtonUsage() {
  return (
    <>
      <div className="bg-[#212121] w-full min-h-screen h-auto flex flex-col items-center sm:pt-[100px] pt-[70px]">
        <h1 className="home-title text-5xl font-bold text-white">
          Crack DSA with our specialized curated list🔥
        </h1>
        <div className="flex flex-wrap w- items-center ">
          {data.map((item) => (
            <Card
              key={item.title}
              title={item.title}
              link={item.link}
              number={item.number}
            />
          ))}
        </div>
      </div>
    </>
  );
}
