import mongoose, { Schema } from "mongoose";
import { IProduct } from "../interfaces/IProduct.interface";

const ProductSchema: Schema<IProduct> = new Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    currentPrice: {
      type: Number,
      required: true,
    },
    platformLinks: [
      {
        platform: { type: String, required: true }, 
        url: { type: String, required: true },
      },
    ],
    ratings: {
      averageRating: { type: Number, default: 0 },
      reviewCount: { type: Number, default: 0 },
    },
    fetchDate: {
      type: Date,
      default: Date.now,
    },
    source: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
