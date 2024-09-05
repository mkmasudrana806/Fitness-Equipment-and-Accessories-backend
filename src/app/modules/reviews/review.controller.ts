import httpStatus from "http-status";
import asyncHanlder from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { ReviewServices } from "./review.service";

// ------------------- create a review -------------------
const createAReview = asyncHanlder(async (req, res) => {
  const result = await ReviewServices.createAReviewIntoDB(req.user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review posted is successfull",
    data: result,
  });
});

// --------------- get all reviews -------------------
const getAllReviews = asyncHanlder(async (req, res) => {
  const result = await ReviewServices.getAllReviewsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Reviews retrieved successfull",
    data: result,
  });
});

// ------------------- delete a review -------------------
const deleteAReview = asyncHanlder(async (req, res) => {
  const userId = req.user?.userId;
  const reviewId = req.params?.id;
  const result = await ReviewServices.deleteAReviewIntoDB(userId, reviewId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review deleted successfull",
    data: result,
  });
});

// ------------------- update a review -------------------
const updateAReview = asyncHanlder(async (req, res) => {
  const userId = req.user?.userId;
  const reviewId = req.params?.id;
  const result = await ReviewServices.updateAReviewIntoDB(
    userId,
    reviewId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review updated successfull",
    data: result,
  });
});

export const ReviewControllers = {
  createAReview,
  getAllReviews,
  deleteAReview,
  updateAReview,
};
