import { Date, Types } from "mongoose";

export type TOrderItem = {
  productId: Types.ObjectId;
  quantity: number;
  price: number;
};

export type TShippingAddress = {
  name: string;
  email: string;
  contact: string;
  address: string;
};

// order type
export type TOrder = {
  userId: Types.ObjectId;
  email: string;
  status: "received" | "delivered" | "canceled";
  orderDate: Date;
  estimatedDeliveryDate: Date;
  shippingAddress: TShippingAddress;
  items: TOrderItem[];
  shippingCost?: number;
  discount?: number;
  tax?: number;
  totalAmount?: number;
  paymentMethod: "stripe" | "cod"; // cash on delivery(cod)
  paymentId: Types.ObjectId;
};

// order status type
export type TOrderStatus = {
  status: "delivered";
};
