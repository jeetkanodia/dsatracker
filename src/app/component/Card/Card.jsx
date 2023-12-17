import React from "react";
import Link from "next/link";
import "./Card.css";
import Button from "@mui/material/Button";

const Card = ({ link, title, number }) => {
  return (
    <Link href={link}>
      <div className="card-container">
        <h1 className="card-title">{title}</h1>
        <p className="card-numbers">Total questions: {number}</p>

        <div className="card-btn">
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
        </div>
      </div>
    </Link>
  );
};

export default Card;
