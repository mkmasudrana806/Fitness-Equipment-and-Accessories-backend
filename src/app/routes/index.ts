import express from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.rotues";
import { ProductRoutes } from "../modules/products/product.routes";
import { OrderRoutes } from "../modules/order/order.routes";
import { PaymentRoutes } from "../modules/payments/payment.routes";
import { ReviewRoutes } from "../modules/reviews/review.routes";
const router = express.Router();

// user
router.use("/users", UserRoutes);

// auth
router.use("/auth", AuthRoutes);

// products
router.use("/products", ProductRoutes);

// orders
router.use("/orders", OrderRoutes);

// payments
router.use("/payments", PaymentRoutes);

// reviews
router.use("/reviews", ReviewRoutes);

export const ApiRoutes = router;
