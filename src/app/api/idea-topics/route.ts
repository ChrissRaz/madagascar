import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import IdeaTopic from "@/models/ideaTopic";
import Idea from "@/models/idea";
import fs from "fs";
import path from "path";

// Crée un nom unique
function generateFileName(extension: string) {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${extension}`;
}

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();

  try {
    let imageUrl = null;

    if (data.imageBase64) {
      // Extraire le header (data:image/png;base64,...)
      const matches = data.imageBase64.match(/^data:(.+);base64,(.+)$/);
      if (!matches) {
        return NextResponse.json({ error: "Image base64 invalide" }, { status: 400 });
      }

      const mimeType = matches[1];
      const base64Data = matches[2];
      const extension = mimeType.split("/")[1];

      const fileName = generateFileName(extension);
      const filePath = path.join(process.cwd(), "public", "uploads", fileName);

      // S'assurer que le dossier existe
      fs.mkdirSync(path.dirname(filePath), { recursive: true });

      // Écrire l'image
      fs.writeFileSync(filePath, Buffer.from(base64Data, "base64"));

      // URL utilisable par le front
      imageUrl = `/uploads/${fileName}`;
    }

    // Enregistrement DB
    const topic = await IdeaTopic.create({
      title: data.title,
      description: data.description,
      longDescription: data.longDescription,
      startDate: data.startDate,
      endDate: data.endDate,
      imageId: imageUrl, // ici c'est l'URL
    });

    return NextResponse.json(topic, { status: 201 });
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));

    return NextResponse.json({ error: "Erreur création thématique" }, { status: 500 });
  }
}

export async function GET() {
  await connectDB();
  try {
    const topics = await IdeaTopic.find();

    // Pour chaque topic → compter les idées associées
    const topicsWithSignatures = await Promise.all(
      topics.map(async (topic) => {
        const count = await Idea.countDocuments({ topicId: topic._id });
        return {
          ...topic.toObject(),
          signatures: count
        };
      })
    );

    return NextResponse.json(topicsWithSignatures);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur récupération topics" }, { status: 500 });
  }
}

