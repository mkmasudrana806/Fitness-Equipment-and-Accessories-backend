import { model, Schema } from "mongoose";
import { TProduct } from "./product.interface";
import { PRODUCT_CATEGORIES } from "./product.constant";

// product mongoose schema definition
const productSchema = new Schema<TProduct>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true, enum: PRODUCT_CATEGORIES },
    quantity: { type: Number, required: true },
    featured: { type: Boolean, required: true, default: false },
    description: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Product = model<TProduct>("Product", productSchema);
