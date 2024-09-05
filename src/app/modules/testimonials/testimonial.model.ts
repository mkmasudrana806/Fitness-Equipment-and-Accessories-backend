import { Schema, model } from "mongoose";
import { TTestimonial } from "./testimonial.interface";

// Testimonial schema
const testimonialSchema = new Schema<TTestimonial>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "published"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export const Testimonial = model<TTestimonial>(
  "Testimonial",
  testimonialSchema
);
