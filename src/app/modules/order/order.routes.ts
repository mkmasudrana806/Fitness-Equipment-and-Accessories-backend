import express from "express";
import validateRequestData from "../../middlewares/validateRequest";

import { OrderControllers } from "./order.controller";
import { OrderValidations } from "./order.validation";
import auth from "../../middlewares/auth";
const router = express.Router();

// create a order
router.post(
  "/create-order",
  auth("user", "admin"),
  validateRequestData(OrderValidations.createOrderSchema),
  OrderControllers.createAnOrder
);

//  get all orders
router.get("/", auth("admin"), OrderControllers.getAllOrders);

//  get user orders
router.get("/my-orders", auth("user"), OrderControllers.getUserOrders);

// change order status
router.post(
  "/change-order-status/:id",
  auth("admin"),
  validateRequestData(OrderValidations.changeOrderStatusSchema),
  OrderControllers.changeOrderStatus
);

export const OrderRoutes = router;
