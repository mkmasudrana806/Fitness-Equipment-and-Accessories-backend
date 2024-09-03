import httpStatus from "http-status";
import asyncHanlder from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { OrderServices } from "./order.service";

// ------------------- create an order -------------------
const createAnOrder = asyncHanlder(async (req, res) => {
  const result = await OrderServices.createAnOrderIntoDB(req.user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order is created successfully",
    data: result,
  });
});

// ------------------- get all orders -------------------
const getAllOrders = asyncHanlder(async (req, res) => {
  const result = await OrderServices.getAllOrdersFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Orders retrived successfully",
    data: result,
  });
});

// ------------------- get user orders -------------------
const getUserOrders = asyncHanlder(async (req, res) => {
  const result = await OrderServices.getUserOrdersFromDB(req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User orders retrived successfully",
    data: result,
  });
});

// ------------------- change Order Status -------------------
const deliveredAnOrder = asyncHanlder(async (req, res) => {
  const result = await OrderServices.deliveredAnOrder(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order delivered successfull",
    data: result,
  });
});

// ------------------- cancel an order -------------------
const cancelledAnOrder = asyncHanlder(async (req, res) => {
  const result = await OrderServices.cancelledAnOrder(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order cancelled successfull",
    data: result,
  });
});
export const OrderControllers = {
  createAnOrder,
  getAllOrders,
  getUserOrders,
  deliveredAnOrder,
  cancelledAnOrder,
};
