import httpStatus from "http-status";
import AppError from "../../utils/AppError";
import { TReview } from "./review.interface";
import { Review } from "./review.model";
import { JwtPayload } from "jsonwebtoken";
import { Order } from "../order/order.model";

// create a review into db
const createAReviewIntoDB = async (
  userData: JwtPayload,
  orderId: string,
  payload: TReview
) => {
  // check if the product belongs to the user
  const isUserBelongsToOrder = await Order.findOne({
    _id: orderId,
    userId: userData.userId,
    status: "delivered",
  });
  if (!isUserBelongsToOrder) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Your are not belong to the order"
    );
  }

  // Check if the productId exists in the items array
  const productExists = isUserBelongsToOrder.items.some((item) =>
    item.productId.equals(payload.productId)
  );
  if (!productExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "Product is not belong to you!");
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

// get all reviews
const getAllReviewsFromDB = async () => {
  const result = await Review.find({});
  return result;
};

// delete a review
const deleteAReviewIntoDB = async (userId: string, reviewId: string) => {
  // check if review belongs to the user
  const result = await Review.findOneAndUpdate(
    {
      _id: reviewId,
      userId,
    },
    { isDeleted: true },
    { new: true }
  );

  console.log(result);
  if (!result) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Review of this product is not belong to you!"
    );
  }

  return result;
};

export const ReviewServices = {
  createAReviewIntoDB,
  deleteAReviewIntoDB,
  getAllReviewsFromDB,
};
