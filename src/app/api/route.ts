import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import IdeaTopics from "@/models/ideaTopic";

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();

  try {
    const petition = await IdeaTopics.create(data);
    return NextResponse.json(petition, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur création pétition" }, { status: 500 });
  }
}
