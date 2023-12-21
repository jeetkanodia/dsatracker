import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db();

    // Await the result of find() and convert it to an array
    const questions = await db.collection("categories").find({}).toArray();

    // Close the client after fetching the data
    await client.close();

    // Return the data as JSON
    return NextResponse.json({ questions });
  } catch (error) {
    // If there's an error, return it as JSON
    return NextResponse.json({ error });
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
//
//     return res.status(401).json({ error: "request is not authorized" });
//   }
// };

// module.exports = requireAuth;
