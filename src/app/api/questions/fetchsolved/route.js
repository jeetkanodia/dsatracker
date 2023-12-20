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

    const authorization = req.headers.get("Authorization");

    if (!authorization) {
      return NextResponse.json({ error: "Auth token required" });
    }
    const token = authorization.split(" ")[1];
    const { email } = jwt.verify(token, process.env.JWT_SECRET);

    const { category } = await req.json();
    if (!category) {
      errorMsg += "No category provided";
      throw new Error(errorMsg);
    }

    // Await the result of find() and convert it to an array
    const user = await db.collection("users").find({ email }).toArray();

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
