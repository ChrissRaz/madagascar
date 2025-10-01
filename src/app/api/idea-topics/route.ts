import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import IdeaTopic from "@/models/ideaTopic";
import Idea from "@/models/idea";
import { bucket } from "@/lib/storage";
import { v4 as uuidv4 } from "uuid";


// Crée un nom unique
function generateFileName(extension: string) {
  return `${uuidv4()}.${extension}`;
}

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();

  try {
    let imageUrl: string | null = null;

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

      // Upload vers ton bucket
      const file = bucket.file(fileName);
      await file.save(Buffer.from(base64Data, "base64"), {
        contentType: mimeType,
        // public: true,
        metadata: {
          cacheControl: "public, max-age=31536000",
        },
      });

      // URL publique
      imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
    }

    // Enregistrement DB
    const topic = await IdeaTopic.create({
      title: data.title,
      description: data.description,
      longDescription: data.longDescription,
      startDate: data.startDate,
      endDate: data.endDate,
      imageId: imageUrl, // URL depuis GCS
    });

    return NextResponse.json(topic, { status: 201 });
  } catch (error) {
    console.error(error);
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

