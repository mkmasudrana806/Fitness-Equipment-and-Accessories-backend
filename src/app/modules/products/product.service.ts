import { TProduct } from "./product.interface";
import { Product } from "./product.model";

// ------------------ create a product into db------------------
const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

export const ProductServices = {
  createProductIntoDB,
};
