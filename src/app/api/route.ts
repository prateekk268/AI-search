import { connectDB } from "@/db/connect";
import EmbeddingModel from "@/db/model/embedding";
import { embed } from "@/utils/embedding";
import { getMovieText } from "@/utils/functions";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  await connectDB();
  const body = await req.json();
  try {
    const isDuplicate = await EmbeddingModel.find({context: body.movieName});
    console.log(isDuplicate);

    if (isDuplicate.length !== 0) {
      return NextResponse.json(
        { message: "Movie Name must be unique!" },
        { status: 400 }
      );
    }
    
    const emb = await embed(getMovieText(body));
    const isSave = await EmbeddingModel.create({
        context: body.movieName,
        embedding: emb
    });

    return NextResponse.json(isSave, {status: 201});
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, {status: 500});
  }
};
