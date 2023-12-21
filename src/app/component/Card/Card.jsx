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
    <div className="bg-gradient-to-br from-[#957AFF] m-auto p-2 hover:scale-105 shadow-sm transition ease-in-out from-0% to-[#7855FF] to-90%  flex flex-col items-start rounded-[10px]">
      <div className="">
        <h1 className="text-white  text-3xl">{Title}</h1>
        <p className="text-sm text-[rgba(255,255,255,0.5)]">
          Total questions: {number}
        </p>
      </div>
      <p className="w-full mr-8">
        <Link href={`questions/${link}`}>
          <Button
            variant="flat"
            className="bg-white text-[#6842FF] rounded-md w-full h-7"
          >
            Start Solving
          </Button>
        </Link>
      </p>
    </div>
  );
};

export default Card;
