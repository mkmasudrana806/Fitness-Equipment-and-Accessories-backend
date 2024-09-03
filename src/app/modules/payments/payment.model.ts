import { model, Schema } from "mongoose";
import { TPayment } from "./payment.interface";

// mongoose payment schema
const paymentSchema = new Schema<TPayment>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["stripe", "cod"],
      default: "stripe",
    },
    amountPaid: { type: Number, required: true },
    date: { type: Date, required: true, default: new Date() },
    status: {
      type: String,
      required: true,
      enum: ["pending", "completed"],
      default: "completed",
    },
    transactionId: {
      type: String,
      required: true,
      default: "cash_on_delivery",
    },
  },
  { timestamps: true }
);

export const Payment = model("Payment", paymentSchema);
