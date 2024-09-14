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

// make product featured or unfeatured
const productFeaturedUnfeaturedSchema = z.object({
  body: z.object({
    featured: z.boolean({
      required_error: "Product featured is required",
      invalid_type_error: "Featured should be a boolean value",
    }),
  }),
});

export const ProductValidations = {
  createProductSchema,
  updateProductSchema,
  productFeaturedUnfeaturedSchema,
};
