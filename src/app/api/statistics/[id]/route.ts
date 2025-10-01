import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Idea from "@/models/idea";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await connectDB();

  try {
    const ideas = await Idea.find({ topicId: params.id }); // ⚠️ renommer petitionId → topicId plus tard

    const total = ideas.length;

    // Regroupement par âge
    const ageRanges = [
      { label: "18-25", min: 18, max: 25 },
      { label: "26-35", min: 26, max: 35 },
      { label: "36-50", min: 36, max: 50 },
      { label: "50+", min: 51, max: Infinity },
    ];

    const ageStats = ageRanges.map(r => ({ range: r.label, count: 0 }));

    for (const idea of ideas) {
      const match = ageRanges.findIndex(r => idea.age >= r.min && idea.age <= r.max);
      if (match !== -1) {
        ageStats[match].count++;
      }
    }

    // Regroupement par région
    const regions = [...new Set(ideas.map(i => i.region))];
    const regionStats = regions.map(region => ({
      region,
      count: ideas.filter(i => i.region === region).length,
    }));

    // Synthèse IA (placeholder)
    const aiSummary = "Mivoaka rehefa vita ny daty faran'ny fanangonan-kevitra.";

    return NextResponse.json({
      id: params.id,
      title: "Statistiques",
      total,
      ageStats,
      regionStats,
      aiSummary,
    });
  } catch (error) {
    return NextResponse.json({ error: "Erreur statistiques" }, { status: 500 });
  }
}
