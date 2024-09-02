import express from "express";
import validateRequestData from "../../middlewares/validateRequest";
import { ProductValidations } from "./product.validation";
import { ProductControllers } from "./product.controller";
const router = express.Router();

// create a product
router.post(
  "/create-product",
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
  validateRequestData(ProductValidations.updateProductSchema),
  ProductControllers.updateAProduct
);

// delete a product
router.delete("/:id", ProductControllers.deleteAProduct);

// make product featrued or unfeatured
router.patch(
  "/make-featured/:id",
  validateRequestData(ProductValidations.productFeaturedUnfeaturedSchema),
  ProductControllers.productFeaturedUnfeatured
);

export const ProductRoutes = router;
