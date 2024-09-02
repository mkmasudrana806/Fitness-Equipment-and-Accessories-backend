import { z } from "zod";

// create product validation schema
const createProductSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Product name is required" }),
    price: z
      .number({ required_error: "Price is required" })
      .nonnegative("Price should be nonnegative"),
    category: z.string({ required_error: "Category is required" }),
    quantity: z
      .number({ required_error: "Quantity is required" })
      .nonnegative("Quantity should be nonnegative"),
    description: z.string({ required_error: "Description is required" }),
  }),
});

export const productValidations = {
  createProductSchema,
};
