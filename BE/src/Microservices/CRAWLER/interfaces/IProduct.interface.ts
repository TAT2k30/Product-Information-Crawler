import { Document } from "mongoose";

export interface IProduct extends Document {
  productName: string;
  description?: string;
  imageUrl: string;
  currentPrice: number;
  platformLinks: Array<{ platform: string; url: string }>;
  ratings?: {
    averageRating: number;
    reviewCount: number;
  };
  fetchDate: Date;
  source: string;
}
