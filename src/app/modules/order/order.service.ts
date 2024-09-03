import httpStatus from "http-status";
import AppError from "../../utils/AppError";
import { TOrder, TOrderStatus } from "./order.interface";
import { Order } from "./order.model";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../user/user.model";
import { Date as MongooseDate } from "mongoose";

// ------------------ create an order into db------------------
// user and admin both can order a product.
// when user order a product, userid from auth. admin can help user to order a product. admin will pass userid.
// TODO: add payment system and save to 'Payment' collection
const createAnOrderIntoDB = async (userData: JwtPayload, payload: TOrder) => {
  let user;
  // userId is not provided and userData.role=='user' means user make order
  if (!payload.userId && userData.role === "user") {
    user = await User.findOne({ email: userData.email, role: "user" });
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }
    payload.userId = user?._id;
    payload.email = userData.email;
  }
  // userId provided and userData.role=='admin' means admin make order for user
  else if (payload.userId && userData.role === "admin") {
    user = await User.findById(payload.userId);
    payload.email = user?.email as string;
  }

  // set estimated delivery time
  const currentDate = new Date();
  const estimatedDeliveryDate = new Date(
    currentDate.getTime() + 3 * 24 * 60 * 60 * 1000
  ) as unknown;

  payload.estimatedDeliveryDate = estimatedDeliveryDate as MongooseDate;

  // calculate total amount and set
  const totalAmount = payload?.items.reduce(
    (acc, item) => (acc += item.price * item.quantity),
    0
  );
  payload.totalAmount = totalAmount;

  //TODO: set refrence to payment id

  const result = await Order.create(payload);
  return result;
};

// get all orders
const getAllOrdersFromDB = async () => {
  const result = await Order.find({});
  return result;
};

// get user orders
const getUserOrdersFromDB = async (userData: JwtPayload) => {
  const result = await Order.find({ email: userData.email });
  return result;
};

// change order status
// received -> delivered
// received -> cancelled
const changeOrderStatusIntoDB = async (id: string, payload: TOrderStatus) => {
  // check if order exists and status is received
  const isOrderexists = await Order.findById(id);
  if (!isOrderexists) {
    throw new AppError(httpStatus.NOT_FOUND, "Order not found");
  }
  // throw error if the order status is not 'received'
  if (isOrderexists.status !== "received") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Order is already ${isOrderexists.status}`
    );
  }

  const result = await Order.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const OrderServices = {
  createAnOrderIntoDB,
  getAllOrdersFromDB,
  getUserOrdersFromDB,
  changeOrderStatusIntoDB,
};
