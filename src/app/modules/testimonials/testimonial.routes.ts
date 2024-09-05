import express from "express";
import validateRequestData from "../../middlewares/validateRequest";
import { TestimonialValidations } from "./testimonial.validation";
import { TestimonialControllers } from "./testimonial.controller";
import auth from "../../middlewares/auth";
const router = express.Router();

// create a Testimonial
router.post(
  "/create-testimonial",
  auth("user"),
  validateRequestData(TestimonialValidations.createATestimonialSchema),
  TestimonialControllers.createATestimonial
);

// get all Testimonials
router.get("/", TestimonialControllers.getAllTestimonials);

// delete a Testimonial
router.delete("/:id", auth("admin"), TestimonialControllers.deleteATestimonial);

// published a Testimonial
router.patch(
  "/published-testimonial/:id",
  auth("admin"),
  TestimonialControllers.publishedATestimonial
);

export const TestimonialRoutes = router;
