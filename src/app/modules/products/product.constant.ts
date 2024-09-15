import { TProduct } from "./product.interface";

// product categories enum
export type ProductCategoryEnum =
  | "Treadmills"
  | "Dumbbells & Weights"
  | "Yoga Mats"
  | "Resistance Bands"
  | "Exercise Bikes"
  | "Fitness Trackers"
  | "Kettlebells"
  | "Benches";

// product categories
export const PRODUCT_CATEGORIES = [
  "Treadmills",
  "Dumbbells & Weights",
  "Yoga Mats",
  "Resistance Bands",
  "Exercise Bikes",
  "Fitness Trackers",
  "Kettlebells",
  "Benches",
];

// allowed fields to update a product
export const ALLOWED_FIELDS_TO_UPDATE: (keyof TProduct)[] = [
  "name",
  "price",
  "category",
  "quantity",
  "description",
  "featured",
];

// search able fields
export const PRODUCT_SEARCHABLE_FIELDS = ["name", "category", "description"];
