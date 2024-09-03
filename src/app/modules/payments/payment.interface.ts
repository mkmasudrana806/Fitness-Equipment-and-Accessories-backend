import { Date, Types } from "mongoose";

// Payment type
export type TPayment = {
  userId: Types.ObjectId;
  paymentMethod: "stripe" | "cod"; // cash on delivery
  amountPaid: number;
  date: Date;
  status: "pending" | "completed" | "returned";
  transactionId?: string; // only for stripe transactions
};
