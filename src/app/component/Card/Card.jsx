import React from "react";
import Link from "next/link";
import "./Card.css";
import Button from "@mui/material/Button";

const Card = ({ link, title, number }) => {
  // change title to sentence case

  const Title = title
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="card-container">
      <h1 className="card-title">{Title}</h1>
      <p className="card-numbers">Total questions: {number}</p>

      <div className="card-btn">
        <Link href={`questions/${link}`}>
          <Button
            style={{
              borderRadius: "30px",
              textTransform: "none",
            }}
            color="secondary"
            variant="contained"
          >
            Start Solving
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
