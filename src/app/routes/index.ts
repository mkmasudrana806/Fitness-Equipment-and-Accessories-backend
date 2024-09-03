import express from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.rotues";
import { ProductRoutes } from "../modules/products/product.routes";
import { OrderRoutes } from "../modules/order/order.routes";
const router = express.Router();

// user
router.use("/users", UserRoutes);

// auth
router.use("/auth", AuthRoutes);

// products
router.use("/products", ProductRoutes);

// orders
router.use("/orders", OrderRoutes);

export const ApiRoutes = router;
