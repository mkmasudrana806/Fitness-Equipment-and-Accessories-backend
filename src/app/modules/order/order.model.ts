import { model, Schema } from "mongoose";
import { TOrder, TOrderItem, TShippingAddress } from "./order.interface";
import { order_STATUS } from "./order.constant";

// shipping Address Schema
const shippingAddressSchema = new Schema<TShippingAddress>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
});

const orderItemsSchema = new Schema<TOrderItem>({
  productId: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

// order schema definition
const orderSchema = new Schema<TOrder>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    email: { type: String, required: true },
    status: {
      type: String,
      enum: order_STATUS,
      required: true,
      default: "received",
    },
    orderDate: { type: Date, required: true, default: new Date() },
    estimatedDeliveryDate: { type: Date, required: true },
    items: {
      type: [orderItemsSchema],
      required: true,
    },
    shippingAddress: { type: shippingAddressSchema, required: true },
    shippingCost: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true, default: 0 },
    // paymentId: { type: Schema.Types.ObjectId, required: true, ref: "Payment" },
  },
  {
    timestamps: true,
  }
);

export const Order = model<TOrder>("Order", orderSchema);
