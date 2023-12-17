import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req, res) {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db();

    const { username, email, password } = await req.json();
    if (!email || !password || !username) {
      return NextResponse.json({
        error: "Missing email ,password or username",
      });
    }

    // check if the email is valid
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email" });
    }

    // Check if the user already exists by email
    const existingUserByEmail = await db.collection("users").findOne({ email });
    if (existingUserByEmail) {
      return NextResponse.json({ error: "Email already in use" });
    }

    // Check if the user already exists by username
    const existingUserByUserName = await db
      .collection("users")
      .findOne({ username });
    if (existingUserByUserName) {
      return NextResponse.json({ error: "Username already in use" });
    }

    // {
    //     "email": "Test@Test.com",
    //     "username" : "Jeet kanodia",
    //     "password": "Test1234"
    // }

    // check if the password is valid (min 8 chars, 1 number, 1 uppercase, 1 lowercase and 1 special character)
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return NextResponse.json({
        error:
          "Password must be at least 8 characters long, contain at least 1 number, 1 lowercase and 1 uppercase letter and a special character",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      username,
      email,
      password: hashedPassword,
    };

    const result = await db.collection("users").insertOne(newUser);

    // Create a JWT token
    const token = jwt.sign({ email: newUser.email }, JWT_SECRET, {
      expiresIn: "1d", // Set an expiration time for the token
    });

    await client.close();

    return NextResponse.json({ username, email, token });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
