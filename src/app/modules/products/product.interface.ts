import { ProductCategoryEnum } from "./product.constant";

// product type
export type TProduct = {
  name: string;
  price: number;
  category: ProductCategoryEnum;
  quantity: number;
  featured: boolean;
  description: string;
  productImgUrl: string;
  isDeleted: boolean;
};

export type TFeatured = {
  featured: boolean;
};
