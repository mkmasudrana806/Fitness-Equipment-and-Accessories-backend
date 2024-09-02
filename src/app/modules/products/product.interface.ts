// product type
export type TProduct = {
  name: string;
  price: number;
  category:
    | "cardio"
    | "strength"
    | "Yoga"
    | "accessories"
    | "wearables"
    | "recovery";
  quantity: number;
  featured: boolean;
  description: string;
  isDeleted: boolean;
};

export type TFeatured = {
  featured: boolean;
};
