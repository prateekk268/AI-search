import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEmbedding extends Document {
  context: string;
  embedding: number[];
}

const EmbeddingSchema: Schema<IEmbedding> = new Schema({
  context: {
    type: String,
    required: true,
    unique: true
  },
  embedding: {
    type: [Number],
    required: true,
  },
});

const EmbeddingModel: Model<IEmbedding> =
  mongoose.models.Embedding || mongoose.model<IEmbedding>("Embedding", EmbeddingSchema);

export default EmbeddingModel;
