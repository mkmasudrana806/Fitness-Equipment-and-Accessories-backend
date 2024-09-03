import { z } from "zod";
import { order_STATUS } from "./order.constant";

const ShippingAddressSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
});

const OrderItemSchema = z.object({
  productId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid product ID"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  price: z.number().min(0, "Price must be a positive number"),
});

// create order schema valiidation
const createOrderSchema = z.object({
  body: z.object({
    userId: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid product ID")
      .optional(),
    shippingAddress: ShippingAddressSchema,
    items: z.array(OrderItemSchema).min(1, "At least one product is required"),
  }),
});

// change order status
const changeOrderStatusSchema = z.object({
  body: z.object({
    status: z.enum([...(order_STATUS as [string, ...string[]])]),
  }),
});

export const OrderValidations = {
  createOrderSchema,
  changeOrderStatusSchema,
};
