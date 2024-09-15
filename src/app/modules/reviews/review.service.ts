import httpStatus from "http-status";
import AppError from "../../utils/AppError";
import { TReview } from "./review.interface";
import { Review } from "./review.model";
import { JwtPayload } from "jsonwebtoken";
import { Order } from "../order/order.model";
import { Product } from "../products/product.model";
import makeAllowedFieldData from "../../utils/allowedFieldUpdatedData";
import { REVIEW_ALLOWED_FIELDS_TO_UPDATE } from "./review.constant";
import QueryBuilder from "../../queryBuilder/queryBuilder";

// -------------- create a review into db --------------
const createAReviewIntoDB = async (userData: JwtPayload, payload: TReview) => {
  // check if the product is exists
  const isProductExists = await Product.findById(payload.productId);
  if (!isProductExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Product is not found");
  }

  // check if the product belongs to the user
  const isUserBelongsToOrder = await Order.findOne({
    userId: userData.userId,
    status: "delivered",
    "items.productId": payload.productId,
  });

  if (!isUserBelongsToOrder) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Your are not belong to the product"
    );
  }

  // throw error if review is already exists
  const isReviewExists = await Review.findOne({
    userId: userData.userId,
    productId: payload.productId,
  });
  if (isReviewExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "Review already exists");
  }

  // set userId from jwt payload
  payload.userId = userData.userId;

  const result = await Review.create(payload);
  return result;
};

// -------------- get all reviews by default. also filter by productId or productId&&userId--------------
const getAllReviewsFromDB = async (query: Record<string, unknown>) => {
  const reviewQuery = new QueryBuilder(
    Review.find({}).populate("userId"),
    query
  ).filter();
  const result = reviewQuery.modelQuery;
  return result;
};

// -------------- check if authenticate user has the access to review the product --------------
const hasAccessToReviewProduct = async (userId: string, productId: string) => {
  const result = await Order.findOne({
    userId,
    "items.productId": productId,
  });

  return result ? true : false;
};

// -------------- delete a review --------------
// also throw error review is not belong to this user
const deleteAReviewIntoDB = async (userId: string, reviewId: string) => {
  // check if review belongs to the user
  const result = await Review.findOneAndDelete({
    _id: reviewId,
    userId,
  });

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, "Product is not belong to you!");
  }

  return result;
};

// -------------- update a review --------------
const updateAReviewIntoDB = async (
  userId: string,
  reviewId: string,
  payload: TReview
) => {
  const allowedUpdatedData = makeAllowedFieldData<TReview>(
    REVIEW_ALLOWED_FIELDS_TO_UPDATE,
    payload
  );

  // check if the review belongs to the user
  const isReviewExists = await Review.findOne({
    _id: reviewId,
    userId,
  });
  if (!isReviewExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "Review is not belong to you!");
  }

  //review update not allowed after 7 days
  const currentDate = new Date();
  const createdDate = isReviewExists.createdAt as any;
  // calculate time difference in milliseconds
  const diffInMilliseconds = currentDate.getTime() - createdDate.getTime();
  // calculate days
  const diffInDays = diffInMilliseconds / (1000 * 24 * 60 * 60);
  if (diffInDays > 7) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You can not edit your review after 7 days"
    );
  }

  const result = await Review.findByIdAndUpdate(reviewId, allowedUpdatedData, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const ReviewServices = {
  createAReviewIntoDB,
  getAllReviewsFromDB,
  hasAccessToReviewProduct,
  deleteAReviewIntoDB,
  updateAReviewIntoDB,
};
