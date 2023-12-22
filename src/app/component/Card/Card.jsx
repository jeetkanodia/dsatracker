import React from "react";
import Link from "next/link";
import { Button, ButtonGroup } from "@nextui-org/react";

// import Button from "@mui/material/Button";

const Card = ({ link, title, number }) => {
  // change title to sentence case

  const Title = title
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="bg-gradient-to-br w-72 from-[#957AFF] m-auto p-2 hover:scale-105 shadow-sm transition ease-in-out from-0% to-[#7855FF] to-90%  flex flex-col items-start rounded-[10px]">
      <div className="mb-1 ml-1">
        <h1 className="text-white  text-2xl mb-1">{Title}</h1>
        <p className="text-sm text-[rgba(255,255,255,0.5)]">
          Total questions: {number}
        </p>
      </div>
      <div className="w-full border-t-1 mb-2 border-[rgba(255,255,255,0.2)]"></div>
      <p className="w-full mr-16">
        <Button
          variant="flat"
          className="bg-white p-0 text-[#6842FF] rounded-md w-full h-7"
        >
          <Link
            className="w-full p-[16px] text-[#6842FF] "
            href={`questions/${link}`}
          >
            Start Solving
          </Link>
        </Button>
      </p>
    </div>
  );
};

export default Card;
