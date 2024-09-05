import httpStatus from "http-status";
import asyncHanlder from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { TestimonialServices } from "./testimonial.service";

// ------------------- create a Testimonial -------------------
const createATestimonial = asyncHanlder(async (req, res) => {
  const result = await TestimonialServices.createATestimonialIntoDB(
    req.user,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Testimonial posted is successfull",
    data: result,
  });
});

// --------------- get all Testimonials -------------------
const getAllTestimonials = asyncHanlder(async (req, res) => {
  const result = await TestimonialServices.getAllTestimonialsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Testimonials retrieved successfull",
    data: result,
  });
});

// ------------------- delete a Testimonial -------------------
const deleteATestimonial = asyncHanlder(async (req, res) => {
  const result = await TestimonialServices.deleteATestimonialFromDB(
    req.params?.id
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Testimonial deleted successfull",
    data: result,
  });
});

// ------------------- published a Testimonial -------------------
const publishedATestimonial = asyncHanlder(async (req, res) => {
  const result = await TestimonialServices.publishedATestimonialIntoDB(
    req.params?.id
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Testimonial published successfull",
    data: result,
  });
});

export const TestimonialControllers = {
  createATestimonial,
  getAllTestimonials,
  deleteATestimonial,
  publishedATestimonial,
};
