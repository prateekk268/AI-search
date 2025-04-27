import { pipeline } from "@xenova/transformers";

export const embed = async (text: string): Promise<number[] | void> => {
  try {
    const extractor = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );
    const embeddings = await extractor(text, {
      pooling: "mean",
      normalize: true,
    });
    // console.log(embeddings.data)
    return Array.from(embeddings.data);
  } catch (error) {
    console.log(error);
    throw new Error("Error in creating Embeddings");
    
  }
};
