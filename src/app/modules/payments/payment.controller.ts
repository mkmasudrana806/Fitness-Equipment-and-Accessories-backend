import httpStatus from "http-status";
import asyncHanlder from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { PaymentServices } from "./payment.service";

// get all payments history
const allPaymentHistory = asyncHanlder(async (req, res) => {
  const result = await PaymentServices.allPaymentsHistoryFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "payments history retrieved successfull",
    data: result,
  });
});

// get user payment history
const userPaymentHistory = asyncHanlder(async (req, res) => {
  const result = await PaymentServices.userPaymentsHistoryFromDB(req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User payments history retrieved successfull",
    data: result,
  });
});

// update payment status
const updatePaymentStatus = asyncHanlder(async (req, res) => {
  const result = await PaymentServices.updatePaymentStatusIntoDB(
    req.params.id,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment status updated successfull",
    data: result,
  });
});

export const PaymentControllers = {
  allPaymentHistory,
  userPaymentHistory,
  updatePaymentStatus,
};
