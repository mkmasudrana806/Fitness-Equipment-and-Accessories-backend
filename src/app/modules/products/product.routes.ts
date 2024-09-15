import express from "express";
import validateRequestData from "../../middlewares/validateRequest";
import { ProductValidations } from "./product.validation";
import { ProductControllers } from "./product.controller";
import auth from "../../middlewares/auth";
const router = express.Router();

// create a product
router.post(
  "/create-product",
  auth("admin"),
  validateRequestData(ProductValidations.createProductSchema),
  ProductControllers.createProduct
);

// get all products
router.get("/", ProductControllers.getAllProducts);

// get single product
router.get("/:id", ProductControllers.getSingleProduct);

// update a product
router.patch(
  "/:id",
  auth("admin"),
  validateRequestData(ProductValidations.updateProductSchema),
  ProductControllers.updateAProduct
);

// delete a product
router.delete("/:id", auth("admin"), ProductControllers.deleteAProduct);

export const ProductRoutes = router;
