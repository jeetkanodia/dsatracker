import { MongoClient } from "mongodb";
import { set } from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  let errorMsg = "Error: ";
  let client;

  try {
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db();

    const { username, category, qid } = await req.json();

    if (!category) {
      errorMsg += "No category provided";
      throw new Error(errorMsg);
    }
    if (!username) {
      errorMsg += "No username provided";
      throw new Error(errorMsg);
    }
    if (!qid) {
      errorMsg += "No qid provided";
      throw new Error(errorMsg);
    }

    const userExists = await db.collection("users").findOne({ username });
    if (!userExists) {
      return NextResponse.json({ error: "User does not exist" });
    }

    let categoryExists = false;
    // check if user has a question from that category
    userExists.allQuestions.forEach(async (catObj) => {
      if (catObj.category === category) {
        categoryExists = true;
        if (catObj["solvedQuestions"].includes(qid)) {
          //remove the question from the list
          const index = catObj["solvedQuestions"].indexOf(qid);
          if (index > -1) {
            catObj["solvedQuestions"].splice(index, 1);
          }
          await db
            .collection("users")
            .updateOne(
              { username },
              { $set: { allQuestions: userExists.allQuestions } }
            );
          return NextResponse.json({
            questionsList: userExists.allQuestions,
          });
        } else {
          //add the question to the list
          catObj["solvedQuestions"].push(qid);
          await db
            .collection("users")
            .updateOne(
              { username },
              { $set: { allQuestions: userExists.allQuestions } }
            );
          return NextResponse.json({
            questionsList: userExists.allQuestions,
          });
        }
      }
    });

    //if user does not have a question from that category
    if (!categoryExists) {
      userExists.allQuestions.push({
        category: category,
        solvedQuestions: [qid],
      });
      await db
        .collection("users")
        .updateOne(
          { username },
          { $set: { allQuestions: userExists.allQuestions } }
        );
      return NextResponse.json({
        questionsList: userExists.allQuestions,
      });
    }

    return NextResponse.json({
      questionsList: userExists.allQuestions,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  } finally {
    // Close the client after fetching the data or in case of an error
    if (client) {
      setTimeout(() => client.close(), 5000);
    }
  }
}

// const { authorization } = req.headers;

//     if (!authorization) {
//         return res.status(401).json({ error: "Auth token required" });
//     }
// const jwt = require("jsonwebtoken");

// const User = require("../models/userModel");
// const requireAuth = async (req, res, next) => {
//   // verify authentication

//   const { authorization } = req.headers;

//   if (!authorization) {
//     return res.status(401).json({ error: "Auth token required" });
//   }
//   const token = authorization.split(" ")[1];

//   try {
//     const { _id } = jwt.verify(token, process.env.SECRET);
//     req.user = await User.findOne({ _id }).select("_id");
//     next();
//   } catch (error) {
//     console.log(error);
//     return res.status(401).json({ error: "request is not authorized" });
//   }
// };

// module.exports = requireAuth;
/*
solvedQuestions =[
    {
    category: "arrays",
    questionList: [],
},
{
    category: "category",
    questionList: [],
},
{
    category: "category",
    questionList: [],
},
]


*/
