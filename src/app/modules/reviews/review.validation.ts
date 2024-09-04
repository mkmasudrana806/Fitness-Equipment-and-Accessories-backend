import { Types } from "mongoose";
import { z } from "zod";

// create a review schema
const createAReviewSchema = z.object({
  body: z.object({
    productId: z
      .string({ required_error: "Product id is required" })
      .refine((value) => Types.ObjectId.isValid(value), {
        message: "Invalid productId",
      }),
    rating: z
      .number()
      .min(1, "Rating should not be less than 1")
      .max(5, "Rating should not be greater than 5"),
    comment: z.string().optional(),
  }),
});

export const ReviewValidations = {
  createAReviewSchema,
};
