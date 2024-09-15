import { z } from "zod";
import { PRODUCT_CATEGORIES } from "./product.constant";

// create product validation schema
const createProductSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Product name is required" }),
    price: z
      .number({ required_error: "Price is required" })
      .nonnegative("Price should be nonnegative"),
    category: z
      .enum([...(PRODUCT_CATEGORIES as [string, ...string[]])], {
        required_error: "Product category is required",
        invalid_type_error: "Product name should be capitalized",
      })
      .refine((cate) => (cate[0] >= "A" && cate[0] <= "Z" ? true : false)),
    quantity: z
      .number({ required_error: "Quantity is required" })
      .nonnegative("Quantity should be nonnegative"),
    description: z.string({ required_error: "Description is required" }),
    featured: z.boolean({
      required_error: "Featured is required",
      invalid_type_error: "Featured must be boolean type",
    }),
    productImgUrl: z.string({ required_error: "Product image is required" }),
  }),
});

// update product validation schema
const updateProductSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Product name is required" }).optional(),
    price: z
      .number({ required_error: "Price is required" })
      .nonnegative("Price should be nonnegative")
      .optional(),
    category: z
      .enum([...(PRODUCT_CATEGORIES as [string, ...string[]])], {
        required_error: "Product category is required",
        invalid_type_error: "Product name should be capitalized",
      })
      .refine((cate) => (cate[0] >= "A" && cate[0] <= "Z" ? true : false))
      .optional(),
    quantity: z
      .number({ required_error: "Quantity is required" })
      .nonnegative("Quantity should be nonnegative")
      .optional(),
    description: z
      .string({ required_error: "Description is required" })
      .optional(),
  }),
});


export const ProductValidations = {
  createProductSchema,
  updateProductSchema,
};
