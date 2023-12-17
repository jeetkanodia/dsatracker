import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const client = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    const db = client.db();

    const newPost = await req.json();
    const result = await db.collection("emails").insertOne(newPost);
    await client.close();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
