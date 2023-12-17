import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET; // Replace with a secure secret key

export async function POST(req, res) {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db();

    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" });
    }

    //check if email exists
    const userExists = await db.collection("users").findOne({ email });
    if (!userExists) {
      return NextResponse.json({ error: "Email does not exist" });
    }

    // check if the password is valid
    const validPassword = await bcrypt.compare(password, userExists.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" });
    }

    const result = {
      email: userExists.email,
      username: userExists.username,
    };

    // Create a JWT token
    const token = jwt.sign({ email: userExists.email }, JWT_SECRET, {
      expiresIn: "1d", // Set an expiration time for the token
    });

    await client.close();

    return NextResponse.json({ result, token });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
