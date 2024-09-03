import { z } from "zod";

// payment validation schema
const paymentValidationSchema = z.object({
  body: z.object({
    orderId: z
      .string({ required_error: "Order id is required" })
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid product ID"),
    userId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid product ID"),
    paymentMethod: z.enum(["stripe", "cod"], {
      required_error: "Payment method is required",
    }),
    amountPaid: z.number({ required_error: "AmountPaid is required" }),
    date: z.date(),
    status: z.enum(["pending", "completed"]),
    transactionId: z.string().optional(),
  }),
});

// update payment status
const updatePaymentStatusSchema = z.object({
  body: z.object({
    status: z.enum(["completed"]),
  }),
});

export const PaymentValidations = {
  paymentValidationSchema,
  updatePaymentStatusSchema,
};
