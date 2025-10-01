import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import IdeaTopic from "@/models/ideaTopic";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await connectDB();

  try {
    const topic = await IdeaTopic.findById(params.id);
    if (!topic) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(topic);
  } catch (error) {
    return NextResponse.json({ error: "Erreur récupération thématique" }, { status: 500 });
  }
}
