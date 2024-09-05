import { z } from "zod";

// create a Testimonial schema
const createATestimonialSchema = z.object({
  body: z.object({
    description: z.string({
      required_error: "Product description is required",
    }),
    rating: z
      .number()
      .min(1, "Rating should not be less than 1")
      .max(5, "Rating should not be greater than 5"),
  }),
});

export const TestimonialValidations = {
  createATestimonialSchema,
};
