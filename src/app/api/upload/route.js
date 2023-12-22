import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req, res) {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db();

    const { base64, username } = await req.json();

    if (!base64 && !username) {
      return NextResponse.json({ error: "Missing data" });
    }

    const authorization = req.headers.get("Authorization");
    console.log(authorization);
    if (!authorization) {
      return NextResponse.json({ error: "Missing token" });
    }

    const token = authorization.split(" ")[1];
    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    console.log("email", email);

    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User does not exist" });
    }
    let result;
    if (!username) {
      result = await db
        .collection("users")
        .updateOne({ email }, { $set: { profileImage: base64 } });
    } else if (!base64) {
      result = await db
        .collection("users")
        .updateOne({ email }, { $set: { username } });
    } else {
      result = await db
        .collection("users")
        .updateOne({ email }, { $set: { username, profileImage: base64 } });
    }
    await client.close();

    return NextResponse.json({ status: true, result });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
