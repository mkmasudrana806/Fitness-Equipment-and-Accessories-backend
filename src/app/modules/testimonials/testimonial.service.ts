import httpStatus from "http-status";
import AppError from "../../utils/AppError";
import { TTestimonial } from "./testimonial.interface";
import { Testimonial } from "./testimonial.model";
import { JwtPayload } from "jsonwebtoken";
import { Order } from "../order/order.model";

// create a Testimonial into db
const createATestimonialIntoDB = async (
  userData: JwtPayload,
  payload: TTestimonial
) => {
  // check if the user belongs to any order
  const isBelongOrder = await Order.findOne({
    userId: userData.userId,
    status: "delivered",
  });
  if (!isBelongOrder) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Your are not belongs to any order"
    );
  }

  // check if the user already give a testimonial review
  const isTestimonialFound = await Testimonial.findById(userData.userId);
  if (isTestimonialFound) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You are already given a testimonial review"
    );
  }

  payload.userId = userData.userId;
  payload.productId = isBelongOrder.items[0].productId;
  const result = await Testimonial.create(payload);
  return result;
};

// get all Testimonials
const getAllTestimonialsFromDB = async () => {
  const result = await Testimonial.find({});
  return result;
};

// has access to post a testimonial
const hasAccessToTestimonial = async (userId: string) => {
  // check if the user has any order and that is delivered
  const isOrderExists = await Order.findOne({ userId, status: "delivered" });
  if (!isOrderExists) {
    throw new AppError(httpStatus.NOT_FOUND, "You have not any order");
  }

  return isOrderExists ? true : false;
};

// delete a Testimonial ( permanent delete)
const deleteATestimonialFromDB = async (id: string) => {
  const result = await Testimonial.findByIdAndDelete(id);
  return result;
};

// published a Testimonial
const publishedATestimonialIntoDB = async (id: string) => {
  const result = await Testimonial.findByIdAndUpdate(
    id,
    {
      status: "published",
    },
    { new: true }
  );
  return result;
};

export const TestimonialServices = {
  createATestimonialIntoDB,
  getAllTestimonialsFromDB,
  hasAccessToTestimonial,
  deleteATestimonialFromDB,
  publishedATestimonialIntoDB,
};
