import httpStatus from "http-status";
import asyncHanlder from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { ProductServices } from "./product.service";

// ------------------- create product -------------------
const createProduct = asyncHanlder(async (req, res, next) => {
  const result = await ProductServices.createProductIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product is created successfully",
    data: result,
  });
});

// ------------------- get all product -------------------
const getAllProducts = asyncHanlder(async (req, res) => {
  const result = await ProductServices.getAllProductsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Products are retrieved successfully",
    data: result,
  });
});

// ------------------- get Single Product -------------------
const getSingleProduct = asyncHanlder(async (req, res) => {
  const result = await ProductServices.getSingleProductFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product retrieved successfully",
    data: result,
  });
});

// ------------------- update a Product -------------------
const updateAProduct = asyncHanlder(async (req, res) => {
  const result = await ProductServices.updateAProductIntoDB(
    req.params.id,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});

// ------------------- delete a Product -------------------
const deleteAProduct = asyncHanlder(async (req, res) => {
  const result = await ProductServices.deleteAProductFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product deleted successfully",
    data: result,
  });
});

// ------------------- make product featured or unfeatured -------------------
const productFeaturedUnfeatured = asyncHanlder(async (req, res) => {
  const result = await ProductServices.productFeaturedUnfeaturedIntoDB(
    req.params.id,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product featured updated successfully",
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateAProduct,
  deleteAProduct,
  productFeaturedUnfeatured,
};
