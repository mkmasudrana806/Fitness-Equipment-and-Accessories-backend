import { TProduct } from "./product.interface";

// product categories
export const PRODUCT_CATEGORIES = [
  "cardio",
  "strength",
  "Yoga",
  "accessories",
  "wearables",
  "recovery",
];

// allowed fields to update a product
export const ALLOWED_FIELDS_TO_UPDATE: (keyof TProduct)[] = [
  "name",
  "price",
  "category",
  "quantity",
  "description",
];
