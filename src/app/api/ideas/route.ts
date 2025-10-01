import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Idea from "@/models/idea";

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();

  console.log("Received idea data:", JSON.stringify(data, null, 2));
  

  try {
    const idea = await Idea.create(data);
    return NextResponse.json(idea, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur ajout idée" }, { status: 500 });
  }
}
