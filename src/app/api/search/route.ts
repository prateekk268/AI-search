import { connectDB } from "@/db/connect";
import EmbeddingModel from "@/db/model/embedding";
import { embed } from "@/utils/embedding";
import { NextRequest, NextResponse } from "next/server";
import Together from "together-ai";

const chatHistory: {
  role: "user" | "assistant" | "system";
  content: string;
}[] = [];

export const POST = async (req: NextRequest) => {
  const together = new Together({
    apiKey: process.env.API_TOKEN,
  });

  await connectDB();
  const body = await req.json();

  try {
    const emb = await embed(body.search);
    if (!emb) {
      throw new Error("Error in creating embedding");
    }

    const results = await EmbeddingModel.aggregate([
      {
        $vectorSearch: {
          index: "movie-search",
          limit: 3,
          numCandidates: 384,
          path: "embedding",
          queryVector: emb,
        },
      },
    ]);

    const moviesList = results.map((elem) => elem.context).join(",");

    if (chatHistory.length === 0) {
      chatHistory.push({
        role: "system",
        content: `You are a helpful AI movie assistant.  
          Do NOT invent or suggest any movies not present in the given list. 
          If no suitable movie is found, politely reply "No matching movie found."
          Always remember the previous conversations and respond considering the context.
          If the user does not explicitly ask for a detailed description, give a short and direct recommendation.
          Be concise, relevant, and stay focused on the provided movie list.`,
      });
    }

    chatHistory.push({
      role: "user",
      content: `Here are some movie names: ${moviesList}.
      User query: ${body.search}.
      Recommend the best matching movie from the list and describe why.`,
    });

    const response = await together.chat.completions.create({
      messages: chatHistory,
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
    });

    const assistantMessage =
      response.choices[0].message?.content || "No response";

    chatHistory.push({
      role: "assistant",
      content: assistantMessage,
    });

    return NextResponse.json(assistantMessage);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
};
