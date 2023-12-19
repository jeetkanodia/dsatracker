import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  let errorMsg = "Error: ";
  let client;

  try {
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db();

    const { category, username } = await req.json();
    if (!category) {
      errorMsg += "No category provided";
      throw new Error(errorMsg);
    }

    if (!username) {
      errorMsg += "No username provided";
      throw new Error(errorMsg);
    }

    // Await the result of find() and convert it to an array
    const user = await db.collection("users").find({ username }).toArray();

    if (!user) {
      return NextResponse.json({ error: "User does not exist" });
    }
    let solvedList = [];
    user[0]?.["allQuestions"]?.forEach((catObj) => {
      if (catObj.category === category) {
        solvedList = catObj.solvedQuestions;
      }
    });

    // Return the data as JSON
    return NextResponse.json({ solvedList });
  } catch (error) {
    // If there's an error, return it as JSON
    return NextResponse.json({ error: error.message });
  } finally {
    // Close the client after fetching the data or in case of an error
    if (client) {
      await client.close();
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
