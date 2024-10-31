import { Document } from "mongoose";

export interface IProduct extends Document {
  productName: string;
  category: string;
  description?: string;
  imageUrl: string;
  currentPrice: number;
  priceHistory?: Array<{ price: number; date: Date }>;
  platformLinks: Array<{ platform: string; url: string }>;
  ratings?: {
    averageRating: number;
    reviewCount: number;
  };
  stockStatus?: boolean;
  lastUpdated: Date;
  createdAt: Date;
  updatedAt: Date;
}
