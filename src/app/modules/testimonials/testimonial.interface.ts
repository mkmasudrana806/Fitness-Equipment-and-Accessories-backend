import { Types } from "mongoose";

export type TTestimonial = {
  userId: Types.ObjectId;
  productId: Types.ObjectId;
  description: string;
  rating: number;
  status: "pending" | "published";
};
