import express from "express";
import validateRequestData from "../../middlewares/validateRequest";
import { productValidations } from "./product.validation";
import { ProductControllers } from "./product.controller";
const router = express.Router();

// create a product
router.post(
  "/create-product",
  validateRequestData(productValidations.createProductSchema),
  ProductControllers.createProduct
);

export const ProductRoutes = router;
