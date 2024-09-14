import httpStatus from "http-status";
import AppError from "../../utils/AppError";
import { TFeatured, TProduct } from "./product.interface";
import { Product } from "./product.model";
import makeAllowedFieldData from "../../utils/allowedFieldUpdatedData";
import {
  ALLOWED_FIELDS_TO_UPDATE,
  PRODUCT_SEARCHABLE_FIELDS,
} from "./product.constant";
import QueryBuilder from "../../queryBuilder/queryBuilder";

// ------------------ create a product into db------------------
const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

// ------------------ get all products form db ------------------
const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find({}), query)
    .search(PRODUCT_SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .paginate();
  const result = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();
  return { result, meta };
};

// ------------------ get a product from db ------------------
const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

// ------------------ update a product into db ------------------
const updateAProductIntoDB = async (id: string, payload: Partial<TProduct>) => {
  // check if product is exists
  const product = await Product.findById(id);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found!");
  }
  if (product.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "Product is already deleted!");
  }

  // only allowed fields to update
  const allowedData = makeAllowedFieldData<TProduct>(
    ALLOWED_FIELDS_TO_UPDATE,
    payload
  );

  const result = await Product.findByIdAndUpdate(id, allowedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

// ------------------ delete a product from db ------------------
const deleteAProductFromDB = async (id: string) => {
  const result = await Product.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

// ------------------ make product featured or unfeatured into db ------------------
const productFeaturedUnfeaturedIntoDB = async (
  id: string,
  payload: TFeatured
) => {
  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateAProductIntoDB,
  deleteAProductFromDB,
  productFeaturedUnfeaturedIntoDB,
};
