import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  let errorMsg = "Error: ";
  let client;

  try {
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db();

    // verify token
    const authorization = req.headers.get("Authorization");

    if (!authorization) {
      return NextResponse.json({ error: "Auth token required" });
    }
    const token = authorization.split(" ")[1];
    const { email } = jwt.verify(token, process.env.JWT_SECRET);

    // verify body
    const { category, qid } = await req.json();

    if (!category) {
      errorMsg += "No category provided";
      throw new Error(errorMsg);
    }
    if (!qid) {
      errorMsg += "No qid provided";
      throw new Error(errorMsg);
    }

    const userExists = await db.collection("users").findOne({ email });
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
              { email },
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
              { email },
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
          { email },
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
    return NextResponse.json({ error: error.message });
  } finally {
    // Close the client after fetching the data or in case of an error
    if (client) {
      setTimeout(() => client.close(), 5000);
    }
  }
}
