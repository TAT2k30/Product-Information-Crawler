import mongoose, { Schema } from "mongoose";
import { IProduct } from "../interfaces/IProduct.interface";

const ProductSchema: Schema<IProduct> = new Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
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
    priceHistory: [
      {
        price: { type: Number, required: true },
        date: { type: Date, default: Date.now }
      }
    ],
    platformLinks: [
      {
        platform: { type: String, required: true }, // Ví dụ: 'Amazon', 'eBay'
        url: { type: String, required: true }
      }
    ],
    ratings: {
      averageRating: { type: Number, default: 0 },
      reviewCount: { type: Number, default: 0 }
    },
    stockStatus: {
      type: Boolean,
      default: true
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

const Product = mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
