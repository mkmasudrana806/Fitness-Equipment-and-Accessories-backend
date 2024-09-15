import httpStatus from "http-status";
import AppError from "../../utils/AppError";
import { TOrder, TOrderStatus } from "./order.interface";
import { Order } from "./order.model";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../user/user.model";
import { Date as MongooseDate, ObjectId } from "mongoose";
import { TPayment } from "../payments/payment.interface";
import { Payment } from "../payments/payment.model";

// ------------------ create an order into db------------------
// user and admin both can order a product.
// when user order a product, userid from auth. admin can help user to order a product. admin will pass userid.
// TODO: add payment system and save to 'Payment' collection
// TODO: decrement product quantity
const createAnOrderIntoDB = async (userData: JwtPayload, payload: TOrder) => {
  // payment data
  let paymentData: Record<string, any> = {};

  // userId is not provided and userData.role=='user' means user make order
  if (!payload.userId && userData.role === "user") {
    payload.userId = userData.userId;
    payload.email = userData.email;
  }
  //else: admin make order for user. so pass email and userId from client

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

  // if paymentMethod stripe, make a transaction
  if (payload.paymentMethod === "stripe") {
    const stripePayment = "amar sonar bangla"; // complete stripe transaction
    paymentData.transactionId = stripePayment;
  }

  // set userId, amountPaid, paymentMethod, status
  if (userData.role === "user") {
    paymentData.userId = userData.userId;
  } else {
    paymentData.userId = payload.userId;
  }
  paymentData.amountPaid = totalAmount;

  // by default payment method='stripe and 'status='completed'
  if (payload.paymentMethod === "cod") {
    paymentData.paymentMethod = "cod";
    paymentData.status = "pending";
  }

  // make a payment ( Transaction-1 )
  const payment = await Payment.create(paymentData);
 

  // set paymentId reference to Order collection
  payload.paymentId = payment._id;

  // make an order ( Transaction-2 )
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
// TODO: before update order status='delivered', check if method cod.then update payment collection also
const deliveredAnOrder = async (id: string) => {
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

  const result = await Order.findByIdAndUpdate(
    id,
    { status: "delivered" },
    { new: true }
  );
  return result;
};

// cancelled an order
// TODO: increment product quantity
// TODO: payment return and payment collection update
const cancelledAnOrder = async (id: string) => {
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

  const result = await Order.findByIdAndUpdate(
    id,
    { status: "cancelled" },
    { new: true }
  );
  return result;
};

export const OrderServices = {
  createAnOrderIntoDB,
  getAllOrdersFromDB,
  getUserOrdersFromDB,
  deliveredAnOrder,
  cancelledAnOrder,
};
